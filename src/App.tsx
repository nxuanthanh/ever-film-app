import { Footer, Header } from 'components';
import { FAQ, FilmDetail, Home, HotMovies, Movies, NewMovies, Search, SeriesMovie } from 'page';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

function App() {
  const [tab, setTab] = useState('movie');

  return (
    <div>
      <Header currentTab={tab} onChange={setTab} />

      <Outlet />
      <Routes>
        <Route index element={<Home currentTab={tab} />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="search" element={<Search />} />
        <Route path="top" element={<HotMovies />} />
        <Route path="type/movie" element={<Movies />} />
        <Route path="type/show" element={<SeriesMovie />} />
        <Route path="browse" element={<NewMovies />} />
        <Route path="movie/:filmId" element={<FilmDetail />} />
        <Route path="tv/:filmId" element={<FilmDetail />} />
        <Route path="FAQ" element={<FAQ />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
