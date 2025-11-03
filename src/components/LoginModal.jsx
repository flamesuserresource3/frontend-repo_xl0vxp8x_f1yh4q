import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export default function LoginModal({ open, onClose, onSuccess, presetModule }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const dialogRef = useRef(null);

  const backend = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (open) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setError('');
      setInfo('');
      setLoading(false);
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');

    try {
      const url = mode === 'login' ? `${backend}/auth/login` : `${backend}/auth/register`;
      const payload = mode === 'login' ? { email, password } : { name, email, password };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.detail || 'Terjadi kesalahan. Coba lagi.');
      }

      setInfo(mode === 'login' ? 'Berhasil masuk.' : 'Akun dibuat. Berhasil masuk.');

      // Optionally persist token if provided
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }

      setTimeout(() => {
        onSuccess?.(data, presetModule);
        onClose?.();
      }, 600);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-2xl border border-neutral-200/70 dark:border-neutral-800/70"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 p-2 rounded-md text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-1">
          {mode === 'login' ? 'Masuk' : 'Daftar Akun'}
        </h3>
        {presetModule ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Anda bergabung ke modul <span className="font-medium">{presetModule.title}</span> setelah berhasil {mode === 'login' ? 'masuk' : 'mendaftar'}.
          </p>
        ) : (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Lanjutkan untuk mengakses materi dan bergabung ke course.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nama lengkap"
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="nama@contoh.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Kata sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {info && (
            <p className="text-sm text-emerald-600">{info}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses…' : mode === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-neutral-600 dark:text-neutral-400">
          {mode === 'login' ? (
            <span>
              Belum punya akun?{' '}
              <button onClick={() => setMode('register')} className="text-indigo-600 hover:underline font-medium">
                Daftar
              </button>
            </span>
          ) : (
            <span>
              Sudah punya akun?{' '}
              <button onClick={() => setMode('login')} className="text-indigo-600 hover:underline font-medium">
                Masuk
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
