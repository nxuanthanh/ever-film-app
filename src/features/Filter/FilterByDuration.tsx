import { defaultOptions } from 'docs/data';
import { useCurrentParams } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { customStyles } from 'utils';

function FilterByDuration() {
  const [currentSearchParams] = useCurrentParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const durationOptions = [
    { value: 'all', label: '- Tất cả -' },
    { value: '0-30', label: 'Dưới 30 phút' },
    { value: '30-60', label: "30' - 1 tiếng" },
    { value: '60-90', label: '1 - 1.5 tiếng' },
    { value: '90-120', label: '1.5 - 2 tiếng' },
    { value: '120-150', label: '2 - 2.5 tiếng' },
    { value: '150-180', label: '2.5 - 3 tiếng' },
    { value: '180-1000', label: 'Trên 3 tiếng' },
  ];

  const chooseDuration = (option: any) => {
    const durationValue = option?.value;

    setSearchParams({
      ...currentSearchParams,
      duration: durationValue,
    });
  };

  const durationType = searchParams.get('duration') || '';

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="duration" className="mb-2 text-base text-white font-bold">
          Thời lượng:
        </label>

        <Select
          options={durationOptions}
          styles={customStyles}
          defaultValue={defaultOptions}
          value={durationOptions.find((option) => option.value === durationType)}
          onChange={chooseDuration}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByDuration;
