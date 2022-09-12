import { HomeMovies, Item } from "models";
import axiosClient from "./axiosClient";

export const getHomeMovies = async (): Promise<HomeMovies> => {
  const endpoints: { [key: string]: string } = {
    Trending: "/trending/movie/day",
    NowPlaying: "/movie/now_playing",
    Popular: "/movie/popular",
    TopRated: "/movie/top_rated",
    Upcoming: "/movie/upcoming",
  };

  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => axiosClient.get(endpoint[1]))
  );

  const data = responses.reduce((final, current, index) => {
    final[Object.entries(endpoints)[index][0]] = current.data.results.map(
      (item: Item) => ({
        ...item,
        media_type: "movie",
      })
    );

    return final;
  }, {} as HomeMovies);

  return data;
};

// Change any to real Type later //BUG
export const getDetailMovies = async (movies: Item[]): Promise<any> => {
  const detailRes = await Promise.all(
    movies.map((movie) => axiosClient.get(`/movie/${movie.id}`))
  );

  const translationRes = await Promise.all(
    movies.map((movie) => axiosClient.get(`/movie/${movie.id}/translations`))
  );

  const translations = translationRes.map((item: any) =>
    item.data.translations
      .filter((translation: any) =>
        ["vi", "fr", "ja", "pt", "ru", "es"].includes(translation.iso_639_1)
      )
      .reduce((acc: any, element: any) => {
        if (element.iso_639_1 === "vi") {
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
