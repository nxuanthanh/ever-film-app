import React from 'react';

interface ButtonProps {
  to?: string;
  href?: string;
  title: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  className: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
}

function Button({
  to,
  href,
  title,
  onClick,
  className,
  iconLeft,
  iconRight,
  disabled,
  ...passProps
}: ButtonProps) {
  return (
    <button
      className={`${className} inline-flex items-center justify-center hover:opacity-80 transition-all duration-200 text-white text-base font-normal py-2 px-4 rounded cursor-pointer`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft && <span>{iconLeft}</span>}
      <span>{title}</span>
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
}

export default Button;
