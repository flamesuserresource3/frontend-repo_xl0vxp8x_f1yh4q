import React from 'react';
import { Rocket, User } from 'lucide-react';
import Courses from './components/Courses';
import StudyTracker from './components/StudyTracker';
import PomodoroTimer from './components/PomodoroTimer';
import CodeNotes from './components/CodeNotes';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      {/* Header / Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                <Rocket className="h-4 w-4" /> Getteng Apps
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Belajar interaktif ala Cognitive Class.
              </h1>
              <p className="mt-2 max-w-2xl text-base text-gray-600">
                Ikuti course realtime, modul ajar lengkap (RPL, Algoritma, OOP, Web, AI, Database), kerjakan 3–4 proyek,
                dan raih sertifikat. Pantau progres dengan Study Tracker, fokus dengan Pomodoro, dan simpan catatan kode.
              </p>
              <div className="mt-4 flex gap-3">
                <a href="#courses" className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">Jelajahi Course</a>
                <a href="#tracker" className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50">Lihat Progres</a>
              </div>
            </div>
            <div className="w-full max-w-md self-stretch rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4 text-indigo-600" /> Akun & Sertifikasi
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Masuk untuk mengikuti course dan menyelesaikan proyek.</li>
                <li>• Selesaikan semua proyek untuk membuka sertifikat.</li>
                <li>• Simpan catatan kode untuk semua bahasa pemrograman.</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main>
        <Courses />
        <StudyTracker />
        <PomodoroTimer />
        <CodeNotes />
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-600">
          © {new Date().getFullYear()} Getteng Apps — Belajar cerdas, karier melesat.
        </div>
      </footer>
    </div>
  );
}
