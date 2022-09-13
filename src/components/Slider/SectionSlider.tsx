import { Item } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { resizeImage } from 'utils';

interface SectionSliderProps {
  films: Item[];
}

function SectionSlider({ films }: SectionSliderProps) {
  console.log(films);
  return (
    <div className="mt-2">
      <Swiper
        slidesPerView={5}
        slidesPerGroupAuto
        spaceBetween={16}
        loop
        className="container tw-section-slider"
      >
        {films.map((film) => (
          <SwiperSlide key={film.id} className="">
            <Link to={film.media_type === 'movie' ? `movie/${film.id}` : `tv/${film.id}`}>
              <div className="shadow-sm pb-2 overflow-hidden hover:scale-105 hover:brightness-110 transition duration-300 relative group">
                <LazyLoadImage
                  src={resizeImage(film.poster_path)}
                  className="object-cover"
                  effect="blur"
                />

                <div>
                  <p className="text-left whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 group-hover:text-white transition duration-300">
                    {film.title || film.name}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SectionSlider;
