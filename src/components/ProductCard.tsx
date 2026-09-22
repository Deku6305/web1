import React, { useState } from 'react';
import { Shoe } from '../types';
import { formatVND } from '../data/initialShoes';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  shoe: Shoe;
  onAddToCart: (shoe: Shoe, size: number, color: string) => void;
  onQuickView: (shoe: Shoe) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  shoe,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[0] || 40);
  const [selectedColor, setSelectedColor] = useState<string>(shoe.colors[0] || '#111827');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const discountPercent = shoe.originalPrice
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    if (!shoe.inStock) return;
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 700);
    onAddToCart(shoe, selectedSize, selectedColor);
  };

  return (
    <div
      id={`product-card-${shoe.id}`}
      className="group bg-white rounded-2xl border border-slate-200/80 hover:border-rose-200 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* 1. TOP BADGES & QUICK ACTIONS */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {shoe.badge && (
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
              shoe.badge === 'HOT'
                ? 'bg-rose-600 text-white'
                : shoe.badge === 'SALE'
                ? 'bg-amber-500 text-slate-950'
                : shoe.badge === 'BESTSELLER'
                ? 'bg-indigo-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {shoe.badge}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-black">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Stock Tag if Out of Stock */}
      {!shoe.inStock && (
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-300 text-[10px] font-bold">
          Hết hàng tạm thời
        </div>
      )}

      {/* 2. PRODUCT IMAGE CONTAINER */}
      <div className="relative w-full aspect-square bg-slate-100 overflow-hidden cursor-pointer">
        <img
          src={shoe.image}
          alt={shoe.name}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            !shoe.inStock ? 'opacity-50 grayscale' : ''
          }`}
          onClick={() => onQuickView(shoe)}
          loading="lazy"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            id={`btn-quick-view-${shoe.id}`}
            type="button"
            onClick={() => onQuickView(shoe)}
            className="px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform scale-95 group-hover:scale-100 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-rose-600" />
            <span>Xem Chi Tiết</span>
          </button>
        </div>
      </div>

      {/* 3. PRODUCT INFO BODY */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span className="text-rose-600 uppercase tracking-wider">{shoe.brand}</span>
            <span className="text-slate-400 font-medium">{shoe.category}</span>
          </div>

          {/* Shoe Title */}
          <h3
            onClick={() => onQuickView(shoe)}
            className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={shoe.name}
          >
            {shoe.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold text-slate-800 ml-1">{shoe.rating}</span>
            </div>
            <span className="text-[11px] text-slate-400">({shoe.reviewCount} đánh giá)</span>
          </div>

          {/* Size Selector Pills */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1.5">
              <span>Chọn kích cỡ (EU):</span>
              <span className="text-rose-600 font-bold">Size {selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {shoe.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    selectedSize === size
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Dots */}
          {shoe.colors.length > 1 && (
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-500">Màu:</span>
              <div className="flex items-center gap-1">
                {shoe.colors.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-4 h-4 rounded-full border border-slate-300 transition-all ${
                      selectedColor === color ? 'ring-2 ring-rose-500 ring-offset-1 scale-110' : ''
                    }`}
                    aria-label={`Màu ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. PRICE & ADD TO CART BUTTON */}
        <div className="pt-4 mt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-black text-rose-600">
              {formatVND(shoe.price)}
            </span>
            {shoe.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">
                {formatVND(shoe.originalPrice)}
              </span>
            )}
          </div>

          {/* Add To Cart Button (Requires Login check handled in parent) */}
          <button
            id={`btn-add-to-cart-${shoe.id}`}
            type="button"
            disabled={!shoe.inStock}
            onClick={handleAdd}
            className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !shoe.inStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isAddedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-rose-600 text-white shadow-sm active:scale-98'
            }`}
          >
            {isAddedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã thêm!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{shoe.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
