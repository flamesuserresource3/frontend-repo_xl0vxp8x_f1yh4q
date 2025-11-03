import React from 'react';
import Header from './components/Header.jsx';
import HeroCover from './components/HeroCover.jsx';
import LandingContent from './components/LandingContent.jsx';
import LoginModal from './components/LoginModal.jsx';

export default function App() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [presetModule, setPresetModule] = React.useState(null);

  const openLogin = (module) => {
    setPresetModule(module);
    setLoginOpen(true);
    // Scroll to landing section if triggered from teaser
    const el = document.getElementById('landing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onCTAClick = () => {
    setPresetModule(null);
    setLoginOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header onLogin={() => setLoginOpen(true)} onCTAClick={onCTAClick} />
      <HeroCover onCTAClick={onCTAClick} />
      <LandingContent onJoin={openLogin} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} presetModule={presetModule} />
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Getteng Apps · Semua hak cipta dilindungi.
      </footer>
    </div>
  );
}
