import { useEffect } from "react";
import { X, User } from "lucide-react";

export default function LoginModal({ open, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg font-semibold">Masuk untuk Mulai Belajar</h3>
          </div>
          <button
            aria-label="Tutup"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Kata Sandi</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
          >
            Masuk & Mulai
          </button>
          <p className="text-center text-sm text-slate-400">
            Belum punya akun? <span className="text-indigo-300">Daftar gratis</span>
          </p>
        </form>
      </div>
    </div>
  );
}
