import { useQuery } from '@tanstack/react-query';
import { defaultOptions } from 'docs/data';
import { FilterProps, OptionModel } from 'models';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { getGenreMovieList, getGenreTVList } from 'services';
import { customStyles } from 'utils';

function FilterByGenre({ filters, onChange }: FilterProps) {
  const { pathname } = useLocation();

  const { data: genreMovie } = useQuery<OptionModel[], Error>(['home-movie'], getGenreMovieList);
  const { data: genreTV } = useQuery<OptionModel[], Error>(['home-tv'], getGenreTVList);

  // eslint-disable-next-line array-callback-return
  const genreCombined =
    genreMovie?.concat(genreTV ? genreTV : [])?.reduce((acc: any, curr) => {
      if (!acc?.some((x: OptionModel) => x.value === curr.value)) {
        acc?.push(curr);
      }

      return acc;
    }, []) || [];

  const genres =
    pathname === '/type/movie' ? genreTV : pathname === '/type/show' ? genreMovie : genreCombined;

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="genre" className="mb-2 text-base text-white font-bold">
          Thể loại:
        </label>
        <Select
          options={genres}
          styles={customStyles}
          defaultValue={defaultOptions}
          // value={categoryOptions.find((option) => option.value === sortType)}
          // onChange={chooseSort}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByGenre;
