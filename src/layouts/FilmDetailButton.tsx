import { FacebookShare } from 'assets/icons';
import { Button } from 'components/common';
import BookmarkBtn from 'features/Bookmark/BookmarkBtn';
import { DetailMovie, DetailTV } from 'models';
import { FacebookShareButton } from 'react-share';
import { ToastContainer } from 'react-toastify';

interface FilmDetailButtonProps {
  genres: { id: number; name: string }[];
  detail?: DetailMovie | DetailTV;
}

function FilmDetailButton({ genres, detail }: FilmDetailButtonProps) {
  return (
    <div className="flex items-center justify-between mb-14">
      <div className="flex items-center">
        <FacebookShareButton
          url={`https://ever-film-app-wneh.vercel.app/${
            detail?.media_type === 'tv' ? 'tv' : 'movie'
          }/watch/${detail?.id}`}
          hashtag={'#hashtag'}
        >
          <div className="inline-flex items-center justify-center border mr-3 text-white text-base bg-[#485fc7] px-4 py-[7px] gap-[14.4px] rounded border-transparent">
            <FacebookShare />
            <span>Chia sẻ</span>
          </div>
        </FacebookShareButton>

        <BookmarkBtn detail={detail as DetailMovie | DetailTV} />
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
