import { DetailSeason } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useParams } from 'react-router-dom';
import { resizeImage } from 'utils';

type TVSeasonEpisodesListProps = { detailSeason: DetailSeason };

function TVSeasonEpisodesList({ detailSeason }: TVSeasonEpisodesListProps) {
  const { filmId } = useParams();

  return (
    <>
      <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">EPISODE</h3>
      <div>
        <ul className="flex flex-col">
          {detailSeason.episodes.map((season, index) => (
            <li key={season.id}>
              {index > 0 && <div className="border-t-[1px] border-t-[#dbdbdb80] mt-4 pb-4"></div>}
              <div className="flex gap-4 items-start">
                <Link
                  to={`/tv/${filmId}/season/${season.season_number}`}
                  className="shrink-0 max-w-[154px] w-full"
                >
                  <LazyLoadImage
                    src={resizeImage(season.still_path)}
                    alt=""
                    effect="opacity"
                    className="object-cover w-full h-full cursor-default"
                  />
                </Link>
                <div className="flex-grow">
                  <p className="mb-[0.7em] text-white font-normal font-merriweather leading-[18px]">
                    {`Tập ${index + 1}: ${season.name}`}
                  </p>
                  <p className="text-base">
                    <span>
                      {new Intl.DateTimeFormat('en').format(Number(new Date(season.air_date)))}
                    </span>
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

export default TVSeasonEpisodesList;
