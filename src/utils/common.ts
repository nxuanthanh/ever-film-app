import { toast } from 'react-toastify';

export const resizeImage = (imageUrl: string, width: string = 'original'): string =>
  `${process.env.REACT_APP_IMAGE_URL}/${width}${imageUrl}`;

// export const embedMovie = (id: number): string =>
//   `${process.env.REACT_APP_EMBED_URL}/movie?tmdb=${id}`;

// export const embedTV = (id: number, season: number, episode: number): string =>
//   `${process.env.REACT_APP_EMBED_URL}/series?tmdb=${id}&sea=${season}&epi=${episode}`;

export const embedMovie = (id: number): string =>
  `${process.env.REACT_APP_EMBED_TO}/movie?id=${id}`;

export const embedTV = (id: number, season: number, episode: number): string =>
  `${process.env.REACT_APP_EMBED_TO}/tv?id=${id}&s=${season}&e=${episode}`;

export const calculateTimePassed = (time: number): string => {
  const unit = {
    năm: 12 * 30 * 7 * 24 * 60 * 60 * 1000,
    tháng: 30 * 7 * 24 * 60 * 60 * 1000,
    tuần: 7 * 24 * 60 * 60 * 1000,
    ngày: 24 * 60 * 60 * 1000,
    giờ: 60 * 60 * 1000,
    phút: 60 * 1000,
  };
  const diff = Date.now() - time;
  for (const key in unit) {
    if (diff > unit[key as keyof typeof unit]) {
      const timePassed = Math.floor(diff / unit[key as keyof typeof unit]);
      return `${timePassed} ${key} trước`;
    }
  }

  return 'Vừa xong';
};

export const convertErrorCodeToMessage = (errorCode: string) => {
  if (errorCode === 'auth/email-already-in-use') return 'Your email is already in use.';
  else if (errorCode === 'auth/user-not-found') return 'Your email may be incorrect.';
  else if (errorCode === 'auth/wrong-password') return 'Your password is incorrect.';
  else return 'Something weird happened.';
};

export const convertGenreIdToGenreName = (genreId: number) => {
  if (genreId === 28) return 'Action';
  else if (genreId === 12) return 'Adventure';
  else if (genreId === 16) return 'Animation';
  else if (genreId === 35) return 'Comedy';
  else if (genreId === 80) return 'Crime';
  else if (genreId === 99) return 'Documentary';
  else if (genreId === 18) return 'Drama';
  else if (genreId === 10751) return 'Family';
  else if (genreId === 14) return 'Fantasy';
  else if (genreId === 36) return 'History';
  else if (genreId === 27) return 'Horror';
  else if (genreId === 10402) return 'Music';
  else if (genreId === 9648) return 'Mystery';
  else if (genreId === 10749) return 'Romance';
  else if (genreId === 878) return 'Science Fiction';
  else if (genreId === 10770) return 'TV Movie';
  else if (genreId === 53) return 'Thriller';
  else if (genreId === 10752) return 'War';
  else if (genreId === 37) return 'Western';
  else if (genreId === 10759) return 'Action & Adventure';
  else if (genreId === 10762) return 'Kids';
  else if (genreId === 10763) return 'News';
  else if (genreId === 10764) return 'Reality';
  else if (genreId === 10765) return 'Sci-Fi & Fantasy';
  else if (genreId === 10766) return 'Soap';
  else if (genreId === 10767) return 'Talk';
  else if (genreId === 10768) return 'War & Politics';
  else return 'Nothing';
};

export const getRandomAvatar = (): string => {
  const avatars = [
    'https://i.ibb.co/zrXfKsJ/catface-7.jpg',
    'https://i.ibb.co/CJqGvY6/satthudatinh.jpg',
    'https://i.ibb.co/rd3PGq5/catface-9.png',
    'https://i.ibb.co/Htq4LWJ/catface-8.png',
    'https://i.ibb.co/9mPr2ds/catface-3.jpg',
    'https://i.ibb.co/b6TT6Y4/catface-6.jpg',
    'https://i.ibb.co/0pNx0nv/catface-4.jpg',
    'https://i.ibb.co/StzXrVH/catface.jpg',
    'https://i.ibb.co/KDdd4zN/catface-2.jpg',
    'https://i.ibb.co/stB42Nb/catface-5.jpg',
  ];

  return avatars[Math.floor(Math.random() * avatars.length)];
};

export const notifySuccess = (
  message: string,
  position:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left' = 'top-center'
) => {
  toast.success(message, {
    position: position,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyError = (
  message: string,
  position:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left' = 'top-center'
) => {
  toast.error(message, {
    position: position,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const customStyles = {
  control: (styles: any) => ({
    ...styles,
    height: '40px',
    border: 0,
    boxShadow: 'none',
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => ({
    ...styles,
    color: isSelected ? 'white' : '#363636',
    padding: '0 0 0 10px',
  }),

  singleValue: (provided: any) => {
    return { ...provided };
  },

  menu: (styles: any) => ({
    ...styles,
    zIndex: 5,
    marginTop: '2px',
  }),
};
