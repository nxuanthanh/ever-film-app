import FilmItem from 'components/common/FilmItem';
import { Item } from 'models';

interface BookmarkResultProps {
  films: Item[];
  isLoading: boolean;
  pageType?: string;
}

function BookmarkResult({ films, isLoading, pageType }: BookmarkResultProps) {
  return (
    <>
      {films.length === 0 && !isLoading && (
        <div className="text-white text-2xl text-center col-span-full mt-10">
          <p className="mt-5">
            {pageType === 'bookmark'
              ? "Your bookmark list for this type is empty. Let's bookmark some!"
              : "Your recently watched films for this type is empty. Let's watch some! "}
          </p>
        </div>
      )}
      <ul className="grid grid-cols-5 gap-4">
        {films.length > 0 &&
          films.map((item) => (
            <li key={item.id} className="list-none">
              <FilmItem film={item} />
            </li>
          ))}
      </ul>
    </>
  );
}

export default BookmarkResult;
