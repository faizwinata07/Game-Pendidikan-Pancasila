/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Compass, 
  ShieldAlert, 
  Users, 
  Award, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  RotateCcw, 
  Pause, 
  Play, 
  Clock,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderNavProps {
  currentStage: 1 | 2 | 3 | 4;
  onSelectStage: (stage: 1 | 2 | 3 | 4) => void;
  onOpenTeacherGuide: () => void;
  onResetGame: () => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  secondsLeft: number;
  isTimerRunning: boolean;
  hasTeacherStarted: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentStage,
  onSelectStage,
  onOpenTeacherGuide,
  onResetGame,
  isAudioEnabled,
  onToggleAudio,
  secondsLeft,
  isTimerRunning,
  hasTeacherStarted,
  onToggleTimer,
  onResetTimer,
}) => {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stages = [
    { num: 1 as const, title: 'Tahap 1: Peta Nusantara (CRT)', time: '3m', icon: Compass },
    { num: 2 as const, title: 'Tahap 2: Interogasi Kempeitai', time: '5m', icon: ShieldAlert },
    { num: 3 as const, title: 'Tahap 3: Simulasi Sidang & Kompromi', time: '10m', icon: Users },
    { num: 4 as const, title: 'Tahap 4: Ending & Refleksi', time: '2m', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/40 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Brand & Role */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center border border-amber-500/50 shadow-md shadow-amber-950/50">
              <span className="font-heading font-black text-amber-100 text-lg tracking-wider">1945</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-historical tracking-wide text-amber-100 flex items-center gap-1.5">
                  Lorong Waktu Nusantara
                  <span className="text-amber-500 text-xs font-sans font-normal border-l border-stone-700 pl-2 hidden sm:inline">
                    Misi Sidang BPUPKI-PPKI
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="text-amber-400 font-medium">Peran: Detektif Sejarah</span>
                <span aria-hidden="true">·</span>
                <span>SMA Kelas 11 (20 Menit)</span>
              </div>
            </div>
          </div>

          {/* Master Countdown & Controls - Started by Teacher */}
          <div className="flex items-center gap-2">
            
            {/* Teacher Timer Control Box */}
            <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-800 rounded-lg px-2.5 py-1 text-xs">
              <Clock className={`w-3.5 h-3.5 ${isTimerRunning ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
              
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-mono font-bold text-sm ${
                    isTimerRunning ? 'text-emerald-300' : 'text-amber-200'
                  }`}>
                    {formatTime(secondsLeft)}
                  </span>
                  <span className="text-[10px] text-stone-400 hidden md:inline">
                    ({!hasTeacherStarted ? 'Menunggu Guru' : isTimerRunning ? 'Berjalan' : 'Jeda'})
                  </span>
                </div>
              </div>

              {/* Start / Pause Button for Teacher */}
              {!hasTeacherStarted ? (
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onToggleTimer();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs shadow transition-colors cursor-pointer ml-1"
                  title="Guru: Klik untuk memulai penghitungan waktu 20 menit"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Mulai (Guru)</span>
                </button>
              ) : (
                <div className="flex items-center gap-1 ml-1">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onToggleTimer();
                    }}
                    title={isTimerRunning ? 'Jeda Timer (Guru)' : 'Lanjutkan Timer (Guru)'}
                    className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                      isTimerRunning ? 'text-amber-300 hover:bg-stone-800' : 'text-emerald-300 hover:bg-stone-800'
                    }`}
                    aria-label="Toggle Timer"
                  >
                    {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onResetTimer();
                    }}
                    title="Reset Timer (Guru)"
                    className="p-1 rounded text-stone-400 hover:text-red-300 hover:bg-stone-800 transition-colors cursor-pointer"
                    aria-label="Reset Timer"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onToggleAudio();
              }}
              title={isAudioEnabled ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-900 transition-colors cursor-pointer"
              aria-label="Toggle Audio"
            >
              {isAudioEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>

            {/* Panduan Guru / Modul Ajar Modal Trigger (Termasuk Kontrol Timer Guru) */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTeacherGuide();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900/60 border border-amber-600/70 text-amber-100 hover:bg-amber-800/80 transition-colors text-xs font-semibold cursor-pointer shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Panduan Guru (RPP)</span>
            </button>

            {/* Reset Game */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Mulai ulang seluruh simulasi dari awal?')) {
                  sound.playWarp();
                  onResetGame();
                }
              }}
              title="Reset Permainan"
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-red-400 hover:border-red-900 transition-colors cursor-pointer"
              aria-label="Reset Game"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Stage Interactive Stepper Bar */}
        <div className="mt-2.5 pt-2 border-t border-stone-800/60 grid grid-cols-4 gap-1.5 sm:gap-2">
          {stages.map((stg) => {
            const Icon = stg.icon;
            const isActive = currentStage === stg.num;
            const isCompleted = currentStage > stg.num;

            return (
              <button
                key={stg.num}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectStage(stg.num);
                }}
                className={`flex items-center gap-2 p-2 rounded-md transition-all text-left cursor-pointer ${
                  isActive 
                    ? 'bg-amber-950/80 border border-amber-600/80 text-amber-100 shadow-sm' 
                    : isCompleted
                    ? 'bg-stone-900/60 border border-emerald-900/50 text-stone-300 hover:bg-stone-900'
                    : 'bg-stone-900/40 border border-stone-800/60 text-stone-400 hover:bg-stone-900/70 hover:text-stone-300'
                }`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                  isActive 
                    ? 'bg-amber-600 text-stone-950' 
                    : isCompleted
                    ? 'bg-emerald-900 text-emerald-200'
                    : 'bg-stone-800 text-stone-400'
                }`}>
                  {stg.num}
                </div>
                <div className="min-w-0 flex-1 truncate">
                  <div className="flex items-center gap-1.5 text-xs font-medium truncate">
                    <Icon className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
                    <span className="truncate">{stg.title}</span>
                  </div>
                  <div className="text-[10px] text-stone-400 hidden lg:block">
                    Alokasi: {stg.time}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
