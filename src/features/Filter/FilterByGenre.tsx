import { FilterProps } from 'models';
import { customStyles } from 'utils';
import Select from 'react-select';
function FilterByGenre({ filters, onChange }: FilterProps) {
  const categoryOptions = [
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

  return (
    <>
      <div className="flex flex-col items-start justify-center p-3 w-full">
        <label htmlFor="genre" className="mb-2 text-base text-white font-bold">
          Thể loại:
        </label>
        <Select
          options={categoryOptions}
          styles={customStyles}
          defaultValue={categoryOptions[0]}
          // value={categoryOptions.find((option) => option.value === sortType)}
          // onChange={chooseSort}
          className="w-full"
        />
      </div>
    </>
  );
}

export default FilterByGenre;
