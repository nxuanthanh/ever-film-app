import { useQuery } from '@tanstack/react-query';
import { FilterProps } from 'models';
import { getRegions } from 'services';
import { customStyles } from 'utils';
import Select from 'react-select';

interface RegionsProps {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

function FilterByCountry({ filters, onChange }: FilterProps) {
  const { data } = useQuery<RegionsProps[], Error>(['regions'], getRegions);

  const countryOptions = [
    { value: '', label: '- Tất cả -' },
    ...(data?.map((item: RegionsProps) => ({ value: item.iso_3166_1, label: item.english_name })) ||
      []),
  ];

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="country" className="mb-2 text-base text-white font-bold">
          Quốc gia:
        </label>
        <Select
          options={countryOptions}
          styles={customStyles}
          defaultValue={countryOptions[0]}
          // value={durationOptions.find((option) => option.value === sortType)}
          // onChange={chooseSort}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByCountry;
