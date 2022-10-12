import { Cast } from 'models';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { resizeImage } from 'utils';

interface FilmCastlistProps {
  credits: Cast[];
}

function FilmCastlist({ credits }: FilmCastlistProps) {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        slidesPerGroup={5}
        slidesPerView={5}
        className="w-[992px]"
      >
        {credits.map((credit) => (
          <SwiperSlide key={credit.id}>
            <div className="flex flex-col items-center justify-start">
              <Link
                to={`/person/${credit.id}`}
                className="w-[120px] h-[120px] block overflow-hidden rounded-full hover:shadow-[0_0_0_2px_#cc7b19] mt-[2px] mb-[.5em] mx-[2px]"
              >
                <LazyLoadImage src={resizeImage(credit.profile_path)} className="object-cover" />
              </Link>
              <Link to={`/person/${credit.id}`}>
                <p className="text-[#dbdbdb] text-[0.9em] font-bold hover:underline">
                  {credit.original_name}
                </p>
              </Link>
              <p className="text-[#7a7a7a] text-[0.9em]">{credit.character}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FilmCastlist;
