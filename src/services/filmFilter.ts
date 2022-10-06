import { ConfigType } from 'models';
import axiosClient from './axiosClient';

export const getFilterTV = async (config?: ConfigType): Promise<ConfigType> => {
  return (
    await axiosClient.get('/discover/tv/', {
      params: {
        ...config,
        //   page,
      },
    })
  ).data;
};

export const getFilterMovie = async (config?: ConfigType): Promise<ConfigType> => {
  return (
    await axiosClient.get('/discover/movie/', {
      params: {
        ...config,
        //   page,
      },
    })
  ).data;
};
