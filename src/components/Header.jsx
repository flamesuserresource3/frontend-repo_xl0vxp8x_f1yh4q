import React from 'react';
import { Rocket, User } from 'lucide-react';

export default function Header({ onLogin, onCTAClick, user, onLogout }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-gradient-to-tr from-orange-500 to-amber-400 text-white">
              <Rocket size={18} />
            </div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">Getteng Apps</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCTAClick}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition"
            >
              Daftar Gratis
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200">
                  <User size={16} />
                  <span className="hidden sm:inline">{user.name}</span>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onLogin}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <User size={16} />
                Masuk
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
