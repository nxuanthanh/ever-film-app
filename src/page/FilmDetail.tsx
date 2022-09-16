import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLocation } from 'react-router-dom';
import { getDetail } from 'services';
import { resizeImage } from 'utils';

function DetailFilm() {
  const { pathname } = useLocation();

  const { data, isLoading, isError, error } = useQuery<any, Error>(['detail'], () =>
    getDetail(pathname)
  );

  console.log(data);

  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="">
        <div
          className="h-[600px] w-full bg-cover relative before:w-full before:top-0 before:bottom-0 before:bg-[#020d18bf] before:absolute before:content-[''] before:h-full"
          style={{ backgroundImage: `url("${resizeImage(data.backdrop_path)}")` }}
        ></div>
        <section>
          <div className="container">
            <div className="flex">
              <div className="">
                <div>
                  <div>
                    <LazyLoadImage
                      src={resizeImage(data.poster_path)}
                      className="object-cover w-72 h-[432px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-8"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DetailFilm;
