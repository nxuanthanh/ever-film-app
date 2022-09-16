import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components';

import MainHomeFilms from 'components/MainHomeFilm';
import RecommendGenres from 'components/Search/RecommendGenres';
import TrendingNow from 'components/Search/TrendingNow';
import { FilterSection } from 'components/Slider';
import { HomeFilms, Item } from 'models';
import { getDetailMovies, getDetailTvs, getHomeMovies, getHomeTVs } from 'services';
interface HomeProps {
  currentTab: string;
}

export function Home({ currentTab }: HomeProps) {
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

  const {
    data: dataTV,
    isLoading: isLoadingTV,
    isError: isErrorTV,
    error: errorTV,
  } = useQuery<HomeFilms, Error>(['home-tvs'], getHomeTVs);

  const {
    data: dataTVDetail,
    isLoading: isLoadingTVDetail,
    isError: isErrorTVDetail,
    error: errorTVDetail,
  } = useQuery<any, Error>(
    ['detailTvs', dataTV?.Trending],
    () => getDetailTvs(dataTV?.Trending as Item[]),
    { enabled: !!dataTV?.Trending }
  );

  // MOVIE
  if (isErrorMovie) return <p>ERROR: ${errorMovie.message}</p>;

  if (isLoadingMovie) return <Loading />;

  if (isErrorMovieDetail) return <p>ERROR: ${errorMovieDetail.message}</p>;

  if (isLoadingMovieDetail) return <Loading />;

  // TV

  if (isErrorTV) return <p>ERROR: ${errorTV.message}</p>;

  if (isLoadingTV) return <Loading />;

  if (isErrorTVDetail) return <p>ERROR: ${errorTVDetail.message}</p>;

  if (isLoadingTVDetail) return <Loading />;

  return (
    <div className="container">
      <div className="mt-[88px]">
        <FilterSection />
      </div>
      <div className="flex-grow min-h-screen">
        <MainHomeFilms data={dataMovie} dataDetail={dataMovieDetail} />
      </div>
      <div className="shrink-0 max-w-[310px] w-full hidden md:block px-6 top-0 sticky ">
        <RecommendGenres />
        <TrendingNow />
      </div>
    </div>
  );
}

export default Home;
