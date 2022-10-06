import { GroupedOption, OptionModel } from 'models';

export const sortOptions: readonly OptionModel[] = [
  { value: 'update_date', label: 'Ngày cập nhật' },
  { value: 'publishDate', label: 'Ngày phát hành' },
  { value: 'rating', label: 'Điểm đánh giá' },
];

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: 'Colrs',
    options: sortOptions,
  },
];
