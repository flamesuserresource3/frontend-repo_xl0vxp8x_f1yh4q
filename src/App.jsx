import React from 'react';
import Header from './components/Header.jsx';
import HeroCover from './components/HeroCover.jsx';
import LandingContent from './components/LandingContent.jsx';
import LoginModal from './components/LoginModal.jsx';
import ModuleDetail from './components/ModuleDetail.jsx';
import ForgotPasswordModal from './components/ForgotPasswordModal.jsx';
import ResetPasswordModal from './components/ResetPasswordModal.jsx';

// Minimal in-app router using History API so we don't need extra deps
function parseRoute(pathname) {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (parts[0] === 'modules' && parts[1]) {
    return { name: 'module', id: parts[1] };
  }
  return { name: 'home' };
}

// Central module catalog for routing lookups
const MODULE_CATALOG = [
  {
    id: 'ai',
    title: 'AI Foundations',
    short: 'Dasar AI praktis untuk pemula – dari konsep ke implementasi kecil.',
    level: 'Beginner',
    highlights: [
      'Konsep dasar ML & AI tanpa rumit',
      'Membangun model sederhana',
      'Evaluasi performa & iterasi',
    ],
  },
  {
    id: 'web',
    title: 'Web Modern',
    short: 'Bangun aplikasi web cepat dengan tool modern tanpa pusing.',
    level: 'Beginner–Intermediate',
    highlights: [
      'Dasar React & state management',
      'Styling modern dengan Tailwind',
      'Deployment cepat & praktis',
    ],
  },
  {
    id: 'data',
    title: 'Data Sprint',
    short: 'Analisis data, visualisasi, dan insight yang bisa dipakai.',
    level: 'Beginner–Intermediate',
    highlights: [
      'Pembersihan data & EDA',
      'Visualisasi efektif',
      'Menyusun insight yang actionable',
    ],
  },
  {
    id: 'system',
    title: 'System Design',
    short: 'Pahami arsitektur skala besar dengan contoh nyata.',
    level: 'Intermediate',
    highlights: [
      'Skalabilitas & reliability',
      'Pemodelan komponen & trade-off',
      'Studi kasus arsitektur produk',
    ],
  },
];

function getModuleById(id) {
  return MODULE_CATALOG.find((m) => m.id === id) || null;
}

export default function App() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [presetModule, setPresetModule] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [route, setRoute] = React.useState(() => parseRoute(window.location.pathname));

  // Forgot / Reset password modals state
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [resetOpen, setResetOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState('');
  const [resetToken, setResetToken] = React.useState('');

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('getteng_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  React.useEffect(() => {
    const onPop = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(parseRoute(path));
    // scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    // If user initiated from a module join, go to that module page
    if (presetModule?.id) {
      navigate(`/modules/${presetModule.id}`);
      setPresetModule(null);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('getteng_token');
      localStorage.removeItem('getteng_user');
    } catch {}
    setUser(null);
    navigate('/');
  };

  const handleJoinModule = (module) => {
    if (user) {
      navigate(`/modules/${module.id}`);
    } else {
      openLogin(module);
    }
  };

  const currentModule = route.name === 'module' ? getModuleById(route.id) : null;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header onLogin={() => setLoginOpen(true)} onCTAClick={onCTAClick} user={user} onLogout={handleLogout} />

      {route.name === 'home' && (
        <>
          <HeroCover onCTAClick={onCTAClick} />
          <LandingContent onJoin={handleJoinModule} />
        </>
      )}

      {route.name === 'module' && currentModule && (
        <ModuleDetail
          module={currentModule}
          onBack={() => navigate('/')}
          onJoin={() => handleJoinModule(currentModule)}
        />
      )}

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        presetModule={presetModule}
        onSuccess={(u) => handleAuthSuccess(u)}
        onForgot={() => { setLoginOpen(false); setForgotOpen(true); }}
      />

      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        onProceedReset={(email, token) => {
          setForgotOpen(false);
          setResetEmail(email);
          setResetToken(token || '');
          setResetOpen(true);
        }}
      />

      <ResetPasswordModal
        open={resetOpen}
        initialEmail={resetEmail}
        initialToken={resetToken}
        onClose={() => setResetOpen(false)}
        onDone={() => {
          setResetOpen(false);
          setLoginOpen(true);
        }}
      />

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Getteng Apps · Semua hak cipta dilindungi.
      </footer>
    </div>
  );
}
