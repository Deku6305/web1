import React, { useState } from 'react';
import { Shoe } from '../types';
import { formatVND } from '../data/initialShoes';
import { X, Star, ShoppingBag, Truck, ShieldCheck, RotateCcw, Plus, Minus, Check } from 'lucide-react';

interface ProductDetailModalProps {
  shoe: Shoe | null;
  onClose: () => void;
  onAddToCart: (shoe: Shoe, size: number, color: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  shoe,
  onClose,
  onAddToCart,
}) => {
  if (!shoe) return null;

  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[0] || 40);
  const [selectedColor, setSelectedColor] = useState<string>(shoe.colors[0] || '#111827');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = shoe.originalPrice
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    if (!shoe.inStock) return;
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
    onAddToCart(shoe, selectedSize, selectedColor, quantity);
  };

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        id="product-detail-modal-container"
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          id="btn-close-product-detail"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative bg-slate-100 p-6 flex items-center justify-center">
            <img
              src={shoe.image}
              alt={shoe.name}
              className="w-full max-h-96 object-contain drop-shadow-xl"
            />
            {shoe.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-md">
                {shoe.badge}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
                <span>{shoe.brand}</span>
                <span>•</span>
                <span className="text-slate-500">{shoe.category}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {shoe.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-800 ml-1">{shoe.rating}</span>
                </div>
                <span className="text-xs text-slate-400">| {shoe.reviewCount} đánh giá tích cực</span>
                <span className="text-xs font-bold text-emerald-600 ml-auto">
                  {shoe.inStock ? `Còn ${shoe.stockQuantity} đôi` : 'Tạm hết hàng'}
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-black text-rose-600">
                  {formatVND(shoe.price)}
                </span>
                {shoe.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatVND(shoe.originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-xs font-bold">
                    Tiết kiệm {discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {shoe.description}
              </p>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                  <span>Chọn kích thước:</span>
                  <span className="text-rose-600">Size: {selectedSize}</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {shoe.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Số lượng:</span>
                <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <button
                id="btn-modal-add-to-cart"
                type="button"
                disabled={!shoe.inStock}
                onClick={handleAdd}
                className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !shoe.inStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-rose-600 text-white shadow-lg active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã thêm vào giỏ hàng!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{shoe.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}</span>
                  </>
                )}
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 font-semibold text-center pt-2">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Chính Hãng</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-sky-500" />
                  <span>Freeship Đơn &gt; 1Tr</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                  <span>Đổi Trả 30 Ngày</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
