import React from 'react';

export default function LoginModal({ open, onClose, presetModule, onSuccess }) {
  const [mode, setMode] = React.useState('login'); // 'login' | 'register'
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const baseUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';

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

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
            />
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
