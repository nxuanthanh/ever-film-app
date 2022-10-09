import { Grid, List } from 'assets/icons';
import { useLocation } from 'react-router-dom';
import { FilmFilter } from '.';

interface FilterSectionProps {
  setSortLayout?: Function;
  sortLayout?: string;
}

function FilterSection({ setSortLayout, sortLayout = 'grid' }: FilterSectionProps) {
  const { pathname } = useLocation();

  return (
    <div className="flex items-center bg-[#0e274073] mb-3 ml-[-12px] mr-[-12px] box-border pl-3 pr-3 rounded-md">
      <FilmFilter />
      {pathname !== '/' && (
        <div className="h-24 w-[90px] p-3">
          <span className="block text-base text-white font-bold mb-3">Hiển thị:</span>
          <div className="flex justify-between">
            <div onClick={() => setSortLayout && setSortLayout('list')}>
              <List className={`${sortLayout === 'list' ? '' : 'text-white'} cursor-pointer`} />
            </div>
            <div onClick={() => setSortLayout && setSortLayout('grid')}>
              <Grid className={`${sortLayout === 'grid' ? '' : 'text-white'} cursor-pointer`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSection;
