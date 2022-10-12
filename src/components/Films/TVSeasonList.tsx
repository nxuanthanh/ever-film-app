import { DetailTV } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useParams } from 'react-router-dom';
import { resizeImage } from 'utils';

type TVSeasonListProps = { detail: DetailTV };

function TVSeasonList({ detail }: TVSeasonListProps) {
  const { filmId } = useParams();
  return (
    <>
      <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">Season</h3>
      <div>
        <ul className="flex flex-col">
          {detail.seasons
            .filter((season) => season.name.startsWith('Season'))
            .map((season, index) => (
              <li key={season.id}>
                {index > 0 && (
                  <>
                    <div className="border-t-[1px] border-t-[#dbdbdb80] mt-4 pb-4"></div>
                  </>
                )}
                <div className="flex gap-4 items-start">
                  <Link
                    to={`/tv/${filmId}/season/${season.season_number}`}
                    className="shrink-0 max-w-[130px] w-full cursor-pointer"
                  >
                    <LazyLoadImage
                      src={resizeImage(season.poster_path)}
                      alt=""
                      effect="opacity"
                      className="object-cover w-full h-full"
                    />
                  </Link>
                  <div className="flex-grow">
                    <Link to={`/tv/${filmId}/season/${season.season_number}`}>
                      <p className="mb-[0.7em] text-Link hover:text-hover-link font-normal font-merriweather cursor-pointer leading-[18px]">
                        {season.name.replace('Season', 'Phần')}
                      </p>
                    </Link>
                    <p className="text-base">
                      <span>{Number(new Date(season.air_date).getFullYear())}</span>
                      <span> - </span>
                      <span>{season.episode_count} Tập</span>
                    </p>
                    <p className="text-base leading-5">
                      {`Phần ${
                        season.season_number
                      } của Game of Thrones được khởi chiếu vào ngày ${new Intl.DateTimeFormat(
                        'vi'
                      ).format(new Date(season.air_date))}`}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default TVSeasonList;
