import { Footer, Header } from 'components';
import { FAQ } from 'Layouts';
import { Home } from 'Page';
import { Outlet, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
        <Routes>
          <Route index element={<Home />} />
          <Route path="FAQ" element={<FAQ />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
