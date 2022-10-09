import { HomeFilms } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { resizeImage } from 'utils';
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
                  <Link
                    key={item.id}
                    to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}
                  >
                    <div className="shadow-sm pb-2 overflow-hidden hover:scale-105 hover:brightness-110 transition duration-300 relative group">
                      <LazyLoadImage
                        src={resizeImage(item.poster_path)}
                        className="object-cover"
                        effect="blur"
                      />

                      <div>
                        <p className="text-left whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 group-hover:text-white transition duration-300">
                          {item.title || item.name}
                        </p>
                      </div>
                    </div>
                  </Link>
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
