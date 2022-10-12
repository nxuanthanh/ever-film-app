import { useQuery } from '@tanstack/react-query';
import { FilmItem, Loading } from 'components/common';
import { ListLayoutFilmItem } from 'components/Films';
import { FilterSection } from 'features/Filter';
import { Pagination } from 'layouts';

import { ConfigType, Item, ItemsPage } from 'models';
import { useState } from 'react';
import { getFilterTV } from 'services';

function SeriesMovie() {
  const [sortLayout, setSortLayout] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [config, setConfig] = useState<ConfigType>({});

  const { data, isLoading, isError, error } = useQuery<ItemsPage, Error>(
    ['filter-tv', config, currentPage],
    () => getFilterTV(currentPage, config)
  );
  console.log('tv', data);
  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mt-[100px] mb-12">
        <div className="container">
          <h1 className="text-white text-[2rem] font-semibold leading-[1.125]">Phim bộ</h1>
          <div className="mb-3 mt-3">
            <FilterSection
              setConfig={setConfig}
              setSortLayout={setSortLayout}
              sortLayout={sortLayout}
            />
          </div>

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

          <Pagination
            total_pages={data.total_pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default SeriesMovie;
