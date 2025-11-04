import React from 'react';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Chrome } from 'lucide-react';

export default function LoginModal({ open, onClose, presetModule, onSuccess, onForgot }) {
  const [mode, setMode] = React.useState('login'); // 'login' | 'register'
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const baseUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  React.useEffect(() => {
    if (!open) return;
    setMessage('');
    setError('');
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const persistSession = (user, token) => {
    try {
      localStorage.setItem('getteng_token', token);
      localStorage.setItem('getteng_user', JSON.stringify(user));
    } catch {}
  };

  const doLogin = async (emailArg, passwordArg) => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailArg, password: passwordArg }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data?.detail || data?.message || 'Gagal login');
    }
    persistSession(data.user, data.token);
    setMessage('Login berhasil!');
    onSuccess?.(data.user, data.token, presetModule || null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      if (!baseUrl) throw new Error('Konfigurasi backend belum diset (VITE_BACKEND_URL)');
      if (mode === 'register') {
        const res = await fetch(`${baseUrl}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          throw new Error(data?.detail || data?.message || 'Registrasi gagal');
        }
        // Auto-login after successful registration
        await doLogin(email, password);
      } else {
        await doLogin(email, password);
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const ensureGoogleLib = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.accounts && window.google.accounts.id) return resolve();
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Gagal memuat Google Identity Services'));
      document.head.appendChild(script);
    });
  };

  const handleGoogleCredential = async (credential) => {
    try {
      if (!baseUrl) throw new Error('Konfigurasi backend belum diset (VITE_BACKEND_URL)');
      const res = await fetch(`${baseUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: credential }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.detail || data?.message || 'Login Google gagal');
      }
      persistSession(data.user, data.token);
      setMessage('Login Google berhasil!');
      onSuccess?.(data.user, data.token, presetModule || null);
      onClose();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat login Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  const onGoogleClick = async () => {
    setError('');
    setMessage('');
    setGoogleLoading(true);
    try {
      if (!googleClientId) throw new Error('Google Client ID belum diset (VITE_GOOGLE_CLIENT_ID)');
      await ensureGoogleLib();
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (resp) => {
          if (resp && resp.credential) {
            handleGoogleCredential(resp.credential);
          } else {
            setGoogleLoading(false);
            setError('Tidak menerima kredensial Google');
          }
        },
      });
      // Prefer a popup to ensure the user can continue even if One Tap is blocked
      window.google.accounts.id.prompt((notification) => {
        if (notification && notification.isNotDisplayed()) {
          // fallback: render a popup selector
          window.google.accounts.id.prompt();
        }
      });
    } catch (err) {
      setGoogleLoading(false);
      setError(err.message || 'Gagal memulai login Google');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop must allow clicking the modal content */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {mode === 'login' ? 'Masuk ke Getteng' : 'Daftar Getteng' }
          </h3>
          {presetModule ? (
            <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
              {presetModule.title}
            </span>
          ) : null}
        </div>

        <div className="mt-4 grid gap-3">
          <button
            type="button"
            onClick={onGoogleClick}
            disabled={googleLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-60 transition"
          >
            <Chrome size={18} />
            {googleLoading ? 'Menghubungkan…' : 'Lanjutkan dengan Google'}
          </button>
          {!googleClientId && (
            <p className="text-xs text-orange-600">Setel VITE_GOOGLE_CLIENT_ID agar login Google berfungsi.</p>
          )}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-xs text-neutral-500">atau</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Nama</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-400"><UserIcon size={16} /></span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400"><Mail size={16} /></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-10 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Password</label>
              {mode === 'login' && (
                <button type="button" onClick={() => onForgot?.()} className="text-xs text-orange-600 hover:underline">
                  Lupa kata sandi?
                </button>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400"><Lock size={16} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-10 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1.5 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {message && (
            <div className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md px-3 py-2">
              {message}
            </div>
          )}
          {error && (
            <div className="text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md px-3 py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition"
          >
            {loading ? 'Memproses…' : mode === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
          {mode === 'login' ? (
            <>
              Belum punya akun?{' '}
              <button className="text-orange-600 hover:underline" onClick={() => setMode('register')}>
                Daftar gratis
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{' '}
              <button className="text-orange-600 hover:underline" onClick={() => setMode('login')}>
                Masuk
              </button>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
