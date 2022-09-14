import { MenuItemModel } from 'models';

export interface MenuItemProps {
  data: MenuItemModel;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

function MenuItem({ data, onClick }: MenuItemProps) {
  return (
    <button
      className="flex items-center justify-start px-4 py-[6px] text-white gap-[14px] hover:bg-[#f5f5f5] hover:text-[#0a0a0a] w-full"
      onClick={onClick}
    >
      <span>{data.icon}</span>
      <span>{data.title}</span>
    </button>
  );
}

export default MenuItem;
