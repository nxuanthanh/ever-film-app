import { useQuery } from '@tanstack/react-query';
import { Error, Loading } from 'components/common';
import { FilmBackgroundDrop, FilmDetailContent } from 'components/Films';

import { DetailTV, FilmInfo } from 'models';
import { useNavigate, useParams } from 'react-router-dom';
import { getTVDetailSeasons } from 'services';

function TVSeasonDetail() {
  const navigate = useNavigate();
  const { filmId, season_number } = useParams();

  const { data, isLoading, isError } = useQuery<FilmInfo, Error>(['detailTV', season_number], () =>
    getTVDetailSeasons(filmId as string, season_number as string)
  );

  const detail = data?.detail as DetailTV;

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="mb-14">
      <FilmBackgroundDrop image={detail.backdrop_path} />

      <section className="p-12 pb-0 mt-[-360px]">
        <div className="container">
          <FilmDetailContent
            data={data}
            onVideoClick={() => {}}
            onWatchButtonClick={() => navigate(`/tv/watch/${filmId}`)}
          />
        </div>
      </section>
    </div>
  );
}

export default TVSeasonDetail;
