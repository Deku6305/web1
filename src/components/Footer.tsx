import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* 1. KEY VALUE PROPOSITIONS */}
      <div className="border-b border-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-rose-500 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-white text-xs sm:text-sm">100% CHÍNH HÃNG</p>
                <p className="text-[11px] text-slate-500">Cam kết hoàn tiền 200% nếu phát hiện hàng giả</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-white text-xs sm:text-sm">GIAO HÀNG TẬN NƠI</p>
                <p className="text-[11px] text-slate-500">Miễn phí vận chuyển cho đơn hàng từ 1.000.000₫</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-white text-xs sm:text-sm">30 NGÀY ĐỔI TRẢ</p>
                <p className="text-[11px] text-slate-500">Đổi size miễn phí nếu không vừa chân</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-white text-xs sm:text-sm">BẢO HÀNH KEO CHỈ</p>
                <p className="text-[11px] text-slate-500">Bảo hành keo chỉ 12 tháng tại các chi nhánh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-lg">
                SZ
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white uppercase">
                Sneaker<span className="text-rose-500">Zone</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Hệ thống bán lẻ sneaker, giày chạy bộ và giày thể thao đường phố chính hãng số 1. Nơi hội tụ các siêu phẩm từ Nike, Jordan, Adidas, New Balance, Puma, Vans.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Showroom 1: 128 Nguyễn Trãi, Phường 3, Quận 5, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Showroom 2: 74 Phố Huế, Hoàn Kiếm, TP. Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Hotline CSKH: <strong>1900 6868</strong> (8:00 - 22:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Email hỗ trợ: support@sneakerzone.vn</span>
              </div>
            </div>
          </div>

          {/* Links: Về chúng tôi */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
              Về SneakerZone
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Giới thiệu thương hiệu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng nhân tài</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hệ thống cửa hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tin tức Sneaker & Drops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ hợp tác</a></li>
            </ul>
          </div>

          {/* Links: Hỗ trợ khách hàng */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
              Chính Sách & Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Bảng quy đổi kích thước giày</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành sản phẩm</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách vận chuyển & giao hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quy định đổi trả hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật thông tin</a></li>
            </ul>
          </div>

          {/* Payment & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              Phương Thức Thanh Toán
            </h4>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">VISA / MASTER</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-pink-400">MOMO</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-sky-400">ZALOPAY</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">COD (TIỀN MẶT)</span>
            </div>

            <div className="pt-2">
              <h5 className="font-bold text-white text-xs mb-1">Đăng ký nhận mã giảm giá 10%</h5>
              <div className="flex gap-1.5 mt-2">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500 flex-1"
                />
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2025 SNEAKERZONE. Tất cả các quyền được bảo lưu.</p>
          <p className="text-slate-600">Thiết kế & phát triển cho cửa hàng giày thể thao hoàn chỉnh.</p>
        </div>
      </div>
    </footer>
  );
};
