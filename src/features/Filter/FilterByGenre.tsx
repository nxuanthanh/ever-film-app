import { useQuery } from '@tanstack/react-query';
import { defaultOptions } from 'docs/data';
import { useCurrentParams } from 'hooks';
import { OptionModel } from 'models';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { getGenreMovieList, getGenreTVList } from 'services';
import { customStyles } from 'utils';

function FilterByGenre() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [currentSearchParams] = useCurrentParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: genreMovie } = useQuery<OptionModel[], Error>(['home-movie'], getGenreMovieList);
  const { data: genreTV } = useQuery<OptionModel[], Error>(['home-tv'], getGenreTVList);

  const genreCombined = genreMovie?.concat(genreTV ? genreTV : [])?.reduce((acc: any, curr) => {
    if (!acc?.some((x: OptionModel) => x.value === curr.value)) {
      acc?.push(curr);
    }

    return acc;
  }, []);

  const genres =
    pathname === '/type/movie' ? genreMovie : pathname === '/type/show' ? genreTV : genreCombined;

  const chooseGenres = (option: any) => {
    const genresValue = option?.value;

    setSearchParams({
      ...currentSearchParams,
      genre: genresValue,
    });
  };

  const genresType = searchParams.get('genre') || '';

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="genre" className="mb-2 text-base text-white font-bold">
          {t('filter.filterTypeList.genres')}
        </label>
        <Select
          options={genres}
          styles={customStyles}
          defaultValue={defaultOptions}
          value={genres?.find((option: OptionModel) => option.value === genresType)}
          onChange={chooseGenres}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByGenre;
