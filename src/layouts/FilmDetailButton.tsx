import { Add, Eye, FacebookShare } from 'assets/icons';
import { Button } from 'components/common';
import Menu from 'components/Popper/Menu';
import {
  handleAddToWantToWatchList,
  handleAddToWatchedList,
  handleRemoveFromBookmark,
} from 'features/Bookmark/bookmarkAction';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { db, DetailMovie, DetailTV, User } from 'models';
import { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

interface FilmDetailButtonProps {
  genres: { id: number; name: string }[];
  detail?: DetailMovie | DetailTV;
}

function FilmDetailButton({ genres, detail }: FilmDetailButtonProps) {
  const [bookmarkedType, setBookmarkedType] = useState('');

  const currentUser = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const unsubDoc = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
      const bookmarked = doc.data()?.bookmarks.find((item: any) => item.id === detail?.id);
      setBookmarkedType(bookmarked?.bookmark_type);
    });

    return () => unsubDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, detail?.id]);

  const menuItemList = [
    {
      title: 'Thêm vào danh sách phim Đã xem',
      children: {
        data: [
          {
            title: 'Thêm vào danh sách phim Muốn xem',
            onClick: () =>
              handleAddToWantToWatchList(
                detail as DetailMovie,
                currentUser as User,
                setBookmarkedType
              ),
          },
          {
            title: 'Loại khỏi bộ sưu tập',
            onClick: () =>
              handleRemoveFromBookmark(
                detail as DetailMovie,
                currentUser as User,
                setBookmarkedType,
                bookmarkedType
              ),
          },
        ],
      },
      onClick: () =>
        handleAddToWatchedList(detail as DetailMovie, currentUser as User, setBookmarkedType),
    },
    {
      title: 'Thêm vào danh sách phim Muốn xem',
      children: {
        data: [
          { title: 'Thêm vào danh sách phim Đã xem', onClick: handleAddToWatchedList },
          {
            title: 'Loại khỏi bộ sưu tập',
            onClick: () =>
              handleRemoveFromBookmark(
                detail as DetailMovie,
                currentUser as User,
                setBookmarkedType,
                bookmarkedType
              ),
          },
        ],
      },
      onClick: () =>
        handleAddToWantToWatchList(detail as DetailMovie, currentUser as User, setBookmarkedType),
    },
  ];

  return (
    <div className="flex items-center justify-between mb-14">
      <div className="flex items-center">
        <Button
          className="bg-[#485fc7] px-4 py-[7px] mr-3 gap-[14.4px] rounded border-transparent"
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
            iconLeft={<Add className="text-white" />}
            title="Bộ sưu tập"
            onClick={() => navigate('/login')}
          />
        )}
      </div>
      <div className="flex items-center">
        {genres.map((genre, idx) => (
          <Button
            className="bg-transparent hover:bg-white hover:text-[#485fc7] border-white text-white text-xs !rounded-full !px-[15px] !py-[6px] transition-none"
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
