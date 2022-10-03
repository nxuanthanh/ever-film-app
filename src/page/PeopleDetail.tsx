import { useQuery } from '@tanstack/react-query';
import { FilmItem } from 'components/common';
import { Item, People, PeopleFull, PeopleImage } from 'models';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import { getPeopleFullDetail } from 'services';
import { resizeImage } from 'utils';

function PeopleDetail() {
  const { personId } = useParams();

  const { data } = useQuery<PeopleFull, Error>(['detailFullPeople', personId], () =>
    getPeopleFullDetail(personId as string)
  );

  const peopleDetail = data?.detail as People;
  const peopleCredits = data?.credits as Item[];
  const peopleImages = data?.images as PeopleImage[];

  // console.log(data);
  return (
    <section className="p-12 mt-12">
      <div className="container">
        <div className="flex -ml-8 -mr-8">
          <div className="py-3 px-8 min-w-[25%]">
            <LazyLoadImage
              src={resizeImage(peopleDetail?.profile_path || '')}
              className="object-cover w-72 h-[432px]"
            />
            <div className="mt-9">
              <h2 className="text-xl text-white mb-6 font-medium">Thông tin cá nhân</h2>
              <div>
                <div className="text-base mb-[20px]">
                  <p className="text-[#dbdbdb] font-bold">Nghề nhiệp</p>
                  <span className="text-[#b5b5b5]">{peopleDetail?.known_for_department}</span>
                </div>
                <div className="text-base mb-[20px]">
                  <p className="text-[#dbdbdb] font-bold">Giới tính</p>
                  <span className="text-[#b5b5b5]">{peopleDetail?.gender > 1 ? 'Name' : 'Nữ'}</span>
                </div>
                <div className="text-base mb-[20px]">
                  <p className="text-[#dbdbdb] font-bold">Ngày sinh</p>
                  <span className="text-[#b5b5b5]">
                    {new Intl.DateTimeFormat('en').format(
                      new Date(peopleDetail?.birthday || new Date())
                    )}
                  </span>
                </div>
                <div className="text-base mb-[20px]">
                  <p className="text-[#dbdbdb] font-bold">Nơi sinh</p>
                  <span className="text-[#b5b5b5]">{peopleDetail?.place_of_birth}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-8 pt-3 pb-3">
            <h1 className="text-[2.5rem] leading-[1.125] mb-6 text-white font-semibold">
              {peopleDetail?.name}
            </h1>
            <h3 className="text-xl mb-6 text-white font-semibold">Tiểu sử</h3>
            <h4 className="text-[#b5b5b5] mb-8"> {peopleDetail?.biography}</h4>
            <h3 className="text-xl mb-6 text-white font-semibold">Các phim đã tham gia</h3>
            <ul className="grid grid-cols-4 gap-6">
              {peopleCredits?.length > 0 &&
                peopleCredits?.map((item) => (
                  <li key={`${item.id + Math.random()}`} className="list-none">
                    <FilmItem film={item} className="text-center" />
                  </li>
                ))}
            </ul>
            <h3 className="text-xl mb-6 text-white font-semibold mt-2">Ảnh</h3>
            <ul className="grid grid-cols-4 gap-6">
              {peopleImages?.length > 0 &&
                peopleImages?.map((item) => (
                  <li key={item.file_path} className="list-none">
                    <LazyLoadImage
                      src={resizeImage(item.file_path)}
                      className="object-cover"
                      effect="blur"
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PeopleDetail;
