import {
  Add,
  ArrowShare,
  Collection,
  FacebookShare,
  Like,
  Message,
  Subtitle,
  Tick,
  UnLike,
} from 'assets/icons';
import { Button } from 'components';
import Skeleton from 'components/common/Skeleton';
import Title from 'components/Title';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import {
  db,
  DetailMovie,
  DetailSeason,
  DetailTV,
  Episode,
  getWatchReturnedType,
  Item,
} from 'models';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from './Comment';

interface WatchFilmProps {
  media_type: 'movie' | 'tv';
  seasonId?: number;
  episodeId?: number;
  currentEpisode?: Episode;
  currentSeason?: DetailSeason;
}

function WatchFilm({
  detail,
  recommendations,
  detailSeasons,
  media_type,
  seasonId,
  episodeId,
  currentEpisode,
  currentSeason,
}: WatchFilmProps & getWatchReturnedType) {
  const currentUser = useAppSelector((state) => state.auth.user);
  // const { isMobile } = useMediaQueryService();

  console.log(detail);
  console.log(recommendations);

  useEffect(() => {
    if (!currentUser) return;
    if (!detail) return; // prevent this code from storing undefined value to Firestore (which cause error)

    getDoc(doc(db, 'users', currentUser.uid))
      .then((docSnap) => {
        const isAlreadyStored = docSnap
          .data()
          ?.recentlyWatch.some((film: Item) => film.id === detail?.id);

        if (!isAlreadyStored) {
          updateDoc(doc(db, 'users', currentUser.uid), {
            recentlyWatch: arrayUnion({
              poster_path: detail?.poster_path,
              id: detail?.id,
              vote_average: detail?.vote_average,
              media_type: media_type,
              ...(media_type === 'movie' && {
                title: (detail as DetailMovie)?.title,
              }),
              ...(media_type === 'tv' && { name: (detail as DetailTV)?.name }),
            }),
          });
        } else {
          const updatedRecentlyWatch = docSnap
            .data()
            ?.recentlyWatch.filter((film: Item) => film.id !== detail?.id)
            .concat({
              poster_path: detail?.poster_path,
              id: detail?.id,
              vote_average: detail?.vote_average,
              media_type: media_type,
              ...(media_type === 'movie' && {
                title: (detail as DetailMovie)?.title,
              }),
              ...(media_type === 'tv' && { name: (detail as DetailTV)?.name }),
            });

          updateDoc(doc(db, 'users', currentUser.uid), {
            recentlyWatch: updatedRecentlyWatch,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  }, [currentUser, detail, media_type]);

  return (
    <>
      {detail && (
        <Title
          value={`${(detail as DetailMovie).title || (detail as DetailTV).name} ${
            media_type === 'tv' ? `- Season ${seasonId} - Ep ${episodeId}` : ''
          }`}
        />
      )}

      <div>
        <div className="relative h-0 pb-[56.25%]">
          {!detail && <Skeleton className="absolute top-0 left-0 w-full h-full rounded-sm" />}
          {/* {detail && (
            <iframe
              className="absolute w-full h-full top-0 left-0"
              src={
                media_type === 'movie'
                  ? embedMovie(detail.id)
                  : embedTV(detail.id, seasonId as number, episodeId as number)
              }
              title="Film Video Player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )} */}
        </div>
        <p className="mt-3 text-center text-xs text-white">
          Phim không có tiếng / mất tiếng nhân vật / âm thanh bị rè?
          <Link to="/faq" className="text-Link">
            Xem hướng dẫn
          </Link>
        </p>
        <section className="p-12">
          <div className="container">
            <div className="flex -ml-3 -mr-3">
              <div className="w-2/3 p-3 ">
                <h1 className="font-merriweather text-white text-[2em] mb-8">
                  {seasonId
                    ? `${(detail as DetailTV).name} (${currentSeason?.name})`
                    : `${(detail as DetailMovie).original_title}`}
                </h1>
                <h2 className="mt-[-1.25rem] text-xl mb-6">
                  <span>
                    {seasonId ? currentEpisode?.name : (detail as DetailMovie).original_title}
                  </span>{' '}
                  (
                  <Link to="/year/2022" className="text-Link hover:text-hover-link cursor-default">
                    {Number(
                      new Date(
                        currentEpisode?.air_date || (detail as DetailMovie).release_date
                      ).getFullYear()
                    )}
                  </Link>
                  )
                </h2>
                <div className="flex">
                  <Button
                    className="bg-[#485fc7] px-[12px] py-[5px] mr-3 mb-2 gap-[10px] rounded-[2px] text-xs border-transparent"
                    onClick={() => console.log('first')}
                    iconLeft={<FacebookShare width="14" height="14" />}
                    title="Chia sẻ"
                  />
                  {media_type === 'movie' && (
                    <>
                      <Button
                        className="border-lam px-[12px] py-[6px] mb-2 gap-[10px] rounded-[2px] text-xs text-Link hover:bg-lam hover:text-white hover:opacity-100"
                        onClick={() => console.log('first')}
                        iconLeft={<Add className="text-white" width="12" height="16" />}
                        title="Bộ sưu tập"
                      />
                      <Button
                        className="border-green px-[12px] py-[6px] ml-3 mb-2 gap-[10px] rounded-[2px] text-xs hover:bg-green hover:text-white text-green hover:opacity-100"
                        onClick={() => console.log('first')}
                        iconLeft={<Collection className="text-white" width="16" height="16" />}
                        title="Phim tương tự"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex-1 p-3 flex flex-col items-end">
                <Button
                  className="px-5 py-2 gap-[14.4px] rounded-full border-lam text-lam w-fit mt-4"
                  onClick={() => console.log('first')}
                  title="Tab Song ngữ"
                />

                <div className="flex w-fit text-white mt-4">
                  <ArrowShare className="mr-[6px]" />
                  <Link to={`/tv/${''}`} className="text-Link">
                    Về trang giới thiệu phim
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-[0.75rem] mb-4">
              {currentSeason?.episodes.map((episode, index) => (
                <Button
                  key={index}
                  className="px-4 py-2  mr-2 mb-2 text-white bg-green border-none w-fit"
                  onClick={() => console.log('first')}
                  title={`Tập ${episode.episode_number}`}
                />
              ))}
            </div>
            <div className="text-white">
              <p className="">
                Dưới đây là các phụ đề của phim này được hệ thống lấy tự động từ subscene.com. Nếu
                chọn được một phụ đề vừa ý (khớp thời gian & dịch chuẩn), hãy{' '}
                <Like className="inline-block mx-2 mb-2" /> phụ đề đó để lần sau xem lại phim, hệ
                thống sẽ tự động sử dụng phụ đề đó cho bạn!
              </p>
              <br />
              <p className="mb-6">
                Bạn cũng có thể upload file phụ đề của riêng bạn ={'>'}{' '}
                <Link to="#" className="text-Link">
                  Click vào đây!
                </Link>
              </p>
            </div>
            <div className="flex -ml-3 -mr-3">
              <div className="w-1/2 p-3 ">
                <h1 className="font-merriweather text-white text-xl mb-5 leading-[22.5px]">
                  Tiếng Anh
                </h1>
                <div className="flex justify-between items-start pt-[0.3em]">
                  <div className="text-white mr-4">
                    <Subtitle />
                  </div>
                  <div className="flex-1 text-xs">
                    <i>unknown release</i>
                  </div>
                  <div className="flex">
                    <Button
                      className="px-3 py-[5px] text-white bg-green border-none w-9 h-8 rounded-sm mr-2"
                      onClick={() => console.log('first')}
                      iconLeft={<Tick />}
                      title={''}
                    />
                    <div className="flex">
                      <div className="ml-2">
                        <span className="text-green font-semibold text-[14.4px]">8</span>
                        <Like className="text-white" width="12.8" height="12.8" />
                      </div>
                      <div className="ml-2">
                        <span className="text-[#363636] text-[14.4px]">0</span>
                        <UnLike className="text-white" width="12.8" height="12.8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-3 ">
                <h1 className="font-merriweather text-white text-xl mb-5 leading-[22.5px]">
                  Tiếng Việt
                </h1>
                <div className="flex justify-between items-start pt-[0.3em]">
                  <div className="text-white mr-4">
                    <Subtitle />
                  </div>
                  <div className="flex-1 text-xs">
                    <i>unknown release</i>
                  </div>
                  <div className="flex">
                    <Button
                      className="px-3 py-[5px] text-white bg-green border-none w-9 h-8 rounded-sm mr-2"
                      onClick={() => console.log('first')}
                      iconLeft={<Tick />}
                      title={''}
                    />
                    <div className="flex">
                      <div className="ml-2">
                        <span className="text-green font-semibold text-[14.4px]">9</span>
                        <Like className="text-white" width="12.8" height="12.8" />
                      </div>
                      <div className="ml-2">
                        <span className="text-[#f14668] text-[14.4px]">6</span>
                        <UnLike className="text-white" width="12.8" height="12.8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5 pr-10 pl-6 bg-lam flex flex-col items-center my-6 rounded">
              <p className="text-white text-center">
                Nếu phim load chậm, bạn có thể kích hoạt VIP Mode cho phim này để xem với server tốc
                độ cao
              </p>
              <br />
              <Button
                className="bg-[#ffe08a] px-4 py-2 gap-[10px] text-[#000000b3] border-transparent w-fit rounded"
                onClick={() => console.log('first')}
                title="Kích hoạt VIP mode"
              />
            </div>
            <div className="border-t-[#4a4a4a] border-t-solid border-t max-w-[600px]">
              <div className="flex pl-10 gap-3 pt-5 text-xl font-merriweather">
                <Message /> Bình luận phim
              </div>
              <form className="mt-5 mb-6 flex flex-col items-end text-[#363636]">
                <textarea
                  name="comment"
                  id="comment_box"
                  rows={3}
                  className="w-full rounded p-3 mb-[.75rem]"
                  placeholder="Nhập bình luận"
                />
                <Button
                  className="border-white px-3 py-[6px] gap-[10px] w-fit rounded-sm text-xs"
                  onClick={() => console.log('first')}
                  title="Gửi"
                />
              </form>
            </div>
            <Comment media_type={media_type} id={detail?.id} />
          </div>
        </section>
      </div>
    </>
  );
}

export default WatchFilm;
