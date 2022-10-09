import { Item } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { resizeImage } from 'utils';

interface SectionSliderProps {
  className?: string;
  data: Item[];
}

function SectionSlider({ data, className }: SectionSliderProps) {
  return (
    <div className="mt-2">
      <Swiper slidesPerView={5} spaceBetween={16} loop className={className}>
        {data.map((item) => (
          <SwiperSlide key={item.id} className="">
            <Link to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SectionSlider;
