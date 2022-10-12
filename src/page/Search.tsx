import { FilmItem } from 'components/common';
import { Item } from 'models';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchMovie } from 'services';

function Search() {
  const [searchResult, setSearchResult] = useState<Item[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const searchSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!searchValue.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
  };

  const handleOnInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

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
    <div className="container">
      <div className="mt-[100px] w-full mb-12">
        <form className="bg-white rounded mb-6" onSubmit={searchSubmitHandler}>
          <input
            className="w-full py-[11px] px-[14px] text-xl bg-transparent placeholder-gray-500 placeholder:font-light text-[#363636] outline-link"
            type="text"
            placeholder="Nhập tên phim..."
            value={searchValue}
            onChange={(e) => {
              handleOnInputChange(e);
            }}
            autoFocus={true}
          />
        </form>

        {searchValue && (
          <div className="mb-6">
            <span className="text-white">Nếu không thấy phim cần tìm, hãy thử </span>
            <a
              href={`https://www.google.com/search?q=${encodeURI(searchValue)}xemphim.fun`}
              className="text-Link cursor-pointer hover:text-hover-link transition-all duration-150 underline"
            >
              tìm với Google
            </a>
          </div>
        )}
        <div>
          <ul className="grid grid-cols-5 gap-6">
            {searchResult.map((item: Item, idx) => (
              <li key={idx} className="">
                <FilmItem film={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Search;
