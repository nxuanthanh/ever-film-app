import { FilterProps } from 'models';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { customStyles } from 'utils';

function FilterByCategory({ filters, onChange }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeOptions = [
    { value: '', label: '- Tất cả -' },
    { value: 'movie', label: 'Phim Lẻ' },
    { value: 'tv', label: 'Phim Bộ' },
  ];

  const sortType = searchParams.get('category') || 'popularity.desc';

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="category" className="mb-2 text-base text-white font-bold">
          Loại phim:
        </label>
        <Select
          options={typeOptions}
          styles={customStyles}
          defaultValue={typeOptions[0]}
          value={typeOptions.find((option) => option.value === sortType)}
          // onChange={chooseSort}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByCategory;
