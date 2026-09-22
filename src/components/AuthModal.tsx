import React, { useState } from 'react';
import { User } from '../types';
import { PREDEFINED_ACCOUNTS } from '../data/initialData';
import { AVATAR_IMAGES } from '../imagie';
import { UserCheck, Shield, Lock, User as UserIcon, X, Sparkles, LogIn, ArrowRight, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialRoleTab?: 'user' | 'admin';
  cartIntentNotice?: boolean;
  registeredUsers?: User[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRoleTab = 'user',
  cartIntentNotice = false,
  registeredUsers = [],
}) => {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>(initialRoleTab);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // User form state
  const [userName, setUserName] = useState('');
  const [userLoginId, setUserLoginId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Admin form state
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Error message
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Handle User Login
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isRegisterMode) {
      if (!userName.trim() || !userLoginId.trim() || !userPassword.trim()) {
        setErrorMessage('Vui lòng điền đầy đủ họ tên, tên đăng nhập và mật khẩu!');
        return;
      }
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userName.trim(),
        username: userLoginId.trim(),
        email: `${userLoginId.trim()}@sneakerzone.vn`,
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        avatar: AVATAR_IMAGES.userTu,
      };
      onLoginSuccess(newUser);
      onClose();
    } else {
      const trimmedUser = userLoginId.trim().toLowerCase();
      
      // Check hardcoded user account: username: user, pass: 123
      if (
        (trimmedUser === PREDEFINED_ACCOUNTS.user.username || trimmedUser === 'user@sneakerzone.vn') &&
        userPassword === PREDEFINED_ACCOUNTS.user.password
      ) {
        onLoginSuccess(PREDEFINED_ACCOUNTS.user.userData);
        onClose();
        return;
      }

      // Check other registered users
      const matchCustom = registeredUsers.find(
        (u) => (u.username.toLowerCase() === trimmedUser || u.email.toLowerCase() === trimmedUser) && u.role === 'user'
      );
      if (matchCustom && userPassword === '123') {
        onLoginSuccess(matchCustom);
        onClose();
        return;
      }

      setErrorMessage('Tài khoản hoặc mật khẩu không chính xác! Vui lòng đăng nhập với tài khoản: user / mật khẩu: 123');
    }
  };

  // Handle Admin Login
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedAdmin = adminUsername.trim().toLowerCase();

    // Check hardcoded admin account: adminame: admin, pass: 123
    if (
      (trimmedAdmin === PREDEFINED_ACCOUNTS.admin.username || trimmedAdmin === 'admin@sneakerzone.vn') &&
      adminPassword === PREDEFINED_ACCOUNTS.admin.password
    ) {
      onLoginSuccess(PREDEFINED_ACCOUNTS.admin.userData);
      onClose();
    } else {
      setErrorMessage('Tài khoản hoặc mật khẩu quản trị không chính xác! Vui lòng nhập tài khoản admin: admin / mật khẩu: 123');
    }
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="auth-modal-container"
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Notice if opened via Add to Cart */}
        {cartIntentNotice && (
          <div className="bg-amber-500 text-white px-5 py-2.5 text-xs font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-6 pb-4 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/30 mb-3">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {activeTab === 'user' ? 'Đăng Nhập Khách Hàng' : 'Đăng Nhập Quản Trị Viên'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {activeTab === 'user'
              ? 'Đăng nhập tài khoản để đặt hàng và xem giỏ hàng'
              : 'Dành riêng cho quản trị viên hệ thống cửa hàng'}
          </p>

          {/* 2-Flow Tab Selector */}
          <div className="mt-5 grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              id="tab-auth-user"
              type="button"
              onClick={() => {
                setActiveTab('user');
                setErrorMessage('');
              }}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'user'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4 text-rose-600" />
              Khách Hàng (User)
            </button>
            <button
              id="tab-auth-admin"
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setIsRegisterMode(false);
                setErrorMessage('');
              }}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              Quản Trị (Admin)
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: USER LOGIN FLOW */}
          {activeTab === 'user' && (
            <div>
              {/* Account Credential Guide */}
              <div className="mb-4 p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-xs text-slate-700 flex items-center gap-2.5">
                <KeyRound className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">Tài khoản User cố định trong hệ thống:</span>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-mono">
                    Username: <strong className="text-rose-600 font-bold">user</strong> | Mật khẩu: <strong className="text-rose-600 font-bold">123</strong>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUserSubmit} className="space-y-3.5">
                {isRegisterMode && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên khách hàng</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="input-user-fullname"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRegisterMode ? 'Tên đăng nhập mới' : 'Tên đăng nhập (Username)'}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="input-user-login-id"
                      type="text"
                      placeholder="user"
                      value={userLoginId}
                      onChange={(e) => setUserLoginId(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="input-user-password"
                      type="password"
                      placeholder="123"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <button
                  id="btn-submit-user-auth"
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{isRegisterMode ? 'Hoàn tất đăng ký & Đăng nhập' : 'Đăng nhập Khách hàng'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(!isRegisterMode);
                    setErrorMessage('');
                  }}
                  className="text-xs text-slate-500 hover:text-rose-600 font-semibold transition-colors cursor-pointer"
                >
                  {isRegisterMode
                    ? 'Đã có tài khoản? Nhấn để đăng nhập'
                    : 'Chưa có tài khoản? Đăng ký tài khoản mới'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ADMIN LOGIN FLOW */}
          {activeTab === 'admin' && (
            <div>
              {/* Admin Credential Guide */}
              <div className="mb-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-800 flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold text-amber-950">Tài khoản Quản Trị Viên cố định:</span>
                  <div className="text-[11px] text-amber-900 mt-0.5 font-mono">
                    Admin: <strong className="text-amber-800 font-bold">admin</strong> | Mật khẩu: <strong className="text-amber-800 font-bold">123</strong>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAdminSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên tài khoản Quản trị</label>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="input-admin-username"
                      type="text"
                      placeholder="admin"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu Quản trị</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="input-admin-password"
                      type="password"
                      placeholder="123"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <button
                  id="btn-submit-admin-auth"
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-md shadow-slate-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Xác nhận Đăng nhập Quản Trị</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
