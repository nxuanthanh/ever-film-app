import { defaultOptions } from 'docs/data';
import { useCurrentParams } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { customStyles } from 'utils';

function FilterByYear() {
  const { t } = useTranslation();

  const [currentSearchParams] = useCurrentParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const yearOptions = [
    { value: 'all', label: '- Tất cả -' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' },
    { value: '2013', label: '2013' },
    { value: '2012', label: '2012' },
    { value: 'before 2012', label: 'Trước 2012' },
  ];

  const chooseYear = (option: any) => {
    const yearValue = option?.value;

    setSearchParams({
      ...currentSearchParams,
      year: yearValue,
    });
  };

  const yearType = searchParams.get('year') || '';

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="year" className="mb-2 text-base text-white font-bold">
          {t('filter.filterTypeList.year')}
        </label>
        <Select
          name="year"
          options={yearOptions}
          styles={customStyles}
          defaultValue={defaultOptions}
          value={yearOptions.find((option) => option.value === yearType)}
          onChange={chooseYear}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByYear;
