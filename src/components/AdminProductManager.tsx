import React, { useState } from 'react';
import { Shoe, Order, User, OrderStatus } from '../types';
import { formatVND } from '../data/initialShoes';
import { DEMO_PRESET_IMAGES, AVATAR_IMAGES } from '../imagie';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Package,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  ArrowLeft,
  X,
  Image as ImageIcon,
  Sparkles,
  ShoppingBag,
  Users,
  Shield,
  Clock,
  Truck,
  XCircle,
  UserCheck,
  UserX,
  CreditCard,
  Banknote,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

interface AdminProductManagerProps {
  shoes: Shoe[];
  onAddShoe: (shoe: Shoe) => void;
  onUpdateShoe: (shoe: Shoe) => void;
  onDeleteShoe: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  users: User[];
  onAddUser: (user: User) => void;
  onToggleUserStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onBackToStore: () => void;
}

export const AdminProductManager: React.FC<AdminProductManagerProps> = ({
  shoes,
  onAddShoe,
  onUpdateShoe,
  onDeleteShoe,
  orders,
  onUpdateOrderStatus,
  users,
  onAddUser,
  onToggleUserStatus,
  onDeleteUser,
  onBackToStore,
}) => {
  // Active Admin Section Tab
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'users'>('products');

  // Product Management State
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingShoe, setEditingShoe] = useState<Shoe | null>(null);
  const [deletingShoeId, setDeletingShoeId] = useState<string | null>(null);

  // Orders State
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Users State
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    role: 'user' as 'user' | 'admin',
  });

  // Form State for Add / Edit Shoes
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Nike',
    category: 'Lifestyle',
    price: 2500000,
    originalPrice: 3000000,
    stockQuantity: 20,
    image: DEMO_PRESET_IMAGES[0].url,
    description: '',
    sizes: '39, 40, 41, 42, 43',
    badge: 'NEW' as 'HOT' | 'SALE' | 'NEW' | 'BESTSELLER' | undefined,
  });

  // Calculate Product Stats
  const totalProducts = shoes.length;
  const inStockCount = shoes.filter((s) => s.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const totalInventoryValue = shoes.reduce((acc, s) => acc + s.price * (s.stockQuantity || 0), 0);

  // Calculate Order Stats
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  // Theo yêu cầu: ở chỗ tìm kiếm và lọc trạng thái đơn hàng thì chỉ cần hiện không cần phải hoạt động
  const filteredShoes = shoes;
  const filteredOrders = orders;
  const filteredUsers = users;

  // Open Edit Modal with selected shoe data
  const handleOpenEdit = (shoe: Shoe) => {
    setEditingShoe(shoe);
    setFormData({
      name: shoe.name,
      brand: shoe.brand,
      category: shoe.category,
      price: shoe.price,
      originalPrice: shoe.originalPrice || shoe.price,
      stockQuantity: shoe.stockQuantity,
      image: shoe.image,
      description: shoe.description,
      sizes: shoe.sizes.join(', '),
      badge: shoe.badge,
    });
  };

  // Reset form
  const handleResetForm = () => {
    setFormData({
      name: '',
      brand: 'Nike',
      category: 'Lifestyle',
      price: 2500000,
      originalPrice: 3000000,
      stockQuantity: 20,
      image: DEMO_PRESET_IMAGES[0].url,
      description: '',
      sizes: '39, 40, 41, 42, 43',
      badge: 'NEW',
    });
    setEditingShoe(null);
  };

  // Submit Add or Edit Shoe
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const parsedSizes = formData.sizes
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n) && n > 20);

    const stockQty = Number(formData.stockQuantity) || 0;

    if (editingShoe) {
      const updated: Shoe = {
        ...editingShoe,
        name: formData.name.trim(),
        brand: formData.brand,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        stockQuantity: stockQty,
        inStock: stockQty > 0,
        image: formData.image,
        description: formData.description,
        sizes: parsedSizes.length > 0 ? parsedSizes : [39, 40, 41, 42],
        badge: formData.badge || undefined,
      };
      onUpdateShoe(updated);
      setEditingShoe(null);
    } else {
      const newShoe: Shoe = {
        id: `shoe-${Date.now()}`,
        name: formData.name.trim(),
        brand: formData.brand,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        rating: 5.0,
        reviewCount: 1,
        stockQuantity: stockQty,
        inStock: stockQty > 0,
        image: formData.image,
        description: formData.description || 'Mẫu giày thể thao chất lượng cao, êm ái, phong cách hiện đại.',
        sizes: parsedSizes.length > 0 ? parsedSizes : [39, 40, 41, 42],
        colors: ['#000000', '#ffffff'],
        badge: formData.badge || 'NEW',
        createdAt: new Date().toISOString().split('T')[0],
      };
      onAddShoe(newShoe);
      setIsAddModalOpen(false);
    }
    handleResetForm();
  };

  // Submit Add New User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name.trim() || !newUserForm.username.trim()) return;

    const userObj: User = {
      id: `user-${Date.now()}`,
      name: newUserForm.name.trim(),
      username: newUserForm.username.trim().toLowerCase(),
      email: newUserForm.email.trim() || `${newUserForm.username.trim()}@sneakerzone.vn`,
      phone: newUserForm.phone.trim() || '0900000000',
      role: newUserForm.role,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      avatar: AVATAR_IMAGES.defaultUser,
    };

    onAddUser(userObj);
    setIsAddUserModalOpen(false);
    setNewUserForm({ name: '', username: '', email: '', phone: '', role: 'user' });
  };

  return (
    <div id="admin-management-view" className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 1. TOP ADMIN CONTROL BAR */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-3xl shadow-xs border border-slate-200">
          <div className="flex items-center gap-3">
            <button
              id="btn-admin-back-to-store"
              type="button"
              onClick={onBackToStore}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Xem Cửa Hàng</span>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Bảng Quản Trị Hệ Thống
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300">
                  Admin Master
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Quản lý toàn bộ danh mục sản phẩm, đơn đặt hàng và người dùng hệ thống
              </p>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 w-full md:w-auto">
            <button
              id="btn-tab-admin-products"
              type="button"
              onClick={() => setActiveTab('products')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4 text-rose-600" />
              <span>Quản Lý Sản Phẩm</span>
              <span className="px-1.5 py-0.2 rounded-md bg-slate-200 text-slate-800 text-[10px] font-bold">
                {shoes.length}
              </span>
            </button>

            <button
              id="btn-tab-admin-orders"
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span>Quản Lý Đơn Hàng</span>
              <span className="px-1.5 py-0.2 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                {orders.length}
              </span>
            </button>

            <button
              id="btn-tab-admin-users"
              type="button"
              onClick={() => setActiveTab('users')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Quản Lý User</span>
              <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {users.length}
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: PRODUCT MANAGEMENT (QUẢN LÝ SẢN PHẨM) */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Stats Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng Sản Phẩm</p>
                  <p className="text-2xl font-black text-slate-900">{totalProducts}</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đang Còn Hàng</p>
                  <p className="text-2xl font-black text-emerald-600">{inStockCount}</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hết Hàng</p>
                  <p className="text-2xl font-black text-rose-600">{outOfStockCount}</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giá Trị Kho Ước Tính</p>
                  <p className="text-lg sm:text-xl font-black text-slate-900">
                    {formatVND(totalInventoryValue)}
                  </p>
                </div>
              </div>
            </div>

            {/* Products Table Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <input
                    id="input-admin-search-shoes"
                    type="text"
                    placeholder="Tìm sản phẩm theo tên, thương hiệu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs text-slate-500 font-semibold">
                    Hiển thị <strong>{filteredShoes.length}</strong> / {shoes.length} sản phẩm
                  </span>
                  <button
                    id="btn-admin-add-product"
                    type="button"
                    onClick={() => {
                      // Theo yêu cầu: nút thêm sản phẩm chỉ hiện thôi không cần phải xử lý
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-1.5 transition-all cursor-default"
                    title="Thêm sản phẩm (chỉ hiển thị theo yêu cầu)"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Sản Phẩm</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3 px-4">Sản Phẩm</th>
                      <th className="py-3 px-4">Thương Hiệu / Loại</th>
                      <th className="py-3 px-4">Giá Bán</th>
                      <th className="py-3 px-4">Tồn Kho</th>
                      <th className="py-3 px-4">Trạng Thái</th>
                      <th className="py-3 px-4 text-right">Thay Đổi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredShoes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-slate-400">
                          Không tìm thấy sản phẩm nào phù hợp!
                        </td>
                      </tr>
                    ) : (
                      filteredShoes.map((shoe) => (
                        <tr
                          key={shoe.id}
                          id={`admin-shoe-row-${shoe.id}`}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <img
                              src={shoe.image}
                              alt={shoe.name}
                              className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                            />
                            <div className="max-w-xs sm:max-w-sm">
                              <p className="font-extrabold text-slate-900 line-clamp-1">{shoe.name}</p>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-medium">
                                <span>ID: {shoe.id}</span>
                                {shoe.badge && (
                                  <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 font-bold text-[10px]">
                                    {shoe.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-800">{shoe.brand}</span>
                            <p className="text-slate-400 text-[11px]">{shoe.category}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-rose-600 text-sm">
                              {formatVND(shoe.price)}
                            </span>
                            {shoe.originalPrice && (
                              <p className="text-[11px] text-slate-400 line-through">
                                {formatVND(shoe.originalPrice)}
                              </p>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900">{shoe.stockQuantity} đôi</span>
                          </td>
                          <td className="py-3.5 px-4">
                            {shoe.inStock ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                                <CheckCircle className="w-3 h-3" /> Còn hàng
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold">
                                <AlertTriangle className="w-3 h-3" /> Hết hàng
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                id={`btn-edit-shoe-${shoe.id}`}
                                type="button"
                                onClick={() => {
                                  // Theo yêu cầu: sửa sản phẩm chỉ hiện nút thôi khi ấn vào không cần thực hiện
                                }}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-default"
                                title="Chỉnh sửa sản phẩm"
                              >
                                <Edit2 className="w-4 h-4 text-indigo-600" />
                              </button>
                              <button
                                id={`btn-delete-shoe-${shoe.id}`}
                                type="button"
                                onClick={() => {
                                  // Theo yêu cầu: xóa sản phẩm chỉ hiện nút thôi khi ấn vào không cần thực hiện
                                }}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-default"
                                title="Xóa sản phẩm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ORDER MANAGEMENT (QUẢN LÝ ĐƠN HÀNG) */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Orders Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng Đơn Hàng</p>
                  <p className="text-2xl font-black text-slate-900">{totalOrders}</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chờ Xử Lý</p>
                  <p className="text-2xl font-black text-amber-600">{pendingOrders}</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đơn Hoàn Thành</p>
                  <p className="text-2xl font-black text-emerald-600">
                    {orders.filter((o) => o.status === 'completed').length}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doanh Thu Đơn Hàng</p>
                  <p className="text-lg sm:text-xl font-black text-slate-900">
                    {formatVND(totalRevenue)}
                  </p>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Tìm theo mã đơn, tên, SĐT..."
                      value={orderSearchTerm}
                      onChange={(e) => setOrderSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>

                  {/* Status filter dropdown */}
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="shipping">Đang giao hàng</option>
                    <option value="completed">Đã giao thành công</option>
                    <option value="cancelled">Đã hủy đơn</option>
                  </select>
                </div>

                <span className="text-xs text-slate-500 font-semibold self-end sm:self-center">
                  Tổng <strong>{filteredOrders.length}</strong> đơn hàng
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3 px-4">Mã Đơn & Thời Gian</th>
                      <th className="py-3 px-4">Khách Hàng & Liên Hệ</th>
                      <th className="py-3 px-4">Sản Phẩm Đặt</th>
                      <th className="py-3 px-4">Tổng Tiền</th>
                      <th className="py-3 px-4">Hình Thức TT</th>
                      <th className="py-3 px-4">Trạng Thái Đơn</th>
                      <th className="py-3 px-4 text-right">Thay Đổi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-slate-400">
                          Chưa có đơn hàng nào!
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-indigo-600 text-xs">
                              #{order.id}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                              <Calendar className="w-3 h-3" />
                              <span>{order.createdAt}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="font-extrabold text-slate-900">{order.customerName}</p>
                            <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {order.customerPhone}
                            </p>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="space-y-1">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <img
                                    src={item.shoeImage}
                                    alt={item.shoeName}
                                    className="w-7 h-7 rounded-md object-cover border border-slate-200 shrink-0"
                                  />
                                  <span className="text-slate-800 font-medium truncate max-w-[140px]" title={item.shoeName}>
                                    {item.shoeName}
                                  </span>
                                  <span className="text-slate-500 font-bold">x{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-black text-rose-600 text-sm">
                              {formatVND(order.totalAmount)}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            {order.paymentMethod === 'cod' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">
                                <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Tiền Mặt (COD)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[11px]">
                                <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Chuyển Khoản</span>
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            {order.status === 'pending' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
                                <Clock className="w-3 h-3" /> Chờ xác nhận
                              </span>
                            )}
                            {order.status === 'shipping' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px]">
                                <Truck className="w-3 h-3" /> Đang giao hàng
                              </span>
                            )}
                            {order.status === 'completed' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                                <CheckCircle className="w-3 h-3" /> Đã hoàn thành
                              </span>
                            )}
                            {order.status === 'cancelled' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-[11px]">
                                <XCircle className="w-3 h-3" /> Đã hủy đơn
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <select
                              value={order.status}
                              onChange={() => {
                                // Theo yêu cầu: thay đổi trạng thái đơn hàng chỉ hiện thôi khi ấn vào không cần thực hiện
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none cursor-default"
                              title="Thay đổi trạng thái (chỉ hiển thị theo yêu cầu)"
                            >
                              <option value="pending">Chờ xác nhận</option>
                              <option value="shipping">Đang giao</option>
                              <option value="completed">Đã hoàn thành</option>
                              <option value="cancelled">Hủy đơn</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: USER MANAGEMENT (QUẢN LÝ NGƯỜI DÙNG) */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Users Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng Thành Viên</p>
                  <p className="text-2xl font-black text-slate-900">{users.length}</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đang Hoạt Động</p>
                  <p className="text-2xl font-black text-emerald-600">
                    {users.filter((u) => u.status !== 'blocked').length}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <UserX className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bị Khóa (Blocked)</p>
                  <p className="text-2xl font-black text-rose-600">
                    {users.filter((u) => u.status === 'blocked').length}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quản Trị Viên (Admin)</p>
                  <p className="text-2xl font-black text-amber-600">
                    {users.filter((u) => u.role === 'admin').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Users Table Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Tìm user theo họ tên, username, email..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs text-slate-500 font-semibold">
                    Hiển thị <strong>{filteredUsers.length}</strong> người dùng
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      // Theo yêu cầu: nút thêm tài khoản chỉ cần hiện không cần phải hoạt động
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-default"
                    title="Thêm tài khoản (chỉ hiển thị theo yêu cầu)"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Tài Khoản</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3 px-4">Người Dùng</th>
                      <th className="py-3 px-4">Tên Đăng Nhập (Username)</th>
                      <th className="py-3 px-4">Email & Số ĐT</th>
                      <th className="py-3 px-4">Vai Trò</th>
                      <th className="py-3 px-4">Trạng Thái</th>
                      <th className="py-3 px-4 text-right">Thay Đổi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <img
                            src={u.avatar || AVATAR_IMAGES.fallbackAvatar}
                            alt={u.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-extrabold text-slate-900">{u.name}</p>
                            <p className="text-[11px] text-slate-400">Tham gia: {u.createdAt || '2025-01-01'}</p>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                          {u.username}
                        </td>

                        <td className="py-3.5 px-4">
                          <p className="text-slate-800 font-medium">{u.email}</p>
                          <p className="text-[11px] text-slate-400">{u.phone || 'Chưa cập nhật'}</p>
                        </td>

                        <td className="py-3.5 px-4">
                          {u.role === 'admin' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
                              <Shield className="w-3 h-3 text-amber-600" /> Quản trị viên
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                              Khách hàng
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {u.status === 'blocked' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[11px]">
                              <UserX className="w-3 h-3" /> Đang bị khóa
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                              <UserCheck className="w-3 h-3" /> Đang hoạt động
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                // Theo yêu cầu: thay đổi user chỉ hiện nút thôi khi ấn vào không cần thực hiện
                              }}
                              className={`p-1.5 rounded-lg transition-colors cursor-default ${
                                u.status === 'blocked'
                                  ? 'bg-emerald-50 text-emerald-600'
                                  : 'bg-amber-50 text-amber-600'
                              }`}
                              title={u.status === 'blocked' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                            >
                              {u.status === 'blocked' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                            </button>

                            {u.username !== 'admin' && (
                              <button
                                type="button"
                                onClick={() => {
                                  // Theo yêu cầu: xóa user chỉ hiện nút thôi khi ấn vào không cần thực hiện
                                }}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 transition-colors cursor-default"
                                title="Xóa tài khoản"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 4. ADD / EDIT PRODUCT MODAL */}
      {(isAddModalOpen || editingShoe) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                {editingShoe ? 'Chỉnh Sửa Thông Tin Giày' : 'Thêm Sản Phẩm Giày Mới'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingShoe(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên Giày Thể Thao *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nike Air Force 1 07 White"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Thương Hiệu</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    <option value="Nike">Nike</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Adidas">Adidas</option>
                    <option value="New Balance">New Balance</option>
                    <option value="Puma">Puma</option>
                    <option value="Converse">Converse</option>
                    <option value="Vans">Vans</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Danh Mục</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    <option value="Lifestyle">Lifestyle (Thời trang)</option>
                    <option value="Running">Running (Chạy bộ)</option>
                    <option value="Basketball">Basketball (Bóng rổ)</option>
                    <option value="Skateboarding">Skateboarding (Trượt ván)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giá Bán Hiện Tại (₫) *</label>
                  <input
                    type="number"
                    required
                    min="100000"
                    step="10000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giá Gốc Niêm Yết (₫)</label>
                  <input
                    type="number"
                    min="100000"
                    step="10000"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Số Lượng Tồn Kho</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Huy Hiệu (Badge)</label>
                  <select
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: (e.target.value as any) || undefined })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    <option value="">Không có</option>
                    <option value="HOT">HOT (Nổi bật)</option>
                    <option value="SALE">SALE (Khuyến mãi)</option>
                    <option value="NEW">NEW (Mới về)</option>
                    <option value="BESTSELLER">BESTSELLER (Bán chạy)</option>
                  </select>
                </div>
              </div>

              {/* Image URL & Preset Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đường Dẫn Hình Ảnh (URL)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-300 shrink-0 bg-slate-100"
                  />
                </div>
                
                <div className="mt-2">
                  <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mb-1">
                    <ImageIcon className="w-3 h-3 text-slate-400" /> Hoặc chọn nhanh ảnh mẫu có sẵn:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {DEMO_PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={`text-[10px] px-2 py-1 rounded-md border transition-all cursor-pointer ${
                          formData.image === preset.url
                            ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kích Thước Cỡ Giày (cách nhau bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  placeholder="38, 39, 40, 41, 42, 43"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô Tả Sản Phẩm</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập giới thiệu chất liệu, công nghệ đệm, phong cách..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingShoe(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  {editingShoe ? 'Lưu Thay Đổi' : 'Tạo Sản Phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADD USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Thêm Tài Khoản Người Dùng Mới</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Trần Văn B"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên đăng nhập (Username) *</label>
                <input
                  type="text"
                  required
                  placeholder="tranvanb"
                  value={newUserForm.username}
                  onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="b@sneakerzone.vn"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="0911223344"
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vai trò phân quyền</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="user">Khách hàng (User)</option>
                  <option value="admin">Quản trị viên (Admin)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold shadow-md"
                >
                  Tạo Người Dùng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. DELETE SHOE CONFIRMATION DIALOG */}
      {deletingShoeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Xác Nhận Xóa Sản Phẩm?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Sản phẩm này sẽ bị xóa khỏi danh sách và cửa hàng. Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingShoeId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteShoe(deletingShoeId);
                  setDeletingShoeId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Xóa Sản Phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
