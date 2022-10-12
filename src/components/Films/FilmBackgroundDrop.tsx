import { resizeImage } from 'utils';

type FilmBackgroundDropProps = {
  image: string;
};

function FilmBackgroundDrop({ image }: FilmBackgroundDropProps) {
  return (
    <div
      className="h-[600px] w-full bg-cover relative before:w-full before:top-0 before:bottom-0 before:bg-[#020d18bf] before:absolute before:content-[''] before:h-full"
      style={{
        backgroundImage: `url("${resizeImage(image)}")`,
      }}
    ></div>
  );
}

export default FilmBackgroundDrop;
