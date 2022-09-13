import Tippy from '@tippyjs/react/headless';
import images from 'assets/images';
import { IoMdSearch } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Button from './Button';

function Header() {
  let isUser: boolean = true;

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between z-10 h-14">
      <div className="flex">
        <div className="h-14 w-fit py-2 px-3 flex items-center justify-center">
          <Link to="/" className="leading-3">
            <LazyLoadImage src={images.logo} effect="blur" alt="Logo" className="w-28 h-7" />
          </Link>
        </div>

        <div className="flex item-center justify-start">
          <div className="flex items-center text-base font-normal text-white justify-center py-2 px-3">
            <IoMdSearch size={20} />
            <span>Tìm kiếm</span>
          </div>
          <div className="flex items-center text-base font-normal text-white justify-center py-2 px-3">
            <span>Phim Hot</span>
          </div>
          <div className="flex items-center text-base font-normal text-white justify-center py-2 px-3">
            <span>Phim Lẻ</span>
          </div>
          <div className="flex items-center text-base font-normal text-white justify-center py-2 px-3">
            <span>Phim Bộ</span>
          </div>
          <div className="flex items-center text-base font-normal text-white justify-center py-2 px-3">
            <span>Phim Mới</span>
          </div>
          <div className="flex items-center text-base font-normal text-white justify-center py-2 px-3">
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
              className="transition h-14"
              iconRight={<MdKeyboardArrowDown size={20} />}
            />
          </Tippy>
        ) : (
          <div className="py-2 px-3 h-14">
            <Button
              title="Đăng nhâp"
              onClick={() => console.log('first')}
              className="bg-secondary h-full"
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
