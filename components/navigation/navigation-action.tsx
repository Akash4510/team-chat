'use client';

import { Plus } from 'lucide-react';

import ActionTooltip from '@/components/action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

const NavigationAction = () => {
  const { openModal } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          onClick={() => openModal('createServer')}
          className="group flex items-center"
        >
          <div className="flex items-center justify-center mx-3 h-[44px] w-[44px] rounded-[22px] group-hover:rounded-[16px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
