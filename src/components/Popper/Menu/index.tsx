import Tippy from '@tippyjs/react/headless';
import { MenuItemModel } from 'models';
import { ReactElement, useState, useEffect } from 'react';
import Popper from '..';
import MenuItem from './MenuItem';

interface MenuProps {
  children: ReactElement;
  items: MenuItemModel[];
  className?: string;
  layout?: string;
  placement: 'bottom-end' | 'bottom-start';
  offset: [number, number];
}

function Menu({ children, items, offset, className, placement, layout = 'header' }: MenuProps) {
  const [history, setHistory] = useState([{ data: items }]);

  useEffect(() => {
    setHistory([{ data: items }]);
  }, [items]);

  const current = history[history.length - 1];

  return (
    <div>
      <Tippy
        interactive
        placement={placement}
        offset={offset}
        // onHide={() => setHistory((prev) => prev.slice(0, prev.length - 1))}
        render={(attrs) => (
          <div tabIndex={-1} {...attrs}>
            {layout === 'header' ? (
              <Popper
                className={`flex flex-col item-start justify-center w-[210px] pt-[2px] bg-white rounded ${className}`}
              >
                <div className={`py-2 bg-[#242424]`}>
                  {current.data.map((item: any, idx: any) => {
                    return (
                      <MenuItem
                        key={idx}
                        data={item}
                        onClick={item.onClick}
                        className="text-white hover:text-[#0a0a0a]"
                      />
                    );
                  })}
                </div>
              </Popper>
            ) : (
              <Popper
                className={`flex flex-col item-start justify-center bg-white rounded ${className}`}
              >
                <div className={`py-2`}>
                  {current.data.map((item: any, idx: any) => {
                    const isParent = !!item.children;

                    return (
                      <MenuItem
                        key={idx}
                        data={item}
                        onClick={() => {
                          if (isParent) {
                            item.onClick();
                            setHistory((prev) => [...prev, item.children]);
                          } else {
                            item.onClick();
                          }
                        }}
                        className="text-[#4a4a4a] text-[0.875rem] hover:text-[#0a0a0a] leading-5 pr-12"
                      />
                    );
                  })}
                </div>
              </Popper>
            )}
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default Menu;
