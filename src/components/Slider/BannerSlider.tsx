import { Item } from 'models';
import { BsFillPlayFill } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { resizeImage } from 'utils';

interface BannerSliderProps {
  films: Item[];
  dataDetail: {
    genre: { id: number; name: string }[];
    translation: string[];
  }[];
}

function BannerSlider({ films, dataDetail }: BannerSliderProps) {
  return (
    <div className="relative h-0 pb-[45%] tw-banner-slider">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView={1}
        className="!absolute !top-0 !left-0 !w-full !h-full"
      >
        {films?.map((film, index) => (
          <SwiperSlide key={film.id}>
            <Link
              to={film.media_type === 'movie' ? `/movie/${film.id}` : `/tv/${film.id}`}
              className="group"
            >
              <LazyLoadImage
                src={resizeImage(film.backdrop_path)}
                alt="Backdrop image"
                effect="blur"
              />
              <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none tw-black-backdrop group-hover:bg-[#00000026] transition duration-7000"></div>
              {/* <div className="absolute top-[5%] right-[3%] bg-primary px-3 py-1 rounded-full text-white flex items-center gap-1">
                <span>{film.vote_average.toFixed(1)}</span>
                <AiFillStar size={15} />
              </div> */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-16 h-16 rounded-full bg-gradient-to-br from-primary to-orange-600 tw-flex-center z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-700">
                <BsFillPlayFill size={35} className="text-white" />
              </div>

              <div className="absolute top-[50%] -translate-y-1/2 left-[5%] max-w-md">
                <h2 className="text-5xl text-primary font-black tracking-wide tw-multiline-ellipsis-2">
                  {film.title || film.name}
                </h2>
                <p className="text-white font-semibold text-2xl mt-6">
                  {dataDetail[index].translation[0] ||
                    dataDetail[index].translation[1] ||
                    dataDetail[index].translation[2] ||
                    dataDetail[index].translation[3] ||
                    dataDetail[index].translation[4] ||
                    dataDetail[index].translation[5]}
                </p>
                <p className="text-base mt-1">
                  {film.release_date && `Release date: ${film.release_date}`}
                  {film.first_air_date && `Last episode date: ${film.first_air_date}`}
                </p>
                <div className="flex gap-2 flex-wrap mt-5">
                  {dataDetail[index].genre.map((genre) => (
                    <div className="px-3 py-1 border rounded-full " key={genre.id}>
                      {genre.name}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-base tw-multiline-ellipsis">{film.overview}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerSlider;
