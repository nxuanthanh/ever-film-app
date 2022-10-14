import { Item } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { resizeImage } from 'utils';

interface FilmItemProps {
  film: Item;
  className?: string;
}

function FilmItem({ film, className }: FilmItemProps) {
  return (
    <div>
      <Link
        to={
          film.original_name || film.media_type === 'tv'
            ? `/tv/${film.id}`
            : film.original_title || film.media_type === 'movie'
            ? `/movie/${film.id}`
            : '/'
        }
      >
        <div className="shadow-sm pb-2 overflow-hidden transition duration-300 relative group">
          <LazyLoadImage
            src={resizeImage(film.poster_path)}
            className="object-cover"
            effect="blur"
          />
          <div>
            <p
              className={`text-left whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 group-hover:text-white transition duration-300 ${className}`}
            >
              {film.title || film.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FilmItem;
