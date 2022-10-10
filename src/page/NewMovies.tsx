import { useQuery } from '@tanstack/react-query';
import { FilmItem, ListLayoutFilmItem, Loading } from 'components/common';
import { FilterSection } from 'features/Filter';
import { Pagination } from 'layouts';
import { Item } from 'models';
import { useState } from 'react';
import { getMovieUpcoming } from 'services';

// interface NewMoviesProps {}

function NewMovies() {
  const [sortLayout, setSortLayout] = useState('grid');
  const { data, isLoading, isError, error } = useQuery<Item[], Error>(
    ['upcoming'],
    getMovieUpcoming
  );

  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  return (
    <div className="mt-[100px] mb-12">
      <div className="container">
        <div className="mb-3 mt-3">
          <FilterSection setSortLayout={setSortLayout} sortLayout={sortLayout} />
        </div>

        <div>
          {sortLayout === 'grid' ? (
            <ul className="grid grid-cols-5 gap-x-4 gap-y-6 row-g">
              {data.map((item: Item, idx) => (
                <li key={idx}>
                  <FilmItem film={item} />
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {data.map((item: Item, idx) => (
                <li key={idx}>
                  <ListLayoutFilmItem film={item} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* <Pagination
            total_pages={data.total_pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}
      </div>
    </div>
  );
}

export default NewMovies;
