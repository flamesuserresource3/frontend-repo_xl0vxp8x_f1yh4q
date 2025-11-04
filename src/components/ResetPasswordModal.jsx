import React from 'react';
import { Lock } from 'lucide-react';

export default function ResetPasswordModal({ open, onClose, initialEmail = '', initialToken = '', onDone }) {
  const [email, setEmail] = React.useState(initialEmail);
  const [token, setToken] = React.useState(initialToken);
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const baseUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';

  React.useEffect(() => {
    if (open) {
      setEmail(initialEmail || '');
      setToken(initialToken || '');
      setPassword('');
      setConfirm('');
      setMessage('');
      setError('');
    }
  }, [open, initialEmail, initialToken]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      if (!baseUrl) throw new Error('Konfigurasi backend belum diset (VITE_BACKEND_URL)');
      if (password.length < 6) throw new Error('Password minimal 6 karakter');
      if (password !== confirm) throw new Error('Konfirmasi password tidak cocok');

      const res = await fetch(`${baseUrl}/auth/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, new_password: password }),
      });
      const data = await res.json();
      if (!res.ok || data.ok !== true) {
        throw new Error(data?.detail || data?.message || 'Gagal reset password');
      }
      setMessage('Password berhasil direset. Silakan login dengan password baru.');
      setTimeout(() => {
        onClose?.();
        onDone?.();
      }, 1200);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl p-6">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-orange-600" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Reset kata sandi</h3>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
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
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Token reset</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Password baru</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-20 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-2 top-1.5 text-sm px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                {show ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Konfirmasi password baru</label>
            <input
              type={show ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition"
          >
            {loading ? 'Memproses…' : 'Reset password'}
          </button>
        </form>

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
