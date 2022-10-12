import { Credits, DetailMovie, DetailTV } from 'models';
import { Link } from 'react-router-dom';

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
          <Link
            to={`/person/`}
            className="text-[#dbdbdb] font-bold hover:underline cursor-pointer text-base"
          >
            {credits.crew.find((item) => item.known_for_department === 'Directing')?.name}
          </Link>
        </div>
        <div className="flex">
          <span className="text-[#7a7a7a] uppercase mb-1 w-[120px]">Quốc gia</span>
          <Link
            to={`/person/`}
            className="text-[#dbdbdb] font-bold hover:underline cursor-pointer text-base"
          >
            {detail.production_countries.length ? detail.production_countries[0].name : ''}
          </Link>
        </div>
        <div className="flex">
          <span className="text-[#7a7a7a] uppercase mb-1 w-[120px]">Khởi chiếu</span>
          <Link to={`/person/`} className="text-white font-normal cursor-text text-base">
            {new Intl.DateTimeFormat('en').format(
              new Date((detail as DetailMovie).release_date || (detail as DetailTV).first_air_date)
            )}
          </Link>
        </div>
      </div>

      <div className="">
        <span className="text-[#b5b5b5] font-normal ">{detail.overview}</span>
      </div>
    </>
  );
}

export default FilmDetailInfo;
