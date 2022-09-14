import { IconProps } from 'models';

function Facebook({ className = '', width = '24', height = '24' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 264 512"
      className={className}
      width={width}
      height={height}
      fill="currentColor"
    >
      <path d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path>
    </svg>
  );
}

export default Facebook;
