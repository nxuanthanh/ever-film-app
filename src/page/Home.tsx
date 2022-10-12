import { useQuery } from '@tanstack/react-query';
import { Error, Loading, Title } from 'components/common';
import MainHomeFilms from 'components/MainHomeFilm';
import { FilterSection } from 'features/Filter';
import { ConfigType, HomeFilms } from 'models';
import { useState } from 'react';
import { getHomeFilms } from 'services';

// interface HomeProps {}

export function Home() {
  const [config, setConfig] = useState<ConfigType>({});
  const { data, isLoading, isError } = useQuery<HomeFilms, Error>(['home-films'], getHomeFilms);

  if (isError) return <Error />;

  if (isLoading) return <Loading />;

  return (
    <>
      <Title value="Xem phim online chất lượng cao" />
      <div className="container">
        <div className="mt-[88px]">
          <FilterSection setConfig={setConfig} />
        </div>
        <div className="flex-grow min-h-screen mb-14">
          <MainHomeFilms data={data} />
        </div>
      </div>
    </>
  );
}

export default Home;
