import { Chat, Collection, Donate, Logout, User } from 'assets/icons';
import images from 'assets/images';
import Menu from 'components/Popper/Menu';
import config from 'config';
import { signOut } from 'firebase/auth';
import { useAppSelector } from 'hooks/useRedux';
import { auth } from 'models';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GoChevronDown } from 'react-icons/go';
import { IoMdSearch } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';

function Header() {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
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

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const headerItems = [
    { title: `${t('header.headerList.search')}`, to: '/search', icon: <IoMdSearch size={20} /> },
    { title: `${t('header.headerList.hot_film')}`, to: '/top' },
    { title: `${t('header.headerList.movie')}`, to: '/type/movie' },
    { title: `${t('header.headerList.series_movie')}`, to: '/type/show' },
    { title: `${t('header.headerList.new_movie')}`, to: '/browse' },
    { title: `${t('header.headerList.faq')}`, to: '/faq' },
  ];

  const userMenu = [
    {
      title: `${t('header.headerMenuList.account')}`,
      to: config.routes.profile,
      icon: <User />,
      onClick: () => navigate(config.routes.profile),
    },
    {
      title: `${t('header.headerMenuList.language')}`,
      icon: <Chat />,
      children: {
        data: [
          { title: 'Tiếng Việt', onClick: () => handleChangeLanguage('vi') },
          { title: 'Tiếng Anh', onClick: () => handleChangeLanguage('en') },
        ],
      },
      onClick: () => {},
    },
    {
      title: `${t('header.headerMenuList.donate')}`,
      to: config.routes.donate,
      icon: <Donate />,
      onClick: () => navigate(config.routes.donate),
    },
    {
      title: `${t('header.headerMenuList.collection')}`,
      to: config.routes.bookmarked,
      icon: <Collection />,
      onClick: () => navigate(config.routes.bookmarked),
    },

    { title: `${t('header.headerMenuList.exit')}`, icon: <Logout />, onClick: handleOnLogout },
  ];

  const handleOnScroll = () => {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      headerRef.current?.classList.add('navbar-bg');
    } else {
      headerRef.current?.classList.remove('navbar-bg');
    }
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

        <div className="flex item-center justify-start">
          {headerItems.map((item, idx) => (
            <NavLink
              to={item.to}
              key={idx}
              className="flex items-center text-base font-normal text-white justify-center py-2 px-3 hover:bg-[#102c48] hover:text-Link active:bg-[#102c48] active:text-Link transition-all duration-200 cursor-pointer"
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
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
