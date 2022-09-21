import { DetailSeason, FilmInfo, getWatchReturnedType, Item, Reviews, Video } from 'models';
import axiosClient from './axiosClient';

export const getTVFullDetail = async (id: string): Promise<FilmInfo> => {
  const response = await Promise.all([
    axiosClient.get(`/tv/${id}`),
    axiosClient.get(`/tv/${id}/credits`),
    axiosClient.get(`/tv/${id}/reviews`),
    axiosClient.get(`/tv/${id}/similar`),
    axiosClient.get(`/tv/${id}/videos`),
  ]);

  const tvInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current.data, media_type: 'tv' };
        break;

      case 1:
        final.credits = current.data.cast.slice(0, 8);
        break;

      case 2:
        final.reviews = current.data.results.filter((item: Reviews) => item.author !== 'MSB');
        break;

      case 3:
        final.similar = current.data.results.map((item: Item) => ({
          ...item,
          media_type: 'tv',
        }));
        break;

      case 4:
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

  return tvInfo;
};

export const getWatchTV = async (id: number): Promise<getWatchReturnedType> => {
  const res = await Promise.all([
    axiosClient.get(`/tv/${id}`),
    axiosClient.get(`/tv/${id}/recommendations`),
  ]);

  const data = {
    detail: res[0].data,
    recommendations: res[1].data.results,
  };

  const detailSeasons = (
    await Promise.all(
      data.detail.seasons.map((season: DetailSeason) =>
        axiosClient.get(`/tv/${id}/season/${season.season_number}`)
      )
    )
  ).map((res) => res.data);

  return { ...data, detailSeasons };
};
