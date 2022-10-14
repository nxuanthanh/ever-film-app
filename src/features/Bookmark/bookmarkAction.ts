import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, DetailMovie, DetailTV, FilmItemModel, User } from 'models';
import { notifyError, notifySuccess } from 'utils';

export const handleAddToWantToWatchList = async (
  detail: DetailMovie | DetailTV,
  currentUser: User,
  setBookmarkedType: Function
) => {
  if (!detail) return;

  if (!currentUser) {
    notifyError('You need to sign in to bookmark films', 'top-right');
    return;
  }

  await getDoc(doc(db, 'users', currentUser.uid)).then((docSnap) => {
    const isAlreadyStored = docSnap
      .data()
      ?.bookmarks.some((bookmarks: FilmItemModel) => bookmarks.id === detail?.id);

    if (!isAlreadyStored) {
      updateDoc(doc(db, 'users', currentUser.uid), {
        bookmarks: arrayUnion({
          poster_path: detail?.poster_path,
          id: detail?.id,
          vote_average: detail?.vote_average,
          media_type: detail?.media_type,
          bookmark_type: 'expected',
          ...(detail?.media_type === 'movie' && { title: detail?.title }),
          ...(detail?.media_type === 'tv' && { name: detail?.name }),
        }),
      });
    } else {
      const updatedRecentlyBookmark = docSnap
        .data()
        ?.bookmarks.filter((bookmarks: FilmItemModel) => bookmarks.id !== detail?.id)
        .concat({
          poster_path: detail?.poster_path,
          id: detail?.id,
          vote_average: detail?.vote_average,
          media_type: detail?.media_type,
          bookmark_type: 'expected',
          ...(detail?.media_type === 'movie' && { title: detail?.title }),
          ...(detail?.media_type === 'tv' && { name: detail?.name }),
        });

      updateDoc(doc(db, 'users', currentUser.uid), {
        bookmarks: updatedRecentlyBookmark,
      });
    }
  });

  setBookmarkedType('expected');
  notifySuccess('Đã thêm vào danh sách phim muốn xem', 'top-right');
};

export const handleAddToWatchedList = async (
  detail: DetailMovie | DetailTV,
  currentUser: User,
  setBookmarkedType: Function
) => {
  if (!detail) return;

  if (!currentUser) {
    notifyError('You need to sign in to bookmark films', 'top-right');
    return;
  }
  await getDoc(doc(db, 'users', currentUser.uid)).then((docSnap) => {
    const isAlreadyStored = docSnap
      .data()
      ?.bookmarks.some((bookmarks: FilmItemModel) => bookmarks.id === detail?.id);

    if (!isAlreadyStored) {
      updateDoc(doc(db, 'users', currentUser.uid), {
        bookmarks: arrayUnion({
          poster_path: detail?.poster_path,
          id: detail?.id,
          vote_average: detail?.vote_average,
          media_type: detail?.media_type,
          bookmark_type: 'watched',
          ...(detail?.media_type === 'movie' && { title: detail?.title }),
          ...(detail?.media_type === 'tv' && { name: detail?.name }),
        }),
      });
    } else {
      const updatedRecentlyWached = docSnap
        .data()
        ?.bookmarks.filter((bookmarks: FilmItemModel) => bookmarks.id !== detail?.id)
        .concat({
          poster_path: detail?.poster_path,
          id: detail?.id,
          vote_average: detail?.vote_average,
          media_type: detail?.media_type,
          bookmark_type: 'watched',
          ...(detail?.media_type === 'movie' && { title: detail?.title }),
          ...(detail?.media_type === 'tv' && { name: detail?.name }),
        });

      updateDoc(doc(db, 'users', currentUser.uid), {
        bookmarks: updatedRecentlyWached,
      });
    }
  });

  setBookmarkedType('watched');
  notifySuccess('Đã thêm vào danh sách phim đã xem', 'top-right');
};

export const handleRemoveFromBookmark = async (
  detail: DetailMovie | DetailTV,
  currentUser: User,
  setBookmarkedType: Function,
  bookmarkType: string
) => {
  console.log(bookmarkType, 'bookmarkType');
  if (!detail) return;

  if (!currentUser) {
    notifyError('You need to sign in to bookmark films', 'top-right');
    return;
  }

  await updateDoc(doc(db, 'users', currentUser.uid), {
    bookmarks: arrayRemove({
      poster_path: detail?.poster_path,
      id: detail?.id,
      vote_average: detail?.vote_average,
      media_type: detail?.media_type,
      bookmark_type: bookmarkType,
      ...(detail?.media_type === 'movie' && { title: detail?.title }),
      ...(detail?.media_type === 'tv' && { name: detail?.name }),
    }),
  });

  setBookmarkedType('');
  notifySuccess('Đã xoá phim khỏi bộ sưu tập', 'top-right');
};
