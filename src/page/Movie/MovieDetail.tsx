import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components/common';
import { FilmBackgroundDrop, FilmDetailContent } from 'components/Films';
import Modal from 'components/Modal';
import { Credits, DetailMovie, FilmInfo } from 'models';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetail } from 'services';

function MovieDetail() {
  const { filmId } = useParams();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError, error } = useQuery<FilmInfo, Error>(
    ['movieDetail', filmId],
    () => getMovieDetail(Number(filmId as string))
  );

  const detail = data?.detail as DetailMovie;
  const credits = data?.credits as Credits;

  console.log(credits);
  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  const handleOnVideoClick = (key: string) => {
    setVideoKey(key);
    setShowModal(true);
  };

  const handleCloseModal = (key: string): any => {
    setShowModal(false);
  };

  const handleWacthButtonClick = () => {
    navigate(`/movie/watch/${filmId}`);
  };

  return (
    <>
      <div className="mb-14">
        <FilmBackgroundDrop image={detail.backdrop_path} />
        <section className="p-12 pb-0 mt-[-360px]">
          {showModal && (
            <Modal id={`modal_${detail.id}`} onClose={handleCloseModal}>
              <iframe
                width="1000px"
                height="562px"
                title="trailer"
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0`}
              ></iframe>
            </Modal>
          )}
          <div className="container">
            <FilmDetailContent
              data={data}
              onVideoClick={handleOnVideoClick}
              onWatchButtonClick={handleWacthButtonClick}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default MovieDetail;
