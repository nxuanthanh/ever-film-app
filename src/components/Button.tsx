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
  // let Comp = 'button';

  //   const _props: ButtonProps = {
  //     onClick,
  //     ...passProps,
  //   };

  //   if (disabled) {
  //     Object.keys(_props).forEach((key) => {
  //       if (key.startsWith('on') && typeof _props[key] !== 'undefined') {
  //         delete _props[key];
  //       }
  //     });
  //   }

  //   if (to) {
  //     _props.to = to;
  //     Comp = Link;
  //   } else if (href) {
  //     _props.href = href;
  //     Comp = 'a';
  //   }

  return (
    <button
      className={`${className} inline-flex items-center justify-center hover:opacity-80 transition text-white text-base font-normal py-2 px-4 rounded`}
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
