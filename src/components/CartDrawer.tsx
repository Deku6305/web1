import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatVND } from '../data/initialShoes';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToPayment: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToPayment,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.shoe.price * item.quantity, 0);
  const shippingFee = subtotal > 1000000 || subtotal === 0 ? 0 : 35000;
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'SALE10' || promoCode.trim().toUpperCase() === 'SNEAKER10') {
      setAppliedDiscount(10);
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      setAppliedDiscount(20);
    } else {
      setPromoError('Mã không hợp lệ! Thử mã "SALE10" hoặc "VIP20"');
    }
  };

  const handleCheckout = () => {
    onProceedToPayment();
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-slate-200"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900">Giỏ Hàng Của Bạn</h2>
              <p className="text-xs text-slate-500 font-medium">
                {cartItems.length} loại sản phẩm ({cartItems.reduce((a, b) => a + b.quantity, 0)} đôi)
              </p>
            </div>
          </div>

          <button
            id="btn-close-cart-drawer"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body / Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-800">Giỏ hàng của bạn đang trống</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Hãy lựa chọn những đôi giày thể thao cá tính và thêm vào giỏ ngay nhé!
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                Khám Phá Sản Phẩm Ngay
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-xs transition-all"
              >
                {/* Thumbnail */}
                <img
                  src={item.shoe.image}
                  alt={item.shoe.name}
                  className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0"
                />

                {/* Info & Quantity Controls */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                        {item.shoe.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="font-semibold text-rose-600">Size: {item.selectedSize}</span>
                      <span>•</span>
                      <span className="uppercase">{item.shoe.brand}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-extrabold text-slate-900">
                      {formatVND(item.shoe.price * item.quantity)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-3.5">
            {/* Promo Code Input */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Mã giảm giá (ví dụ: SALE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs uppercase font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </div>
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Đã áp dụng mã giảm giá -{appliedDiscount}%!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1">{promoError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span className="font-semibold text-slate-900">{formatVND(subtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Giảm giá ({appliedDiscount}%):</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="font-semibold text-slate-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">Miễn phí (Freeship)</span>
                  ) : (
                    formatVND(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm sm:text-base font-black text-slate-900">
                <span>Tổng thanh toán:</span>
                <span className="text-rose-600 text-lg font-black">{formatVND(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="btn-cart-checkout"
              type="button"
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Tiến Hành Đặt Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Thanh toán an toàn, bảo mật & kiểm tra hàng trước khi nhận</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
