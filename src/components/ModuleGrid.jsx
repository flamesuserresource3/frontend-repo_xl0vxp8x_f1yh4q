import React from 'react';
import { Brain, Globe, Database, Cog } from 'lucide-react';

const modules = [
  {
    id: 'ai',
    title: 'Kecerdasan Buatan',
    description: 'Dasar machine learning, neural network, dan praktik cepat.',
    icon: Brain,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'web',
    title: 'Pengembangan Web',
    description: 'Frontend modern, API, dan best practices responsif.',
    icon: Globe,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'data',
    title: 'Data Science',
    description: 'Pandas, visualisasi, dan pembelajaran statistik.',
    icon: Database,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'systems',
    title: 'Sistem & DevOps',
    description: 'Dasar Linux, container, CI/CD, dan observabilitas.',
    icon: Cog,
    color: 'from-amber-500 to-orange-500',
  },
];

export default function ModuleGrid({ onJoin }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">Pilih Modul</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((m) => (
          <article
            key={m.id}
            className="group rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${m.color} text-white flex items-center justify-center mb-4 shadow`}> 
              <m.icon size={22} />
            </div>
            <h3 className="font-semibold mb-1">{m.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{m.description}</p>
            <button
              onClick={() => onJoin(m)}
              className="w-full inline-flex items-center justify-center rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Ikuti Course
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
