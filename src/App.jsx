import React, { useState } from 'react';
import Header from './components/Header.jsx';
import ModuleGrid from './components/ModuleGrid.jsx';
import Footer from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [presetModule, setPresetModule] = useState(null);

  function openLogin(mod) {
    setPresetModule(mod || null);
    setLoginOpen(true);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white flex flex-col">
      <Header onLogin={() => openLogin()} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-indigo-50/70 via-white to-white dark:from-indigo-950/30 dark:via-neutral-950 dark:to-neutral-950" />
          <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Belajar dengan Modul Interaktif yang Relevan Industri
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Mulai dari dasar hingga proyek nyata. Pilih topik favoritmu dan bergabung ke course untuk akses materi, tugas, dan komunitas.
            </p>
            <div className="mt-6">
              <button
                onClick={() => openLogin()}
                className="rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-2.5 font-medium hover:opacity-90 transition"
              >
                Mulai Sekarang
              </button>
            </div>
          </div>
        </section>

        {/* Modules (simple grid view as requested) */}
        <ModuleGrid onJoin={(mod) => openLogin(mod)} />
      </main>

      <Footer />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => setLoginOpen(false)}
        presetModule={presetModule}
      />
    </div>
  );
}
