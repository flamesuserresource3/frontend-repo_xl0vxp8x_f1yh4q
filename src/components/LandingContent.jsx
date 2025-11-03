import React from 'react';
import { Rocket, Shield, Users, Star } from 'lucide-react';

const modules = [
  {
    id: 'ai',
    title: 'AI Foundations',
    blurb: 'Dasar AI praktis untuk pemula – dari konsep ke implementasi kecil.',
    icon: Rocket,
  },
  {
    id: 'web',
    title: 'Web Modern',
    blurb: 'Bangun aplikasi web cepat dengan tool modern tanpa pusing.',
    icon: Star,
  },
  {
    id: 'data',
    title: 'Data Sprint',
    blurb: 'Analisis data, visualisasi, dan insight yang bisa dipakai.',
    icon: Shield,
  },
  {
    id: 'system',
    title: 'System Design',
    blurb: 'Pahami arsitektur skala besar dengan contoh nyata.',
    icon: Users,
  },
];

export default function LandingContent({ onJoin }) {
  return (
    <section id="landing" className="relative bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Catalog teaser */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">Pilih Jalur Mulai</h2>
            <span className="text-sm text-neutral-500">Ringkasan modul — detail lengkap tersedia setelah masuk</span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m) => (
              <article key={m.id} className="group rounded-lg border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-gradient-to-tr from-orange-500 to-amber-400 text-white">
                    <m.icon size={18} />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{m.title}</h3>
                </div>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{m.blurb}</p>
                <button
                  onClick={() => onJoin(m)}
                  className="mt-5 inline-flex w-full items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition"
                >
                  Ikuti Course
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Value proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Rocket className="text-orange-500" size={20} />}
            title="Cepat Mulai"
            desc="Konten ringkas yang langsung bisa dipraktikkan. Tidak perlu bingung dari mana memulai."
          />
          <FeatureCard
            icon={<Users className="text-orange-500" size={20} />}
            title="Belajar Bareng"
            desc="Komunitas suportif, diskusi ringan, dan peer review yang membangun."
          />
          <FeatureCard
            icon={<Shield className="text-orange-500" size={20} />}
            title="Nyaman & Aman"
            desc="Privasi terjaga, kendali penuh data pribadi, dan tanpa spam."
          />
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => onJoin(null)}
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-neutral-900 text-white font-medium hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition"
          >
            Daftar Gratis
          </button>
          <span className="text-sm text-neutral-500">Tanpa kartu kredit · Bisa batal kapan saja</span>
        </div>

        {/* FAQ */}
        <div className="mt-16 border-t border-neutral-200 dark:border-neutral-800 pt-10">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Pertanyaan Umum</h3>
          <div className="mt-6 space-y-4">
            <FaqItem q="Apakah gratis?" a="Ya, Anda bisa memulai secara gratis. Beberapa modul lanjutan mungkin berbayar." />
            <FaqItem q="Apakah cocok untuk pemula?" a="Sangat cocok. Kurikulum dirancang agar mudah diikuti dari nol." />
            <FaqItem q="Kapan kelas dimulai?" a="Anda bisa mulai kapan saja — belajar mandiri sesuai waktu Anda." />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-orange-50 dark:bg-orange-900/20">{icon}</div>
        <h4 className="font-semibold text-neutral-900 dark:text-white">{title}</h4>
      </div>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="rounded-md border border-neutral-200 dark:border-neutral-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-medium text-neutral-900 dark:text-white">{q}</span>
        <span className="text-neutral-500">{open ? '-' : '+'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-neutral-600 dark:text-neutral-300">{a}</div>
      )}
    </div>
  );
}
