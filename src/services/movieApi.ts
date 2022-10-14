import { FilmInfo, getWatchReturnedType, Item, Video } from 'models';
import axiosClient from './axiosClient';

// Change any to real Type later //BUG
export const getDetailMovies = async (movieId: string): Promise<any> => {
  return (await axiosClient.get(`/movie/${movieId}`)).data;
};

export const getMovieDetail = async (id: number): Promise<FilmInfo> => {
  const response = await Promise.all([
    axiosClient.get(`/movie/${id}`),
    axiosClient.get(`/movie/${id}/credits`),
    axiosClient.get(`/movie/${id}/images`),
    axiosClient.get(`/movie/${id}/reviews`),
    axiosClient.get(`/movie/${id}/similar`),
    axiosClient.get(`/movie/${id}/videos`),
  ]);

  const movieInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current.data, media_type: 'movie' };
        break;

      case 1:
        final.credits = current.data;
        break;

      case 2:
        final.images = current.data;
        break;

      case 3:
        final.reviews = current.data.results;
        break;

      case 4:
        final.similar = current.data.results;
        break;

      case 5:
        final.videos = current.data.results
          .filter((item: Video) => item.site === 'YouTube')
          .reduce((acc: any, current: Video) => {
            if (current.type === 'Trailer') return [current, ...acc];
            else return [...acc, current];
          }, [] as Video[]);
        break;
    }

    return final;
  }, {} as FilmInfo);

  return movieInfo;
};

export const getWatchMovie = async (id: number): Promise<getWatchReturnedType> => {
  const res = await Promise.all([
    axiosClient.get(`/movie/${id}`),
    axiosClient.get(`/movie/${id}/recommendations`),
  ]);

  return {
    detail: res[0].data,
    recommendations: res[1].data.results.filter((item: Item) => item.poster_path),
  };
};
