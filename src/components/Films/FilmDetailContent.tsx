import { SectionSlider } from 'components/Slider';
import { FilmDetailButton } from 'layouts';
import { Credits, DetailMovie, DetailTV, FilmInfo, Item, Video } from 'models';
import { MouseEvent } from 'react';
import {
  PosterWatch,
  FilmHeader,
  FilmDetailInfo,
  FilmCastlist,
  TVSeasonList,
  FilmTraillerList,
} from '../Films';

type FilmDetailContentProps = {
  data: FilmInfo;
  onVideoClick: Function;
  onWatchButtonClick: (event: MouseEvent<HTMLElement>) => void;
};

function FilmDetailContent({ data, onVideoClick, onWatchButtonClick }: FilmDetailContentProps) {
  const detail = data?.detail as DetailMovie | DetailTV;
  const credits = data?.credits as Credits;
  const videos = data?.videos as Video[];
  const similar = data?.similar as Item[];

  return (
    <div className="flex -ml-8 -mr-8">
      <PosterWatch data={detail} onWatchButtonClick={onWatchButtonClick} />
      <div className="flex-1 px-8 pt-[28.8px] pb-3">
        <FilmHeader detail={detail} />

        <FilmDetailButton genres={detail.genres} detail={detail} />

        <FilmDetailInfo detail={detail} credits={credits} />

        <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">
          Diễn viên
        </h3>

        <FilmCastlist credits={credits.cast} />

        {videos.length > 0 && (
          <>
            <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">
              Trailer
            </h3>

            <FilmTraillerList videos={videos} onClick={onVideoClick} />
          </>
        )}

        {detail.media_type === 'movie' && similar.length > 0 && (
          <>
            <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">
              Phim tương tự
            </h3>
            <SectionSlider data={similar} className="w-[992px]" />
          </>
        )}

        {detail.media_type === 'tv' && detail.seasons.length && (
          <>
            <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">
              Phim tương tự
            </h3>
            <TVSeasonList detail={detail} />
          </>
        )}
      </div>
    </div>
  );
}

export default FilmDetailContent;
