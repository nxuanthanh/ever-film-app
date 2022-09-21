import Tippy from '@tippyjs/react/headless';
import { MenuItemModel } from 'models';
import { ReactElement } from 'react';
import Popper from '..';
import MenuItem from './MenuItem';

interface MenuProps {
  children: ReactElement;
  items: MenuItemModel[];
}

function Menu({ children, items }: MenuProps) {
  return (
    <div>
      <Tippy
        interactive
        placement="bottom-end"
        offset={[12, 0]}
        render={(attrs) => (
          <div tabIndex={-1} {...attrs}>
            <Popper className="flex flex-col item-start justify-center w-[210px] pt-[2px] bg-white rounded">
              <div className="py-2 bg-[#242424]">
                {items.map((item, idx) => {
                  return <MenuItem key={idx} data={item} onClick={item.onClick} />;
                })}
              </div>
            </Popper>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default Menu;
