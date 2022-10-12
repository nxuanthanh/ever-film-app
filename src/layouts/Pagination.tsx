/* eslint-disable eqeqeq */
import { Button } from 'components/common';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Function;
  total_pages: number;
}

function Pagination({ total_pages, currentPage, setCurrentPage }: PaginationProps) {
  let beforePage = currentPage >= 2 ? currentPage - 2 : currentPage - 1;
  let afterPage = currentPage + 2;

  // how many pages or li show before the current li
  if (currentPage == total_pages) {
    beforePage = beforePage - 2;
  } else if (currentPage == total_pages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (currentPage == 1) {
    afterPage = afterPage + 2;
  } else if (currentPage == 2) {
    afterPage = afterPage + 1;
  }

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="">
        {currentPage > 2 && currentPage != 3 && (
          <Button title="1" className="!px-3 h-10" onClick={() => setCurrentPage(1)} />
        )}
        {currentPage > 4 && <span className="px-4 py-2 text-sm font-medium h-10">...</span>}

        {new Array(total_pages)
          .slice(beforePage, afterPage + 1)
          .fill('')
          .map((page, idx) => {
            let plength = beforePage + idx;

            if (plength > total_pages) {
              return page;
            }

            if (plength == 0) {
              return page;
            }

            return (
              <Button
                key={idx}
                title={`${plength}`}
                className={`${
                  currentPage === plength ? 'bg-lam border-lam' : 'border-white'
                } !py-[7px] hover:text-hover-link h-10 !px-3 min-w-[40px]`}
                onClick={() => setCurrentPage(plength)}
              />
            );
          })}

        {currentPage < total_pages - 1 && currentPage < total_pages - 3 && (
          <span className="px-4 py-2 text-sm font-medium">...</span>
        )}
        <Button
          title={`${total_pages}`}
          className="h-10 !px-3 min-w-[40px]"
          onClick={() => setCurrentPage(total_pages)}
        />
      </div>

      <div>
        <Button
          title="Trang trước"
          className="hover:text-hover-link border-white h-10 !px-3"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        <Button
          title="Trang sau"
          className="hover:text-hover-link border-white h-10 !px-3"
          disabled={currentPage === total_pages}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    </div>
  );
}

export default Pagination;
