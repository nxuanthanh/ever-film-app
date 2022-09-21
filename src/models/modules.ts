import { MouseEventHandler, ReactElement } from 'react';

export interface MenuItemModel {
  title: string;
  icon?: ReactElement;
  to?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface IconProps {
  className?: string;
  width?: string;
  height?: string;
}
