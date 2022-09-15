import { Item } from 'models';
import axiosClient from './axiosClient';

// export const getSearchMovie = async (query: string): Promise<string[]> => {
//   return (
//     await axiosClient.get('/search/movie', {
//       params: {
//         query,
//       },
//     })
//   ).data.results
//     .map((item: any) => item.name)
//     .filter((_: any, index: number) => index < 5);
// };

export const getSearchMovie = async (query: string): Promise<Item[]> => {
  return (
    await axiosClient.get('/search/multi', {
      params: {
        query,
      },
    })
  ).data.results;
};

export const getRecommendGenres = async (): Promise<{ id: number; name: string }[]> => {
  const movieGenres = (await axiosClient.get('/genre/movie/list')).data.genres;
  const tvGenres = (await axiosClient.get('/genre/tv/list')).data.genres;

  return movieGenres.concat(tvGenres);
};
