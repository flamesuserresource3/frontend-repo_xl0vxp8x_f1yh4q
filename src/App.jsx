import { useState } from "react";
import Header from "./components/Header.jsx";
import ModuleGrid from "./components/ModuleGrid.jsx";
import ModuleDetail from "./components/ModuleDetail.jsx";
import Footer from "./components/Footer.jsx";
import LoginModal from "./components/LoginModal.jsx";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Kuasai skill teknologi lewat modul interaktif
          </h1>
          <p className="mt-3 text-slate-400">
            Pilih topik, pelajari kurikulum singkatnya, dan mulai belajar. Jika tertarik, daftar dan lanjutkan course.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header onLogin={() => setLoginOpen(true)} />
      <Hero />

      {!selectedModule && (
        <ModuleGrid onSelect={(m) => setSelectedModule(m)} />
      )}

      {selectedModule && (
        <ModuleDetail
          module={selectedModule}
          onBack={() => setSelectedModule(null)}
          onJoin={() => setLoginOpen(true)}
        />
      )}

      <Footer />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
