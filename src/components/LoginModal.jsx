import { useEffect, useState } from "react";
import { X, User } from "lucide-react";

export default function LoginModal({ open, onClose }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setError("");
      setSuccess("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const fallbackFromOrigin = () => {
    try {
      const url = new URL(window.location.href);
      const host = url.hostname;
      // If running on port 3000 locally, switch to 8000, otherwise keep host and port if present
      const port = url.port === "3000" ? "8000" : (url.port || "");
      return `${url.protocol}//${host}${port ? `:${port}` : ""}`.replace("3000", "8000");
    } catch {
      return "";
    }
  };

  const baseURL = (import.meta.env.VITE_BACKEND_URL || fallbackFromOrigin()).replace(/\/$/, "");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const body = mode === "login"
        ? { email, password }
        : { name, email, password };

      const res = await fetch(`${baseURL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.detail || "Terjadi kesalahan. Coba lagi.");
      }

      if (mode === "register") {
        setSuccess("Registrasi berhasil. Silakan masuk.");
        setMode("login");
      } else {
        setSuccess("Login berhasil. Selamat belajar!");
        // In a real app, you'd persist token/user here
        setTimeout(() => {
          onClose();
        }, 700);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg font-semibold">
              {mode === "login" ? "Masuk untuk Mulai Belajar" : "Daftar Akun Baru"}
            </h3>
          </div>
          <button
            aria-label="Tutup"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            onClick={onClose}
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div>
              <label className="text-sm text-slate-300">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          )}
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Kata Sandi</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Memproses..." : mode === "login" ? "Masuk & Mulai" : "Daftar & Mulai"}
          </button>

          <p className="text-center text-sm text-slate-400">
            {mode === "login" ? (
              <>Belum punya akun? <button type="button" className="text-indigo-300 underline-offset-2 hover:underline" onClick={() => setMode("register")}>Daftar gratis</button></>
            ) : (
              <>Sudah punya akun? <button type="button" className="text-indigo-300 underline-offset-2 hover:underline" onClick={() => setMode("login")}>Masuk di sini</button></>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
