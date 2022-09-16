import { useQuery } from '@tanstack/react-query';
import { Grid, List } from 'assets/icons';
import { Loading } from 'components';
import { useState } from 'react';
import { getRegions } from 'services';

interface FilterSectionProps {
  hasSortType?: boolean;
}

interface RegionsProps {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

function FilterSection({ hasSortType = false }: FilterSectionProps) {
  const [filter, setFilter] = useState([]);
  const [sortType, setSortType] = useState('grid');

  const { data, isLoading, isError, error } = useQuery<RegionsProps[], Error>(
    ['regions'],
    getRegions
  );

  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <Loading />;

  const filterList = [
    {
      label: 'Loại phim:',
      options: [
        { value: '', name: '- Tất cả -' },
        { value: 'movie', name: 'Phim Lẻ' },
        { value: 'show', name: 'Phim Bộ' },
      ],
    },
    {
      label: 'Thể loại:',
      options: [
        { value: '', name: '- Tất cả -' },
        { value: 'am-nhac', name: 'Âm nhạc' },
        { value: 'bi-an', name: 'Bí ẩn' },
        { value: 'chien-tranh', name: 'Chiến tranh' },
        { value: 'chien-tranh-chinh-tri', name: 'Chiến tranh' },
        { value: 'chinh-kich', name: 'Chính kịch' },
        { value: 'gia-dinh', name: 'Gia đình' },
        { value: 'giat-gan', name: 'Giật gân' },
        { value: 'hai', name: 'Hài' },
        { value: 'hanh-dong', name: 'Hành động' },
        { value: 'hanh-dong-phieu-luu', name: 'Hành động' },
        { value: 'hoat-hinh', name: 'Hoạt hình' },
        { value: 'kinh-di', name: 'Kinh dị' },
        { value: 'ky-ao', name: 'Kỳ ảo' },
        { value: 'lang-man', name: 'Lãng mạn' },
        { value: 'lich-su', name: 'Lịch sử' },
        { value: 'noi-chuyen', name: 'Nói chuyện' },
        { value: 'phieu-luu', name: 'Phiêu lưu' },
        { value: 'phim-dai-ky', name: 'Phim dài kỳ' },
        { value: 'tai-lieu', name: 'Tài liệu' },
        { value: 'thuc-te', name: 'Thực tế' },
        { value: 'tin-tuc', name: 'Tin tức' },
        { value: 'toi-pham', name: 'Tội phạm' },
        { value: 'tre-em', name: 'Trẻ em' },
        { value: 'truyen-hinh', name: 'Truyền hình' },
        { value: 'vien-tay', name: 'Viễn Tây' },
        { value: 'vien-tuong', name: 'Viễn tưởng' },
        { value: 'vien-tuong-than-thoai', name: 'Viễn tưởng' },
      ],
    },
    {
      label: 'Quốc gia:',
      // options: [
      //   { value: '', name: '- Tất cả -' },
      //   { value: 'US', name: 'Mỹ' },
      //   { value: 'KR', name: 'Hàn Quốc' },
      //   { value: 'GB', name: 'Anh' },
      //   { value: 'FR', name: 'Pháp' },
      //   { value: 'CA', name: 'Canada' },
      //   { value: 'HK', name: 'Hồng Kông' },
      //   { value: 'JP', name: 'Nhật Bản' },
      //   { value: 'CN', name: 'Trung Quốc' },
      //   { value: 'TW', name: 'Đài Loan' },
      //   { value: 'IN', name: 'Ấn Độ' },
      //   { value: 'TH', name: 'Thái Lan' },
      //   { value: 'AU', name: 'Úc' },
      //   { value: 'VN', name: 'Việt Nam' },
      //   { value: 'DE', name: 'Đức' },
      //   { value: 'SE', name: 'Thụy Điển' },
      //   { value: 'IT', name: 'Ý' },
      //   { value: 'HU', name: 'Hungary' },
      //   { value: 'IE', name: 'Ai-len' },
      //   { value: 'MT', name: 'Malta' },
      //   { value: 'NZ', name: 'New Zealand' },
      //   { value: 'RU', name: 'Nga' },
      //   { value: 'IS', name: 'Iceland' },
      //   { value: 'FI', name: 'Phần Lan' },
      //   { value: 'MW', name: 'Ma - la - uy' },
      //   { value: 'CO', name: 'Colombia' },
      //   { value: 'DK', name: 'Đan Mạch' },
      //   { value: 'BE', name: 'Bỉ' },
      //   { value: 'ES', name: 'Tây Ban Nha' },
      //   { value: 'AR', name: 'Argentina' },
      //   { value: 'NL', name: 'Hà Lan' },
      //   { value: 'NO', name: 'Na Uy' },
      //   { value: 'SG', name: 'Singapore' },
      //   { value: 'PL', name: 'Ba Lan' },
      //   { value: 'MY', name: 'Malaysia' },
      //   { value: 'ID', name: 'Indonesia' },
      //   { value: 'IR', name: 'Iran' },
      //   { value: 'PR', name: 'Puerto Rico' },
      //   { value: 'NP', name: 'Nepal' },
      //   { value: 'BG', name: 'Bulgaria' },
      //   { value: 'KH', name: 'Campuchia' },
      //   { value: 'PH', name: 'Philippines' },
      //   { value: 'TR', name: 'Thổ Nhĩ Kỳ,' },
      //   { value: 'MA', name: 'Morocco' },
      //   { value: 'BR', name: 'Brazil' },
      //   { value: 'MX', name: 'Mexico' },
      //   { value: 'CZ', name: 'Séc' },
      //   { value: 'RO', name: 'Rumani' },
      //   { value: 'PS', name: 'Palestine' },
      //   { value: 'KZ', name: 'Kazakhstan' },
      //   { value: 'ZA', name: 'Nam Phi' },
      // ],
      options: [
        { value: '', name: '- Tất cả -' },
        ...data.map((item: any) => ({ value: item.iso_3166_1, name: item.english_name })),
      ],
    },
    {
      label: 'Năm:',
      options: [
        { value: 'all', name: '- Tất cả -' },
        { value: '2022', name: '2022' },
        { value: '2021', name: '2021' },
        { value: '2020', name: '2020' },
        { value: '2019', name: '2019' },
        { value: '2018', name: '2018' },
        { value: '2017', name: '2017' },
        { value: '2016', name: '2016' },
        { value: '2015', name: '2015' },
        { value: '2014', name: '2014' },
        { value: '2013', name: '2013' },
        { value: '2012', name: '2012' },
        { value: 'before 2012', name: 'Trước 2012' },
      ],
    },
    {
      label: 'Thời lượng:',
      options: [
        { value: 'all', name: '- Tất cả -' },
        { value: '0-30', name: 'Dưới 30 phút' },
        { value: '30-60', name: "30' - 1 tiếng" },
        { value: '60-90', name: '1 - 1.5 tiếng' },
        { value: '90-120', name: '1.5 - 2 tiếng' },
        { value: '120-150', name: '2 - 2.5 tiếng' },
        { value: '150-180', name: '2.5 - 3 tiếng' },
        { value: '180-0', name: 'Trên 3 tiếng' },
      ],
    },
    {
      label: 'Sắp xếp:',
      options: [
        { value: 'all', name: '- Tất cả -' },
        { value: 'update_date', name: 'Ngày cập nhật' },
        { value: 'publishDate', name: 'Ngày phát hành' },
        { value: 'rating', name: 'Điểm đánh giá' },
      ],
    },
  ];

  return (
    <div className="flex items-center bg-[#0e274073] mb-3 ml-[-12px] mr-[-12px] box-border pl-3 pr-3 rounded-md">
      <div className="flex items-center justify-between flex-1">
        {filterList.map((filter, idx) => (
          <div key={idx} className="flex flex-col items-start justify-center p-3 w-full">
            <label htmlFor={filter.label} className="mb-2 text-base text-white font-bold">
              {filter.label}
            </label>
            <select
              name={filter.label}
              id={filter.label}
              className="relative w-full py-2 pl-[11px] pr-10 h-10 rounded text-[#363636] text-base flex items-center appearance-none after:content-['2'] after:w-10 after:h-10 after:bg-red-700"
            >
              {filter.options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {hasSortType && (
        <div className="h-24 w-[90px] p-3">
          <span className="block text-base text-white font-bold mb-3">Hiển thị:</span>
          <div className="flex justify-between">
            <div onClick={() => setSortType('list')}>
              <List className={`${sortType === 'list' ? '' : 'text-white'} cursor-pointer`} />
            </div>
            <div onClick={() => setSortType('grid')}>
              <Grid className={`${sortType === 'grid' ? '' : 'text-white'} cursor-pointer`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSection;
