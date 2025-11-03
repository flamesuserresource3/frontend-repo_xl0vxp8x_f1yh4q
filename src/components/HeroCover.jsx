import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover({ onCTAClick }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlays should not block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/20 to-neutral-950/80" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-24 pb-28 sm:pt-28 sm:pb-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Belajar yang bikin nagih. Mulai dari satu klik.
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-neutral-300">
              Dapatkan skill paling dicari lewat modul singkat, proyek nyata, dan komunitas yang suportif. Gratis untuk memulai.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onCTAClick}
                className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition"
              >
                Mulai Sekarang
              </button>
              <a
                href="#landing"
                className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-transparent border border-white/30 text-white hover:bg-white/10 transition"
              >
                Lihat Ringkasan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
