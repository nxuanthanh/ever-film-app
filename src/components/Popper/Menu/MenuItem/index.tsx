import { MenuItemModel } from 'models';
import { MouseEventHandler } from 'react';

export interface MenuItemProps {
  data: MenuItemModel;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function MenuItem({ data, className, onClick }: MenuItemProps) {
  return (
    <button
      className={`flex items-center justify-start px-4 py-[6px] gap-[14px] hover:bg-[#f5f5f5] w-full ${className}`}
      onClick={onClick}
    >
      {data.icon && <span>{data.icon}</span>}
      <span>{data.title}</span>
    </button>
  );
}

export default MenuItem;
