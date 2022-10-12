import { defaultOptions } from 'docs/data';
import { useCurrentParams } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { customStyles } from 'utils';

function FilterByCategory() {
  const [currentSearchParams] = useCurrentParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const typeOptions = [
    { value: '', label: '- Tất cả -' },
    { value: 'movie', label: 'Phim Lẻ' },
    { value: 'tv', label: 'Phim Bộ' },
  ];

  const chooseCategory = (option: any) => {
    const categoryValue = option?.value;

    setSearchParams({
      ...currentSearchParams,
      category: categoryValue,
    });
  };

  const categoryType = searchParams.get('category') || 'movie';

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="category" className="mb-2 text-base text-white font-bold">
          Loại phim:
        </label>
        <Select
          options={typeOptions}
          styles={customStyles}
          defaultValue={defaultOptions}
          value={typeOptions.find((option) => option.value === categoryType)}
          onChange={chooseCategory}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByCategory;
