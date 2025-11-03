import { CheckCircle2, Shield, Trophy, Users } from "lucide-react";
import { forwardRef } from "react";

const perks = [
  { icon: Trophy, title: "Project-based", desc: "Belajar dengan studi kasus nyata siap portfolio." },
  { icon: Shield, title: "Kurikulum Terverifikasi", desc: "Materi dirancang mentor industri." },
  { icon: Users, title: "Komunitas Aktif", desc: "Diskusi, code review, dan job board internal." },
];

const faq = [
  {
    q: "Apakah ada sertifikat?",
    a: "Ya, tersedia sertifikat project completion yang bisa dilampirkan di CV dan LinkedIn.",
  },
  {
    q: "Kapan kelas dimulai?",
    a: "Kelas bersifat on-demand dengan jadwal live mingguan untuk Q&A.",
  },
  { q: "Apakah cocok untuk pemula?", a: "Sangat cocok. Materi disusun bertahap dari dasar ke lanjutan." },
];

const LandingSection = forwardRef(function LandingSection({ selected }, ref) {
  return (
    <section ref={ref} id="landing" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <span className="rounded-full border border-indigo-700 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300">
            Landing Program
          </span>
          <h2 className="mt-4 text-3xl font-semibold">
            {selected ? `${selected.course.title}: ${selected.module}` : "Pilih modul untuk melihat detail"}
          </h2>
          <p className="mt-2 max-w-3xl text-slate-300">
            Gabung dan dapatkan akses materi premium, sesi live mingguan, serta proyek
            bersertifikat. Kami fokus pada output nyata yang membuat Anda percaya diri
            menghadapi dunia kerja.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <Icon className="h-6 w-6 text-indigo-400" />
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-slate-300">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="text-xl font-semibold">Yang Akan Anda Kuasai</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Fundamental yang kuat dan praktis",
              "Kemampuan memecahkan masalah kompleks",
              "Portfolio nyata dari proyek kelas",
              "Kesiapan interview dan technical test",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-400" />
                <span className="text-slate-200">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
            >
              Daftar Gratis
            </a>
            <span className="text-sm text-slate-400">Tanpa kartu kredit • Akses materi awal</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {faq.map((f) => (
            <div key={f.q} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h4 className="font-semibold">{f.q}</h4>
              <p className="mt-1 text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default LandingSection;
