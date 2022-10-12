import { FilmItem } from 'components/common';
import { Item } from 'models';
import { Swiper, SwiperSlide } from 'swiper/react';

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
            <FilmItem film={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SectionSlider;
