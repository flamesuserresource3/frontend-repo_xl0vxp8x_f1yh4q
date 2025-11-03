import React, { useMemo, useState } from 'react';
import { BookOpen, Star, Clock, Layers, GraduationCap, LogIn } from 'lucide-react';

const COURSES = [
  {
    id: 'rpl',
    title: 'Rekayasa Perangkat Lunak',
    level: 'Beginner – Intermediate',
    duration: '6 minggu',
    rating: 4.8,
    learners: 3200,
    description:
      'Bangun fondasi kuat pengembangan perangkat lunak dari requirement, desain, testing, hingga deployment. Praktik langsung dengan studi kasus nyata.',
    modules: [
      'Requirement & Agile',
      'Software Design (UML)',
      'Testing & QA',
      'CI/CD & Deployment',
    ],
    projects: [
      'Membuat Product Backlog & User Story',
      'Merancang UML + Arsitektur Modul',
      'Menulis Unit Test & Integration Test',
      'Setup CI/CD ke Cloud',
    ],
  },
  {
    id: 'algoritma',
    title: 'Algoritma & Struktur Data',
    level: 'Beginner – Intermediate',
    duration: '5 minggu',
    rating: 4.7,
    learners: 4100,
    description:
      'Pelajari logika, kompleksitas, dan struktur data inti. Kuasai teknik problem solving untuk coding interview.',
    modules: ['Kompleksitas Waktu', 'Array & HashMap', 'Stack, Queue, Linked List', 'Tree & Graph'],
    projects: [
      'Analisis Kompleksitas Sebuah Algoritma',
      'Membangun Struktur Data Kustom',
      'Pathfinding di Graph (BFS/DFS)',
    ],
  },
  {
    id: 'oop',
    title: 'Pemrograman Berorientasi Objek (OOP)',
    level: 'Beginner',
    duration: '4 minggu',
    rating: 4.6,
    learners: 2800,
    description:
      'Pahami konsep OOP: class, object, inheritance, polymorphism, SOLID, dan design patterns dasar.',
    modules: ['Class & Object', 'Encapsulation & Inheritance', 'Polymorphism', 'SOLID Principles'],
    projects: ['Mini Library System', 'E-commerce Cart Design', 'Vehicle Rental App'],
  },
  {
    id: 'web',
    title: 'Pengembangan Web Modern',
    level: 'Intermediate',
    duration: '6 minggu',
    rating: 4.8,
    learners: 5000,
    description:
      'Bangun aplikasi web full-stack dengan praktik terbaik UI, API, dan deployment.',
    modules: ['HTML/CSS/JS', 'Frontend Framework', 'API & Auth', 'Deployment & SEO'],
    projects: ['Landing Page Aesthetic', 'Dashboard Analytics', 'Auth + CRUD App', 'SEO Friendly Blog'],
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    level: 'Intermediate – Advanced',
    duration: '8 minggu',
    rating: 4.9,
    learners: 2200,
    description:
      'Mulai dari regresi hingga jaringan saraf. Latih model dan evaluasi performanya pada dataset nyata.',
    modules: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'NN Basics'],
    projects: ['Prediksi Harga', 'Clustering Pelanggan', 'Klasifikasi Gambar Sederhana'],
  },
  {
    id: 'database',
    title: 'Basis Data & SQL/NoSQL',
    level: 'Beginner – Intermediate',
    duration: '5 minggu',
    rating: 4.7,
    learners: 3600,
    description:
      'Rancang skema, tulis query optimal, dan pahami trade-off SQL vs NoSQL untuk skala nyata.',
    modules: ['Relational Model', 'SQL Advanced', 'Indexing & Optimization', 'NoSQL Overview'],
    projects: ['Schema Design', 'Optimization Challenge', 'Data Pipelines'],
  },
];

function LoginModal({ open, onClose, onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-2">
          <LogIn className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">Masuk ke Getteng</h3>
        </div>
        <p className="mb-4 text-sm text-gray-600">
          Buat akun atau masuk untuk mengikuti course, mengakses modul proyek, dan mendapatkan sertifikat.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => {
              if (email && password) onLoggedIn({ email });
            }}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Masuk
          </button>
          <button onClick={onClose} className="w-full rounded-lg border px-4 py-2 font-medium hover:bg-gray-50">
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, onSelect }) {
  return (
    <div
      onClick={() => onSelect(course)}
      className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
          <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
            <Star className="h-4 w-4" /> {course.rating}
          </span>
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{course.description}</p>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
        <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
        <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4" />{course.level}</span>
        <span className="inline-flex items-center gap-1"><Layers className="h-4 w-4" />{course.modules.length} modul</span>
      </div>
    </div>
  );
}

export default function Courses() {
  const [selected, setSelected] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const gridCourses = useMemo(() => COURSES, []);

  return (
    <section id="courses" className="relative mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Katalog Course Aktif</h2>
          <p className="mt-1 text-sm text-gray-600">Pilih jalur belajar yang kamu inginkan. Semua course memiliki proyek nyata dan sertifikat.</p>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">{user.email}</span>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              <LogIn className="h-4 w-4" /> Masuk
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gridCourses.map((c) => (
          <CourseCard key={c.id} course={c} onSelect={setSelected} />
        ))}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 md:items-center">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selected.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">{selected.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700"><Star className="h-4 w-4" /> {selected.rating}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {selected.duration}</span>
                  <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4" /> {selected.level}</span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium hover:bg-gray-200">Tutup</button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">Modul Ajar</h4>
                <ul className="space-y-2">
                  {selected.modules.map((m, i) => (
                    <li key={i} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                      <Layers className="h-4 w-4 text-indigo-600" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">Proyek (3–4)</h4>
                <ul className="space-y-2">
                  {selected.projects.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-green-600" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-600">Ikuti semua proyek untuk mendapatkan sertifikat kelulusan.</p>
              {user ? (
                <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">Mulai Course</button>
              ) : (
                <button onClick={() => setShowLogin(true)} className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
                  Login untuk mulai
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLoggedIn={(u) => {
          setUser(u);
          setShowLogin(false);
        }}
      />
    </section>
  );
}
