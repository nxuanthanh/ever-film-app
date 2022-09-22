import { setCurrentUser } from 'app/authSlice';
import { Footer, Header } from 'components';
import { Forgot, SignIn, SignUp } from 'features/Auth/page';
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
  WatchFilm,
} from 'page';
import { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tab, setTab] = useState('movie');
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(setCurrentUser(null));
        console.log('user is not logged in');
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
      <Header currentTab={tab} onChange={setTab} />

      <Outlet />
      <Routes>
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route index element={<Home currentTab={tab} />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="search" element={<Search />} />
        <Route path="top" element={<HotMovies />} />
        <Route path="type/movie" element={<Movies />} />
        <Route path="type/show" element={<SeriesMovie />} />
        <Route path="browse" element={<NewMovies />} />
        <Route path="movie/:movieId" element={<MovieDetail />} />
        <Route path="tv/:tvId" element={<TVDetail />} />
        <Route path="tv/:tv_id/season/:season_number" element={<TVSeasonDetail />} />
        <Route path="watch/:filmId" element={<WatchFilm />} />
        <Route path="person/:personId" element={<PeopleDetail />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="FAQ" element={<FAQ />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
