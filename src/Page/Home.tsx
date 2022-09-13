import { useQuery } from '@tanstack/react-query';

import { Header, Loading } from 'components';
import { SectionSlider } from 'components/Slider';
import { HomeMovies, Item } from 'models';
import { getDetailMovies, getHomeMovies } from 'services';

export function Home() {
  // const [currentTab, setCurrentTab] = useState('movie');

  const { data, isLoading, isError, error } = useQuery<HomeMovies, Error>(
    ['home-movies'],
    getHomeMovies
  );

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    error: errorDetail,
  } = useQuery<any, Error>(
    ['detailMovies', data?.Trending],
    () => getDetailMovies(data?.Trending as Item[]),
    { enabled: !!data?.Trending }
  );

  if (isError) return <p>ERROR: ${error.message}</p>;

  if (isLoading) return <Loading />;

  if (isErrorDetail) return <p>ERROR: ${errorDetail.message}</p>;

  if (isLoadingDetail) return <Loading />;

  return (
    <div className="">
      <Header />
      <div className="flex-grow border-x border-gray-darken min-h-screen">
        {/* <BannerSlider films={data.Trending} dataDetail={dataDetail} /> */}

        <ul className="flex flex-col gap-10 mt-16">
          {Object.entries(data)
            .filter((section) => section[0] !== 'Trending')
            .map((section, index) => (
              <li key={index}>
                <h2 className="text-2xl font-oswald pb-[3.2px] border-b border-solid border-[#1b3c5d] font-medium tracking-wider text-[#b1a21e] container uppercase">
                  <span>{section[0]}</span>
                </h2>

                <SectionSlider films={section[1]} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
