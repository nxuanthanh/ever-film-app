import { useQuery } from '@tanstack/react-query';
import { defaultOptions } from 'docs/data';
import { useCurrentParams } from 'hooks';
import { FilterProps, OptionModel } from 'models';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { getRegions } from 'services';
import { customStyles } from 'utils';

function FilterByCountry({ filters, onChange }: FilterProps) {
  const [currentSearchParams] = useCurrentParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: countryOptions } = useQuery<OptionModel[], Error>(['regions'], getRegions);

  const chooseCountry = (option: any) => {
    const countryValue = option?.value;

    setSearchParams({
      ...currentSearchParams,
      country: countryValue,
    });
  };

  const countryType = searchParams.get('country') || '';
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
          value={countryOptions?.find((option) => option.value === countryType)}
          onChange={chooseCountry}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByCountry;
