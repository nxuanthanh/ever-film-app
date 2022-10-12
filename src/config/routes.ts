const routes = {
  home: '/',
  search: '/search',
  hot: '/top',
  movie: '/type/movie',
  TVSeries: '/type/show',
  new: '/browse',
  detailMovie: '/movie/:filmId',
  DetailTV: '/tv/:filmId',
  FAQ: '/faq',
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  donate: '/donate',
  DetailTVSeason: 'tv/:filmId/season/:season_number',
  watchTV: '/tv/watch/:filmId',
  watchMovie: '/movie/watch/:filmId',
  forgot: '/forgot',
  peopleDetail: '/person/:personId',
  bookmarked: '/bookmarked',
};

export default routes;
