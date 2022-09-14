import { Chat, Collection, Donate, Logout, User } from 'assets/icons';
import images from 'assets/images';
import { useEffect, useRef } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { GoChevronDown } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import Menu from './Popper/Menu';

function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  let isUser: boolean = true;

  const headerItems = [
    { title: 'Tìm kiếm', to: '/search', icon: <IoMdSearch size={20} /> },
    { title: 'Phim Hot', to: '/top' },
    { title: 'Phim Lẻ', to: '/type/movie' },
    { title: 'Phim Bộ', to: '/type/show' },
    { title: 'Phim Mới', to: '/browse' },
    { title: 'FAQ', to: '/faq' },
  ];

  const userMenu = [
    { title: 'Tài khoản', to: '/settings', icon: <User /> },
    { title: 'Donate', to: '/donate', icon: <Donate /> },
    { title: 'Bộ sưu tập', to: '/collection', icon: <Collection /> },
    { title: 'Cặp câu song ngữ', to: '/pairs', icon: <Chat /> },
    { title: 'Thoát', to: '/logout', icon: <Logout /> },
  ];

  const handleOnScroll = () => {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      headerRef.current?.classList.add('navbar-bg');
    } else {
      headerRef.current?.classList.remove('navbar-bg');
    }
  };

  const renderHeaderItem = () => {
    return headerItems.map((item, idx) => (
      <NavLink
        to={item.to}
        key={idx}
        className="flex items-center text-base font-normal text-white justify-center py-2 px-3 hover:bg-[#102c48] hover:text-[#428bca] active:bg-[#102c48] active:text-[#428bca] transition-all duration-200 cursor-pointer"
      >
        {item.icon && <span>{item.icon}</span>}
        <span>{item.title}</span>
      </NavLink>
    ));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center justify-between z-10 h-14 transition-colors duration-500"
      ref={headerRef}
    >
      <div className="flex">
        <div className="h-14 w-fit py-2 px-3 flex items-center justify-center">
          <Link to="/" className="leading-3">
            <LazyLoadImage src={images.logo} effect="blur" alt="Logo" className="w-28 h-7" />
          </Link>
        </div>

        <div className="flex item-center justify-start">{renderHeaderItem()}</div>
      </div>

      <div>
        {isUser ? (
          <Menu items={userMenu}>
            <div className="h-14 hover:bg-[#102c48] hover:text-[#428bca] inline-flex items-center justify-center transition-all duration-200 text-white text-base font-normal py-2 pl-4 pr-3 cursor-pointer">
              <span>Thành Xuân</span>
              <span>
                <GoChevronDown size={20} className="text-[#428bca] mt-1 ml-[6px]" />
              </span>
            </div>
          </Menu>
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
