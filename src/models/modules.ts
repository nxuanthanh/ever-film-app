import { MouseEventHandler, ReactElement } from 'react';

export interface MenuItemModel {
  title: string;
  icon?: ReactElement;
  to?: string;
  children?: {
    data: { title: string; onClick: MouseEventHandler<HTMLButtonElement> }[];
  };
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface IconProps {
  className?: string;
  width?: string;
  height?: string;
}
