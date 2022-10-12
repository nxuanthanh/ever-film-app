import { useQuery } from '@tanstack/react-query';
import { Error, FilmItem, Loading } from 'components/common';
import { Item } from 'models';
import { useState } from 'react';
import { getTrendingNow } from 'services';

// interface HotMoviesProps {}

function HotMovies() {
  const [moviesTab, setMovieTab] = useState('day');

  const { data, isLoading, isError } = useQuery<Item[], Error>(['trending', moviesTab], () =>
    getTrendingNow(moviesTab)
  );

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  function handleOnTabClick(time: string) {
    setMovieTab(time);
  }

  // useEffect(() => {}, [moviesTab]);

  return (
    <div className="mt-[100px] mb-12">
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
          {/* <button
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
          </button> */}
        </div>

        <div>
          <ul className="grid grid-cols-5 gap-x-4 gap-y-6 row-g">
            {data.map((item: Item, idx) => (
              <li key={idx} className="">
                <FilmItem film={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HotMovies;
