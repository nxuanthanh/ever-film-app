import { Grid, List } from 'assets/icons';
import { useState } from 'react';

interface FilterSectionProps {
  hasSortType?: boolean;
}

function FilterSection({ hasSortType = false }: FilterSectionProps) {
  const [filter, setFilter] = useState([]);
  const [sortType, setSortType] = useState('grid');

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
      options: [
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
      ],
    },
    {
      label: 'Thời lượng:',
      options: [
        { value: 'all', name: '- Tất cả -' },
        { value: 'less_30m', name: 'Dưới 30 phút' },
        { value: '30m to 1h', name: "30' - 1 tiếng" },
        { value: '1h to 1.5h', name: '1 - 1.5 tiếng' },
        { value: '1.5 to 2h', name: '1.5 - 2 tiếng' },
        { value: '2h to 2.5h', name: '2 - 2.5 tiếng' },
        { value: '2.5 to 3h', name: '2.5 - 3 tiếng' },
        { value: 'more than 3h', name: 'Trên 3 tiếng' },
      ],
    },
    {
      label: 'Sắp xếp:',
      options: [
        { value: 'all', name: '- Tất cả -' },
        { value: 'update_date', name: 'Ngày cập nhật' },
        { value: 'release_date', name: 'Ngày phát hành' },
        { value: 'point_rated', name: 'Điểm đánh giá' },
      ],
    },
  ];

  return (
    <div className="flex items-center bg-[#0e274073] mb-3 ml-[-12px] mr-[-12px] box-border pl-3 pr-3 rounded-md">
      <div className="flex items-center justify-between flex-1">
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
              {filter.options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {hasSortType && (
        <div className="h-24 w-[90px] p-3">
          <span className="block text-base text-white font-bold mb-3">Hiển thị:</span>
          <div className="flex justify-between">
            <div onClick={() => setSortType('list')}>
              <List className={`${sortType === 'list' ? '' : 'text-white'} cursor-pointer`} />
            </div>
            <div onClick={() => setSortType('grid')}>
              <Grid className={`${sortType === 'grid' ? '' : 'text-white'} cursor-pointer`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSection;
