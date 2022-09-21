import { HomeFilms } from 'models';
import { FC } from 'react';
import SectionSlider from './Slider/SectionSlider';

interface MainHomeFilmsProps {
  data: HomeFilms;
  dataDetail: any;
}

function MainHomeFilms({ data, dataDetail }: MainHomeFilmsProps) {
  return (
    <>
      <ul className="flex flex-col gap-8">
        {Object.entries(data)
          .filter((section) => section[0] !== 'Hot')
          .filter((section) => section[0] !== 'Now Playing')
          .map((section, index) => (
            <li key={index}>
              <h2 className="text-2xl font-oswald pb-[3.2px] border-b border-solid border-[#1b3c5d] font-medium tracking-wider text-[#b1a21e] uppercase">
                <span>{section[0]}</span>
              </h2>

              <SectionSlider films={section[1]} />
            </li>
          ))}
      </ul>
    </>
  );
}

export default MainHomeFilms;
