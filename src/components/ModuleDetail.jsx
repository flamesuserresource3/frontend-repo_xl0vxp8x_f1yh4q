import { CheckCircle2, ArrowLeft, BookOpen } from "lucide-react";

export default function ModuleDetail({ module, onBack, onJoin }) {
  if (!module) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke daftar modul
      </button>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-6">
          <h2 className="text-2xl font-semibold text-white">{module.title}</h2>
          <p className="mt-1 text-slate-400">{module.short}</p>
          <p className="mt-2 text-xs text-slate-400">Level: {module.level}</p>
        </div>

        <div className="grid gap-0 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-slate-200">Yang akan dipelajari</h3>
            <ul className="mt-3 space-y-2">
              {module.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-400" />
                <h4 className="font-medium text-white">Mulai Belajar</h4>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Tertarik dengan modul ini? Gabung course dan lanjutkan pembelajaran.
              </p>
              <button
                onClick={onJoin}
                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
              >
                Ikuti Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
