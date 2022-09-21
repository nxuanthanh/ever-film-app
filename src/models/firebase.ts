import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const provider = new GoogleAuthProvider();

// const app = initializeApp({
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// });

const firebaseConfig = {
  apiKey: 'AIzaSyA8Wd8XBRc4ghiam5srMFbhtw4n9RZ39xk',
  authDomain: 'ever-film-app.firebaseapp.com',
  projectId: 'ever-film-app',
  storageBucket: 'ever-film-app.appspot.com',
  messagingSenderId: '575013669625',
  appId: '1:575013669625:web:5d7bc41c332df40123b028',
  measurementId: 'G-XDGP8LZWBP',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
