import { Play } from 'assets/icons';
import { Button } from 'components/common';
import { DetailMovie, DetailTV } from 'models';
import { MouseEvent } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { resizeImage } from 'utils';

type PosterWatchProps = {
  data: DetailMovie | DetailTV;
  onWatchButtonClick: (event: MouseEvent<HTMLElement>) => void;
};

function PosterWatch({ data, onWatchButtonClick }: PosterWatchProps) {
  return (
    <div className="py-3 px-8 min-w-[25%]">
      <LazyLoadImage src={resizeImage(data.poster_path)} className="object-cover w-72 h-[432px]" />
      <div className="mt-9">
        <Button
          className="w-full py-[10px] px-5 gap-4 bg-primary hover:bg-[#f03a5f] hover:opacity-100 uppercase text-xl border-transparent"
          title="Xem phim"
          iconLeft={<Play />}
          onClick={onWatchButtonClick}
        />
      </div>
    </div>
  );
}

export default PosterWatch;
