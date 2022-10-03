import { ReactElement } from 'react';

export interface MenuItemModel {
  title: string;
  icon?: ReactElement;
  to?: string;
  children?: {
    data: { title: string; onClick: Function }[];
  };
  onClick: Function;
}

export interface IconProps {
  className?: string;
  width?: string;
  height?: string;
}

export interface FilmItemModel {
  bookmark_type: string;
  id: number;
  media_type: string;
  poster_path: string;
  title: string;
  vote_average: number;
}
