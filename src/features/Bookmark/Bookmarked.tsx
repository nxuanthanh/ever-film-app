import { Skeleton, Title } from 'components/common';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { db, Item } from 'models';
import { useEffect, useState } from 'react';
import BookmarkResult from './BookmarkResult';

// interface BookmarkedProps {}

function Bookmarked() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [bookmarkedFilms, setBookmarkedFilms] = useState<Item[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selections, setSelections] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(!Boolean(bookmarkedFilms.length));
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const unsubDoc = onSnapshot(
      doc(db, 'users', currentUser?.uid),
      (doc) => {
        setBookmarkedFilms(doc.data()?.bookmarks.slice().reverse());
        setIsLoading(false);
      },
      (error) => {
        alert(error);
        setBookmarkedFilms([]);
        setIsLoading(false);
        setIsError(true);
      }
    );

    return () => unsubDoc();
  }, [currentUser]);

  if (isError) return <div>ERROR</div>;

  return (
    <>
      <Title value="Bộ sưu tập phim" />

      <div className="mt-24">
        <div className="container">
          <h1 className="text-white font-semibold text-[32px] mb-6 text-center">
            Bộ sưu tập phim của bạn
          </h1>
          <h2 className="text-white font-semibold text-2xl mb-6">Các phim bạn muốn xem:</h2>
          <div className="text-[#7a7a7a]">
            Bạn chưa thêm phim nào vào danh sách này <br />
            <br />
            <br />
          </div>

          <hr className="border-t-2 border-t-white my-6" />

          <h2 className="text-white font-semibold text-2xl mb-6">Các phim bạn đã xem:</h2>
          <BookmarkResult
            films={bookmarkedFilms}
            isEditing={isEditing}
            selections={selections}
            setSelections={setSelections}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default Bookmarked;
