const routes = {
  home: '/',
  search: 'search',
  hot: 'top',
  movie: 'type/movie',
  TVSeries: 'type/show',
  new: 'browse',
  detailMovie: 'movie/:movieId',
  DetailTV: 'tv/:tvId',
  FAQ: 'faq',
  login: '/login',
  signup: '/signup',
  DetailTVSeason: 'tv/:tvId/season/:season_number',
  watchTV: 'tv/watch/:filmId',
  watchMovie: 'movie/watch/:filmId',
  forgot: 'forgot',
  peopleDetail: 'person/:personId',
  bookmarked: '/bookmarked',
};

export default routes;
