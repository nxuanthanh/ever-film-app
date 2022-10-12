import { Imdb } from 'assets/icons';
import { DetailMovie, DetailTV } from 'models';
import { Link } from 'react-router-dom';

type FilmHeaderProps = { detail: DetailMovie | DetailTV };

function FilmHeader({ detail }: FilmHeaderProps) {
  const detailMovie = detail as DetailMovie;
  const detailTV = detail as DetailTV;

  return (
    <>
      <h1 className="font-merriweather text-[2.5rem] leading-[1.125] mb-[0.7em] text-white font-normal">
        {detailMovie.original_title || detailTV.original_name}
      </h1>
      <h2 className="-mt-5 mb-[1.5em] leading-[1.25] text-2xl text-[#b5b5b5]">
        <span>
          {detailMovie.original_title || detailTV.original_name} (
          <Link
            to={`/year/${new Date(
              detailMovie.release_date || detailTV.first_air_date
            ).getFullYear()}`}
            className="text-Link cursor-pointer hover:text-hover-link transition-all duration-150"
          >
            {new Date(detailMovie.release_date || detailTV.first_air_date).getFullYear()}
          </Link>
          )
        </span>
      </h2>
      <div className="mb-4 text-white">
        {detailMovie.release_date && (
          <>
            <span className="text-base mr-[18px]">{`${Math.trunc(detailMovie.runtime / 60)} giờ ${
              detailMovie.runtime % 60
            } phút`}</span>
            <span className="font-bold text-xs text-white px-[9px] bg-[#363636] h-6 inline-flex items-center rounded cursor-help">
              R
            </span>
          </>
        )}
      </div>
      <div className="mb-4 flex items-center h-[35.2px]">
        <span className="w-[40px] mr-[0.6rem] ">
          <Imdb />
        </span>
        <div className="font-bold  text-white">{detail.vote_average.toFixed(1)}</div>
      </div>
    </>
  );
}

export default FilmHeader;
