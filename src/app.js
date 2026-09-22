/**
 * SNEAKERZONE - THUẦN JAVASCRIPT (VANILLA JS)
 * Không sử dụng React hay thư viện bên ngoài.
 * Có thể chạy trực tiếp bằng Live Server trong VS Code hoặc mở trực tiếp trên trình duyệt.
 */

// 1. DỮ LIỆU HÌNH ẢNH TẬP TRUNG
const IMAGES = {
  shoes: {
    jordan1Chicago: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    dunkLowPanda: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    airForce1White: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    sambaOG: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80',
    ultraboostLight: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    newBalance550: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    jordan4Military: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
    pumaSuedeClassic: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    converseChuck70: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
    vansOldSkool: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
  },
  hero: {
    heroShoe: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
  },
  avatars: {
    defaultUser: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    adminMaster: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    userTu: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    userTuan: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    userTrang: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    fallbackAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
  },
  presets: [
    { name: 'Nike Air Jordan High', url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80' },
    { name: 'Nike Dunk Panda', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80' },
    { name: 'Nike Air Force 1 White', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80' },
    { name: 'Adidas Samba OG', url: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80' },
    { name: 'Adidas Ultraboost', url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80' },
    { name: 'Vans Skater', url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80' },
    { name: 'New Balance Classic', url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80' },
    { name: 'Puma Sport Classic', url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80' },
  ]
};

// 2. DỮ LIỆU KHỞI TẠO BAN ĐẦU
const INITIAL_SHOES_DATA = [
  {
    id: 'shoe-1',
    name: 'Nike Air Jordan 1 Retro High OG "Chicago"',
    brand: 'Jordan',
    category: 'Basketball',
    price: 4850000,
    originalPrice: 5500000,
    rating: 4.9,
    reviewCount: 142,
    image: IMAGES.shoes.jordan1Chicago,
    description: 'Huyền thoại sân bóng rổ và biểu tượng phong cách đường phố thế giới với phối màu Chicago kinh điển, đệm Air-Sole êm ái và chất liệu da cao cấp.',
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ['#dc2626', '#111827', '#ffffff'],
    badge: 'Hot Trend',
    inStock: true,
  },
  {
    id: 'shoe-2',
    name: 'Nike Dunk Low Retro "Panda Black White"',
    brand: 'Nike',
    category: 'Lifestyle',
    price: 2950000,
    originalPrice: 3500000,
    rating: 4.8,
    reviewCount: 320,
    image: IMAGES.shoes.dunkLowPanda,
    description: 'Mẫu giày quốc dân không bao giờ lỗi thời với phối màu tương phản trắng - đen tối giản, dễ dàng phối đồ với mọi phong cách thường ngày.',
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ['#000000', '#ffffff'],
    badge: 'Bán chạy',
    inStock: true,
  },
  {
    id: 'shoe-3',
    name: 'Nike Air Force 1 \'07 Triple White',
    brand: 'Nike',
    category: 'Lifestyle',
    price: 2600000,
    originalPrice: 2900000,
    rating: 4.9,
    reviewCount: 512,
    image: IMAGES.shoes.airForce1White,
    description: 'Sự tỏa sáng của biểu tượng giày thể thao thập niên 80. Đệm Nike Air thoải mái, lớp da bóng bẩy tạo nên phong cách thanh lịch, năng động.',
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    colors: ['#ffffff'],
    badge: 'Kinh điển',
    inStock: true,
  },
  {
    id: 'shoe-4',
    name: 'Adidas Samba OG Cloud White Core Black',
    brand: 'Adidas',
    category: 'Lifestyle',
    price: 2790000,
    originalPrice: 3100000,
    rating: 4.7,
    reviewCount: 98,
    image: IMAGES.shoes.sambaOG,
    description: 'Bắt nguồn từ sân bóng đá trong nhà, Samba OG hiện là xu hướng thời trang đường phố đình đám với mũi giày da lộn chữ T và đế cao su gum cổ điển.',
    sizes: [39, 40, 41, 42, 43],
    colors: ['#ffffff', '#000000'],
    badge: 'Trending',
    inStock: true,
  },
  {
    id: 'shoe-5',
    name: 'Adidas Ultraboost Light Running',
    brand: 'Adidas',
    category: 'Running',
    price: 3950000,
    originalPrice: 4500000,
    rating: 4.9,
    reviewCount: 86,
    image: IMAGES.shoes.ultraboostLight,
    description: 'Trải nghiệm năng lượng hoàn trả tối đa cùng đệm Light BOOST nhẹ hơn 30%. Thân giày dệt Primeknit+ ôm sát vừa vặn, thoáng khí tối đa cho runner.',
    sizes: [40, 41, 42, 43, 44],
    colors: ['#2563eb', '#1e293b', '#ffffff'],
    badge: 'Chạy bộ',
    inStock: true,
  },
  {
    id: 'shoe-6',
    name: 'New Balance 550 White Green',
    brand: 'New Balance',
    category: 'Lifestyle',
    price: 3200000,
    originalPrice: 3600000,
    rating: 4.8,
    reviewCount: 75,
    image: IMAGES.shoes.newBalance550,
    description: 'Hồi sinh từ kho lưu trữ bóng rổ thập niên 80 của New Balance, thiết kế vintage đậm chất retro với các chi tiết màu xanh lá đặc trưng trên nền da trắng.',
    sizes: [39, 40, 41, 42, 43],
    colors: ['#ffffff', '#15803d'],
    badge: 'Retro',
    inStock: true,
  },
  {
    id: 'shoe-7',
    name: 'Air Jordan 4 Retro Military Black',
    brand: 'Jordan',
    category: 'Basketball',
    price: 5900000,
    originalPrice: 6500000,
    rating: 5.0,
    reviewCount: 210,
    image: IMAGES.shoes.jordan4Military,
    description: 'Phối màu tinh tế và đẳng cấp bậc nhất của dòng Jordan 4 với khung cánh TPU nổi tiếng, đệm khí Air lộ ở gót và chất liệu da lộn mềm mại.',
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ['#1f2937', '#ffffff', '#9ca3af'],
    badge: 'Siêu phẩm',
    inStock: true,
  },
  {
    id: 'shoe-8',
    name: 'Puma Suede Classic XXI Black',
    brand: 'Puma',
    category: 'Lifestyle',
    price: 1850000,
    originalPrice: 2200000,
    rating: 4.6,
    reviewCount: 64,
    image: IMAGES.shoes.pumaSuedeClassic,
    description: 'Dòng giày da lộn huyền thoại gắn liền với văn hóa hip-hop và trượt ván đường phố từ năm 1968. Bền bỉ, êm ái và phong cách tự do.',
    sizes: [38, 39, 40, 41, 42],
    colors: ['#000000', '#ffffff'],
    badge: 'Ưu đãi',
    inStock: true,
  },
  {
    id: 'shoe-9',
    name: 'Converse Chuck 70 Vintage Canvas',
    brand: 'Converse',
    category: 'Lifestyle',
    price: 1800000,
    originalPrice: 2100000,
    rating: 4.9,
    reviewCount: 190,
    image: IMAGES.shoes.converseChuck70,
    description: 'Phiên bản cao cấp của dòng Chuck Taylor kinh điển với vải canvas 12oz dày dặn, đường may gia cố, lót giày OrthoLite cực êm và đế cao su phủ bóng ngà.',
    sizes: [37, 38, 39, 40, 41, 42, 43],
    colors: ['#000000', '#f3f4f6'],
    badge: 'Phổ biến',
    inStock: true,
  },
  {
    id: 'shoe-10',
    name: 'Vans Old Skool Classic Black/White',
    brand: 'Vans',
    category: 'Skateboarding',
    price: 1650000,
    originalPrice: 1950000,
    rating: 4.7,
    reviewCount: 178,
    image: IMAGES.shoes.vansOldSkool,
    description: 'Đôi giày trượt ván đầu tiên mang dải sọc Jazz Stripe trứ danh. Kết hợp da lộn và vải canvas bền bỉ với đế cao su bánh quế Waffle bám đường hoàn hảo.',
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ['#000000', '#ffffff'],
    badge: 'Bền bỉ',
    inStock: true,
  },
];

// LƯU TRỮ 2 TÀI KHOẢN (USER: user/123, ADMIN: admin/333) THEO YÊU CẦU
const STORED_ACCOUNTS = {
  user: {
    id: 'user-default-account',
    name: 'Khách Hàng (user)',
    username: 'user',
    password: '123',
    phone: '0912345678',
    email: 'user@sneakerzone.vn',
    role: 'user',
    avatar: IMAGES.avatars.defaultUser,
    status: 'active',
    createdAt: '2025-01-01',
  },
  admin: {
    id: 'admin-default-account',
    name: 'Quản Trị Viên (admin)',
    username: 'admin',
    password: '333',
    phone: '0988888888',
    email: 'admin@sneakerzone.vn',
    role: 'admin',
    avatar: IMAGES.avatars.adminMaster,
    status: 'active',
    createdAt: '2025-01-01',
  },
};

const PREDEFINED_USERS = [
  STORED_ACCOUNTS.user,
  STORED_ACCOUNTS.admin,
  {
    id: 'u-1',
    name: 'Nguyễn Hoàng Anh',
    email: 'hoanganh@gmail.com',
    username: 'hoanganh',
    phone: '0901234567',
    role: 'user',
    avatar: IMAGES.avatars.userTu,
    status: 'active',
    createdAt: '2025-01-15',
  },
  {
    id: 'u-2',
    name: 'Trần Minh Tuấn',
    email: 'minhtuan@gmail.com',
    username: 'minhtuan',
    phone: '0933221100',
    role: 'user',
    avatar: IMAGES.avatars.userTuan,
    status: 'active',
    createdAt: '2025-02-01',
  },
  {
    id: 'u-3',
    name: 'Lê Khánh Linh',
    email: 'khanhlinh@gmail.com',
    username: 'khanhlinh',
    phone: '0977665544',
    role: 'user',
    avatar: IMAGES.avatars.userTrang,
    status: 'blocked',
    createdAt: '2025-02-10',
  },
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-98214',
    userId: 'user-default-account',
    customerName: 'Người Dùng (User)',
    phone: '0912345678',
    address: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    items: [
      {
        shoeId: 'shoe-1',
        shoeName: 'Nike Air Jordan 1 Retro High OG "Chicago"',
        shoeImage: IMAGES.shoes.jordan1Chicago,
        size: 42,
        color: '#dc2626',
        price: 4850000,
        quantity: 1,
      },
    ],
    totalAmount: 4850000,
    status: 'completed',
    paymentMethod: 'cod',
    createdAt: '2025-02-28 14:32',
  },
  {
    id: 'ORD-76129',
    userId: 'u-2',
    customerName: 'Trần Minh Tuấn',
    phone: '0933221100',
    address: '45 Lê Duẩn, Hải Châu, Đà Nẵng',
    items: [
      {
        shoeId: 'shoe-2',
        shoeName: 'Nike Dunk Low Retro "Panda Black White"',
        shoeImage: IMAGES.shoes.dunkLowPanda,
        size: 40,
        color: '#000000',
        price: 2950000,
        quantity: 1,
      },
    ],
    totalAmount: 2950000,
    status: 'shipping',
    paymentMethod: 'banking',
    createdAt: '2025-03-01 09:15',
  },
  {
    id: 'ORD-54310',
    userId: 'u-1',
    customerName: 'Nguyễn Hoàng Anh',
    phone: '0901234567',
    address: '88 Cầu Giấy, Hà Nội',
    items: [
      {
        shoeId: 'shoe-4',
        shoeName: 'Adidas Samba OG Cloud White Core Black',
        shoeImage: IMAGES.shoes.sambaOG,
        size: 41,
        color: '#ffffff',
        price: 2790000,
        quantity: 1,
      },
    ],
    totalAmount: 2790000,
    status: 'pending',
    paymentMethod: 'credit',
    createdAt: '2025-03-02 16:45',
  },
];

// 3. TIỆN ÍCH ĐỊNH DẠNG TIỀN TỆ
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// 4. TRẠNG THÁI ỨNG DỤNG TOÀN CỤC (APPLICATION STATE)
const savedAuthRole = localStorage.getItem('sneaker_auth');
let initialUser = null;

if (savedAuthRole === 'admin') {
  initialUser = STORED_ACCOUNTS.admin;
} else if (savedAuthRole === 'user') {
  initialUser = STORED_ACCOUNTS.user;
}

const State = {
  shoes: JSON.parse(localStorage.getItem('sneaker_shoes') || 'null') || INITIAL_SHOES_DATA,
  currentUser: initialUser,
  cart: JSON.parse(localStorage.getItem('sneaker_cart') || '[]'),
  orders: JSON.parse(localStorage.getItem('sneaker_orders') || 'null') || INITIAL_ORDERS,
  users: [STORED_ACCOUNTS.user, STORED_ACCOUNTS.admin, ...PREDEFINED_USERS.slice(2)],

  activeView: 'store', // "vẫn để trang web giày trước" - Mặc định vào trang web giày
  adminTab: 'products', // 'products' | 'orders' | 'users'
  selectedBrand: 'all',
  selectedPriceRange: 'all',
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'rating'

  selectedShoeForDetail: null,
  selectedDetailSize: null,
  selectedDetailColor: null,
  detailQuantity: 1,

  appliedCoupon: null,
  isCartOpen: false,
  pendingCheckoutAfterLogin: false, // Cờ ghi nhớ để tự mở pop-up đặt hàng sau khi đăng nhập
};

function saveState() {
  localStorage.setItem('sneaker_shoes', JSON.stringify(State.shoes));
  localStorage.setItem('sneaker_cart', JSON.stringify(State.cart));
  localStorage.setItem('sneaker_orders', JSON.stringify(State.orders));
}

// 5. THÔNG BÁO TOAST
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'error' ? 'bg-rose-600' : type === 'info' ? 'bg-indigo-600' : 'bg-emerald-600';
  toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl text-white shadow-xl ${bgClass} transition-all duration-300 transform translate-y-4 opacity-0 text-sm font-semibold max-w-sm pointer-events-auto`;

  toast.innerHTML = `
    <span class="text-base">${type === 'error' ? '⚠️' : type === 'info' ? 'ℹ️' : '✓'}</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// 5.5. ĐĂNG NHẬP (TRÊN TRANG WEB GIÀY & POP-UP)
function openLoginModal(context = 'header') {
  const modal = document.getElementById('login-modal');
  const subtitle = document.getElementById('login-modal-subtitle');
  const errorBox = document.getElementById('login-error-msg');
  if (errorBox) errorBox.classList.add('hidden');

  if (context === 'checkout') {
    State.pendingCheckoutAfterLogin = true;
    if (subtitle) {
      subtitle.innerHTML = '<span class="text-rose-600 font-bold">⚠️ Vui lòng đăng nhập tài khoản (user/123) để tiến hành đặt hàng!</span>';
    }
  } else {
    State.pendingCheckoutAfterLogin = false;
    if (subtitle) {
      subtitle.textContent = 'Vui lòng đăng nhập để đặt hàng hoặc quản trị';
    }
  }

  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) modal.classList.add('hidden');
}

function handleLoginFormSubmit(e) {
  if (e) e.preventDefault();
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  const errorBox = document.getElementById('login-error-msg');

  const username = usernameInput ? usernameInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (errorBox) errorBox.classList.add('hidden');

  const success = performLogin(username, password);
  if (!success && errorBox) {
    errorBox.textContent = 'Tên đăng nhập hoặc mật khẩu không chính xác! Gợi ý: user/123 hoặc admin/333.';
    errorBox.classList.remove('hidden');
  }
}

function handleStoreInlineLogin(e) {
  if (e) e.preventDefault();
  const usernameInput = document.getElementById('store-login-user');
  const passwordInput = document.getElementById('store-login-pass');

  const username = usernameInput ? usernameInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  performLogin(username, password);
}

function performLogin(username, password) {
  // 1. Tài khoản User: username = "user", password = "123"
  if (username === 'user' && password === '123') {
    State.currentUser = STORED_ACCOUNTS.user;
    localStorage.setItem('sneaker_auth', 'user');
    closeLoginModal();
    showToast('Đăng nhập thành công! Chào mừng Khách hàng (user).');
    renderApp();

    // Nếu trước đó bấm "Đặt hàng", tự động mở pop-up đặt hàng ngay
    if (State.pendingCheckoutAfterLogin && State.cart.length > 0) {
      State.pendingCheckoutAfterLogin = false;
      setTimeout(() => {
        openPaymentModal();
      }, 300);
    }
    return true;
  }

  // 2. Tài khoản Admin: adminame = "admin", password = "333"
  if (username === 'admin' && password === '333') {
    State.currentUser = STORED_ACCOUNTS.admin;
    State.activeView = 'admin';
    localStorage.setItem('sneaker_auth', 'admin');
    closeLoginModal();
    showToast('Đăng nhập thành công! Đã chuyển sang Trang Quản Trị (admin).');
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }

  showToast('Sai thông tin! Vui lòng thử user/123 hoặc admin/333.', 'error');
  return false;
}

function quickLoginWith(username, password) {
  performLogin(username, password);
}

function handleLogout() {
  State.currentUser = null;
  State.activeView = 'store';
  State.pendingCheckoutAfterLogin = false;
  localStorage.removeItem('sneaker_auth');
  closeLoginModal();
  showToast('Đã đăng xuất tài khoản.', 'info');
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAdminPage() {
  if (State.currentUser && State.currentUser.role === 'admin') {
    if (State.activeView === 'admin') {
      State.activeView = 'store';
    } else {
      State.activeView = 'admin';
    }
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 6. RENDER LOGIC
function renderApp() {
  const storeView = document.getElementById('view-store');
  const adminView = document.getElementById('view-admin');

  if (State.activeView === 'admin' && State.currentUser && State.currentUser.role === 'admin') {
    if (storeView) storeView.classList.add('hidden');
    if (adminView) adminView.classList.remove('hidden');
    renderAdmin();
  } else {
    // "vẫn để trang web giày trước"
    State.activeView = 'store';
    if (storeView) storeView.classList.remove('hidden');
    if (adminView) adminView.classList.add('hidden');
    renderStore();
  }

  renderHeader();
  updateCartBadge();
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// CHUYỂN ĐỔI GIAO DIỆN
function switchToView(view) {
  if (view === 'login') {
    openLoginModal();
    return;
  }
  State.activeView = view;
  if (view === 'admin') {
    State.currentUser = STORED_ACCOUNTS.admin;
    localStorage.setItem('sneaker_auth', 'admin');
  } else {
    State.currentUser = STORED_ACCOUNTS.user;
    localStorage.setItem('sneaker_auth', 'user');
  }
  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAdminView() {
  toggleAdminPage();
}

// RENDER HEADER
function renderHeader() {
  const searchContainer = document.getElementById('header-search-container');
  const loginBtn = document.getElementById('btn-header-login');
  const accountChip = document.getElementById('header-account-chip');
  const accountDot = document.getElementById('header-account-dot');
  const accountText = document.getElementById('header-account-text');
  const adminNavBtn = document.getElementById('btn-header-admin-nav');
  const adminNavText = document.getElementById('admin-nav-text');
  const cartBtn = document.getElementById('btn-open-cart');
  const logoutBtn = document.getElementById('btn-header-logout');

  if (searchContainer) {
    searchContainer.classList.toggle('hidden', State.activeView === 'admin');
  }
  if (cartBtn) {
    cartBtn.classList.toggle('hidden', State.activeView === 'admin');
  }

  if (!State.currentUser) {
    // Chưa đăng nhập
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (accountChip) accountChip.classList.add('hidden');
    if (adminNavBtn) adminNavBtn.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
  } else if (State.currentUser.role === 'admin') {
    // Đã đăng nhập Admin
    if (loginBtn) loginBtn.classList.add('hidden');
    if (accountChip) {
      accountChip.classList.remove('hidden');
      accountChip.classList.add('flex');
    }
    if (accountDot) accountDot.className = 'w-2 h-2 rounded-full bg-purple-600 animate-pulse';
    if (accountText) accountText.textContent = 'admin (333)';

    if (adminNavBtn) {
      adminNavBtn.classList.remove('hidden');
      adminNavBtn.classList.add('flex');
      if (adminNavText) {
        adminNavText.textContent = State.activeView === 'admin' ? 'Về Cửa Hàng' : 'Trang Quản Trị';
      }
    }

    if (logoutBtn) {
      logoutBtn.classList.remove('hidden');
      logoutBtn.classList.add('flex');
    }
  } else {
    // Đã đăng nhập User
    if (loginBtn) loginBtn.classList.add('hidden');
    if (accountChip) {
      accountChip.classList.remove('hidden');
      accountChip.classList.add('flex');
    }
    if (accountDot) accountDot.className = 'w-2 h-2 rounded-full bg-emerald-500';
    if (accountText) accountText.textContent = 'user (123)';

    if (adminNavBtn) adminNavBtn.classList.add('hidden');

    if (logoutBtn) {
      logoutBtn.classList.remove('hidden');
      logoutBtn.classList.add('flex');
    }
  }

  const totalCartCount = State.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBadge = document.getElementById('header-cart-badge');
  if (cartBadge) {
    cartBadge.textContent = totalCartCount;
    cartBadge.classList.toggle('hidden', totalCartCount === 0);
  }
}

function updateCartBadge() {
  const badge = document.getElementById('header-cart-badge');
  if (!badge) return;
  const count = State.cart.reduce((s, i) => s + i.quantity, 0);
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
}

// RENDER STOREFRONT
function renderStore() {
  const container = document.getElementById('product-grid-container');
  const countLabel = document.getElementById('product-count-label');

  // Hiển thị sản phẩm (theo yêu cầu: chỉ để nút/chọn thôi, không cần lọc theo nổi bật hay giá)
  let filtered = State.shoes.filter(shoe => {
    const matchSearch = State.searchQuery === '' ||
      shoe.name.toLowerCase().includes(State.searchQuery.toLowerCase()) ||
      shoe.brand.toLowerCase().includes(State.searchQuery.toLowerCase()) ||
      shoe.category.toLowerCase().includes(State.searchQuery.toLowerCase());
    return matchSearch;
  });

  countLabel.textContent = `Hiển thị ${filtered.length} sản phẩm chính hãng`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
          <i data-lucide="package-search" class="w-8 h-8"></i>
        </div>
        <h3 class="text-base font-bold text-slate-800">Không tìm thấy sản phẩm phù hợp</h3>
        <p class="text-xs text-slate-500 mt-1">Thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc thương hiệu.</p>
        <button onclick="resetFilters()" class="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer">
          Xem tất cả sản phẩm
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(shoe => {
    const discount = Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100);
    return `
      <div class="group relative bg-white rounded-3xl border border-slate-200/80 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer" onclick="openShoeDetail('${shoe.id}')">
        ${shoe.badge ? `
          <div class="absolute top-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            ${shoe.badge}
          </div>
        ` : ''}

        ${discount > 0 ? `
          <div class="absolute top-3 right-3 z-10 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm">
            -${discount}%
          </div>
        ` : ''}

        <div class="relative w-full pt-[85%] bg-slate-100 overflow-hidden">
          <img src="${shoe.image}" alt="${shoe.name}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
              <span class="text-rose-600 uppercase tracking-wider">${shoe.brand}</span>
              <span class="flex items-center gap-1 text-amber-500 font-black">
                ★ ${shoe.rating} <span class="text-slate-400 font-normal">(${shoe.reviewCount})</span>
              </span>
            </div>
            <h3 class="text-sm font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
              ${shoe.name}
            </h3>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p class="text-base font-black text-rose-600">${formatVND(shoe.price)}</p>
              <p class="text-[11px] font-bold text-slate-400 line-through">${formatVND(shoe.originalPrice)}</p>
            </div>
            <button onclick="event.stopPropagation(); quickAddToCart('${shoe.id}')" class="p-2.5 rounded-2xl bg-slate-100 group-hover:bg-rose-600 text-slate-700 group-hover:text-white transition-all shadow-sm cursor-pointer" title="Thêm vào giỏ">
              <i data-lucide="plus" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 7. CHI TIẾT SẢN PHẨM (PRODUCT DETAIL MODAL)
function openShoeDetail(shoeId) {
  const shoe = State.shoes.find(s => s.id === shoeId);
  if (!shoe) return;

  State.selectedShoeForDetail = shoe;
  State.selectedDetailSize = shoe.sizes[0];
  State.selectedDetailColor = shoe.colors[0];
  State.detailQuantity = 1;

  const modal = document.getElementById('product-detail-modal');
  const content = document.getElementById('product-detail-content');

  const discount = Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100);

  content.innerHTML = `
    <div class="relative bg-slate-100 rounded-3xl overflow-hidden aspect-square sm:aspect-auto sm:h-96">
      <img src="${shoe.image}" alt="${shoe.name}" class="w-full h-full object-cover" />
      ${shoe.badge ? `
        <span class="absolute top-4 left-4 bg-slate-900 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
          ${shoe.badge}
        </span>
      ` : ''}
    </div>

    <div class="flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-extrabold uppercase tracking-wider">${shoe.brand}</span>
          <span class="text-xs text-slate-400">•</span>
          <span class="text-xs font-semibold text-slate-500">${shoe.category}</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight">${shoe.name}</h2>
        
        <div class="flex items-center gap-3 mt-2">
          <span class="text-2xl font-black text-rose-600">${formatVND(shoe.price)}</span>
          <span class="text-sm font-bold text-slate-400 line-through">${formatVND(shoe.originalPrice)}</span>
          <span class="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 text-xs font-extrabold">-${discount}%</span>
        </div>

        <p class="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">${shoe.description}</p>

        <!-- Chọn kích thước -->
        <div class="mt-5">
          <label class="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Chọn kích cỡ (Size):</label>
          <div class="flex flex-wrap gap-2" id="detail-sizes-group">
            ${shoe.sizes.map(size => `
              <button onclick="selectDetailSize(${size})" class="px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${State.selectedDetailSize === size ? 'border-rose-600 bg-rose-50 text-rose-600 ring-2 ring-rose-600/20' : 'border-slate-200 text-slate-700 hover:border-slate-400'}">
                ${size}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Chọn màu sắc -->
        <div class="mt-4">
          <label class="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Chọn màu sắc:</label>
          <div class="flex gap-2" id="detail-colors-group">
            ${shoe.colors.map(col => `
              <button onclick="selectDetailColor('${col}')" style="background-color: ${col}" class="w-7 h-7 rounded-full border border-slate-300 transition-all cursor-pointer ${State.selectedDetailColor === col ? 'ring-4 ring-rose-500/30 scale-110' : ''}"></button>
            `).join('')}
          </div>
        </div>

        <!-- Số lượng -->
        <div class="mt-5 flex items-center gap-4">
          <span class="text-xs font-bold text-slate-800 uppercase">Số lượng:</span>
          <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button onclick="adjustDetailQuantity(-1)" class="px-3 py-1.5 hover:bg-slate-200 font-bold text-sm cursor-pointer">-</button>
            <span id="detail-qty-value" class="px-3 font-bold text-sm text-slate-800">${State.detailQuantity}</span>
            <button onclick="adjustDetailQuantity(1)" class="px-3 py-1.5 hover:bg-slate-200 font-bold text-sm cursor-pointer">+</button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 pt-5 border-t border-slate-100 flex gap-3">
        <button onclick="addCurrentDetailToCart()" class="flex-1 py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
          <i data-lucide="shopping-bag" class="w-4 h-4"></i> Thêm vào giỏ hàng
        </button>
        <button onclick="buyCurrentDetailNow()" class="py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-black text-white font-extrabold text-sm transition-all cursor-pointer">
          Mua ngay
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function selectDetailSize(size) {
  State.selectedDetailSize = size;
  openShoeDetail(State.selectedShoeForDetail.id);
}

function selectDetailColor(color) {
  State.selectedDetailColor = color;
  openShoeDetail(State.selectedShoeForDetail.id);
}

function adjustDetailQuantity(delta) {
  State.detailQuantity = Math.max(1, State.detailQuantity + delta);
  const qtyEl = document.getElementById('detail-qty-value');
  if (qtyEl) qtyEl.textContent = State.detailQuantity;
}

function closeDetailModal() {
  document.getElementById('product-detail-modal').classList.add('hidden');
}

// 8. GIỎ HÀNG (SHOPPING CART)
function quickAddToCart(shoeId) {
  const shoe = State.shoes.find(s => s.id === shoeId);
  if (!shoe) return;
  addItemToCart(shoe, shoe.sizes[0], shoe.colors[0], 1);
}

function addCurrentDetailToCart() {
  if (!State.selectedShoeForDetail) return;
  addItemToCart(State.selectedShoeForDetail, State.selectedDetailSize, State.selectedDetailColor, State.detailQuantity);
  closeDetailModal();
}

function buyCurrentDetailNow() {
  if (!State.selectedShoeForDetail) return;
  addItemToCart(State.selectedShoeForDetail, State.selectedDetailSize, State.selectedDetailColor, State.detailQuantity);
  closeDetailModal();
  openCartDrawer();
}

function addItemToCart(shoe, size, color, quantity = 1) {
  const existingIndex = State.cart.findIndex(
    item => item.shoeId === shoe.id && item.size === size && item.color === color
  );

  if (existingIndex > -1) {
    State.cart[existingIndex].quantity += quantity;
  } else {
    State.cart.push({
      shoeId: shoe.id,
      shoeName: shoe.name,
      shoeImage: shoe.image,
      size: size,
      color: color,
      price: shoe.price,
      quantity: quantity,
    });
  }

  saveState();
  updateCartBadge();
  showToast(`Đã thêm ${shoe.name} vào giỏ hàng!`);
}

function openCartDrawer() {
  State.isCartOpen = true;
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('hidden');
  renderCartItems();
  if (window.lucide) window.lucide.createIcons();
}

function closeCartDrawer() {
  State.isCartOpen = false;
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('hidden');
}

function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer-section');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const totalEl = document.getElementById('cart-total');

  if (!container || !footer) return;

  if (State.cart.length === 0) {
    container.innerHTML = `
      <div class="py-20 text-center">
        <div class="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <i data-lucide="shopping-bag" class="w-8 h-8"></i>
        </div>
        <p class="text-sm font-bold text-slate-800">Giỏ hàng của bạn đang trống</p>
        <p class="text-xs text-slate-500 mt-1">Hãy khám phá bộ sưu tập và chọn đôi giày ưng ý nhất!</p>
        <button onclick="closeCartDrawer()" class="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer">
          Mua sắm ngay
        </button>
      </div>
    `;
    footer.classList.add('hidden');
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  footer.classList.remove('hidden');

  container.innerHTML = State.cart.map((item, idx) => `
    <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
      <img src="${item.shoeImage}" alt="${item.shoeName}" class="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200" />
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-900 truncate">${item.shoeName}</h4>
        <div class="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
          <span>Size: <b>${item.size}</b></span>
          <span>•</span>
          <span class="inline-block w-3 h-3 rounded-full border" style="background-color: ${item.color}"></span>
        </div>
        <div class="text-xs font-extrabold text-rose-600 mt-1">${formatVND(item.price)}</div>
      </div>
      <div class="flex flex-col items-end gap-2">
        <button onclick="removeFromCart(${idx})" class="text-slate-400 hover:text-rose-600 p-1 cursor-pointer" title="Xóa">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
        <div class="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden text-xs">
          <button onclick="updateCartQuantity(${idx}, -1)" class="px-2 py-0.5 hover:bg-slate-100 font-bold cursor-pointer">-</button>
          <span class="px-2 font-bold">${item.quantity}</span>
          <button onclick="updateCartQuantity(${idx}, 1)" class="px-2 py-0.5 hover:bg-slate-100 font-bold cursor-pointer">+</button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = State.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  if (State.appliedCoupon === 'GIAM10') {
    discount = subtotal * 0.1;
  }

  const shipping = subtotal > 3000000 || State.appliedCoupon === 'FREESHIP' ? 0 : 30000;
  const total = subtotal - discount + shipping;

  if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
  if (discountEl) discountEl.textContent = discount > 0 ? `-${formatVND(discount)}` : '0 ₫';
  if (totalEl) totalEl.textContent = formatVND(total);

  if (window.lucide) window.lucide.createIcons();
}

function updateCartQuantity(index, delta) {
  State.cart[index].quantity += delta;
  if (State.cart[index].quantity <= 0) {
    State.cart.splice(index, 1);
  }
  saveState();
  updateCartBadge();
  renderCartItems();
}

function removeFromCart(index) {
  State.cart.splice(index, 1);
  saveState();
  updateCartBadge();
  renderCartItems();
  showToast('Đã xóa sản phẩm khỏi giỏ');
}

function applyCouponCode() {
  const input = document.getElementById('coupon-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (code === 'GIAM10') {
    State.appliedCoupon = 'GIAM10';
    showToast('Áp dụng mã giảm giá 10% thành công!');
  } else if (code === 'FREESHIP') {
    State.appliedCoupon = 'FREESHIP';
    showToast('Đã áp dụng mã Miễn Phí Vận Chuyển!');
  } else {
    showToast('Mã khuyến mãi không hợp lệ!', 'error');
  }
  renderCartItems();
}

// 9. POP-UP ĐẶT HÀNG & CHỌN HÌNH THỨC THANH TOÁN (TIỀN MẶT / CHUYỂN KHOẢN)
let selectedPaymentMethod = 'Tiền mặt';

function openPaymentModal() {
  if (State.cart.length === 0) {
    showToast('Giỏ hàng của bạn đang trống!', 'info');
    return;
  }

  // THEO YÊU CẦU: "khi mà đặt hàng thì buộc phải đăng nhập"
  if (!State.currentUser) {
    showToast('Vui lòng đăng nhập để tiến hành đặt hàng!', 'info');
    openLoginModal('checkout');
    return;
  }

  closeCartDrawer();

  const modal = document.getElementById('payment-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  const totalCount = State.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = State.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  if (State.appliedCoupon === 'GIAM10') {
    discount = subtotal * 0.1;
  }
  const shipping = subtotal > 3000000 || State.appliedCoupon === 'FREESHIP' ? 0 : 30000;
  const finalTotal = subtotal - discount + shipping;

  const countEl = document.getElementById('payment-items-summary');
  if (countEl) countEl.textContent = `${totalCount} sản phẩm`;

  const totalEl = document.getElementById('payment-total-amount');
  if (totalEl) totalEl.textContent = formatVND(finalTotal);

  // Mặc định chọn Tiền mặt
  setPaymentMethod('cash');

  if (window.lucide) window.lucide.createIcons();
}

function closePaymentModal() {
  const modal = document.getElementById('payment-modal');
  if (modal) modal.classList.add('hidden');
}

function setPaymentMethod(method) {
  const radioCash = document.querySelector('input[name="payment_choice"][value="Tiền mặt"]');
  const radioBanking = document.querySelector('input[name="payment_choice"][value="Chuyển khoản"]');
  const cardCash = document.getElementById('label-method-cash');
  const cardBanking = document.getElementById('label-method-banking');
  const bankingInfo = document.getElementById('payment-banking-info');

  if (method === 'cash') {
    selectedPaymentMethod = 'Tiền mặt';
    if (radioCash) radioCash.checked = true;
    if (cardCash) cardCash.className = 'flex items-start gap-3 p-3.5 rounded-2xl border-2 border-rose-600 bg-rose-50/40 cursor-pointer transition-all';
    if (cardBanking) cardBanking.className = 'flex items-start gap-3 p-3.5 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white cursor-pointer transition-all';
    if (bankingInfo) bankingInfo.classList.add('hidden');
  } else {
    selectedPaymentMethod = 'Chuyển khoản';
    if (radioBanking) radioBanking.checked = true;
    if (cardCash) cardCash.className = 'flex items-start gap-3 p-3.5 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white cursor-pointer transition-all';
    if (cardBanking) cardBanking.className = 'flex items-start gap-3 p-3.5 rounded-2xl border-2 border-blue-600 bg-blue-50/40 cursor-pointer transition-all';
    if (bankingInfo) bankingInfo.classList.remove('hidden');
  }
}

// "ở cái nút hoàn tất đặt hàng hãy chỉnh lại cho tôi là để yên chỉ dùng để click thôi kh cần phải xóa giỏ hàng"
function handleCompleteOrder() {
  // Đóng pop-up đặt hàng & thanh toán khi click
  closePaymentModal();
  closeCartDrawer();

  // THEO YÊU CẦU CỤ THỂ:
  // 1. Giữ nguyên giỏ hàng: Không xóa giỏ hàng (không gán State.cart = []).
  // 2. Giữ nguyên trang: Không thực hiện bất kỳ hành động chuyển trang hay chuyển view nào.
  // 3. Không hiện thông báo "Đặt hàng thành công".
  // 4. Không chuyển trạng thái đơn hàng qua cho admin (KHÔNG thêm vào State.orders).
}

// 10. BẢNG QUẢN TRỊ ADMIN (ADMIN VIEW)
function switchAdminTab(tab) {
  State.adminTab = tab;
  renderAdmin();
}

function renderAdmin() {
  const container = document.getElementById('admin-content-container');
  const tabProducts = document.getElementById('admin-tab-products');
  const tabOrders = document.getElementById('admin-tab-orders');
  const tabUsers = document.getElementById('admin-tab-users');

  if (!container) return;

  // Active tab styling
  [tabProducts, tabOrders, tabUsers].forEach(btn => {
    if (btn) btn.className = 'px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer text-slate-600 hover:bg-slate-200';
  });

  if (State.adminTab === 'products') {
    if (tabProducts) tabProducts.className = 'px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer bg-slate-900 text-white shadow-sm';
    renderAdminProducts(container);
  } else if (State.adminTab === 'orders') {
    if (tabOrders) tabOrders.className = 'px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer bg-slate-900 text-white shadow-sm';
    renderAdminOrders(container);
  } else {
    if (tabUsers) tabUsers.className = 'px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer bg-slate-900 text-white shadow-sm';
    renderAdminUsers(container);
  }

  // Update stat cards
  const totalRev = State.orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const revEl = document.getElementById('stat-total-revenue');
  const ordersEl = document.getElementById('stat-total-orders');
  const prodsEl = document.getElementById('stat-total-products');
  const usersEl = document.getElementById('stat-total-users');

  if (revEl) revEl.textContent = formatVND(totalRev);
  if (ordersEl) ordersEl.textContent = State.orders.length;
  if (prodsEl) prodsEl.textContent = State.shoes.length;
  if (usersEl) usersEl.textContent = State.users.length;

  if (window.lucide) window.lucide.createIcons();
}

// "Nút “Thêm sản phẩm” chỉ hiển thị mà không cần xử lý. Các chức năng xóa, sửa sản phẩm... cũng chỉ hiển thị các nút mà không cần thực hiện."
function renderAdminProducts(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 class="text-base font-extrabold text-slate-900">Danh Sách Sản Phẩm</h3>
          <p class="text-xs text-slate-500">Quản lý kho hàng giày chính hãng (${State.shoes.length} mẫu)</p>
        </div>
        <!-- Nút Thêm sản phẩm: Chỉ hiển thị mà không cần xử lý theo yêu cầu -->
        <button class="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-600 text-white text-xs font-black transition-all shadow-md shadow-rose-600/20 cursor-default" title="Thêm sản phẩm (Chỉ hiển thị theo yêu cầu)">
          <i data-lucide="plus" class="w-4 h-4"></i> Thêm sản phẩm
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th class="py-3 px-4">Sản phẩm</th>
              <th class="py-3 px-4">Thương hiệu</th>
              <th class="py-3 px-4">Giá bán</th>
              <th class="py-3 px-4">Đánh giá</th>
              <th class="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${State.shoes.map(shoe => `
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="py-3 px-4 flex items-center gap-3">
                  <img src="${shoe.image}" alt="${shoe.name}" class="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                  <div>
                    <p class="font-extrabold text-slate-900">${shoe.name}</p>
                    <p class="text-[11px] text-slate-400">${shoe.category}</p>
                  </div>
                </td>
                <td class="py-3 px-4 font-bold text-slate-700">${shoe.brand}</td>
                <td class="py-3 px-4 font-extrabold text-rose-600">${formatVND(shoe.price)}</td>
                <td class="py-3 px-4 text-amber-500 font-black">★ ${shoe.rating}</td>
                <td class="py-3 px-4 text-right">
                  <!-- Các chức năng sửa, xóa: Chỉ hiển thị các nút mà không cần thực hiện -->
                  <div class="inline-flex items-center gap-1.5">
                    <button class="px-2.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center gap-1 border border-indigo-200 cursor-default" title="Sửa sản phẩm (Chỉ hiển thị theo yêu cầu)">
                      <i data-lucide="edit-2" class="w-3.5 h-3.5"></i> Sửa
                    </button>
                    <button class="px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs flex items-center gap-1 border border-rose-200 cursor-default" title="Xóa sản phẩm (Chỉ hiển thị theo yêu cầu)">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Xóa
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// "Mục lọc trạng thái đơn hàng chỉ cần hiện mà không cần hoạt động. Chức năng thay đổi trạng thái đơn hàng chỉ hiển thị nút mà không cần thực hiện."
function renderAdminOrders(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-base font-extrabold text-slate-900">Danh Sách Đơn Hàng</h3>
          <p class="text-xs text-slate-500">Quản lý và theo dõi tiến độ giao hàng (${State.orders.length} đơn)</p>
        </div>
        
        <!-- Chỗ lọc trạng thái đơn hàng chỉ cần hiện mà không cần hoạt động -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-500 whitespace-nowrap">Lọc trạng thái:</span>
          <select class="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 cursor-default" title="Lọc trạng thái đơn hàng (Chỉ hiển thị theo yêu cầu)">
            <option>Tất cả trạng thái</option>
            <option>Chờ xác nhận</option>
            <option>Đang giao</option>
            <option>Hoàn thành</option>
            <option>Đã hủy</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th class="py-3 px-4">Mã đơn</th>
              <th class="py-3 px-4">Khách hàng</th>
              <th class="py-3 px-4">Tổng tiền</th>
              <th class="py-3 px-4">Thanh toán</th>
              <th class="py-3 px-4">Thời gian</th>
              <th class="py-3 px-4 text-right">Trạng thái</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${State.orders.map(order => `
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="py-3 px-4 font-mono font-bold text-indigo-600">${order.id}</td>
                <td class="py-3 px-4">
                  <div class="font-bold text-slate-900">${order.customerName}</div>
                  <div class="text-[11px] text-slate-400">${order.phone}</div>
                </td>
                <td class="py-3 px-4 font-extrabold text-rose-600">${formatVND(order.totalAmount)}</td>
                <td class="py-3 px-4">
                  <span class="px-2.5 py-1 rounded-lg text-[11px] font-black ${order.paymentMethod === 'Tiền mặt' || order.paymentMethod === 'cod' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">
                    ${order.paymentMethod || 'Tiền mặt'}
                  </span>
                </td>
                <td class="py-3 px-4 text-slate-500">${order.createdAt}</td>
                <td class="py-3 px-4 text-right">
                  <!-- Thay đổi trạng thái đơn hàng chỉ hiển thị nút mà không cần thực hiện -->
                  <div class="inline-flex items-center gap-2 justify-end">
                    <select class="px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-800 cursor-default" title="Thay đổi trạng thái (Chỉ hiển thị theo yêu cầu)">
                      <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Chờ xác nhận</option>
                      <option value="shipping" ${order.status === 'shipping' ? 'selected' : ''}>Đang giao</option>
                      <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Hoàn thành</option>
                      <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                    </select>
                    <button class="px-2.5 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs cursor-default" title="Cập nhật (Chỉ hiển thị theo yêu cầu)">
                      Lưu
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// "Mục tìm kiếm, thêm tài khoản chỉ cần hiện mà không cần hoạt động. Các chức năng thay đổi, xóa user cũng chỉ hiển thị các nút mà không cần thực hiện."
// "Lưu trữ 2 tài khoản: user (user/123) và admin (admin/123)"
function renderAdminUsers(container) {
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 class="text-base font-extrabold text-slate-900">Danh Sách Tài Khoản & Người Dùng</h3>
          <p class="text-xs text-slate-500">Lưu trữ 2 tài khoản hệ thống: user (123) & admin (333)</p>
        </div>
        <!-- Mục thêm tài khoản chỉ cần hiện mà không cần hoạt động -->
        <button class="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-black transition-all shadow-md shadow-purple-600/20 cursor-default" title="Thêm tài khoản (Chỉ hiển thị theo yêu cầu)">
          <i data-lucide="user-plus" class="w-4 h-4"></i> Thêm tài khoản
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th class="py-3 px-4">Tài khoản</th>
              <th class="py-3 px-4">Username</th>
              <th class="py-3 px-4">Mật khẩu lưu trữ</th>
              <th class="py-3 px-4">Email / SĐT</th>
              <th class="py-3 px-4">Vai trò</th>
              <th class="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${State.users.map(u => `
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="py-3 px-4 flex items-center gap-3">
                  <img src="${u.avatar || IMAGES.avatars.fallbackAvatar}" alt="${u.name}" class="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0" />
                  <div>
                    <p class="font-extrabold text-slate-900">${u.name}</p>
                    <p class="text-[11px] text-slate-400">Trạng thái: Hoạt động</p>
                  </div>
                </td>
                <td class="py-3 px-4 font-mono font-bold text-slate-800">${u.username}</td>
                <td class="py-3 px-4 font-mono font-bold text-rose-600">${u.password || (u.username === 'admin' ? '333' : '123')}</td>
                <td class="py-3 px-4 text-slate-600">
                  <div>${u.email}</div>
                  <div class="text-[11px] text-slate-400">${u.phone}</div>
                </td>
                <td class="py-3 px-4">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}">
                    ${u.role}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <!-- Các chức năng thay đổi, xóa user chỉ hiển thị các nút mà không cần thực hiện -->
                  <div class="inline-flex items-center gap-1.5">
                    <button class="px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs flex items-center gap-1 border border-amber-200 cursor-default" title="Sửa người dùng (Chỉ hiển thị theo yêu cầu)">
                      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Sửa
                    </button>
                    <button class="px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs flex items-center gap-1 border border-rose-200 cursor-default" title="Xóa người dùng (Chỉ hiển thị theo yêu cầu)">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Xóa
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 12. THÊM SẢN PHẨM MỚI (ADD PRODUCT MODAL)
function openAddProductModal() {
  document.getElementById('add-product-modal').classList.remove('hidden');
}

function closeAddProductModal() {
  document.getElementById('add-product-modal').classList.add('hidden');
}

function handleAddProductSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('new-prod-name').value.trim();
  const brand = document.getElementById('new-prod-brand').value.trim();
  const category = document.getElementById('new-prod-category').value.trim();
  const price = parseInt(document.getElementById('new-prod-price').value, 10);
  const originalPrice = parseInt(document.getElementById('new-prod-orig-price').value, 10) || price;
  const image = document.getElementById('new-prod-image').value.trim() || IMAGES.shoes.jordan1Chicago;
  const desc = document.getElementById('new-prod-desc').value.trim() || 'Mẫu giày thể thao phong cách mới nhất.';

  if (!name || !brand || isNaN(price)) {
    showToast('Vui lòng điền đầy đủ các thông tin bắt buộc!', 'error');
    return;
  }

  const newShoe = {
    id: `shoe-${Date.now()}`,
    name: name,
    brand: brand,
    category: category || 'Lifestyle',
    price: price,
    originalPrice: originalPrice,
    rating: 5.0,
    reviewCount: 1,
    image: image,
    description: desc,
    sizes: [39, 40, 41, 42, 43],
    colors: ['#000000', '#ffffff'],
    badge: 'Mới về',
    inStock: true,
  };

  State.shoes.unshift(newShoe);
  saveState();
  closeAddProductModal();
  showToast(`Đã thêm sản phẩm "${name}" thành công!`);
  renderAdmin();
}

function selectPresetImage(url) {
  document.getElementById('new-prod-image').value = url;
}

// 13. KHỞI CHẠY VÀ GẮN SỰ KIỆN TOÀN CỤC
function setBrandFilter(brand) {
  State.selectedBrand = brand;
  // Cập nhật giao diện nút khi người dùng click vào
  document.querySelectorAll('#brand-filter-bar button').forEach(btn => {
    const b = btn.getAttribute('data-brand');
    if (b === brand) {
      btn.className = 'px-3.5 py-1.5 rounded-xl text-xs font-black transition-all bg-slate-900 text-white shadow-sm cursor-pointer whitespace-nowrap';
    } else {
      btn.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer whitespace-nowrap';
    }
  });
  // Giữ nguyên hiển thị toàn bộ sản phẩm, không lọc theo brand
  renderStore();
}

function resetFilters() {
  State.selectedBrand = 'all';
  State.searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'featured';
  State.sortBy = 'featured';
  setBrandFilter('all');
}

// KHỞI ĐỘNG KHI TẢI TRANG
document.addEventListener('DOMContentLoaded', () => {
  // Gắn sự kiện ô tìm kiếm


  // Gắn sự kiện chọn hiển thị sản phẩm (theo yêu cầu: chỉ để và chọn thôi không cần lọc hay sắp xếp theo nổi bật, giá thấp nhất cao nhất)
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      State.sortBy = e.target.value;
      // Giữ nguyên danh sách sản phẩm, không lọc hay sắp xếp lại
    });
  }

  // Render khởi đầu
  renderApp();
});

// Xuất các hàm ra window để gọi trực tiếp từ HTML onclick
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.handleLoginFormSubmit = handleLoginFormSubmit;
window.handleStoreInlineLogin = handleStoreInlineLogin;
window.quickLoginWith = quickLoginWith;
window.handleLogout = handleLogout;
window.toggleAdminPage = toggleAdminPage;
window.switchToView = switchToView;
window.openShoeDetail = openShoeDetail;
window.selectDetailSize = selectDetailSize;
window.selectDetailColor = selectDetailColor;
window.adjustDetailQuantity = adjustDetailQuantity;
window.closeDetailModal = closeDetailModal;
window.quickAddToCart = quickAddToCart;
window.addCurrentDetailToCart = addCurrentDetailToCart;
window.buyCurrentDetailNow = buyCurrentDetailNow;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.applyCouponCode = applyCouponCode;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.setPaymentMethod = setPaymentMethod;
window.handleCompleteOrder = handleCompleteOrder;
window.switchAdminTab = switchAdminTab;
window.openAddProductModal = openAddProductModal;
window.closeAddProductModal = closeAddProductModal;
window.handleAddProductSubmit = handleAddProductSubmit;
window.selectPresetImage = selectPresetImage;
window.setBrandFilter = setBrandFilter;
window.resetFilters = resetFilters;
