import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components';
import MainHomeFilms from 'components/MainHomeFilm';
import { FilterSection } from 'components/Slider';
import { HomeFilms, Item } from 'models';
import { getDetailMovies, getHomeMovies } from 'services';

// interface HomeProps {
//   currentTab: string;
// }

export function Home() {
  const {
    data: dataMovie,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
    error: errorMovie,
  } = useQuery<HomeFilms, Error>(['home-movies'], getHomeMovies);

  const {
    data: dataMovieDetail,
    isLoading: isLoadingMovieDetail,
    isError: isErrorMovieDetail,
    error: errorMovieDetail,
  } = useQuery<any, Error>(
    ['detailMovies', dataMovie?.Trending],
    () => getDetailMovies(dataMovie?.Trending as Item[]),
    { enabled: !!dataMovie?.Trending }
  );

  // MOVIE
  if (isErrorMovie) return <p>ERROR: ${errorMovie.message}</p>;

  if (isLoadingMovie) return <Loading />;

  if (isErrorMovieDetail) return <p>ERROR: ${errorMovieDetail.message}</p>;

  if (isLoadingMovieDetail) return <Loading />;

  return (
    <div className="container">
      <div className="mt-[88px]">
        <FilterSection />
      </div>
      <div className="flex-grow min-h-screen mb-14">
        <MainHomeFilms data={dataMovie} dataDetail={dataMovieDetail} />
      </div>
    </div>
  );
}

export default Home;
