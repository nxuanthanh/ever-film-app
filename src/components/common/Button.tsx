import { forwardRef, MouseEvent, ReactElement, ReactNode } from 'react';

interface ButtonProps {
  to?: string;
  href?: string;
  title: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  className: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  children?: ReactElement;
}

function Button(
  {
    to,
    href,
    title,
    onClick,
    className,
    iconLeft,
    iconRight,
    disabled,
    children,
    ...passProps
  }: ButtonProps,
  ref: any
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center transition-all duration-200 text-white font-normal py-2 px-4 rounded border-[1px] cursor-pointer ${className}`}
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

export default forwardRef(Button);
