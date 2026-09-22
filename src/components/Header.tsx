import React, { useState } from 'react';
import { User, CartItem } from '../types';
import { AVATAR_IMAGES } from '../imagie';
import {
  ShoppingBag,
  Search,
  User as UserIcon,
  Shield,
  LogOut,
  ChevronDown,
  Phone,
  Truck,
  RotateCcw,
  Sparkles,
  Menu,
  X,
  Heart,
  Store,
  LayoutDashboard
} from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  cartItems: CartItem[];
  currentView: 'store' | 'admin';
  onOpenAuth: (roleTab?: 'user' | 'admin', isCartIntent?: boolean) => void;
  onLogout: () => void;
  onOpenCart: () => void;
  onSwitchView: (view: 'store' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  cartItems,
  currentView,
  onOpenAuth,
  onLogout,
  onOpenCart,
  onSwitchView,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Total quantity in cart
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR */}
      <div id="top-announcement-bar" className="bg-slate-900 text-slate-200 text-[11px] font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Sparkles className="w-3 h-3" />
              SIÊU SALE ĐẦU MÙA: GIẢM ĐẾN 40% TẤT CẢ SNEAKER CHÍNH HÃNG
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <Truck className="w-3 h-3" />
              Miễn phí giao hàng đơn từ 1.000.000₫
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400">
              <RotateCcw className="w-3 h-3" />
              Đổi trả miễn phí 30 ngày
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 ml-auto">
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-rose-400" />
              Hotline: <strong className="text-white">1900 6868</strong>
            </span>
            {currentUser?.role === 'admin' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                <Shield className="w-3 h-3" /> Chế độ Quản trị viên
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSwitchView('store')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:bg-rose-600 transition-colors">
                SZ
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 uppercase">
                    Sneaker<span className="text-rose-600">Zone</span>
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold -mt-1">
                  Authentic Kicks
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar (User request: chỉ có cho đẹp, không cần xử lý) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                id="input-header-search"
                type="text"
                placeholder="Tìm kiếm giày Nike, Jordan, Adidas, New Balance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 rounded-full bg-slate-100 hover:bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-xs sm:text-sm text-slate-800 transition-all placeholder:text-slate-400"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                id="btn-header-search-submit"
                type="button"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Nút tìm kiếm (trang trí theo yêu cầu)"
              >
                <span>Tìm</span>
              </button>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => onSwitchView('store')}
              className={`hover:text-rose-600 transition-colors cursor-pointer ${
                currentView === 'store' ? 'text-rose-600 font-bold' : ''
              }`}
            >
              Trang Chủ
            </button>
            <a href="#products-section" className="hover:text-rose-600 transition-colors">
              Sản Phẩm
            </a>
            <a href="#products-section" className="hover:text-rose-600 transition-colors">
              Nike & Jordan
            </a>
            <a href="#products-section" className="hover:text-rose-600 transition-colors">
              Adidas
            </a>
            <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
              Sale 40%
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </span>
          </nav>

          {/* Right Action Icons: Admin Switch, Wishlist, Cart, User Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Switcher for Admin role */}
            {currentUser?.role === 'admin' && (
              <button
                id="btn-toggle-admin-view"
                onClick={() => onSwitchView(currentView === 'admin' ? 'store' : 'admin')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-slate-900 text-amber-300 hover:bg-slate-800 ring-2 ring-amber-400/40'
                    : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                }`}
                title="Chuyển đổi giữa Giao diện Khách & Trang Quản trị Sản phẩm"
              >
                {currentView === 'admin' ? (
                  <>
                    <Store className="w-4 h-4 text-white" />
                    <span className="hidden sm:inline">Xem Cửa Hàng</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-4 h-4 text-amber-600" />
                    <span className="hidden sm:inline">Trang Quản Trị</span>
                  </>
                )}
              </button>
            )}

            {/* Decorative Wishlist Icon */}
            <button
              id="btn-header-wishlist"
              className="hidden sm:flex relative p-2.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Danh sách yêu thích"
              title="Yêu thích (Trang trí)"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>

            {/* Cart Button with Count Badge */}
            <button
              id="btn-open-cart-drawer"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors cursor-pointer flex items-center gap-2 group"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5 text-slate-800 group-hover:text-rose-600 transition-colors" />
              <span className="hidden md:inline text-xs font-bold">Giỏ hàng</span>
              <span
                id="cart-count-badge"
                className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center shadow-sm"
              >
                {totalCartCount}
              </span>
            </button>

            {/* USER LOGIN / PROFILE SECTION */}
            {!currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  id="btn-header-login-user"
                  onClick={() => onOpenAuth('user', false)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Đăng Nhập</span>
                </button>
                <button
                  id="btn-header-login-admin"
                  onClick={() => onOpenAuth('admin', false)}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold transition-colors cursor-pointer"
                  title="Đăng nhập luồng Quản trị viên"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  id="btn-user-profile-menu"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || AVATAR_IMAGES.fallbackAvatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-300"
                  />
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      {currentUser.role === 'admin' ? (
                        <span className="text-amber-600 font-bold flex items-center gap-0.5">
                          <Shield className="w-2.5 h-2.5" /> Quản trị viên
                        </span>
                      ) : (
                        <span className="text-emerald-600">Khách hàng</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    id="user-dropdown-popup"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          currentUser.role === 'admin'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {currentUser.role === 'admin' ? 'Quyền: Quản Trị Viên' : 'Quyền: Khách Hàng'}
                      </span>
                    </div>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          onSwitchView('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-amber-600 flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-500" />
                        Trang Quản Trị Sản Phẩm
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onSwitchView('store');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-rose-600 flex items-center gap-2 cursor-pointer"
                    >
                      <Store className="w-4 h-4 text-slate-500" />
                      Xem Cửa Hàng Giày
                    </button>

                    <button
                      id="btn-logout-user"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất tài khoản
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar (User request: chỉ có cho đẹp) */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm giày thể thao..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-16 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <button
              type="button"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-semibold"
            >
              Tìm
            </button>
          </div>
        </div>

        {/* Mobile Menu Collapse */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onSwitchView('store');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              Trang Chủ
            </button>
            <a
              href="#products-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              Tất Cả Sản Phẩm
            </a>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => {
                  onSwitchView('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100"
              >
                Trang Quản Trị Sản Phẩm (Admin)
              </button>
            )}
            {!currentUser && (
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenAuth('user', false);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-rose-600 text-white"
                >
                  Đăng Nhập Khách Hàng (User)
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('admin', false);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-slate-900 text-amber-300"
                >
                  Đăng Nhập Quản Trị Viên (Admin)
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
