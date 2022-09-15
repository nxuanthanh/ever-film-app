import { Footer, Header } from 'components';
import { FAQ, Home, HotMovies, Movies, NewMovies, Search, SeriesMovie } from 'Page';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

function App() {
  const [tab, setTab] = useState('movie');

  return (
    <div>
      <Header currentTab={tab} onChange={setTab} />
      <div className="container">
        <Outlet />
        <Routes>
          <Route index element={<Home currentTab={tab} />} />
          <Route path="FAQ" element={<FAQ />} />
          <Route path="search" element={<Search />} />
          <Route path="top" element={<HotMovies />} />
          <Route path="type/movie" element={<Movies />} />
          <Route path="type/show" element={<SeriesMovie />} />
          <Route path="browser" element={<NewMovies />} />
          <Route path="FAQ" element={<FAQ />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
