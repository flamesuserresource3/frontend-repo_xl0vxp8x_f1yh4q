import { LogIn, GraduationCap } from "lucide-react";

export default function Header({ onLogin }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-white">
          <GraduationCap className="h-6 w-6 text-indigo-400" />
          <span className="font-semibold tracking-tight">EduVibe</span>
        </div>
        <nav className="flex items-center gap-3">
          <a href="#modules" className="text-sm text-slate-300 hover:text-white">Modul</a>
          <a href="#about" className="text-sm text-slate-300 hover:text-white">Tentang</a>
          <button
            onClick={onLogin}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            <LogIn className="h-4 w-4" />
            Masuk
          </button>
        </nav>
      </div>
    </header>
  );
}
