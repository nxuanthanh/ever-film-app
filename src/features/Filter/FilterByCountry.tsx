import { useQuery } from '@tanstack/react-query';
import { FilterProps, OptionModel } from 'models';
import { getRegions } from 'services';
import { customStyles } from 'utils';
import Select from 'react-select';
import { defaultOptions } from 'docs/data';

function FilterByCountry({ filters, onChange }: FilterProps) {
  const { data } = useQuery<OptionModel[], Error>(['regions'], getRegions);

  const countryOptions = data;

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="country" className="mb-2 text-base text-white font-bold">
          Quốc gia:
        </label>
        <Select
          options={countryOptions}
          styles={customStyles}
          defaultValue={defaultOptions}
          // value={durationOptions.find((option) => option.value === sortType)}
          // onChange={chooseSort}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByCountry;
