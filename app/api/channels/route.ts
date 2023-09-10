import { NextResponse } from 'next/server';
import { MemberRole } from '@prisma/client';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 });
    }

    if (name === 'general') {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    // Check if channel name is already taken
    const channel = await db.channel.findFirst({
      where: {
        serverId,
        name,
      },
    });

    if (channel) {
      return new NextResponse(
        `Channel '${name}' already exists, please select a different name`,
        { status: 409 }
      );
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    const newChannel = await db.channel.findFirst({
      where: {
        serverId,
        name,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({ ...server, newChannel });
  } catch (error) {
    console.log('[CHANNELS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
