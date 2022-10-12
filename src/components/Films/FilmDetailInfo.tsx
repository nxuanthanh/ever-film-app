import { Credits, DetailMovie, DetailTV } from 'models';

interface FilmDetailInfoProps {
  detail: DetailMovie | DetailTV;
  credits: Credits;
}

function FilmDetailInfo({ detail, credits }: FilmDetailInfoProps) {
  return (
    <>
      <div className="mb-6">
        <div className="flex">
          <span className="text-[#7a7a7a] uppercase mb-1 w-[120px]">Đạo diễn</span>
          <a
            href={`/person/`}
            className="text-[#dbdbdb] font-bold hover:underline cursor-pointer text-base"
          >
            {credits.crew.find((item) => item.known_for_department === 'Directing')?.name}
          </a>
        </div>
        <div className="flex">
          <span className="text-[#7a7a7a] uppercase mb-1 w-[120px]">Quốc gia</span>
          <a
            href={`/person/`}
            className="text-[#dbdbdb] font-bold hover:underline cursor-pointer text-base"
          >
            {detail.production_countries.length ? detail.production_countries[0].name : ''}
          </a>
        </div>
        <div className="flex">
          <span className="text-[#7a7a7a] uppercase mb-1 w-[120px]">Khởi chiếu</span>
          <a href={`/person/`} className="text-white font-normal cursor-text text-base">
            {new Intl.DateTimeFormat('en').format(
              new Date((detail as DetailMovie).release_date || (detail as DetailTV).first_air_date)
            )}
          </a>
        </div>
      </div>

      <div className="">
        <span className="text-[#b5b5b5] font-normal ">{detail.overview}</span>
      </div>
    </>
  );
}

export default FilmDetailInfo;
