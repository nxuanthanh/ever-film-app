import { useQuery } from '@tanstack/react-query';
import { Add, FacebookShare, Imdb, Play } from 'assets/icons';
import { Button, Loading } from 'components';
import Modal from 'components/Modal';
import { ModalContent } from 'components/Modal/ModalContent';
import { Slide } from 'components/Slider';
import { Cast, DetailMovie, FilmInfo, Item, Video } from 'models';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetail } from 'services';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { resizeImage } from 'utils';

function MovieDetail() {
  const params = useParams();
  const [videoKey, setVideoKey] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError, error } = useQuery<FilmInfo, Error>(['detail'], () =>
    getMovieDetail(Number(params.movieId as string))
  );

  const detail = data?.detail as DetailMovie;
  const credits = data?.credits as Cast[];
  const videos = data?.videos as Video[];
  const similar = data?.similar as Item[];

  console.log(data);

  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  const handleOnVideoClick = (key: string) => {
    setVideoKey(key);
    setShowModal(true);
  };

  const handleCloseModal = (key: string): any => {
    setShowModal(false);
  };

  return (
    <>
      <div className="mb-14">
        <div
          className="h-[600px] w-full bg-cover relative before:w-full before:top-0 before:bottom-0 before:bg-[#020d18bf] before:absolute before:content-[''] before:h-full"
          style={{
            backgroundImage: `url("${resizeImage(detail.backdrop_path)}")`,
          }}
        ></div>
        <section className="p-12 pb-0 mt-[-360px]">
          {showModal && (
            <Modal id={`modal_${detail.id}`} onClose={handleCloseModal}>
              <ModalContent onClose={handleCloseModal}>
                <iframe
                  width="1000px"
                  height="562px"
                  title="trailer"
                  src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0`}
                ></iframe>
              </ModalContent>
            </Modal>
          )}
          <div className="container">
            <div className="flex -ml-8 -mr-8">
              <div className="py-3 px-8 min-w-[25%]">
                <LazyLoadImage
                  src={resizeImage(detail.poster_path)}
                  className="object-cover w-72 h-[432px]"
                />
                <div className="mt-9">
                  <Button
                    className="w-full py-[10px] px-5 gap-4 bg-primary hover:bg-[#f03a5f] hover:opacity-100 uppercase text-xl"
                    title="Xem phim"
                    iconLeft={<Play />}
                    onClick={() => console.log('heh')}
                  />
                </div>
              </div>
              <div className="flex-1 px-8 pt-[28.8px] pb-3">
                <h1 className="font-merriweather text-[2.5rem] leading-[1.125] mb-[0.7em] text-white font-normal">
                  {detail.original_title}
                </h1>
                <h2 className="-mt-5 mb-[1.5em] leading-[1.25] text-2xl text-[#b5b5b5]">
                  <span>
                    {detail.original_title} (
                    <Link
                      to={`/year/${new Date(detail.release_date).getFullYear()}`}
                      className="text-[#428bca] cursor-pointer hover:text-[#dcf836] transition-all duration-150"
                    >
                      {new Date(detail.release_date).getFullYear()}
                    </Link>
                    )
                  </span>
                </h2>
                <div className="mb-4 text-white">
                  <span className="text-base mr-[18px]">{`${Math.trunc(detail.runtime / 60)} giờ ${
                    detail.runtime % 60
                  } phút`}</span>
                  <span className="font-bold text-xs text-white px-[9px] bg-[#363636] h-6 inline-flex items-center rounded cursor-help">
                    R
                  </span>
                </div>
                <div className="mb-4 flex items-center h-[35.2px]">
                  <span className="w-[40px] mr-[0.6rem] ">
                    <Imdb />
                  </span>
                  <div className="font-bold  text-white">{detail.vote_average.toFixed(1)}</div>
                </div>
                <div className="flex items-center justify-between mb-14">
                  <div className="flex items-center">
                    <Button
                      className="bg-[#485fc7] px-4 py-[7px] mr-3 gap-[14.4px] rounded"
                      onClick={() => console.log('first')}
                      iconLeft={<FacebookShare />}
                      title="Chia sẻ"
                    />

                    <Button
                      className="bg-transparent border-[#3e8ed0] px-4 py-[7px] gap-2 text-[#3e8ed0] rounded mr-0 hover:bg-[#3e8ed0] hover:text-white"
                      onClick={() => console.log('first')}
                      iconLeft={<Add className="text-white" />}
                      title="Bộ sưu tập"
                    />
                  </div>
                  <div className="flex items-center">
                    {detail.genres.map((genre, idx) => (
                      <Button
                        className="bg-transparent hover:bg-white hover:text-[#485fc7] border-white text-white text-xs rounded-full mr-2 px-[15px] py-[5px]"
                        onClick={() => console.log('first')}
                        title={genre.name}
                        key={idx}
                        to={`/genre/${genre.name}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex">
                    <span className="text-[#7a7a7a] uppercase mb-1 w-[120px]">Đạo diễn</span>
                    <a
                      href={`/person/`}
                      className="text-[#dbdbdb] font-bold hover:underline cursor-pointer text-base"
                    >
                      Baltasar Kormákur
                    </a>
                  </div>
                  <div className="flex">
                    <span className="text-[#7a7a7a] uppercase mb-1 w-[120px]">Quốc gia</span>
                    <a
                      href={`/person/`}
                      className="text-[#dbdbdb] font-bold hover:underline cursor-pointer text-base"
                    >
                      {detail.production_countries[0].name}
                    </a>
                  </div>
                  <div className="flex">
                    <span className="text-[#7a7a7a] uppercase mb-1 w-[120px]">Khởi chiếu</span>
                    <a
                      href={`/person/`}
                      className="text-[#dbdbdb] font-normal hover:underline cursor-pointer text-base"
                    >
                      {new Intl.DateTimeFormat('en').format(new Date(detail.release_date))}
                    </a>
                  </div>
                </div>

                <div className="">
                  <span className="text-[#b5b5b5] font-normal ">{detail.overview}</span>
                </div>

                <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">
                  Diễn viên
                </h3>
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
                            to={`/person/${credit.credit_id}`}
                            className="w-[120px] h-[120px] block overflow-hidden rounded-full hover:shadow-[0_0_0_2px_#cc7b19] mt-[2px] mb-[.5em] mx-[2px]"
                          >
                            <LazyLoadImage
                              src={resizeImage(credit.profile_path)}
                              className="object-cover"
                            />
                          </Link>
                          <Link to={`/person/${credit.credit_id}`}>
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

                {videos.length > 0 && (
                  <>
                    <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">
                      Trailer
                    </h3>

                    <Swiper
                      modules={[Navigation]}
                      navigation
                      slidesPerView={4}
                      className="w-[992px] ml-[1px]"
                    >
                      {videos.map((video) => (
                        <SwiperSlide key={video.id}>
                          <div
                            onClick={() => handleOnVideoClick(video.key)}
                            className="w-[222px] relative h-[124.88px] block cursor-pointer group hover:shadow-[0_0_0_2px_#cc7b19] m-[1px]"
                          >
                            <div className="absolute top-[50px] left-[100px]">
                              <Play
                                width="32"
                                height="32"
                                className="text-white hidden group-hover:block"
                              />
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
                )}

                {similar.length > 0 && (
                  <>
                    <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">
                      Phim tương tự
                    </h3>
                    <div>
                      <Slide data={similar} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MovieDetail;
