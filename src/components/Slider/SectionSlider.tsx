import { Item } from 'models';
import { AiFillStar } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { resizeImage } from 'utils';

interface SectionSliderProps {
  films: Item[];
}

function SectionSlider({ films }: SectionSliderProps) {
  console.log(films);
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView="auto"
        slidesPerGroupAuto
        spaceBetween={30}
        loop
        className="!w-[calc(100vw_-_310px_-_2px_-_4vw_-_17px)] tw-section-slider !py-2"
      >
        {films.map((film) => (
          <SwiperSlide key={film.id} className="!w-[18.4%]">
            <Link to={film.media_type === 'movie' ? `movie/${film.id}` : `tv/${film.id}`}>
              <div className="shadow-sm bg-dark-darken pb-2 rounded-md overflow-hidden hover:scale-105 hover:brightness-110 transition duration-300 relative group">
                <LazyLoadImage
                  src={resizeImage(film.poster_path)}
                  className="object-cover"
                  effect="blur"
                />

                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 mt-1 text-center px-2 group-hover:text-white transition duration-300">
                  {film.title || film.name}
                </p>

                <div className="bg-primary px-2 py-1 rounded-full absolute top-[5%] left-[8%] z-20 flex items-center gap-1 text-white text-xs">
                  {film.vote_average.toFixed(1)}
                  <AiFillStar size={15} />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div className="absolute top-[2%] left-0 w-full h-[83%] z-10 pointer-events-none tw-black-backdrop-2" />
        <div className="absolute top-0 left-0 w-[4%] h-full z-10"></div>
        <div className="absolute top-0 right-0 w-[4%] h-full z-10"></div>
      </Swiper>
    </div>
  );
}

export default SectionSlider;
