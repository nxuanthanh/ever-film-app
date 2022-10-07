import { ConfigType, ItemsPage } from 'models';
import axiosClient from './axiosClient';

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
