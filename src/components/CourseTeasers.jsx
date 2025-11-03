import { BookOpen, ChevronRight } from "lucide-react";

const COURSES = [
  {
    id: "rpl",
    title: "Rekayasa Perangkat Lunak",
    blurb: "Bangun fondasi software engineering modern: requirement, design, testing.",
    color: "from-indigo-500 to-blue-500",
    modules: ["Software Lifecycle", "UML & Design", "Testing & QA", "DevOps Dasar"],
  },
  {
    id: "algo",
    title: "Algoritma & Struktur Data",
    blurb: "Berpikir komputasional dan optimasi struktur data untuk performa tinggi.",
    color: "from-emerald-500 to-teal-500",
    modules: ["Big-O", "Array & LinkedList", "Tree & Graph", "Greedy & DP"],
  },
  {
    id: "oop",
    title: "OOP",
    blurb: "Penerapan prinsip SOLID, pattern, dan clean code dalam proyek nyata.",
    color: "from-fuchsia-500 to-pink-500",
    modules: ["Class & Object", "Inheritance", "SOLID", "Design Patterns"],
  },
  {
    id: "web",
    title: "Web Development",
    blurb: "Frontend–backend modern, best practice aksesibilitas dan performa.",
    color: "from-orange-500 to-red-500",
    modules: ["HTML & CSS", "JavaScript", "Frontend Framework", "API Backend"],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    blurb: "Dari machine learning klasik ke AI praktis yang siap produksi.",
    color: "from-violet-500 to-purple-500",
    modules: ["ML Dasar", "Modeling", "Evaluation", "Deployment"],
  },
  {
    id: "db",
    title: "Database",
    blurb: "SQL, NoSQL, perancangan skema, dan tuning query yang efisien.",
    color: "from-cyan-500 to-sky-500",
    modules: ["Relasional", "Normalisasi", "Indexing", "NoSQL"],
  },
];

export default function CourseTeasers({ onModuleClick }) {
  return (
    <section id="highlights" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Modul Populer Minggu Ini
            </h2>
            <p className="mt-1 text-slate-400">
              Klik modul untuk melihat landing dan mulai daftar.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <article
              key={c.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br p-5 transition hover:scale-[1.01]"
              style={{ backgroundImage: undefined }}
            >
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${c.color}`} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <BookOpen className="h-4 w-4" /> {c.id.toUpperCase()}
                </div>
                <h3 className="mt-2 text-xl font-bold">{c.title}</h3>
                <p className="mt-1 text-slate-300">{c.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {c.modules.map((m) => (
                    <button
                      key={m}
                      onClick={() => onModuleClick(c, m)}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-sm text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
                    >
                      {m}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
