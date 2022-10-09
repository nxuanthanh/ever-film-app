import { Button } from 'components/common';
import { ItemsPage } from 'models';

function Pagination({ total_pages, page }: ItemsPage) {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="">
        <Button title="1" className={`${page}`} onClick={() => console.log('first')} />
        <Button title="2" className="" />
        <Button title="3" className="" />
        <Button title="4" className="" />
        <Button title="5" className="" />
        <span className="px-4 py-2 text-sm font-medium">...</span>
        <Button title={`${total_pages}`} className="" />
      </div>
      <div>
        <Button title="Trang trước" className="" />
        <Button title="Trang sau" className="" />
      </div>
    </div>
  );
}

export default Pagination;
