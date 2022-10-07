import { GroupedOption, OptionModel } from 'models';

export const defaultOptions: OptionModel = { value: '', label: '- Tất cả -' };

export const sortOptions: readonly OptionModel[] = [
  { value: 'popularity.desc', label: 'Phổ biến nhất' },
  { value: 'release_date.desc', label: 'Ngày phát hành' },
  { value: 'vote_average.desc', label: 'Điểm đánh giá' },
];

export const categoryOptions: readonly OptionModel[] = [
  { value: '', label: '- Tất cả -' },
  { value: 'am-nhac', label: 'Âm nhạc' },
  { value: 'bi-an', label: 'Bí ẩn' },
  { value: 'chien-tranh', label: 'Chiến tranh' },
  { value: 'chien-tranh-chinh-tri', label: 'Chiến tranh' },
  { value: 'chinh-kich', label: 'Chính kịch' },
  { value: 'gia-dinh', label: 'Gia đình' },
  { value: 'giat-gan', label: 'Giật gân' },
  { value: 'hai', label: 'Hài' },
  { value: 'hanh-dong', label: 'Hành động' },
  { value: 'hanh-dong-phieu-luu', label: 'Hành động' },
  { value: 'hoat-hinh', label: 'Hoạt hình' },
  { value: 'kinh-di', label: 'Kinh dị' },
  { value: 'ky-ao', label: 'Kỳ ảo' },
  { value: 'lang-man', label: 'Lãng mạn' },
  { value: 'lich-su', label: 'Lịch sử' },
  { value: 'noi-chuyen', label: 'Nói chuyện' },
  { value: 'phieu-luu', label: 'Phiêu lưu' },
  { value: 'phim-dai-ky', label: 'Phim dài kỳ' },
  { value: 'tai-lieu', label: 'Tài liệu' },
  { value: 'thuc-te', label: 'Thực tế' },
  { value: 'tin-tuc', label: 'Tin tức' },
  { value: 'toi-pham', label: 'Tội phạm' },
  { value: 'tre-em', label: 'Trẻ em' },
  { value: 'truyen-hinh', label: 'Truyền hình' },
  { value: 'vien-tay', label: 'Viễn Tây' },
  { value: 'vien-tuong', label: 'Viễn tưởng' },
  { value: 'vien-tuong-than-thoai', label: 'Viễn tưởng' },
];

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: 'Colrs',
    options: sortOptions,
  },
];
