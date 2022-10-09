import { useQuery } from '@tanstack/react-query';
import { Imdb } from 'assets/icons';
import { Button, Loading } from 'components/common';
import { FilterSection } from 'features/Filter';
import { useAppSelector } from 'hooks';
import { Pagination } from 'layouts';

import { Item, ItemsPage } from 'models';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { getFilterTV } from 'services';
import { resizeImage } from 'utils';

function SeriesMovie() {
  const [sortLayout, setSortLayout] = useState('grid');
  const filterConfig = useAppSelector((state) => state.filter.filterConfig);

  // console.log('filmFilter', filterConfig);
  const { data, isLoading, isError, error } = useQuery<ItemsPage, Error>(
    ['filter-tv', filterConfig],
    () => getFilterTV(1, filterConfig)
  );

  console.log(data);
  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  // console.log(data);

  return (
    <div>
      <div className="mt-[100px] mb-12">
        <div className="container">
          <h1 className="text-white text-[2rem] font-semibold leading-[1.125]">Phim bộ</h1>
          <div className="mb-3 mt-3">
            <FilterSection setSortLayout={setSortLayout} sortLayout={sortLayout} />
          </div>

          {sortLayout === 'grid' ? (
            <ul className="grid grid-cols-5 gap-x-4 gap-y-6 row-g">
              {data.results.map((item: Item, idx) => (
                <li key={idx} className="">
                  <Link to={`/tv/${item.id}`}>
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
          ) : (
            <ul className="">
              {data.results.map((item: Item, idx) => (
                <>
                  <li key={idx} className="w-full block">
                    <div className="flex shadow-sm pb-2 overflow-hidden hover:brightness-110 transition duration-300 relative min-h-full">
                      <Link to={`/tv/${item.id}`}>
                        <LazyLoadImage
                          src={resizeImage(item.poster_path)}
                          className="object-cover w-[150px] mr-8"
                          effect="blur"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3>
                              <Link
                                to={`/tv/${item.id}`}
                                className="text-left pt-[6px] whitespace-nowrap overflow-hidden text-ellipsis text-base text-[#dbdbdb]"
                              >
                                {item.title || item.name}
                              </Link>
                            </h3>
                            <h3>
                              <Link
                                to={`/tv/${item.id}`}
                                className="text-left pt-[6px] whitespace-nowrap overflow-hidden text-ellipsis text-base text-[#dbdbdb]"
                              >
                                {`${item.title || item.name} (${new Date(
                                  item?.first_air_date as string
                                ).getFullYear()})`}
                              </Link>
                            </h3>
                          </div>

                          <div className="flex flex-col items-end">
                            <p>96 phút</p>
                            <p>
                              <Link
                                to={`country/${item.origin_country && item.origin_country[0]}`}
                                className="text-left pt-[6px] whitespace-nowrap overflow-hidden text-ellipsis text-base text-[#dbdbdb]"
                              >
                                {item.origin_country && item.origin_country[0]}
                              </Link>
                            </p>
                          </div>
                        </div>
                        <div>{item.overview}</div>
                        <div className="flex justify-between">
                          <div>
                            {item.genre_ids.map((genre, idx) => (
                              <Button
                                className="bg-transparent hover:bg-white hover:text-[#485fc7] text-white text-xs"
                                title={`genre.name`}
                                key={idx}
                                to={`/genre/`}
                              />
                            ))}
                          </div>
                          <div className="mb-4 flex items-center h-[35.2px]">
                            <span className="w-[40px] mr-[0.6rem] ">
                              <Imdb />
                            </span>
                            <div className="font-bold  text-white">
                              {item.vote_average.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <hr className="border-t border-t-[#dbdbdb80] my-4" />
                </>
              ))}
            </ul>
          )}

          <Pagination total_pages={data.total_pages} page={0} results={[]} total_results={0} />
        </div>
      </div>
    </div>
  );
}

export default SeriesMovie;
