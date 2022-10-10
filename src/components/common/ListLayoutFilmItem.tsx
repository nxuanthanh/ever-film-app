import { Imdb } from 'assets/icons';
import { Item } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { convertGenreIdToGenreName, resizeImage } from 'utils';
import Button from './Button';

interface ListLayoutFilmItemProps {
  film: Item;
}

function ListLayoutFilmItem({ film }: ListLayoutFilmItemProps) {
  return (
    <>
      <hr className="border-t border-t-[#dbdbdb80] mt-4 pb-4" />
      <div className="flex shadow-sm overflow-hidden hover:brightness-110 transition duration-300 relative min-h-full">
        <Link to={`/tv/${film.id}`}>
          <LazyLoadImage
            src={resizeImage(film.poster_path)}
            className="object-cover w-[150px] mr-8"
            effect="blur"
          />
        </Link>
        <div className="flex-1 -mt-3">
          <div className="flex justify-between -ml-3 mb-3">
            <div className="p-3">
              <h3>
                <Link
                  to={`/tv/${film.id}`}
                  className="text-left whitespace-nowrap overflow-hidden text-ellipsis font-bold text-[#dbdbdb] hover:underline"
                >
                  {film.title || film.name}
                </Link>
              </h3>
              <h3>
                <Link
                  to={`/tv/${film.id}`}
                  className="text-left whitespace-nowrap overflow-hidden text-ellipsis text-base text-[#7a7a7a]"
                >
                  <span className="hover:underline">{film.title || film.name} </span>
                </Link>
                <Link to={`/year/${new Date(film?.first_air_date as string).getFullYear()}`}>
                  (
                  <span className="hover:underline text-[#b5b5b5]">
                    {new Date(film?.first_air_date as string).getFullYear() ||
                      new Date(film?.release_date as string).getFullYear()}
                  </span>
                  )
                </Link>
              </h3>
            </div>

            <div className="flex flex-col items-end p-3">
              <p>96 phút</p>
              <p>
                <Link
                  to={`country/${film.origin_country && film.origin_country[0]}`}
                  className="hover:underline pt-[6px] whitespace-nowrap overflow-hidden text-ellipsis text-base text-[#dbdbdb]"
                >
                  {film.origin_country && film.origin_country[0]}
                </Link>
              </p>
            </div>
          </div>
          <div className="mb-4 tw-multiline-ellipsis-2 leading-8">{film.overview}</div>
          <div className="flex justify-between -ml-3 -mt-3">
            <div className="p-3">
              {film.genre_ids.map((genre, idx) => (
                <Button
                  className="bg-transparent text-[#dbdbdb] text-xs py-0 px-[10px] h-6 border-none bg-[#363636] hover:underline"
                  title={convertGenreIdToGenreName(genre)}
                  key={idx}
                  to={`/genre/`}
                />
              ))}
            </div>
            <div className="flex items-center p-3">
              <span className="w-[40px] mr-[0.6rem] ">
                <Imdb />
              </span>
              <div className="font-bold text-[#b5b5b5]">{film.vote_average.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListLayoutFilmItem;
