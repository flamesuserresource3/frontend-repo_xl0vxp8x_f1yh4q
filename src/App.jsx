import { useRef, useState } from "react";
import Hero from "./components/Hero";
import CourseTeasers from "./components/CourseTeasers";
import LandingSection from "./components/LandingSection";
import LoginModal from "./components/LoginModal";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [selected, setSelected] = useState(null);
  const landingRef = useRef(null);

  const goToLanding = () => {
    landingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 font-inter text-white">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600" />
            <span className="text-lg font-semibold">Getteng Apps</span>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-300 sm:flex">
            <a href="#highlights" className="hover:text-white">Katalog</a>
            <a href="#landing" className="hover:text-white">Landing</a>
          </nav>
          <button
            onClick={() => setShowLogin(true)}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
          >
            Masuk
          </button>
        </div>
      </header>

      <main>
        <Hero onGetStarted={() => { goToLanding(); setShowLogin(true); }} />
        <CourseTeasers
          onModuleClick={(course, module) => {
            setSelected({ course, module });
            goToLanding();
            setShowLogin(true);
          }}
        />
        <LandingSection ref={landingRef} selected={selected} />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="mx-auto max-w-6xl px-6 text-sm text-slate-400">
          © {new Date().getFullYear()} Getteng Apps • Bangun skill, tunjukkan karya.
        </div>
      </footer>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
