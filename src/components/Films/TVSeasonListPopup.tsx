import { DetailTV } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useParams } from 'react-router-dom';
import { resizeImage } from 'utils';

type TVSeasonListPopupProps = { detailTV: DetailTV };

function TVSeasonListPopup({ detailTV }: TVSeasonListPopupProps) {
  const { filmId } = useParams();

  return (
    <>
      <ul className="flex flex-col">
        {detailTV.seasons
          .filter((season) => season.name.startsWith('Season'))
          .map((season, index) => (
            <li key={season.id}>
              {index > 0 && <div className="border-t-[1px] border-t-[#dbdbdb80] mt-4 pb-4"></div>}
              <div className="flex gap-4 items-start">
                <Link
                  to={`/tv/${filmId}/season/${season.season_number}`}
                  className="shrink-0 max-w-[130px] w-full"
                >
                  <LazyLoadImage
                    src={resizeImage(season.poster_path)}
                    alt=""
                    effect="opacity"
                    className="object-cover w-full h-full"
                  />
                </Link>
                <div className="flex-grow">
                  <p className="text-[#b5b5b5] font-normal">
                    <Link
                      to={`/tv/${filmId}/season/${season.season_number}`}
                      className="text-Link hover:text-hover-link cursor-pointer"
                    >
                      {season.name.replace('Season', 'Phần')}{' '}
                    </Link>
                    <span>({Number(new Date(season.air_date).getFullYear())})</span>
                  </p>
                  <p className="text-base">{season.episode_count} tập</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default TVSeasonListPopup;
