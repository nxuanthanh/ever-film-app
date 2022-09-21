import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { resizeImage } from 'utils';

type SlideProps = {
  data: any;
};

function Slide({ data }: SlideProps) {
  return (
    <Swiper slidesPerView={5} spaceBetween={16} loop className="tw-section-slider w-[992px]">
      {data.map((film: any) => (
        <SwiperSlide key={film.id} className="">
          <Link to={`/movie/${film.id}`}>
            <div className="flex flex-col justify-between h-[302px] shadow-sm overflow-hidden relative group">
              <LazyLoadImage
                src={resizeImage(film.poster_path)}
                className="object-cover"
                effect="blur"
              />

              <div>
                <p className="text-left whitespace-nowrap text-ellipsis text-[.9em] text-white">
                  {film.title || film.name}
                </p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slide;
