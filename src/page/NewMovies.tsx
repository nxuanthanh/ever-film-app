import { useQuery } from '@tanstack/react-query';
import { Error, FilmItem, Loading } from 'components/common';
import { ListLayoutFilmItem } from 'components/Films';
import { FilterSection } from 'features/Filter';
import { Pagination } from 'layouts';
import { ConfigType, Item } from 'models';
import { useState } from 'react';
import { getMovieUpcoming } from 'services';

// interface NewMoviesProps {}

function NewMovies() {
  const [sortLayout, setSortLayout] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [config, setConfig] = useState<ConfigType>({});
  const { data, isLoading, isError } = useQuery<Item[], Error>(['upcoming'], getMovieUpcoming);

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="mt-[100px] mb-12">
      <div className="container">
        <div className="mb-3 mt-3">
          <FilterSection
            setConfig={setConfig}
            setSortLayout={setSortLayout}
            sortLayout={sortLayout}
          />
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

        <Pagination total_pages={20} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default NewMovies;
