import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components/common';
import MainHomeFilms from 'components/MainHomeFilm';
import { FilterSection } from 'features/Filter';
import { HomeFilms } from 'models';
import { getHomeFilms } from 'services';

// interface HomeProps {}

export function Home() {
  const { data, isLoading, isError, error } = useQuery<HomeFilms, Error>(
    ['home-films'],
    getHomeFilms
  );

  // MOVIE
  if (isError) return <p>ERROR: ${error.message}</p>;

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <div className="mt-[88px]">
        <FilterSection />
      </div>
      <div className="flex-grow min-h-screen mb-14">
        <MainHomeFilms data={data} />
      </div>
    </div>
  );
}

export default Home;
