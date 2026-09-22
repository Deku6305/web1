import React, { useState, useEffect } from 'react';
import { Shoe, CartItem, User, ToastMessage, Order, OrderStatus } from './types';
import { INITIAL_SHOES } from './data/initialShoes';
import { INITIAL_USERS, INITIAL_ORDERS } from './data/initialData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { AuthModal } from './components/AuthModal';
import { AdminProductManager } from './components/AdminProductManager';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

export default function App() {
  // 1. Shoes State
  const [shoes, setShoes] = useState<Shoe[]>(() => {
    try {
      const saved = localStorage.getItem('sneakerzone_shoes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SHOES;
  });

  // 2. Users State
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('sneakerzone_users');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USERS;
  });

  // 3. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('sneakerzone_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  // 4. Current Logged-in User State (User or Admin)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('sneakerzone_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // 5. Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sneakerzone_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // 6. Navigation View: 'store' or 'admin'
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');

  // 7. Modals and Drawers
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRoleTab, setAuthRoleTab] = useState<'user' | 'admin'>('user');
  const [cartIntentNotice, setCartIntentNotice] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [quickViewShoe, setQuickViewShoe] = useState<Shoe | null>(null);

  // 8. Toasts State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 9. Decorative Filter & Sort (User request: chỉ có cho đẹp, không cần xử lý)
  const [activeBrandFilter, setActiveBrandFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem('sneakerzone_shoes', JSON.stringify(shoes));
    } catch (e) {
      console.error(e);
    }
  }, [shoes]);

  useEffect(() => {
    try {
      localStorage.setItem('sneakerzone_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('sneakerzone_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('sneakerzone_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('sneakerzone_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('sneakerzone_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Toast Helper
  const addToast = (type: 'success' | 'warning' | 'info' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Open Auth Modal
  const handleOpenAuth = (roleTab: 'user' | 'admin' = 'user', isCartIntent = false) => {
    setAuthRoleTab(roleTab);
    setCartIntentNotice(isCartIntent);
    setIsAuthModalOpen(true);
  };

  // Login Success Handler
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      addToast(
        'success',
        'Đăng nhập Admin thành công!',
        `Chào mừng ${user.name}. Bạn có toàn quyền truy cập Trang Quản Trị.`
      );
    } else {
      addToast(
        'success',
        'Đăng nhập thành công!',
        `Chào mừng ${user.name} quay trở lại với SneakerZone.`
      );
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('store');
    addToast('info', 'Đã đăng xuất', 'Bạn đã đăng xuất khỏi hệ thống.');
  };

  // ADD TO CART HANDLER (CRITICAL: MUST REQUIRE LOGIN!)
  const handleAddToCart = (shoe: Shoe, size: number, color: string, quantity = 1) => {
    if (!currentUser) {
      addToast(
        'warning',
        'Yêu cầu đăng nhập!',
        'Vui lòng đăng nhập tài khoản Khách hàng (user / 123) để thêm giày vào giỏ hàng.'
      );
      handleOpenAuth('user', true);
      return;
    }

    const cartItemId = `${shoe.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            shoe,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });

    addToast(
      'success',
      'Đã thêm vào giỏ hàng!',
      `${shoe.name} (Size: ${size}) x${quantity} đã được thêm vào giỏ.`
    );
  };

  // Cart quantity update
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove single item from cart
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    addToast('info', 'Đã xóa', 'Sản phẩm đã được xóa khỏi giỏ hàng.');
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // ORDER PLACED HANDLER (User clicked "Xác nhận đặt hàng" in PaymentModal)
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    addToast(
      'success',
      'Đặt hàng thành công!',
      `Đơn hàng #${newOrder.id} với hình thức thanh toán ${
        newOrder.paymentMethod === 'cod' ? 'Tiền mặt khi nhận' : 'Chuyển khoản'
      } đã được ghi nhận.`
    );
  };

  // Admin Shoe Operations
  const handleAddShoe = (newShoe: Shoe) => {
    setShoes((prev) => [newShoe, ...prev]);
    addToast('success', 'Thêm sản phẩm thành công', `Đã thêm đôi "${newShoe.name}" vào hệ thống.`);
  };

  const handleUpdateShoe = (updatedShoe: Shoe) => {
    setShoes((prev) => prev.map((s) => (s.id === updatedShoe.id ? updatedShoe : s)));
    addToast('success', 'Cập nhật thành công', `Thông tin "${updatedShoe.name}" đã được lưu.`);
  };

  const handleDeleteShoe = (id: string) => {
    const target = shoes.find((s) => s.id === id);
    setShoes((prev) => prev.filter((s) => s.id !== id));
    addToast('info', 'Đã xóa sản phẩm', `Sản phẩm "${target?.name || id}" đã được gỡ bỏ.`);
  };

  // Admin Order Status Update
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast('success', 'Cập nhật đơn hàng', `Đơn hàng #${orderId} đã chuyển sang trạng thái mới.`);
  };

  // Admin User Operations
  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
    addToast('success', 'Thêm người dùng', `Đã tạo tài khoản "${newUser.username}".`);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'blocked' ? 'active' : 'blocked';
          addToast(
            'info',
            'Trạng thái tài khoản',
            `Tài khoản "${u.username}" hiện ${newStatus === 'blocked' ? 'đã bị khóa' : 'đã mở khóa'}.`
          );
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    addToast('info', 'Đã xóa tài khoản', `Đã xóa người dùng "${target?.name || userId}".`);
  };

  // Scroll smoothly to products section
  const handleScrollToProducts = () => {
    setCurrentView('store');
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="sneaker-app-root" className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      
      {/* Universal Header */}
      <Header
        currentUser={currentUser}
        cartItems={cartItems}
        currentView={currentView}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenCart={() => setIsCartOpen(true)}
        onSwitchView={(view) => setCurrentView(view)}
      />

      {/* Main Content: Storefront or Admin Dashboard */}
      {currentView === 'admin' ? (
        <main className="flex-1">
          <AdminProductManager
            shoes={shoes}
            onAddShoe={handleAddShoe}
            onUpdateShoe={handleUpdateShoe}
            onDeleteShoe={handleDeleteShoe}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            users={users}
            onAddUser={handleAddUser}
            onToggleUserStatus={handleToggleUserStatus}
            onDeleteUser={handleDeleteUser}
            onBackToStore={() => setCurrentView('store')}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Banner Section */}
          <HeroBanner onExploreClick={handleScrollToProducts} />

          {/* Store Products Section */}
          <section id="products-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Heading & Subtitle */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-rose-600 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sản Phẩm Đang Bán</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  BỘ SƯU TẬP GIÀY THỂ THAO
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Khám phá các mẫu sneaker chính hãng mới nhất với đầy đủ kích thước và bảo hành trọn đời
                </p>
              </div>

              {/* Decorative Sort & Filter Toolbar (User request: chỉ có cho đẹp, không cần xử lý) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-rose-600" />
                  <span>Lọc:</span>
                  <select
                    value={activeBrandFilter}
                    onChange={(e) => setActiveBrandFilter(e.target.value)}
                    className="bg-transparent border-none outline-none font-bold text-slate-900 cursor-pointer"
                    title="Nút lọc thương hiệu (trang trí)"
                  >
                    <option value="all">Tất cả thương hiệu</option>
                    <option value="nike">Nike & Jordan</option>
                    <option value="adidas">Adidas</option>
                    <option value="newbalance">New Balance</option>
                    <option value="puma">Puma</option>
                    <option value="converse">Converse</option>
                    <option value="vans">Vans</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sắp xếp:</span>
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="bg-transparent border-none outline-none font-bold text-slate-900 cursor-pointer"
                    title="Nút sắp xếp (trang trí theo yêu cầu)"
                  >
                    <option value="newest">Mới nhất 2025</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                    <option value="bestseller">Bán chạy nhất</option>
                    <option value="rating">Đánh giá cao</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Brand Filter Pills (Decorative Navigation) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
              {['Tất cả', 'Nike', 'Jordan', 'Adidas', 'New Balance', 'Puma', 'Converse', 'Vans'].map((brand, i) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setActiveBrandFilter(brand.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    i === 0 && activeBrandFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div
              id="product-cards-grid"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {shoes.map((shoe) => (
                <ProductCard
                  key={shoe.id}
                  shoe={shoe}
                  onAddToCart={handleAddToCart}
                  onQuickView={(s) => setQuickViewShoe(s)}
                />
              ))}
            </div>

          </section>
        </main>
      )}

      {/* Global Footer */}
      <Footer />

      {/* Quick View Product Modal */}
      <ProductDetailModal
        shoe={quickViewShoe}
        onClose={() => setQuickViewShoe(null)}
        onAddToCart={(shoe, size, color, quantity) => {
          handleAddToCart(shoe, size, color, quantity);
          if (currentUser) {
            setQuickViewShoe(null);
          }
        }}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToPayment={() => {
          setIsCartOpen(false);
          setIsPaymentModalOpen(true);
        }}
      />

      {/* Payment Selection Modal (Cash on delivery vs Banking QR) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Authentication Modal (Fixed accounts: user/123 and admin/123) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setCartIntentNotice(false);
        }}
        onLoginSuccess={handleLoginSuccess}
        initialRoleTab={authRoleTab}
        cartIntentNotice={cartIntentNotice}
        registeredUsers={users}
      />

      {/* Toast Floating Notification System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
