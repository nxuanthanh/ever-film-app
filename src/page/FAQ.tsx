function FAQ() {
  return (
    <div className="mt-[100px] mb-12">
      <div className="container text-[#dbdbdb] text-base">
        <h1 className="text-[2.5rem] text-white font-semibold mb-6 text-center  leading-[1.125]">
          Câu hỏi thường gặp
        </h1>
        <div>
          <h3 className="text-[#ffe08a] font-semibold leading-[1.125] text-2xl mb-[0.6666em]">
            1. Xem phim bị chậm, mặc dù đã kích hoạt VIP Mode cho phim đó?
          </h3>
          Nếu phim chạy nhưng cứ một đoạn lại bị dừng để chờ load tiếp (dù đã thử chọn các server
          khác nhau), cần xác định do thiết bị hay do mạng của bạn.
          <ul className="mt-4 ml-8">
            <li className=" text-base list-disc">
              Hãy thử xem phim trên một thiết bị khác (máy tính / điện thoại / TV...). Nếu đổi sang
              thiết bị khác phim lại chạy mượt ={'>'} do thiết bị cũ của bạn. Nếu đó là TV, hãy kiểm
              tra thiết lập TV và tắt <i>giao thức kết nối mạng IPv6</i>. Nếu đó là một thiết bị
              chạy iOS, thì hãy <i>thử dùng một trình duyệt khác</i> (chẳng hạn Chrome) thay vì
              trình duyệt Safari mặc định, nhưng nói chung player trên iOS rất hay có vấn đề với
              phim bitrate cao + âm thanh 5.1.
            </li>
            <li className="mt-1 text-base list-disc">
              <p className="mb-4">
                Nếu phim chạy chậm trên tất cả các thiết bị mà bạn thử, với tất cả các server mà
                trang web cung cấp (bật chế độ VIP mới có), thì đó là do{' '}
                <b>băng thông đường truyền quốc tế</b> mạng của bạn bị bóp (do đường truyền quốc tế
                bị nghẽn vào giờ cao điểm hoặc đứt cáp...). Có 2 cách giải quyết: 1. Gọi điện phản
                ánh với nhà mạng; 2. Sử dụng một VPN (mạng riêng ảo) để tăng tốc độ cho mạng của
                bạn. Chúng tôi <b>đề xuất bạn dùng ứng dụng WARP</b> ={'>'}{' '}
                <a
                  href="https://1.1.1.1/"
                  target="_blank"
                  className="text-Link cursor-pointer hover:text-hover-link transition-all duration-150"
                  rel="noreferrer"
                >
                  download tại đây
                </a>{' '}
                ( hoặc tải WARP+{' '}
                <a
                  href="https://apkcombo.com/vi/vpn/"
                  target="_blank"
                  className="text-Link cursor-pointer hover:text-hover-link transition-all duration-150"
                  rel="noreferrer"
                >
                  tại đây
                </a>
                ).
              </p>
              <p className="mb-4">
                Lưu ý: việc bật VPN sẽ làm thay đổi tuyến đường truyền dữ liệu từ máy chủ tới thiết
                bị của bạn, và không phải cứ bật VPN mạng sẽ nhanh hơn - đôi khi bật VPN sẽ khiến
                mạng bạn chậm hơn! Cũng giống như có lúc tuyến đường này tắc, giao thông ùn trệ, thì
                nên đổi sang tuyến đường khác thông thoáng hơn, nhưng lúc khác thì ngược lại!
              </p>
              <p className="mb-4">
                Do đó, lúc nào xem phim bị lag hãy làm như sau để tìm được tuyến đường truyền dữ
                liệu nhanh nhất:
              </p>
              <ul className="list-circle ml-8 mt-2 mb-4">
                <li>
                  <b>Tắt</b> VPN rồi thử đổi từng server trên trang web
                </li>
                <li className="mt-[0.25em]">
                  <b>Bật</b> VPN rồi thử đổi từng server trên trang web
                </li>
              </ul>
              <p>
                ...cho tới khi tìm được sự kết hợp nào giúp xem phim mượt nhất. Và hãy nhớ, sự kết
                hợp đó chưa chắc đã là tốt nhất mọi lúc. Nên lúc nào bị lag, hãy lặp lại các bước
                thử trên!
              </p>
            </li>
            <li></li>
          </ul>
          <h3 className="text-[#ffe08a] font-semibold leading-[1.125] text-2xl mt-[1.3333em]">
            2. Gặp vấn đề về âm thanh: phim không có tiếng, mất tiếng nhân vật, hoặc âm thanh bị rè?
          </h3>
          <ul className="my-4 ml-8 list-disc">
            <li className="mt-1 text-base">
              <p>
                Nếu xem trên điện thoại: Lỗi âm thanh là do trình duyệt của bạn (thường là Chrome).
                Hãy{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=org.mozilla.firefox"
                  target="_blank"
                  className="text-Link cursor-pointer hover:text-hover-link transition-all duration-150"
                  rel="noreferrer"
                >
                  cài & dùng trình duyệt Firefox
                </a>
                !
              </p>
            </li>
            <li className="mt-[0.25em]">
              Nếu bạn xem trên PC: Khác với phim / clip trên các web khác (kể cả Youtube), phim trên
              XemPhim sử dụng âm thanh 5.1 (6 channel) thay vì âm thanh stereo (2 channel). Nếu
              thiết bị bạn xem chỉ có 2 loa, bạn cần thiết lập chương trình quản lý âm thanh trên
              thiết bị cho đúng: chọn đúng chế độ với số loa mình có (stereo), đừng chọn nhiều hơn,
              nếu không thiết bị của bạn sẽ cố gắng xuất âm thanh ra những loa không tồn tại ={'>'}{' '}
              mất tiếng.
              <br />
              Ví dụ đây là phần chọn các chế độ âm thanh của Realtek HD Audio Manager:{' '}
              <a
                href="https://imgur.com/a/D6nPGcl"
                target="_blank"
                className="text-Link cursor-pointer hover:text-hover-link transition-all duration-150"
                rel="noreferrer"
              >
                click vào đây
              </a>
            </li>
          </ul>
          <h3 className="text-[#ffe08a] font-semibold leading-[1.125] text-2xl mb-[0.6666em] mt-[1.3333em]">
            3. Làm sao để xem phim trên TV?
          </h3>
          <p className="mb-4">
            Để xem phim trên TV, TV bạn phải có trình duyệt web. Hầu hết các loại Smart TV những năm
            gần đây đều có cài sẵn trình duyệt. Nếu TV bạn không có sẵn trình duyệt, bạn có thể cài
            trình duyệt từ cửa hàng ứng dụng (Google Play Store / CH Play / App Store) trên TV. Với
            TV Android, bạn nên cài trình duyệt Puffin. Sau khi cài trình duyệt, truy cập trang web
            như bạn vẫn làm trên máy tính / điện thoại và xem phim.
          </p>
          <p>
            Nếu bạn không thể xem phim bằng trình duyệt trên TV, bạn có thể kết nối máy tính với TV
            (thường qua cổng HDMI) rồi phát từ máy tính lên TV.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
