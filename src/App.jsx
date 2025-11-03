import React from 'react';
import Header from './components/Header.jsx';
import HeroCover from './components/HeroCover.jsx';
import LandingContent from './components/LandingContent.jsx';
import LoginModal from './components/LoginModal.jsx';

export default function App() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [presetModule, setPresetModule] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('getteng_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const openLogin = (module) => {
    setPresetModule(module);
    setLoginOpen(true);
    const el = document.getElementById('landing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onCTAClick = () => {
    setPresetModule(null);
    setLoginOpen(true);
  };

  const handleAuthSuccess = (userObj) => {
    setUser(userObj);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('getteng_token');
      localStorage.removeItem('getteng_user');
    } catch {}
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header onLogin={() => setLoginOpen(true)} onCTAClick={onCTAClick} user={user} onLogout={handleLogout} />
      <HeroCover onCTAClick={onCTAClick} />
      <LandingContent onJoin={openLogin} />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        presetModule={presetModule}
        onSuccess={(u) => handleAuthSuccess(u)}
      />
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Getteng Apps · Semua hak cipta dilindungi.
      </footer>
    </div>
  );
}
