import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components/common';
import { FilterSection } from 'features/Filter';
import { Item } from 'models';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { getMovieUpcoming } from 'services';
import { resizeImage } from 'utils';

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

export default NewMovies;
