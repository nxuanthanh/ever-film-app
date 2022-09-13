import images from 'assets/images';
import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import Button from './Button';
import { MdKeyboardArrowDown } from 'react-icons/md';

function Header() {
  let isUser: boolean = true;

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between z-10 h-[52px]">
      <div className="flex">
        <div className="h-[52px] w-fit py-2 px-3 flex items-center justify-center">
          <Link to="/" className="leading-3">
            <LazyLoadImage src={images.logo} effect="blur" alt="Logo" className="w-28 h-7" />
          </Link>
        </div>

        <div className="flex item-center justify-start">
          <div className="flex items-center font-medium text-white justify-center py-2 px-3 gap-[2px]">
            <IoMdSearch size={20} />
            <span>Search</span>
          </div>
          <div className="flex items-center font-medium text-white justify-center py-2 px-3">
            <span>Phim Hot</span>
          </div>
          <div className="flex items-center font-medium text-white justify-center py-2 px-3">
            <span>Phim Lẻ</span>
          </div>
          <div className="flex items-center font-medium text-white justify-center py-2 px-3">
            <span>Phim Bộ</span>
          </div>
          <div className="flex items-center font-medium text-white justify-center py-2 px-3">
            <span>Phim Mới</span>
          </div>
          <div className="flex items-center font-medium text-white justify-center py-2 px-3">
            <span>FAQ</span>
          </div>
        </div>
      </div>

      <div>
        {isUser ? (
          <Tippy
            interactive
            // hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
              <div className="box" tabIndex={-1} {...attrs}>
                My tippy box
              </div>
            )}
          >
            <Button
              title="Account name"
              onClick={() => console.log('first')}
              className="transition"
              iconRight={<MdKeyboardArrowDown size={20} />}
            />
          </Tippy>
        ) : (
          <div className="py-2 px-3">
            <Button
              title="Đăng nhâp"
              onClick={() => console.log('first')}
              className="bg-secondary"
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
