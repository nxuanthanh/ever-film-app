import { ConfigType, HomeFilms, Item, ItemsPage, OptionModel } from 'models';
import axiosClient from './axiosClient';

export const getHomeFilms = async (): Promise<HomeFilms> => {
  const endpoints: { [key: string]: string } = {
    'PHIM ĐỀ CỬ': '/trending/all/week?page=1',
    'PHIM LẺ MỚI CẬP NHẬT': '/movie/now_playing',
    'PHIM BỘ MỚI CẬP NHẬT': '/tv/on_the_air',
  };

  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => axiosClient.get(endpoint[1]))
  );

  const data = responses.reduce((final, current, index) => {
    final[Object.entries(endpoints)[index][0]] = current.data.results.map((item: Item) => ({
      ...item,
    }));

    return final;
  }, {} as HomeFilms);

  return data;
};

export const getTrendingNow = async (): Promise<Item[]> => {
  return (await axiosClient.get('/trending/all/week?page=1')).data.results;
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

export const getRegions = async (): Promise<OptionModel[]> => {
  const regionOptions = (await axiosClient.get('/watch/providers/regions')).data.results.map(
    (regions: any) => ({
      value: regions.iso_3166_1,
      label: regions.english_name,
    })
  );

  return [{ value: '', label: '- Tất cả -' }, ...regionOptions];
};

export const getGenreTVList = async (): Promise<OptionModel[]> => {
  const genreTVOptions = (await axiosClient.get('/genre/tv/list')).data.genres.map(
    (genre: any) => ({
      value: genre.id,
      label: genre.name,
    })
  );

  return [{ value: '', label: '- Tất cả -' }, ...genreTVOptions];
};

export const getGenreMovieList = async (): Promise<OptionModel[]> => {
  const genreMovieOptions = (await axiosClient.get('/genre/movie/list')).data.genres.map(
    (genre: any) => ({
      value: genre.id,
      label: genre.name,
    })
  );

  return [{ value: '', label: '- Tất cả -' }, ...genreMovieOptions];
};

export const getFilterTV = async (page: number, config?: ConfigType): Promise<ItemsPage> => {
  return (
    await axiosClient.get('/discover/tv', {
      params: {
        ...config,
        page,
      },
    })
  ).data;
};

export const getFilterMovie = async (page: number, config?: ConfigType): Promise<ItemsPage> => {
  return (
    await axiosClient.get('/discover/movie', {
      params: {
        ...config,
        page,
      },
    })
  ).data;
};
