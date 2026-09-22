import React, { useState } from 'react';
import { CartItem, User, PaymentMethod, Order } from '../types';
import { formatVND } from '../data/initialShoes';
import {
  X,
  Banknote,
  Landmark,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MapPin,
  User as UserIcon,
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: User | null;
  onOrderSuccess: (newOrder: Order) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Người Dùng (User)');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '0912345678');
  const [customerAddress, setCustomerAddress] = useState('123 Nguyễn Trãi, Phường 3, Quận 5, TP. Hồ Chí Minh');
  const [orderNote, setOrderNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Cart calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.shoe.price * item.quantity, 0);
  const shippingFee = subtotal > 1000000 || subtotal === 0 ? 0 : 35000;
  const finalTotal = subtotal + shippingFee;

  const handleCopySTK = () => {
    navigator.clipboard.writeText('0988888888');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Click "Xác nhận đặt hàng" - Theo yêu cầu: sau khi ấn vào nút đặt hàng thì không có gì xảy ra cả không cần phải chuyển qua bên trang admin
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCloseAll = () => {
    setIsSubmittedSuccess(false);
    onClose();
  };

  return (
    <div
      id="payment-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        id="payment-modal-container"
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          id="btn-close-payment-modal"
          onClick={handleCloseAll}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmittedSuccess ? (
          /* Order Complete Feedback */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Đặt Hàng Thành Công!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Cảm ơn <strong>{customerName}</strong>! Đơn hàng của bạn đã được ghi nhận vào hệ thống.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 font-medium">
              <div className="flex justify-between">
                <span className="text-slate-500">Hình thức thanh toán:</span>
                <span className="font-bold text-slate-900">
                  {paymentMethod === 'cod' ? 'Tiền mặt khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tổng thanh toán:</span>
                <span className="font-bold text-rose-600 text-sm">{formatVND(finalTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Địa chỉ giao:</span>
                <span className="font-semibold text-slate-800 text-right max-w-xs">{customerAddress}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Đơn hàng này đã được đồng bộ vào mục <strong>Quản lý đơn hàng</strong> của Admin.
            </p>

            <button
              id="btn-finish-payment-modal"
              type="button"
              onClick={handleCloseAll}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Hoàn Tất & Tiếp Tục Mua Sắm
            </button>
          </div>
        ) : (
          /* Payment Selection Form */
          <div>
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/70">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Chọn Phương Thức Thanh Toán</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Vui lòng chọn hình thức thanh toán bằng tiền mặt hoặc chuyển khoản ngân hàng
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* 1. PAYMENT METHODS OPTIONS */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Hình thức thanh toán
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* OPTION 1: TIỀN MẶT (COD) */}
                  <label
                    id="radio-payment-cod"
                    className={`relative p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-rose-600 bg-rose-50/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          paymentMethod === 'cod' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-extrabold text-xs sm:text-sm text-slate-900">Tiền Mặt (COD)</p>
                          <span className="text-[10px] text-slate-500">Khi nhận hàng</span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-rose-600 focus:ring-rose-500 mt-1 cursor-pointer"
                      />
                    </div>
                    <p className="mt-3 text-[11px] text-slate-600 leading-relaxed">
                      Thanh toán trực tiếp bằng tiền mặt cho shipper khi nhận và kiểm tra giày.
                    </p>
                  </label>

                  {/* OPTION 2: CHUYỂN KHOẢN NGÂN HÀNG (BANKING / QR) */}
                  <label
                    id="radio-payment-banking"
                    className={`relative p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === 'banking'
                        ? 'border-rose-600 bg-rose-50/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          paymentMethod === 'banking' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Landmark className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-extrabold text-xs sm:text-sm text-slate-900">Chuyển Khoản</p>
                          <span className="text-[10px] text-slate-500">Qua Ngân hàng / QR</span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="banking"
                        checked={paymentMethod === 'banking'}
                        onChange={() => setPaymentMethod('banking')}
                        className="text-rose-600 focus:ring-rose-500 mt-1 cursor-pointer"
                      />
                    </div>
                    <p className="mt-3 text-[11px] text-slate-600 leading-relaxed">
                      Quét mã QR hoặc chuyển khoản qua tài khoản ngân hàng Quân Đội MBBank.
                    </p>
                  </label>

                </div>
              </div>

              {/* BANKING DETAILS CONTAINER (Shows when Banking is selected) */}
              {paymentMethod === 'banking' && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                      <QrCode className="w-4 h-4" />
                      <span>Thông tin tài khoản nhận tiền</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">MB BANK VIETNAM</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-[10px] text-slate-400">Ngân hàng:</span>
                        <p className="font-bold text-slate-200">MB Bank (Quân Đội)</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400">Chủ tài khoản:</span>
                        <p className="font-bold text-slate-200">SNEAKERZONE VIETNAM</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400">Số tài khoản:</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono font-black text-amber-400 text-base">0988 888 888</span>
                          <button
                            type="button"
                            onClick={handleCopySTK}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopied ? 'Đã chép' : 'Sao chép'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Demo Visual */}
                    <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center text-slate-900 text-center">
                      <div className="w-24 h-24 bg-slate-100 rounded-lg border border-slate-300 flex items-center justify-center p-1">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0988888888"
                          alt="QR Ngân Hàng"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Quét mã chuyển tiền nhanh</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
                    Nội dung CK: <strong className="text-amber-400">SZ {customerPhone || '0912345678'}</strong>
                  </div>
                </div>
              )}

              {/* 2. RECIPIENT INFORMATION */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Thông tin người nhận hàng
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Họ và tên *</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Số điện thoại *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0912345678"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Địa chỉ giao hàng *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Ghi chú đơn hàng (nếu có)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
                    <textarea
                      rows={2}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Ví dụ: Giao hàng giờ hành chính, gọi điện trước khi giao..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. ORDER SUMMARY REVIEW */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Số lượng giày đặt:</span>
                  <span className="font-semibold text-slate-900">{cartItems.reduce((a, b) => a + b.quantity, 0)} đôi</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-emerald-600">
                    {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-rose-600 text-base font-black">{formatVND(finalTotal)}</span>
                </div>
              </div>

              {/* 4. SUBMIT BUTTON (Theo yêu cầu: sau khi ấn vào nút đặt hàng thì không có gì xảy ra cả không cần phải chuyển qua bên trang admin) */}
              <div className="pt-2">
                <button
                  id="btn-confirm-place-order"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    // Không có gì xảy ra cả theo đúng yêu cầu
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Xác Nhận Đặt Hàng</span>
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  Bằng cách nhấn xác nhận, bạn đồng ý với các điều khoản bảo mật và giao hàng của SneakerZone.
                </p>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
