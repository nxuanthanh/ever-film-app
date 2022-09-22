import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { resizeImage } from 'utils';

function Slide({ data }: any) {
  console.log(data);
  return (
    <Swiper slidesPerView={5} spaceBetween={16} loop className="tw-section-slider w-[992px]">
      {data.map((film: any) => (
        <SwiperSlide key={film.id} className="">
          <Link to={film.media_type === 'movie' ? `/movie/${film.id}` : `/tv/${film.id}`}>
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
