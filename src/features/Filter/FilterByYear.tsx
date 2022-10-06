import { FilterProps } from 'models';

function FilterByYear({ filters, onChange }: FilterProps) {
  const yearOptions = [
    { value: 'all', name: '- Tất cả -' },
    { value: '2022', name: '2022' },
    { value: '2021', name: '2021' },
    { value: '2020', name: '2020' },
    { value: '2019', name: '2019' },
    { value: '2018', name: '2018' },
    { value: '2017', name: '2017' },
    { value: '2016', name: '2016' },
    { value: '2015', name: '2015' },
    { value: '2014', name: '2014' },
    { value: '2013', name: '2013' },
    { value: '2012', name: '2012' },
    { value: 'before 2012', name: 'Trước 2012' },
  ];

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="year" className="mb-2 text-base text-white font-bold">
          Năm:
        </label>
        <select
          name="year"
          id="year"
          className="relative w-full py-2 pl-[11px] pr-10 h-10 rounded text-[#363636] text-base flex items-center appearance-none after:content-[''] after:w-10 after:h-10 after:bg-red-700"
        >
          {yearOptions.map((option: { value: string; name: string }, index) => (
            <option
              key={index}
              value={option.value}
              // selected={}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default FilterByYear;
