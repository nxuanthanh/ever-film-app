import { setCurrentUser } from 'app/authSlice';
import { Footer, Header } from 'components/common';
import config from 'config';
import { Forgot, SignIn, SignUp } from 'features/Auth/page';
import { Bookmarked } from 'features/Bookmark';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAppDispatch } from 'hooks/useRedux';
import { auth, db } from 'models';
import {
  FAQ,
  Home,
  HotMovies,
  MovieDetail,
  Movies,
  NewMovies,
  PeopleDetail,
  Search,
  SeriesMovie,
  TVDetail,
  TVSeasonDetail,
  WatchMovie,
  WatchTV,
} from 'page';
import { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from 'utils';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(setCurrentUser(null));
        return;
      }

      if (
        user.providerData[0].providerId === 'google.com' ||
        user.providerData[0].providerId === 'facebook.com'
      ) {
        onSnapshot(doc(db, 'users', user.uid), (doc) => {
          dispatch(
            setCurrentUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL || '',
              // user.photoURL + "?access_token=" + doc.data()?.token || "",
              // doc.data()?.photoUrl.startsWith("https://i.ibb.co") ?
            })
          );
        });
      } else {
        onSnapshot(doc(db, 'users', user.uid), (doc) => {
          dispatch(
            setCurrentUser({
              uid: user.uid,
              displayName: doc.data()?.displayName,
              photoURL: doc.data()?.photoUrl || '',
              email: user.email,
              emailVerified: user.emailVerified,
            })
          );
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />

      <Outlet />
      <Routes>
        <Route index element={<Home />} />

        <Route path={config.routes.login} element={<SignIn />} />
        <Route path={config.routes.signup} element={<SignUp />} />

        <Route path={config.routes.FAQ} element={<FAQ />} />
        <Route path={config.routes.search} element={<Search />} />
        <Route path={config.routes.hot} element={<HotMovies />} />
        <Route path={config.routes.new} element={<NewMovies />} />

        <Route path={config.routes.movie} element={<Movies />} />
        <Route path={config.routes.detailMovie} element={<MovieDetail />} />
        <Route path={config.routes.watchMovie} element={<WatchMovie />} />

        <Route path={config.routes.TVSeries} element={<SeriesMovie />} />
        <Route path={config.routes.DetailTV} element={<TVDetail />} />
        <Route path={config.routes.DetailTVSeason} element={<TVSeasonDetail />} />
        <Route path={config.routes.watchTV} element={<WatchTV />} />

        <Route path={config.routes.peopleDetail} element={<PeopleDetail />} />
        <Route path={config.routes.forgot} element={<Forgot />} />
        <Route path={config.routes.bookmarked} element={<Bookmarked />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
