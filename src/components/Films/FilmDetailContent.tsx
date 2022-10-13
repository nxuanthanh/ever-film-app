import { SectionSlider } from 'components/Slider';
import { FilmDetailButton } from 'layouts';
import { Credits, DetailMovie, DetailSeason, DetailTV, FilmInfo, Item, Video } from 'models';
import { MouseEvent } from 'react';
import {
  FilmCastlist,
  FilmDetailInfo,
  FilmHeader,
  FilmTraillerList,
  PosterWatch,
  TVSeasonEpisodesList,
  TVSeasonList,
} from '../Films';

type FilmDetailContentProps = {
  data: FilmInfo;
  onVideoClick: Function;
  onWatchButtonClick: (event: MouseEvent<HTMLElement>) => void;
};

function FilmDetailContent({ data, onVideoClick, onWatchButtonClick }: FilmDetailContentProps) {
  const detail = data?.detail as DetailMovie | DetailTV;
  const detailSeason = data.detailSeason as DetailSeason;
  const credits = data?.credits as Credits;
  const videos = data?.videos as Video[];
  const similar = data?.similar as Item[];

  return (
    <div className="flex -ml-8 -mr-8">
      <PosterWatch poster={detail.poster_path} onWatchButtonClick={onWatchButtonClick} />
      <div className="flex-1 px-8 pt-[28.8px] pb-3">
        <FilmHeader data={data} />

        <FilmDetailButton genres={detail.genres} detail={detail} />

        <FilmDetailInfo detail={detail} credits={credits} />

        <FilmCastlist credits={credits.cast} />

        {videos.length > 0 && !detailSeason && (
          <FilmTraillerList videos={videos} onClick={onVideoClick} />
        )}

        {detail.media_type === 'movie' && similar.length > 0 && (
          <>
            <h3 className="text-white uppercase font-bold mt-[2em] mb-[1.2em] text-[.9em]">
              Phim tương tự
            </h3>
            <SectionSlider data={similar} className="w-[992px]" />
          </>
        )}

        {!detailSeason && detail.media_type === 'tv' && detail.seasons.length && (
          <TVSeasonList detail={detail} />
        )}

        {detailSeason && <TVSeasonEpisodesList detailSeason={detailSeason} />}
      </div>
    </div>
  );
}

export default FilmDetailContent;
