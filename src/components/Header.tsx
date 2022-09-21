import { Chat, Collection, Donate, Logout, User } from 'assets/icons';
import images from 'assets/images';
import { signOut } from 'firebase/auth';
import { useAppSelector } from 'hooks/useRedux';
import { auth } from 'models';
import { useEffect, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { IoMdSearch } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import Menu from './Popper/Menu';

interface HeaderProps {
  currentTab: string;
  onChange: Function;
}

function Header({ currentTab, onChange }: HeaderProps) {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleOnLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const headerItems = [
    { title: 'Tìm kiếm', tab: 'search', to: '/search', icon: <IoMdSearch size={20} /> },
    { title: 'Phim Hot', tab: '', to: '/top' },
    { title: 'Phim Lẻ', tab: '', to: '/type/movie' },
    { title: 'Phim Bộ', tab: '', to: '/type/show' },
    { title: 'Phim Mới', tab: '', to: '/browse' },
    { title: 'FAQ', tab: '', to: '/faq' },
  ];

  const userMenu = [
    { title: 'Tài khoản', to: '/settings', icon: <User />, onClick: () => console.log('first') },
    { title: 'Donate', to: '/donate', icon: <Donate />, onClick: handleOnLogout },
    {
      title: 'Bộ sưu tập',
      to: '/collection',
      icon: <Collection />,
      onClick: () => console.log('first'),
    },
    {
      title: 'Cặp câu song ngữ',
      to: '/pairs',
      icon: <Chat />,
      onClick: () => console.log('first'),
    },
    { title: 'Thoát', to: '/logout', icon: <Logout />, onClick: handleOnLogout },
  ];

  const handleOnScroll = () => {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      headerRef.current?.classList.add('navbar-bg');
    } else {
      headerRef.current?.classList.remove('navbar-bg');
    }
  };

  const handleOnHeaderItemClick = (tab: string) => {
    onChange(tab);
  };

  const renderHeaderItem = () => {
    return headerItems.map((item, idx) => (
      <NavLink
        to={item.to}
        key={idx}
        onClick={() => {
          handleOnHeaderItemClick(item.tab);
        }}
        className="flex items-center text-base font-normal text-white justify-center py-2 px-3 hover:bg-[#102c48] hover:text-[#428bca] active:bg-[#102c48] active:text-[#428bca] transition-all duration-200 cursor-pointer"
      >
        {item.icon && <span>{item.icon}</span>}
        <span>{item.title}</span>
      </NavLink>
    ));
  };

  const handleOnSignInClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <header
      className={` ${
        currentUser ? 'h-[52px]' : 'h-14'
      } fixed top-0 left-0 right-0 flex items-center justify-between z-10 transition-colors duration-500`}
      ref={headerRef}
    >
      <div className="flex">
        <div
          className={`${
            currentUser ? 'h-[52px]' : 'h-14'
          } w-fit py-2 px-3 flex items-center justify-center`}
        >
          <Link to="/" className="leading-3">
            <LazyLoadImage src={images.logo} effect="blur" alt="Logo" className="w-28 h-7" />
          </Link>
        </div>

        <div className="flex item-center justify-start">{renderHeaderItem()}</div>
      </div>

      <div>
        {currentUser ? (
          <Menu items={userMenu}>
            <div
              className={`${
                currentUser ? 'h-[52px]' : 'h-14'
              } hover:bg-[#102c48] hover:text-[#428bca] inline-flex items-center justify-center transition-all duration-200 text-white text-base font-normal py-2 pl-4 pr-3 cursor-pointer`}
            >
              <span>Thành Xuân</span>
              <span>
                <GoChevronDown size={20} className="text-[#428bca] mt-1 ml-[6px]" />
              </span>
            </div>
          </Menu>
        ) : (
          <div className={` ${currentUser ? 'h-[52px]' : 'h-14'} py-2 px-3`}>
            <Button
              to="login"
              title="Đăng nhâp"
              onClick={handleOnSignInClick}
              className="bg-secondary h-full"
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
