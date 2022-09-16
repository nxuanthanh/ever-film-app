import { Item } from 'models';
import axiosClient from './axiosClient';

export const getTrendingNow = async (): Promise<Item[]> => {
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

export const getRegions = async (): Promise<any> => {
  return (await axiosClient.get('/watch/providers/regions')).data.results;
};

export const getDetail = async (pathname: string): Promise<any> => {
  return (await axiosClient.get(pathname)).data;
};
