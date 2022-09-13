export const resizeImage = (
  imageUrl: string,
  width: string = "original"
): string => `${process.env.REACT_APP_IMAGE_URL}/${width}${imageUrl}`;

export const embedMovie = (id: number): string =>
  `${process.env.REACT_APP_EMBED_URL}/movie?tmdb=${id}`;

export const embedTV = (id: number, season: number, episode: number): string =>
  `${process.env.REACT_APP_EMBED_URL}/series?tmdb=${id}&sea=${season}&epi=${episode}`;
