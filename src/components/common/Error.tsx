function Error() {
  const ref: HTMLDivElement = document.querySelector('.torch') as HTMLDivElement;
  document.addEventListener('mousemove', (e) => {
    if (!ref) return;

    ref.style.top = `${e.pageY}`;
    ref.style.left = `${e.pageX}`;
  });

  return (
    <div
      className="h-screen w-full bg-cover bg-left-top bg-no-repeat overflow-hidden flex flex-col flex-wrap items-center justify-center"
      style={{
        backgroundImage: `url(https://wallpapercave.com/wp/6SLzBEY.jpg)`,
      }}
    >
      <div className="text">
        <h1>404</h1>
        <h2>Uh, Ohh</h2>
        <h3>Sorry we cant find what you are looking for 'cuz its so dark in here</h3>
      </div>
      <div className="torch" />
    </div>
  );
}

export default Error;
