import { useAppDispatch } from 'hooks';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  FilterByCategory,
  FilterByCountry,
  FilterByDuration,
  FilterByGenre,
  FilterByYear,
  SortBy,
} from '../Filter';

interface FilmFilterProps {
  setConfig: Function;
}

function FilmFilter({ setConfig }: FilmFilterProps) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const changeConfig = (key: string, value: string | number) => {
      setConfig((prevConfig: any) => ({
        ...prevConfig,
        [key]: value,
      }));
    };

    // const categoryType = searchParams.get('category') || '';
    // changeConfig('with_type', categoryType);

    const sortType = searchParams.get('sort_by') || 'popularity.desc';
    changeConfig('sort_by', sortType);

    const genreType = searchParams.get('genre') || '';
    changeConfig('with_genres', genreType);

    const countryType = searchParams.get('country') || '';
    changeConfig('watch_region', countryType);

    const duration = searchParams.get('duration')?.split('-') || [0, 180];

    changeConfig('with_runtime.gte', Number(duration[0]));
    changeConfig('with_runtime.lte', Number(duration[1]));

    const releaseDate = searchParams.get('year') || '';
    changeConfig('first_air_date_year', Number(releaseDate));

    // eslint-disable-next-line
  }, [location.search]);

  return (
    <div className="flex items-center justify-between flex-1">
      <FilterByCategory />
      <FilterByGenre />
      <FilterByCountry />
      <FilterByYear />
      {pathname !== '/type/show' && <FilterByDuration />}
      <SortBy />
    </div>
  );
}

export default FilmFilter;
