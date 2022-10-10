import { useQuery } from '@tanstack/react-query';
import { FilmItem, ListLayoutFilmItem, Loading } from 'components/common';
import { FilterSection } from 'features/Filter';
import { useAppSelector } from 'hooks';
import { Pagination } from 'layouts';
import { Item, ItemsPage } from 'models';
import { useState } from 'react';
import { getFilterMovie } from 'services';

// interface MoviesProps {}

function Movies() {
  const [sortLayout, setSortLayout] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const filterConfig = useAppSelector((state) => state.filter.filterConfig);

  // console.log('filmFilter', filterConfig);
  const { data, isLoading, isError, error } = useQuery<ItemsPage, Error>(
    ['filter-movie', filterConfig, currentPage],
    () => getFilterMovie(currentPage, filterConfig)
  );

  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  return (
    <div className="mt-[100px] mb-12">
      <div className="container">
        <h1 className="text-white text-[2rem] font-semibold leading-[1.125]">Phim lẻ</h1>
        <div className="mb-3 mt-3">
          <FilterSection setSortLayout={setSortLayout} sortLayout={sortLayout} />
        </div>

        <div>
          {sortLayout === 'grid' ? (
            <ul className="grid grid-cols-5 gap-x-4 gap-y-6 row-g">
              {data.results.map((item: Item, idx) => (
                <li key={idx}>
                  <FilmItem film={item} />
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {data.results.map((item: Item, idx) => (
                <li key={idx}>
                  <ListLayoutFilmItem film={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <Pagination
          total_pages={data.total_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Movies;
