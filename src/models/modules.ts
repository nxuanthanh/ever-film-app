import { ReactElement } from 'react';

export interface MenuItemModel {
  title: string;
  icon?: ReactElement;
  to?: string;
}

export interface IconProps {
  className?: string;
  width?: string;
  height?: string;
}
