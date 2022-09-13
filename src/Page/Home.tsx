import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import images from 'assets/images';
import { Header, Loading } from 'components';
import { BannerSlider, SectionSlider } from 'components/Slider';
import { HomeMovies, Item } from 'models';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getDetailMovies, getHomeMovies } from 'services';
import Sidebar from 'components/Sidebar';

export function Home() {
  const [currentTab, setCurrentTab] = useState('movie');

  const { data, isLoading, isError, error } = useQuery<HomeMovies, Error>(
    ['home-movies'],
    getHomeMovies
  );

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    error: errorDetail,
  } = useQuery<any, Error>(
    ['detailMovies', data?.Trending],
    () => getDetailMovies(data?.Trending as Item[]),
    { enabled: !!data?.Trending }
  );

  if (isError) return <p>ERROR: ${error.message}</p>;

  if (isLoading) return <Loading />;

  if (isErrorDetail) return <p>ERROR: ${errorDetail.message}</p>;

  if (isLoadingDetail) return <Loading />;

  return (
    <div className="">
      {/* <Sidebar /> */}
      <Header />
      <div className="flex-grow border-x border-gray-darken min-h-screen">
        {/* <div className="flex justify-between items-center h-16">
          <div className="inline-flex gap-[24px] relative">
            <button
              onClick={() => setCurrentTab('movie')}
              className={`relative transition duration-300`}
            >
              <span
                className={`${
                  currentTab === 'movie' &&
                  'text-white font-medium after:absolute after:bottom-[-4px] after:left-0 after:bg-white after:h-[2px] after:w-full'
                }`}
              >
                Movie
              </span>
            </button>
            <button
              onClick={() => setCurrentTab('tv')}
              className={`relative transition duration-300`}
            >
              <span
                className={`${
                  currentTab === 'tv' &&
                  'text-white font-medium after:absolute after:bottom-[-4px] after:right-0 after:bg-white after:h-[2px] after:w-full'
                }`}
              >
                TV Show
              </span>
            </button>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-6 h-6 rounded-full border border- tw-flex-center cursor-pointer">
              <IoMdNotificationsOutline size={17} />
            </div>
            <LazyLoadImage
              src={images.userAvatar}
              alt="User avatar"
              className="w-7 h-7 rounded-full object-cover"
              effect="blur"
            />
          </div>
        </div> */}

        {/* <BannerSlider films={data.Trending} dataDetail={dataDetail} /> */}

        {/* <ul className="flex flex-col gap-10 mt-16">
          {Object.entries(data)
            .filter((section) => section[0] !== 'Trending')
            .map((section, index) => (
              <li key={index}>
                <h2 className="text-xl text-white font-medium tracking-wider mb-3">{section[0]}</h2>

                <SectionSlider films={section[1]} />
              </li>
            ))}
        </ul> */}
      </div>

      {/* <div className="shrink-0 max-w-[310px] w-full hidden md:block"></div> */}
    </div>
  );
}

export default Home;
