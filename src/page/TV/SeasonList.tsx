import { DetailSeason } from 'models';

function SeasonLists(data: DetailSeason[]) {
  return (
    <div className="max-h-[calc(100vh-40px)] min-w-[400px] bg-white">
      <h4>Chọn một phần để xem:</h4>
      <ul className="flex flex-col">
        {data.map((season, index) => (
          <li key={season.id}>
            {index > 0 && (
              <>
                <div className="border-t-[1px] border-t-[#dbdbdb80] mt-4 pb-4"></div>
              </>
            )}
            <div className="flex gap-4 items-start">
              {/* <Link
                to={`/tv/${tv_id}/season/${season.season_number}`}
                className="shrink-0 max-w-[154px] w-full"
              >
                <LazyLoadImage
                  src={resizeImage(season.still_path)}
                  alt=""
                  effect="opacity"
                  className="object-cover w-full h-full cursor-default"
                />
              </Link> */}
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
  );
}

export default SeasonLists;
