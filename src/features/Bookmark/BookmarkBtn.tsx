import { Add, Eye } from 'assets/icons';
import { Button } from 'components/common';
import Menu from 'components/Popper/Menu';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { db, DetailMovie, DetailTV, User } from 'models';
import { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  handleAddToWantToWatchList,
  handleAddToWatchedList,
  handleRemoveFromBookmark,
} from './bookmarkAction';

interface BookmarkBtnProps {
  detail: DetailMovie | DetailTV;
}

function BookmarkBtn({ detail }: BookmarkBtnProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [bookmarkedType, setBookmarkedType] = useState('');

  const currentUser = useAppSelector((state) => state.auth.user);

  const menuItemList = [
    [
      {
        title: 'Thêm vào danh sách phim Đã xem',

        onClick: () =>
          handleAddToWatchedList(
            detail as DetailMovie | DetailTV,
            currentUser as User,
            setBookmarkedType
          ),
      },
      {
        title: 'Thêm vào danh sách phim Muốn xem',
        onClick: () =>
          handleAddToWantToWatchList(
            detail as DetailMovie | DetailTV,
            currentUser as User,
            setBookmarkedType
          ),
      },
    ],
    [
      {
        title: 'Thêm vào danh sách phim Muốn xem',
        onClick: () =>
          handleAddToWantToWatchList(
            detail as DetailMovie | DetailTV,
            currentUser as User,
            setBookmarkedType
          ),
      },
      {
        title: 'Loại khỏi bộ sưu tập',
        onClick: () =>
          handleRemoveFromBookmark(
            detail as DetailMovie | DetailTV,
            currentUser as User,
            setBookmarkedType,
            bookmarkedType
          ),
      },
    ],
    [
      {
        title: 'Thêm vào danh sách phim Đã xem',
        onClick: () =>
          handleAddToWatchedList(
            detail as DetailMovie | DetailTV,
            currentUser as User,
            setBookmarkedType
          ),
      },
      {
        title: 'Loại khỏi bộ sưu tập',
        onClick: () =>
          handleRemoveFromBookmark(
            detail as DetailMovie | DetailTV,
            currentUser as User,
            setBookmarkedType,
            bookmarkedType
          ),
      },
    ],
  ];
  console.log(bookmarkedType);

  const menuList =
    bookmarkedType === 'watched'
      ? menuItemList[1]
      : bookmarkedType === 'expected'
      ? menuItemList[2]
      : menuItemList[0];

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

  return (
    <>
      {currentUser ? (
        <Menu items={menuList} placement={'bottom-start'} offset={[0, 4]} layout="btn-bookmark">
          {bookmarkedType === 'watched' ? (
            <Button
              className={`${
                pathname.includes('watch')
                  ? '!px-[12px] !py-[6px] text-xs !rounded-[2px]'
                  : 'py-[7px] rounded'
              } bg-[#f5f5f5] gap-2 border-transparent text-[#000000b3] hover:opacity-90}`}
              iconLeft={<HiCheck size={`${pathname.includes('watch') ? '14' : '24'}`} />}
              title="Đã xem"
            />
          ) : bookmarkedType === 'expected' ? (
            <Button
              className={`${
                pathname.includes('watch')
                  ? '!px-[12px] !py-[6px] text-xs !rounded-[2px]'
                  : 'py-[7px] rounded'
              } border-transparent gap-2 bg-[#ffe08a] text-[#000000B3] hover:opacity-90`}
              iconLeft={
                <Eye
                  className="text-[#7a7a7a]"
                  width={`${pathname.includes('watch') ? '17' : '23.4'}`}
                  height={`${pathname.includes('watch') ? '14' : '20.8'}`}
                />
              }
              title="Mong muốn"
            />
          ) : (
            <Button
              className={`${
                pathname.includes('watch')
                  ? '!px-[12px] !py-[6px] mb-2 gap-[10px] !rounded-[2px] text-xs'
                  : 'bg-transparent px-4 py-[7px] gap-2 rounded mr-0'
              }border-lam hover:bg-lam hover:border-lam hover:text-white text-lam`}
              iconLeft={
                <Add
                  className="text-white"
                  width={`${pathname.includes('watch') ? '14' : '15.6'}`}
                  height={`${pathname.includes('watch') ? '14' : '20.8'}`}
                />
              }
              title="Bộ sưu tập"
            />
          )}
        </Menu>
      ) : (
        <Button
          className={`${
            pathname.includes('watch')
              ? '!px-[12px] !py-[6px] mb-2 gap-[10px] !rounded-[2px] text-xs'
              : 'bg-transparent px-4 py-[7px] gap-2 rounded mr-0'
          }border-lam hover:bg-lam hover:text-white text-lam`}
          iconLeft={
            <Add
              className="text-white"
              width={`${pathname.includes('watch') ? '14' : '15.6'}`}
              height={`${pathname.includes('watch') ? '14' : '20.8'}`}
            />
          }
          title="Bộ sưu tập"
          onClick={() => navigate('/login')}
        />
      )}
    </>
  );
}

export default BookmarkBtn;
