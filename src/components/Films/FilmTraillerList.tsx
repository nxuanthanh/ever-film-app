import { Play } from 'assets/icons';
import { Video } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface FilmTraillerListProps {
  videos: Video[];
  onClick: Function;
}

function FilmTraillerList({ videos, onClick }: FilmTraillerListProps) {
  return (
    <>
      <Swiper modules={[Navigation]} navigation slidesPerView={4} className="w-[992px] ml-[1px]">
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div
              onClick={() => onClick(video.key)}
              className="w-[222px] relative h-[124.88px] block cursor-pointer group hover:shadow-[0_0_0_2px_#cc7b19] m-[1px]"
            >
              <div className="absolute top-[50px] left-[100px]">
                <Play width="32" height="32" className="text-white hidden group-hover:block" />
              </div>
              <LazyLoadImage
                src={`http://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                className="w-full h-full object-cover hover:shadow-[0 0 0 2px #cc7b19]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default FilmTraillerList;
