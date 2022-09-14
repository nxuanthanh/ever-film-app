import { useState } from 'react';
// import './section.css';
function FilterSection() {
  const [filter, setFilter] = useState([]);

  const filterList = [
    {
      label: 'Loại phim:',
      options: [
        { value: 'ath', name: '- Tất cả -' },
        { value: 'ath', name: 'Phim Lẻ' },
        { value: 'ath', name: 'Phim Bộ' },
      ],
    },
    {
      label: 'Thể loại:',
      options: [{ value: 'ath', name: '- Tất cả -' }],
    },
    {
      label: 'Quốc gia:',
      options: [{ value: 'ath', name: '- Tất cả -' }],
    },
    {
      label: 'Năm:',
      options: [{ value: 'ath', name: '- Tất cả -' }],
    },
    {
      label: 'Thời lượng:',
      options: [{ value: 'ath', name: '- Tất cả -' }],
    },
    {
      label: 'Sắp xếp:',
      options: [{ value: 'ath', name: 'Ngày cập nhật' }],
    },
  ];

  return (
    <div className="flex items-center justify-between mt-[88px] bg-[#0e274073] mb-3 ml-[-12px] mr-[-12px] box-border pl-3 pr-3 rounded-md">
      {filterList.map((filter, idx) => (
        <div key={idx} className="flex flex-col items-start justify-center p-3 w-full">
          <label htmlFor={filter.label} className="mb-2 text-base text-white font-bold">
            {filter.label}
          </label>
          <select
            name={filter.label}
            id={filter.label}
            className="relative w-full py-2 pl-[11px] pr-10 h-10 rounded text-[#363636] text-base flex items-center appearance-none after:content-['2'] after:w-10 after:h-10 after:bg-red-700"
          >
            {filter.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default FilterSection;
