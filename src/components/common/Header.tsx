import { Chat, Collection, Donate, Logout, User } from 'assets/icons';
import images from 'assets/images';
import Menu from 'components/Popper/Menu';
import config from 'config';
import { signOut } from 'firebase/auth';
import { useAppSelector } from 'hooks/useRedux';
import { auth } from 'models';
import { useEffect, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { IoMdSearch } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';

function Header() {
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
    { title: 'Tìm kiếm', to: '/search', icon: <IoMdSearch size={20} /> },
    { title: 'Phim Hot', to: '/top' },
    { title: 'Phim Lẻ', to: '/type/movie' },
    { title: 'Phim Bộ', to: '/type/show' },
    { title: 'Phim Mới', to: '/browse' },
    { title: 'FAQ', to: '/faq' },
  ];

  const userMenu = [
    { title: 'Tài khoản', to: '/settings', icon: <User />, onClick: () => navigate('/settings') },
    { title: 'Donate', to: '/donate', icon: <Donate />, onClick: () => navigate('/donate') },
    {
      title: 'Bộ sưu tập',
      to: `${config.routes.bookmarked}`,
      icon: <Collection />,
      onClick: () => navigate(config.routes.bookmarked),
    },
    {
      title: 'Cặp câu song ngữ',
      to: '/pairs',
      icon: <Chat />,
      onClick: () => navigate('/pairs'),
    },
    { title: 'Thoát', icon: <Logout />, onClick: handleOnLogout },
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
        className="flex items-center text-base font-normal text-white justify-center py-2 px-3 hover:bg-[#102c48] hover:text-Link active:bg-[#102c48] active:text-Link transition-all duration-200 cursor-pointer"
      >
        {item.icon && <span>{item.icon}</span>}
        <span>{item.title}</span>
      </NavLink>
    ));
  };

  const handleOnSignInClick = () => {
    navigate(config.routes.login);
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
          <Menu items={userMenu} placement={'bottom-end'} offset={[0, 0]}>
            <Button
              title={currentUser.displayName || ''}
              iconRight={<GoChevronDown size={20} className="text-Link mt-1 ml-[6px]" />}
              className="h-[52px] hover:bg-[#102c48] hover:text-Link rounded-none pr-3 border-transparent"
            />
          </Menu>
        ) : (
          <div className={`h-14 py-2 px-3`}>
            <Button
              to={config.routes.login}
              title="Đăng nhâp"
              onClick={handleOnSignInClick}
              className="bg-secondary h-full border-transparent"
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
