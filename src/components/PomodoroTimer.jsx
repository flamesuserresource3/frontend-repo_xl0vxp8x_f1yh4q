import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const [workMin, setWorkMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' | 'break'
  const [seconds, setSeconds] = useState(workMin * 60);
  const intervalRef = useRef(null);

  // update seconds when durations or mode change
  useEffect(() => {
    setSeconds((mode === 'work' ? workMin : breakMin) * 60);
  }, [workMin, breakMin, mode]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // switch mode
          const nextMode = mode === 'work' ? 'break' : 'work';
          setMode(nextMode);
          return (nextMode === 'work' ? workMin : breakMin) * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, workMin, breakMin]);

  const total = useMemo(() => (mode === 'work' ? workMin : breakMin) * 60, [mode, workMin, breakMin]);
  const progress = Math.max(0, Math.min(100, ((total - seconds) / total) * 100));

  return (
    <section id="pomodoro" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center gap-2">
        <Clock className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Pomodoro Fokus</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
          <div className="mb-2 text-sm font-medium text-gray-600">Mode: {mode === 'work' ? 'Belajar' : 'Istirahat'}</div>
          <div className="text-6xl font-bold tracking-tight">{formatTime(seconds)}</div>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-6 flex items-center gap-3">
            {isRunning ? (
              <button onClick={() => setIsRunning(false)} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-medium hover:bg-gray-50">
                <Pause className="h-4 w-4" /> Jeda
              </button>
            ) : (
              <button onClick={() => setIsRunning(true)} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
                <Play className="h-4 w-4" /> Mulai
              </button>
            )}
            <button
              onClick={() => {
                setIsRunning(false);
                setSeconds(total);
              }}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-medium hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              onClick={() => setMode(mode === 'work' ? 'break' : 'work')}
              className="ml-auto rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Ganti ke {mode === 'work' ? 'Istirahat' : 'Belajar'}
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-sm font-medium text-gray-700">Pengaturan</div>
          <label className="mb-3 block text-sm text-gray-600">Durasi Fokus (menit)</label>
          <input
            type="number"
            min={1}
            value={workMin}
            onChange={(e) => setWorkMin(Math.max(1, Number(e.target.value)))}
            className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />
          <label className="mb-3 block text-sm text-gray-600">Durasi Istirahat (menit)</label>
          <input
            type="number"
            min={1}
            value={breakMin}
            onChange={(e) => setBreakMin(Math.max(1, Number(e.target.value)))}
            className="mb-6 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />
          <p className="text-xs text-gray-500">Tip: Gunakan pola 25/5 atau 50/10 untuk sesi belajar yang konsisten.</p>
        </div>
      </div>
    </section>
  );
}
