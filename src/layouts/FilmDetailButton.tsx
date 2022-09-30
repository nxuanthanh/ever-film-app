import { Add, FacebookShare } from 'assets/icons';
import { Button } from 'components/common';
import Menu from 'components/Popper/Menu';
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { db, DetailMovie, DetailTV } from 'models';
import { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from 'utils';

interface FilmDetailButtonProps {
  genres: { id: number; name: string }[];
  detail?: DetailMovie | DetailTV;
}

function FilmDetailButton({ genres, detail }: FilmDetailButtonProps) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const unsubDoc = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
      setIsBookmarked(doc.data()?.bookmarks.some((item: any) => item.id === detail?.id));
    });

    return () => unsubDoc();
  }, [currentUser, detail?.id]);

  const handleAddToWatchedList = async () => {
    console.log('firstName');
    if (!detail) return;

    if (!currentUser) {
      notifyError('You need to sign in to bookmark films', 'top-right');
      return;
    }

    await updateDoc(doc(db, 'users', currentUser.uid), {
      bookmarks: !isBookmarked
        ? arrayUnion({
            poster_path: detail?.poster_path,
            id: detail?.id,
            vote_average: detail?.vote_average,
            media_type: detail?.media_type,
            ...(detail?.media_type === 'movie' && { title: detail?.title }),
            ...(detail?.media_type === 'tv' && { name: detail?.name }),
          })
        : arrayRemove({
            poster_path: detail?.poster_path,
            id: detail?.id,
            vote_average: detail?.vote_average,
            media_type: detail?.media_type,
            ...(detail?.media_type === 'movie' && { title: detail?.title }),
            ...(detail?.media_type === 'tv' && { name: detail?.name }),
          }),
    });

    notifySuccess(
      `${
        !isBookmarked ? 'This film is now bookmarked' : 'This film is removed from your bookmarks'
      }`,
      'top-right'
    );
  };

  const handleAddToWantToWatchList = () => {
    console.log('WantToWatch');
  };

  const handleRemoveFromBookmark = () => {
    console.log('Remove');
  };

  const menuItemList = [
    {
      title: 'Thêm vào danh sách phim Đã xem',
      children: {
        data: [
          { title: 'Thêm vào danh sách phim Muốn xem', onClick: handleAddToWatchedList },
          { title: 'Loại khỏi bộ sưu tập', onClick: handleRemoveFromBookmark },
        ],
      },
      onClick: handleAddToWatchedList,
    },
    {
      title: 'Thêm vào danh sách phim Muốn xem',
      children: {
        data: [
          { title: 'Thêm vào danh sách phim Đã xem', onClick: handleAddToWantToWatchList },
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
            <Button
              className="bg-transparent border-lam px-4 py-[7px] gap-2 text-lam rounded mr-0 hover:bg-lam hover:text-white"
              onClick={() => console.log('first')}
              iconLeft={<Add className="text-white" />}
              title="Bộ sưu tập"
            />
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
            className="bg-transparent hover:bg-white hover:text-[#485fc7] border-white text-white text-xs !rounded-full mr-2 px-[15px] py-[5px]"
            onClick={() => console.log('first')}
            title={genre.name}
            key={idx}
            to={`/genre/${genre.name}`}
          />
        ))}
      </div>
    </div>
  );
}

export default FilmDetailButton;
