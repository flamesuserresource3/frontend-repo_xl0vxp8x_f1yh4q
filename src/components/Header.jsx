import React from 'react';
import { GraduationCap, LogIn } from 'lucide-react';

export default function Header({ onLogin }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">Belajar Interaktif</p>
            <p className="text-xs text-neutral-500">Modul AI • Web • Data • Sistem</p>
          </div>
        </div>

        <button
          onClick={onLogin}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors"
          aria-label="Masuk"
        >
          <LogIn size={16} />
          Masuk
        </button>
      </div>
    </header>
  );
}
