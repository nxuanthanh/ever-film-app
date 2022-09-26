import { IconProps } from 'models';

function Sort({ className = '', width = '24', height = '24' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={width}
      height={height}
      fill="currentColor"
    >
      <g className="style-scope yt-icon">
        <path
          d="M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z"
          className="style-scope yt-icon"
        ></path>
      </g>
    </svg>
  );
}

export default Sort;
