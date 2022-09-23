import { useQuery } from '@tanstack/react-query';
import { People } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useParams } from 'react-router-dom';
import { getDetailPeople, getWatchTV } from 'services';

import { resizeImage } from 'utils';

function PeopleDetail() {
  const { personId } = useParams();
  const {
    data: peopleDetail,
    isLoading,
    isError,
    error,
  } = useQuery<any, Error>(['detailPeople', personId], () => getWatchTV(94997));

  console.log(peopleDetail);
  return (
    <div className="mt-[100px]">
      <div className="container">
        <div className="flex -ml-8 -mr-8">
          <div className="py-3 px-8 min-w-[25%]">
            <LazyLoadImage
              src={resizeImage(peopleDetail?.poster_path)}
              className="object-cover w-72 h-[432px]"
            />
            <div className="mt-9">
              <h2 className="text-xl text-white mb-6 font-medium">Thông tin cá nhân</h2>
              <div>
                <div className="text-base">
                  <p>Nghê nhiệp</p>
                  <span></span>
                </div>
                <div>
                  <p>Giới tính</p>
                  <span></span>
                </div>
                <div>
                  <p>Ngày sinh</p>
                  <span></span>
                </div>
                <div>
                  <p>Nơi sinh</p>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-8 pt-[28.8px] pb-3">
            <h1 className="font-merriweather text-[2.5rem] leading-[1.125] mb-[0.7em] text-white font-normal">
              {(peopleDetail as People)?.name}
            </h1>
            <h2 className="-mt-5 mb-[1.5em] leading-[1.25] text-2xl text-[#b5b5b5]">
              <span>
                {(peopleDetail as People)?.name} (
                <Link
                  to={`/year/${''}`}
                  className="text-Link cursor-pointer hover:text-hover-link transition-all duration-150"
                ></Link>
                )
              </span>
            </h2>
            {/* <div className="mb-4 text-white">
              {peopleDetail.adult && (
                <span className="font-bold text-xs text-white px-[9px] bg-[#363636] h-6 inline-flex items-center rounded cursor-help">
                  TV-MA
                </span>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeopleDetail;
