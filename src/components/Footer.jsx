import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60 py-8">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Belajar Interaktif. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-neutral-700 dark:hover:text-neutral-300" href="#">Kebijakan</a>
          <a className="hover:text-neutral-700 dark:hover:text-neutral-300" href="#">Bantuan</a>
        </div>
      </div>
    </footer>
  );
}
