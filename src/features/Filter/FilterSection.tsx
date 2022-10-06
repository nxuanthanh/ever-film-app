import { Grid, List } from 'assets/icons';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FilmFilter } from '.';

// interface FilterSectionProps {}

function FilterSection() {
  const { pathname } = useLocation();
  const [sortType, setSortType] = useState('grid');
  const [filter, setFilter] = useState({});

  return (
    <div className="flex items-center bg-[#0e274073] mb-3 ml-[-12px] mr-[-12px] box-border pl-3 pr-3 rounded-md">
      <FilmFilter />
      {pathname !== '/' && (
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
