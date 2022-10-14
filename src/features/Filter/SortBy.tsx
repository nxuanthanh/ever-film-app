import { sortOptions } from 'docs/data';
import { useCurrentParams } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { customStyles } from 'utils';

function SortBy() {
  const { t } = useTranslation();
  const [currentSearchParams] = useCurrentParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const chooseSort = (option: any) => {
    const sortValue = option?.value || '';

    setSearchParams({
      ...currentSearchParams,
      sort_by: sortValue,
    });
  };

  const sortType = searchParams.get('sort_by') || 'popularity.desc';

  return (
    <div className="flex flex-col items-start justify-center p-3 w-full">
      <label htmlFor="sort_by" className="mb-2 text-base text-white font-bold">
        {t('filter.filterTypeList.sort')}
      </label>
      <Select
        options={sortOptions}
        styles={customStyles}
        defaultValue={sortOptions[0]}
        value={sortOptions.find((option) => option.value === sortType)}
        onChange={chooseSort}
        className="w-full"
      />
    </div>
  );
}

export default SortBy;
