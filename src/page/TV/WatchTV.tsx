import { useQuery } from '@tanstack/react-query';
import { Error, Loading } from 'components/common';
import { getWatchReturnedType } from 'models';
import WatchFilm from 'features/WatchFilm';
import { useParams, useSearchParams } from 'react-router-dom';
import { getWatchTV } from 'services';

function WatchTV() {
  const { filmId } = useParams();

  const { data, isLoading, error } = useQuery<getWatchReturnedType, Error>(
    ['watchTV', filmId],
    () => getWatchTV(Number(filmId as string))
  );

  const [queryParams] = useSearchParams();

  const seasonId = Number(queryParams.get('season')) || 1;
  const episodeId = Number(queryParams.get('episode')) || 1;

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  const currentSeason = data?.detailSeasons?.find((season) => season.season_number === seasonId);

  const currentEpisode = currentSeason?.episodes.find(
    (episode) => episode.episode_number === episodeId
  );

  if (!currentEpisode && data) return <Error />;

  return (
    <WatchFilm
      {...data}
      media_type="tv"
      seasonId={seasonId}
      episodeId={episodeId}
      currentSeason={currentSeason}
      currentEpisode={currentEpisode}
    />
  );
}

export default WatchTV;
