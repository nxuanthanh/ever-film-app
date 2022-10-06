import { ReactElement } from 'react';
import { ConfigType } from './types';

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

// export interface QueryModel {
//   type: [];
//   genre: [];
//   country: [];
//   year: [];
//   duration: [];
//   sort_by: [];
// }

export interface FilterProps {
  filters?: ConfigType;
  onChange?: Function;
}

export interface OptionModel {
  readonly value: string;
  readonly label: string;
}

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly OptionModel[];
}
