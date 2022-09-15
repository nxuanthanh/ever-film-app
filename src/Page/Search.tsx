import { Item } from 'models';
import { FormEvent, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import { getSearchMovie } from 'services';
import { resizeImage } from 'utils';

interface SearchProps {
  autoFocus?: boolean;
}

function Search({ autoFocus = false }: SearchProps) {
  const [searchResult, setSearchResult] = useState<Item[]>([]);
  const [searchValue, setSearchValue] = useState(' ');

  const navigate = useNavigate();

  const searchSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!searchValue.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
  };

  const handleOnInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  console.log(searchResult);

  useEffect(() => {
    (async () => {
      try {
        if (!searchValue.trim()) return;
        const movies = await getSearchMovie(searchValue.trim());
        setSearchResult(movies);
      } catch (error) {
        console.log('something went wrong when trying to search', error);
      }
    })();
  }, [searchValue]);

  return (
    <div className="mt-[100px] w-full">
      <form className="bg-white rounded mb-6" onSubmit={searchSubmitHandler}>
        <input
          className="w-full py-[11px] px-[14px] text-xl bg-transparent placeholder-gray-500 placeholder:font-light text-[#363636] outline-[#428bca]"
          type="text"
          placeholder="Nhập tên phim..."
          value={searchValue}
          onChange={(e) => {
            handleOnInputChange(e);
          }}
          autoFocus={autoFocus}
        />
      </form>

      {searchValue && (
        <div className="mb-6">
          <span className="text-white">Nếu không thấy phim cần tìm, hãy thử </span>
          <a
            href={`https://www.google.com/search?q=${encodeURI(searchValue)}xemphim.fun`}
            className="text-[#428bca] cursor-pointer hover:text-[#dcf836] transition-all duration-150 underline"
          >
            tìm với Google
          </a>
        </div>
      )}
      <div>
        <ul className="grid grid-cols-5 gap-6">
          {searchResult.map((item: Item, idx) => (
            <li key={idx} className="">
              <Link to={`movie/${item.id}`}>
                <div className="flex flex-col justify-between shadow-sm pb-2 overflow-hidden hover:brightness-110 transition duration-300 relative group min-h-full">
                  <LazyLoadImage
                    src={resizeImage(item.poster_path)}
                    className="object-cover h-[371px]"
                    effect="blur"
                  />

                  <div>
                    <p className="text-left whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 group-hover:text-white transition duration-300">
                      {item.title || item.name}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
