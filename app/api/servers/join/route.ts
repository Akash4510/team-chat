import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function PATCH(req: Request) {
  try {
    const profile = await currentProfile();
    const { inviteCode } = await req.json();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!inviteCode) {
      return new NextResponse('Invite Code Missing', { status: 400 });
    }

    let server;

    const alreadyInServer = await db.server.findFirst({
      where: {
        inviteCode: inviteCode,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (alreadyInServer) {
      server = alreadyInServer;
    } else {
      server = await db.server.update({
        where: {
          inviteCode: inviteCode,
        },
        data: {
          members: {
            create: [
              {
                profileId: profile.id,
              },
            ],
          },
        },
      });
    }

    return NextResponse.json(server);
  } catch (error) {
    console.log('[JOIN SERVER_ID PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
