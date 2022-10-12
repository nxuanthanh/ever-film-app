import { useQuery } from '@tanstack/react-query';
import { Error, Loading, Title } from 'components/common';
import { FilmBackgroundDrop, FilmDetailContent, TVSeasonListPopup } from 'components/Films';
import Modal from 'components/Modal';
import { DetailTV, FilmInfo } from 'models';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTVFullDetail } from 'services';

function TVDetail() {
  const { filmId } = useParams();
  const navigate = useNavigate();

  const [videoKey, setVideoKey] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSeasonModal, setShowSeasonModal] = useState(false);

  const { data, isLoading, isError } = useQuery<FilmInfo, Error>(['detailTV', filmId], () =>
    getTVFullDetail(filmId as string)
  );

  const detail = data?.detail as DetailTV;

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  const handleOnVideoClick = (key: string) => {
    setVideoKey(key);
    setShowVideoModal(true);
  };

  const handleCloseModal = (key: string): any => {
    setShowVideoModal(false);
  };

  const handleWacthButtonClick = () => {
    const seasons = detail.seasons.filter((season) => season.name.startsWith('Season'));
    if (seasons.length > 1) {
      setShowSeasonModal(true);
    } else {
      navigate(`/tv/watch/${filmId}`);
    }
  };

  const handleCloseSeasonModal = (key: string): any => {
    setShowSeasonModal(false);
  };

  return (
    <>
      {detail && (
        <Title
          value={`${detail.name} (${new Date(detail.first_air_date).getFullYear()}) | Xem phim`}
        />
      )}
      <div className="mb-14">
        <FilmBackgroundDrop image={detail.backdrop_path} />

        <section className="p-12 pb-0 mt-[-360px]">
          <div className="container">
            <FilmDetailContent
              data={data}
              onVideoClick={handleOnVideoClick}
              onWatchButtonClick={handleWacthButtonClick}
            />
          </div>

          {showVideoModal && (
            <Modal id={`modal_video${detail.id}`} onClose={handleCloseModal}>
              <iframe
                width="1000px"
                height="562px"
                title="trailer"
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0`}
              ></iframe>
            </Modal>
          )}
          {showSeasonModal && (
            <Modal id={`modal_season${detail.id}`} onClose={handleCloseSeasonModal}>
              <div className="max-h-[calc(100vh-40px)] min-w-[420px] bg-[#363636] rounded-md p-5 overflow-y-auto">
                <h4 className="text-2xl text-white mb-6 font-semibold leading-[1.125] text-center">
                  Chọn một phần để xem:
                </h4>
                <TVSeasonListPopup detailTV={detail} />
              </div>
            </Modal>
          )}
        </section>
      </div>
    </>
  );
}

export default TVDetail;
