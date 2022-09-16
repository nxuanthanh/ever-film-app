import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components';
import { Item } from 'models';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { getTrendingNow } from 'services';
import { resizeImage } from 'utils';

interface HotMoviesProps {}

function HotMovies({}: HotMoviesProps) {
  const [moviesTab, setMovieTab] = useState('day');

  const { data, isLoading, isError, error } = useQuery<Item[], Error>(['trending'], getTrendingNow);

  console.log(data);
  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  function handleOnTabClick(time: string) {
    setMovieTab(time);
  }

  // useEffect(() => {}, [moviesTab]);

  return (
    <div className="mt-[100px]">
      <div className="container">
        <h1 className="text-white text-[32px] mb-6 font-semibold text-center leading-[1.125]">
          Top phim được xem nhiều nhất
        </h1>
        <div className="w-full bg-[#0b1e30] flex items-center justify-center rounded mb-4 h-12">
          <button
            tabIndex={-1}
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="dashboard"
            onClick={() => handleOnTabClick('day')}
            className={`time-btn px-3 py-[6px] h-full w-40 text-[#ffffffb3] font-roboto font-medium font-500 uppercase text-[14px] ${
              moviesTab === 'day' ? 'border-b-[#3f51b5] border-b-2 text-[#3f51b5]' : ''
            }`}
          >
            Ngày
          </button>
          <button
            tabIndex={-1}
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="dashboard"
            onClick={() => handleOnTabClick('week')}
            className={`time-btn px-3 py-[6px] h-full w-40 text-[#ffffffb3] font-roboto font-medium font-500 uppercase text-[14px] ${
              moviesTab === 'week' ? 'border-b-[#3f51b5] border-b-2 text-[#3f51b5]' : ''
            }`}
          >
            Tuần
          </button>
          <button
            tabIndex={-1}
            type="button"
            role="tab"
            aria-selected="false"
            onClick={() => handleOnTabClick('month')}
            className={`time-btn px-3 py-[6px] h-full w-40 text-[#ffffffb3] font-roboto font-medium font-500 uppercase text-[14px] ${
              moviesTab === 'month' ? 'border-b-[#3f51b5] border-b-2 text-[#3f51b5]' : ''
            }`}
          >
            Tháng
          </button>
        </div>

        <div>
          <ul className="grid grid-cols-5 gap-x-4 gap-y-6 row-g">
            {data.map((item: Item, idx) => (
              <li key={idx} className="">
                <Link to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}>
                  <div className="flex flex-col justify-between shadow-sm pb-2 overflow-hidden hover:brightness-110 transition duration-300 relative group min-h-full">
                    <LazyLoadImage
                      src={resizeImage(item.poster_path)}
                      className="object-cover min-h-[371px]"
                      effect="blur"
                    />

                    <div>
                      <p className="text-left pt-[6px] whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 group-hover:text-white transition duration-300">
                        {item.title || item.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HotMovies;
