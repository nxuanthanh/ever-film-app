import { Facebook, Message, Telegram } from 'assets/icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="bg-[url(/src/assets/images/footer-bg.jpg)] h-[418px] px-6 pt-12 pb-24">
      <div className="container">
        <h3 className="text-base font-semibold text-white leading-[1.125rem]">
          Phim chất lượng cao online của{' '}
          <Link to="/" className="text-[#428bca]">
            XemPhim
          </Link>{' '}
          khác gì so với các trang phim khác?
        </h3>
        <ul className="list-circle m-8">
          <li className="text-[#b5b5b5] text-base">
            Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu
            hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất
          </li>
          <li className="text-[#b5b5b5] text-base">
            Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông
            thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân
            giải)
          </li>
          <li className="text-[#b5b5b5] text-base">
            Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả
            Youtube)
          </li>
          <li className="text-[#b5b5b5] text-base">
            Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao
          </li>
          <li className="text-[#b5b5b5] text-base">
            Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề của riêng mình để xem
            online
          </li>
          <li className="text-[#b5b5b5] text-base">
            Có lựa chọn hiện phụ đề song ngữ (tức hiện đồng thời cả tiếng Anh & tiếng Việt), phù hợp
            với những người muốn học tiếng Anh qua phụ đề phim
          </li>
        </ul>
        <div className="flex justify-end items-center">
          <Link
            to="/contact"
            title="Liên hệ"
            className="flex items-center justify-center mr-6 w-12 h-12 border border-solid border-[#ffffff5c] bg-[#071334] hover:bg-[#2f0a61] text-white rounded-full"
          >
            <Message />
          </Link>

          <Link
            to="https://fb.com/Xemphim.Original"
            target="_blank"
            title="Facebook Page"
            className="flex items-center justify-center mr-6 w-12 h-12 border border-solid border-[#ffffff5c] bg-[#071334] hover:bg-[#2f0a61] text-white rounded-full"
          >
            <Facebook />
          </Link>

          <Link
            to="https://t.me/xemphim_official"
            target="_blank"
            title="Telegam Channel"
            className="flex items-center justify-center mr-6 w-12 h-12 border border-solid border-[#ffffff5c] bg-[#071334] hover:bg-[#2f0a61] text-white rounded-full"
          >
            <Telegram />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
