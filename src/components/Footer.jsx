export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EduVibe. Semua hak dilindungi.
      </div>
    </footer>
  );
}
