import { setFilterConfig } from 'app/filterSlice';
import { useAppDispatch } from 'hooks';
import { ConfigType } from 'models';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  FilterByCategory,
  FilterByCountry,
  FilterByDuration,
  FilterByGenre,
  FilterByYear,
  SortBy,
} from '../Filter';

// interface FilmFilterProps {}

function FilmFilter() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const [config, setConfig] = useState<ConfigType>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const changeConfig = (key: string, value: string | number) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [key]: value,
      }));
    };

    const sortType = searchParams.get('sort_by') || 'popularity.desc';
    changeConfig('sort_by', sortType);

    // const genreType = searchParams.getAll('genre') || [];
    // changeConfig('with_genres', genreType.toString());

    // const minRuntime = Number(searchParams.get('minRuntime')) || 0;
    // const maxRuntime = Number(searchParams.get('maxRuntime')) || 200;
    // changeConfig('with_runtime.gte', minRuntime);
    // changeConfig('with_runtime.lte', maxRuntime);

    // const releaseFrom = searchParams.get('from') || '2002-11-04';
    // const releaseTo = searchParams.get('to') || '2022-07-28';
    // changeConfig('primary_release_date.gte', releaseFrom);
    // changeConfig('primary_release_date.lte', releaseTo);
    // changeConfig('air_date.gte', releaseFrom);
    // changeConfig('air_date.lte', releaseTo);

    dispatch(setFilterConfig(config));
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
