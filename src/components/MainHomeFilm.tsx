import { HomeFilms } from 'models';
import { FilmItem } from './common';
import SectionSlider from './Slider/SectionSlider';

interface MainHomeFilmsProps {
  data: HomeFilms;
}

function MainHomeFilms({ data }: MainHomeFilmsProps) {
  return (
    <>
      <ul className="flex flex-col gap-8">
        {Object.entries(data).map((section, index) => (
          <li key={index}>
            <h2 className="text-2xl font-oswald pb-[3.2px] border-b border-solid border-[#1b3c5d] font-medium tracking-wider text-[#b1a21e] uppercase">
              <span>{section[0]}</span>
            </h2>
            {section[0] === 'PHIM ĐỀ CỬ' ? (
              <SectionSlider data={section[1]} />
            ) : (
              <ul className="w-full grid grid-cols-5 gap-4 mt-2">
                {section[1].slice(0, 10).map((item) => (
                  <li key={item.id}>
                    <FilmItem film={item} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MainHomeFilms;
