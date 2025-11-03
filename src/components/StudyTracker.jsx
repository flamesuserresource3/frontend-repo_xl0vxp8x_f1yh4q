import React, { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';

// Simple inline chart without external libs
export default function StudyTracker() {
  // Dummy weekly minutes studied
  const data = useMemo(
    () => [
      { day: 'Sen', min: 35 },
      { day: 'Sel', min: 50 },
      { day: 'Rab', min: 25 },
      { day: 'Kam', min: 65 },
      { day: 'Jum', min: 40 },
      { day: 'Sab', min: 70 },
      { day: 'Min', min: 30 },
    ],
    []
  );

  const maxMin = Math.max(...data.map((d) => d.min), 1);
  const total = data.reduce((a, b) => a + b.min, 0);
  const avg = Math.round(total / data.length);

  return (
    <section id="tracker" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">Study Tracker</h3>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          Rata-rata: {avg} menit/hari
        </span>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-7 gap-4">
          {data.map((d) => (
            <div key={d.day} className="flex h-40 flex-col items-center justify-end">
              <div
                className="w-full rounded-t-md bg-indigo-600"
                style={{ height: `${(d.min / maxMin) * 100}%` }}
                title={`${d.min} menit`}
              />
              <span className="mt-2 text-sm text-gray-600">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full bg-indigo-600" style={{ width: `${Math.min((total / (7 * 60)) * 100, 100)}%` }} />
        </div>
        <p className="mt-2 text-sm text-gray-600">Target mingguan: 7 jam</p>
      </div>
    </section>
  );
}
