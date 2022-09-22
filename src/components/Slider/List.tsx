import { DetailSeason, DetailTV } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { resizeImage } from 'utils';

function List(data: DetailSeason[]) {
  return (
    <div>
      <ul className="max-h-[400px] overflow-auto flex flex-col gap-10">
        {data.map((season) => (
          <li key={season.id}>
            <div className="flex gap-3 items-center">
              <div className="shrink-0 max-w-[120px] w-full">
                <LazyLoadImage
                  src={resizeImage(season.poster_path, 'w92')}
                  alt=""
                  effect="opacity"
                  className="object-cover w-[120px] h-full rounded-md"
                />
              </div>
              <div className="flex-grow">
                <div className="mb-3 flex justify-between">
                  <p className="text-white font-medium">{season.name}</p>
                </div>
                {/* <ReadMore limitTextLength={130} className="mb-2 inline-block">
                  {season.overview}
                </ReadMore> */}
                <p className="text-base">{season.air_date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
