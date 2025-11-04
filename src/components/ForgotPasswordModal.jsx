import React from 'react';
import { Mail, KeyRound } from 'lucide-react';

export default function ForgotPasswordModal({ open, onClose, onProceedReset }) {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [token, setToken] = React.useState('');

  const baseUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';

  React.useEffect(() => {
    if (!open) return;
    setMessage('');
    setError('');
    setToken('');
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      if (!baseUrl) throw new Error('Konfigurasi backend belum diset (VITE_BACKEND_URL)');
      const res = await fetch(`${baseUrl}/auth/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || data.ok !== true) {
        throw new Error(data?.detail || data?.message || 'Gagal mengajukan reset password');
      }
      setMessage('Jika email terdaftar, tautan reset telah dikirim. (Untuk demo, gunakan token yang ditampilkan)');
      if (data.token) setToken(data.token);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl p-6">
        <div className="flex items-center gap-2">
          <KeyRound size={18} className="text-orange-600" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Lupa kata sandi</h3>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400"><Mail size={16} /></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
              />
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
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition"
          >
            {loading ? 'Mengirim…' : 'Kirim tautan reset'}
          </button>
        </form>

        {token && (
          <div className="mt-4 p-3 rounded-md border border-orange-200 dark:border-orange-900/40 bg-orange-50 dark:bg-orange-900/20 text-sm text-orange-700 dark:text-orange-300">
            <div className="font-medium mb-1">Token reset (demo):</div>
            <code className="break-all">{token}</code>
            <div className="mt-3">
              <button
                className="px-3 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-500"
                onClick={() => onProceedReset?.(email, token)}
              >
                Gunakan token ini
              </button>
            </div>
          </div>
        )}

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
