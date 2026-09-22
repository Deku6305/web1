import React from 'react';
import { ArrowRight, ShieldCheck, Flame, Tag, CheckCircle } from 'lucide-react';
import { HERO_IMAGES } from '../imagie';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 md:py-16">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold tracking-wide uppercase">
              <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />
              Bộ Sưu Tập Giày Hot Trend 2025
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
              ĐẲNG CẤP <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400">SNEAKER</span> CHÍNH HÃNG
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Trải nghiệm các phối màu kinh điển từ Nike, Jordan, Adidas Samba, New Balance cùng công nghệ đệm êm ái hàng đầu. Cam kết 100% chính hãng, bảo hành keo chỉ trọn đời.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="btn-hero-explore-now"
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-rose-600/30 flex items-center gap-2 transition-all cursor-pointer group"
              >
                <span>Xem Ngay Bộ Sưu Tập</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Săn Giày Giảm Giá Đến 40%</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-300">100% Chính Hãng</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Đổi Trả 30 Ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Freeship Toàn Quốc</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Product Badge Over Image */}
              <div className="absolute top-4 left-4 z-10 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-white" /> BESTSELLER #1
              </div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800/80 group">
                <img
                  src={HERO_IMAGES.heroShoe}
                  alt="Air Jordan 1 High Chicago Featured"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                
                {/* Overlay Card Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase">Hàng Mới Về</span>
                    <h2 className="text-sm sm:text-base font-extrabold text-white">Air Jordan 1 Retro Chicago</h2>
                    <p className="text-xs text-amber-400 font-black">4.850.000 ₫</p>
                  </div>
                  <button
                    onClick={onExploreClick}
                    className="px-3.5 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    Xem Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
            Đại Lý Phân Phối Thương Hiệu Hàng Đầu Thế Giới
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 grayscale hover:grayscale-0 transition-all text-xs font-black tracking-widest text-slate-300">
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">NIKE</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">JORDAN</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">ADIDAS</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">NEW BALANCE</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">PUMA</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">CONVERSE</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">VANS</span>
          </div>
        </div>

      </div>
    </div>
  );
};
