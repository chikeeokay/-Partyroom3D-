import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, X, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLoginSuccess
}: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const savedPassword = localStorage.getItem('chikee_admin_password') || 'chikee888';

    // Check default passwords or custom saved password
    const validPasswords = [
      savedPassword,
      'chikee888',
      'chikee',
      '93737819',
      'admin'
    ];

    if (validPasswords.includes(password.trim())) {
      setIsSuccess(true);
      try {
        localStorage.setItem('chikee_is_admin', 'true');
      } catch (err) {
        console.warn('Storage failed', err);
      }
      
      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
        onLoginSuccess();
        onClose();
      }, 700);
    } else {
      setError('密碼不正確！請輸入正確的店長密碼（預設為 chikee888）。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#faf5ea] w-full max-w-md rounded-3xl border-[3px] border-slate-900 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#ffa01b] p-5 border-b-[3px] border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 text-amber-400 rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">
                池記店長 / 管理員登入
              </h3>
              <p className="text-xs font-bold text-slate-900/80">
                僅供店主管理場相與活動，一般訪客無需登入
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-black/10 text-slate-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-2 animate-scaleUp">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-full border-2 border-emerald-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-black text-slate-900">
                店長驗證成功！
              </h4>
              <p className="text-xs font-bold text-emerald-700">
                正在為您開啟管理權限與上傳後台...
              </p>
            </div>
          ) : (
            <>
              <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-amber-900 leading-relaxed">
                  登入後即可在網站上直接上傳與刪除場相、排版實景照片及發佈最新活動。一般訪客無法看到上傳按鈕。
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-900 flex items-center justify-between">
                  <span>店長管理密碼 (Admin Password)</span>
                  <span className="text-[11px] font-bold text-slate-500">預設: chikee888</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder="請輸入店長管理密碼..."
                    className="w-full pl-9 pr-10 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-xl text-xs font-black text-rose-700">
                  {error}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>進入店長管理模式</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
