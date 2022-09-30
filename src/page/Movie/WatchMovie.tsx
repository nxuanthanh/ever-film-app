import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components/common';
import { Error } from 'components/common';
import WatchFilm from 'features/WatchFilm';
import { getWatchReturnedType } from 'models';
import { useParams } from 'react-router-dom';
import { getWatchMovie } from 'services';

// interface Props {}

function WatchMovie() {
  const { filmId } = useParams();
  const { data, isLoading, error } = useQuery<getWatchReturnedType, Error>(
    ['watchMovie', filmId],
    () => getWatchMovie(Number(filmId as string))
  );

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  return <WatchFilm {...data} media_type="movie" />;
}

export default WatchMovie;
