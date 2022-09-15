import { HomeFilms, HomeMovies, Item } from 'models';
import axiosClient from './axiosClient';

export const getHomeMovies = async (): Promise<HomeFilms> => {
  const endpoints: { [key: string]: string } = {
    Trending: '/trending/movie/day',
    'Now Playing': '/movie/now_playing',
    Popular: '/movie/popular',
    'Top Rated': '/movie/top_rated',
    Upcoming: '/movie/upcoming',
  };

  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => axiosClient.get(endpoint[1]))
  );

  const data = responses.reduce((final, current, index) => {
    final[Object.entries(endpoints)[index][0]] = current.data.results.map((item: Item) => ({
      ...item,
      media_type: 'movie',
    }));

    return final;
  }, {} as HomeFilms);

  return data;
};

// Change any to real Type later //BUG
export const getDetailMovies = async (movies: Item[]): Promise<any> => {
  const detailRes = await Promise.all(movies.map((movie) => axiosClient.get(`/movie/${movie.id}`)));

  const translationRes = await Promise.all(
    movies.map((movie) => axiosClient.get(`/movie/${movie.id}/translations`))
  );

  const translations = translationRes.map((item: any) =>
    item.data.translations
      .filter((translation: any) =>
        ['vi', 'fr', 'ja', 'pt', 'ru', 'es'].includes(translation.iso_639_1)
      )
      .reduce((acc: any, element: any) => {
        if (element.iso_639_1 === 'vi') {
          return [element, ...acc];
        }
        return [...acc, element];
      }, [] as any)
      .map((translation: any) => translation.data.title)
  );

  const genres = detailRes.map((item: any) =>
    item.data.genres.filter((_: any, index: number) => index < 3)
  );

  return genres.map((genre, index) => ({
    genre,
    translation: translations[index],
  }));
};

export const getTrendingNow = async (): Promise<any> => {
  return (await axiosClient.get('/trending/all/day?page=1')).data.results;
};

export const getDiscoverMovie = async (): Promise<any> => {
  return (await axiosClient.get('/discover/movie')).data.results;
};

export const getMovieUpcoming = async (): Promise<any> => {
  return (await axiosClient.get('/movie/upcoming')).data.results;
};

export const getDiscoverTV = async (): Promise<any> => {
  return (await axiosClient.get('/discover/tv')).data.results;
};

export const getHomeTVs = async (): Promise<HomeFilms> => {
  const endpoints: { [key: string]: string } = {
    Trending: '/trending/tv/day',
    Popular: '/tv/popular',
    'Top Rated': '/tv/top_rated',
    'On the air': '/tv/on_the_air',
    'Airing today': '/tv/airing_today',
  };

  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => axiosClient.get(endpoint[1]))
  );

  const data = responses.reduce((final, current, index) => {
    final[Object.entries(endpoints)[index][0]] = current.data.results.map((item: Item) => ({
      ...item,
      media_type: 'tv',
    }));

    return final;
  }, {} as HomeFilms);

  return data;
};

// Change any to real DetailType later //BUG
export const getDetailTvs = async (tvs: Item[]): Promise<any> => {
  const detailRes = await Promise.all(tvs.map((tv) => axiosClient.get(`/tv/${tv.id}`)));

  const translationRes = await Promise.all(
    tvs.map((tv) => axiosClient.get(`/tv/${tv.id}/translations`))
  );

  const translations = translationRes.map((item: any) =>
    item.data.translations
      .filter((translation: any) =>
        ['vi', 'fr', 'ja', 'pt', 'ru', 'es'].includes(translation.iso_639_1)
      )
      .reduce((acc: any, element: any) => {
        if (element.iso_639_1 === 'vi') {
          return [element, ...acc];
        }
        return [...acc, element];
      }, [] as any)
      .map((translation: any) => translation.data.title)
  );

  const genres = detailRes.map((item: any) =>
    item.data.genres.filter((_: any, index: number) => index < 3)
  );

  return genres.map((genre, index) => ({
    genre,
    translation: translations[index],
  }));
};
