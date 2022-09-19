import { setCurrentUser } from 'app/authSlice';
import { Footer, Header } from 'components';
import { SignIn, SignUp } from 'features/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAppDispatch } from 'hooks/useRedux';
import { auth, db } from 'models';
import { FAQ, FilmDetail, Home, HotMovies, Movies, NewMovies, Search, SeriesMovie } from 'page';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

function App() {
  const [tab, setTab] = useState('movie');
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      dispatch(setCurrentUser(null));
      return;
    }

    if (user.providerId === 'google.com' || user.providerId === 'facebook.com') {
      dispatch(
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid,
        })
      );
    } else {
      onSnapshot(doc(db, 'users', user.uid), (doc) => {
        console.log(doc.data());
        dispatch(
          setCurrentUser({
            displayName: doc.data()?.lastName + ' ' + doc.data()?.firstName || '',
            photoURL: doc.data()?.photoUrl || '',
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid,
          })
        );
      });
    }
  });

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
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="FAQ" element={<FAQ />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
