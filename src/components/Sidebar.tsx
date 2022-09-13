import images from 'assets/images';
import { AiOutlineHome } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineExplore } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  return (
    <div className="shrink-0 max-w-[260px] w-[90vw]">
      <div className="h-16 flex items-center justify-center">
        <Link to="/" className="leading-3">
          <LazyLoadImage
            src={images.logo}
            effect="blur"
            alt="Logo"
            className="w-[132px] h-[33px]"
          />
        </Link>
      </div>

      <div className="pl-8">
        <div className="text-white text-lg font-medium mt12">MENU</div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
          <Link
            to="/"
            className={`flex gap-6 items-center ${
              location.pathname === '/' && 'text-primary border-r-4 border-primary font-medium'
            }`}
          >
            <AiOutlineHome size={25} />
            <p>Home</p>
          </Link>

          <Link
            to="/explore"
            className={`flex gap-6 items-center ${
              location.pathname === '/explore' &&
              'text-primary border-r-4 border-primary font-medium'
            }`}
          >
            <MdOutlineExplore size={25} />
            <p>Explore</p>
          </Link>
        </div>

        <div className="text-white text-lg font-medium mt-12">GENERAL</div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
          <Link
            to="/settings"
            className={`flex gap-6 items-center  ${
              location.pathname === '/settings' &&
              'text-primary border-r-4 border-primary font-medium'
            }`}
          >
            <FiSettings size={25} />
            <p>Settings</p>
          </Link>

          <Link
            to={`/login&redirect=${encodeURIComponent(location.pathname)}`}
            className="flex gap-6 items-center"
          >
            <HiOutlineLogin size={25} />
            <p>Login</p>
          </Link>

          <button className="flex gap-5 items-center">
            <HiOutlineLogout size={30} />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
