import { Brain, Globe, Cpu, Layers, ArrowRight } from "lucide-react";

const MODULES = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    short: "Belajar dasar AI, machine learning, dan praktik modern.",
    level: "Pemula – Menengah",
    icon: Brain,
    color: "from-indigo-500 to-violet-500",
    highlights: [
      "Python untuk ML",
      "Linear/Logistic Regression",
      "Neural Networks dasar",
      "Project: Image Classifier",
    ],
  },
  {
    id: "web",
    title: "Web Development",
    short: "Bangun website modern dengan React, API, dan deployment.",
    level: "Pemula – Menengah",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    highlights: [
      "HTML/CSS/JS",
      "React dasar – lanjutan",
      "REST API & Auth",
      "Project: Portfolio App",
    ],
  },
  {
    id: "ds",
    title: "Data Science",
    short: "Eksplorasi data, visualisasi, dan pemodelan statistik.",
    level: "Menengah",
    icon: Layers,
    color: "from-emerald-500 to-teal-500",
    highlights: [
      "Pandas & NumPy",
      "Data wrangling",
      "Visualisasi dengan Seaborn",
      "Project: Retail Insights",
    ],
  },
  {
    id: "systems",
    title: "Computer Systems",
    short: "Pahami arsitektur, OS, dan jaringan untuk fondasi kuat.",
    level: "Pemula",
    icon: Cpu,
    color: "from-rose-500 to-orange-500",
    highlights: [
      "CPU & Memory",
      "Operating Systems",
      "Networking dasar",
      "Project: Mini Shell",
    ],
  },
];

export default function ModuleGrid({ onSelect }) {
  return (
    <section id="modules" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Pilih Modul</h2>
          <p className="text-sm text-slate-400">Klik modul untuk melihat detail dan kurikulum singkat.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m)}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-slate-700 hover:bg-slate-900/90"
          >
            <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${m.color} p-3`}> 
              <m.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">{m.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{m.short}</p>
            <div className="mt-3 text-xs text-slate-400">Level: {m.level}</div>
            <div className="mt-4 inline-flex items-center gap-2 text-indigo-300">
              Lihat detail <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export { MODULES };
