import { FilmInfo, HomeFilms, Item, Video } from 'models';
import axiosClient from './axiosClient';

export const getHomeTVs = async (): Promise<HomeFilms> => {
  const endpoints: { [key: string]: string } = {
    Trending: '/trending/tv/day',
    Popular: '/tv/popular',
    'Top Rated': '/tv/top_rated',
    'On the air': '/tv/on_the_air',
    Hot: '/trending/tv/day?page=1',
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
