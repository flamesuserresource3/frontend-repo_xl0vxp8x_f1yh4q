import { Rocket, Star } from "lucide-react";

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[1100px] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
            <Star className="h-4 w-4 text-yellow-400" />
            Getteng Apps • Cognitive Class–style
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Belajar Tech dengan Kurikulum Modern yang Nyata Hasilnya
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Kuasai RPL, Algoritma, OOP, Web, AI, dan Database melalui project
            riil yang bisa dipamerkan di CV. Materi singkat, padat, langsung
            praktik.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
            >
              <Rocket className="h-5 w-5" /> Mulai Sekarang
            </button>
            <a
              href="#highlights"
              className="rounded-lg border border-slate-700 px-5 py-3 text-slate-200 hover:border-slate-600 hover:bg-slate-800/40"
            >
              Lihat Modul Populer
            </a>
          </div>
          <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Siswa Aktif", value: "12K+" },
              { label: "Nilai Rata-rata", value: "4.8/5" },
              { label: "Project Selesai", value: "35K+" },
              { label: "Mitra Hiring", value: "120+" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
              >
                <div className="text-2xl font-semibold text-white">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
