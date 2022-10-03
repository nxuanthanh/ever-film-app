import { People, PeopleFull } from 'models';
import axiosClient from './axiosClient';

export const getPeopleFullDetail = async (id: string): Promise<PeopleFull> => {
  const response = await Promise.all([
    axiosClient.get(`/person/${id}`),
    axiosClient.get(`/person/${id}/combined_credits`),
    axiosClient.get(`/person/${id}/images`),
  ]);

  const peopleInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current.data };
        break;

      case 1:
        final.credits = current.data.cast;
        break;

      case 2:
        final.images = current.data.profiles;
        break;
    }

    return final;
  }, {} as PeopleFull);

  return peopleInfo;
};
export const getDetailPeople = async (person_id: string): Promise<People> => {
  return (await axiosClient.get(`/person/${person_id}`)).data;
};
