import React, { useMemo, useState } from 'react';
import { Code, Copy, Download } from 'lucide-react';

const LANGUAGES = ['Javascript', 'Python', 'Java', 'C++', 'Go', 'PHP', 'Ruby', 'Rust', 'Kotlin', 'Swift'];

export default function CodeNotes() {
  const [language, setLanguage] = useState('Javascript');
  const [title, setTitle] = useState('Catatan Kode');
  const [content, setContent] = useState('// Tulis snippet atau catatan penting di sini');

  const fileName = useMemo(() => `${title.replace(/\s+/g, '_').toLowerCase()}_${language.toLowerCase()}.md`, [title, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`### ${title} (${language})\n\n\`\`\`\n${content}\n\`\`\``);
      alert('Disalin ke clipboard');
    } catch (e) {
      alert('Gagal menyalin');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([`### ${title} (${language})\n\n\`\`\`\n${content}\n\`\`\``], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="notes" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center gap-2">
        <Code className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Code Notes</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm text-gray-600">Judul</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />
          <label className="mb-2 block text-sm text-gray-600">Bahasa</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleCopy} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-medium hover:bg-gray-50">
              <Copy className="h-4 w-4" /> Salin
            </button>
            <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
              <Download className="h-4 w-4" /> Unduh
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm text-gray-600">Isi Catatan / Snippet</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={14}
              className="w-full resize-y rounded-lg border border-gray-200 bg-black/90 font-mono text-sm text-green-200 focus:border-indigo-500 focus:outline-none"
              style={{ padding: '12px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
