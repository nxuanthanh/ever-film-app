import { Add, Eye, FacebookShare } from 'assets/icons';
import { Button } from 'components/common';
import Menu from 'components/Popper/Menu';
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { db, DetailMovie, DetailTV } from 'models';
import { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess } from 'utils';

interface FilmDetailButtonProps {
  genres: { id: number; name: string }[];
  detail?: DetailMovie | DetailTV;
}

function FilmDetailButton({ genres, detail }: FilmDetailButtonProps) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [bookmarked, setBookmarked] = useState<any>();
  const [bookmarkedType, setBookmarkedType] = useState('');

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const unsubDoc = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
      setBookmarked(doc.data()?.bookmarks.find((item: any) => item.id === detail?.id));
    });

    setBookmarkedType(bookmarked?.bookmark_type);

    return () => unsubDoc();
  }, [currentUser, detail?.id, bookmarked]);

  const handleAddToWatchedList = async () => {
    if (!detail) return;

    if (!currentUser) {
      notifyError('You need to sign in to bookmark films', 'top-right');
      return;
    }

    await updateDoc(doc(db, 'users', currentUser.uid), {
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

    setBookmarkedType('watched');
    notifySuccess('xem roi ne', 'top-right');
  };

  const handleAddToWantToWatchList = async () => {
    if (!detail) return;

    if (!currentUser) {
      notifyError('You need to sign in to bookmark films', 'top-right');
      return;
    }

    await updateDoc(doc(db, 'users', currentUser.uid), {
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

    setBookmarkedType('expected');
    notifySuccess('muon xem ne', 'top-right');
  };

  const handleRemoveFromBookmark = async () => {
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
        bookmark_type: bookmarkedType,
        ...(detail?.media_type === 'movie' && { title: detail?.title }),
        ...(detail?.media_type === 'tv' && { name: detail?.name }),
      }),
    });

    setBookmarkedType('');
    notifySuccess('xoa roi ne', 'top-right');
  };

  const menuItemList = [
    {
      title: 'Thêm vào danh sách phim Đã xem',
      children: {
        data: [
          { title: 'Thêm vào danh sách phim Muốn xem', onClick: handleAddToWantToWatchList },
          { title: 'Loại khỏi bộ sưu tập', onClick: handleRemoveFromBookmark },
        ],
      },
      onClick: handleAddToWatchedList,
    },
    {
      title: 'Thêm vào danh sách phim Muốn xem',
      children: {
        data: [
          { title: 'Thêm vào danh sách phim Đã xem', onClick: handleAddToWatchedList },
          { title: 'Loại khỏi bộ sưu tập', onClick: handleRemoveFromBookmark },
        ],
      },
      onClick: handleAddToWantToWatchList,
    },
  ];
  return (
    <div className="flex items-center justify-between mb-14">
      <div className="flex items-center">
        <Button
          className="bg-[#485fc7] px-4 py-[7px] mr-3 gap-[14.4px] rounded border-transparent"
          onClick={() => console.log('first')}
          iconLeft={<FacebookShare />}
          title="Chia sẻ"
        />

        {currentUser ? (
          <Menu
            items={menuItemList}
            placement={'bottom-start'}
            offset={[0, 4]}
            layout="btn-bookmark"
          >
            {bookmarkedType === 'watched' ? (
              <Button
                className="bg-[#f5f5f5] border-transparent px-4 py-[7px] gap-2 text-[#000000b3] rounded mr-0 hover:opacity-90"
                iconLeft={<HiCheck size={24} />}
                title="Đã xem"
              />
            ) : bookmarkedType === 'expected' ? (
              <Button
                className="border-transparent px-4 py-[7px] gap-2 text-[#000000b3] rounded mr-0 bg-[#ffe08a]"
                iconLeft={<Eye className="text-[#7a7a7a]" />}
                title="Mong muốn"
              />
            ) : (
              <Button
                className="bg-transparent border-lam px-4 py-[7px] gap-2 text-lam rounded mr-0 hover:bg-lam hover:text-white"
                iconLeft={<Add className="text-white" />}
                title="Bộ sưu tập"
              />
            )}
          </Menu>
        ) : (
          <Button
            className="bg-transparent border-lam px-4 py-[7px] gap-2 text-lam rounded mr-0 hover:bg-lam hover:text-white"
            onClick={() => console.log('first')}
            iconLeft={<Add className="text-white" />}
            title="Bộ sưu tập"
          />
        )}
      </div>
      <div className="flex items-center">
        {genres.map((genre, idx) => (
          <Button
            className="bg-transparent hover:bg-white hover:text-[#485fc7] border-white text-white text-xs !rounded-full mr-2 !px-[15px] !py-[6px]"
            onClick={() => console.log('first')}
            title={genre.name}
            key={idx}
            to={`/genre/${genre.name}`}
          />
        ))}
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default FilmDetailButton;
