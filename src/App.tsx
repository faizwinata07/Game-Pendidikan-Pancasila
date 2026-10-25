/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { InteractiveMapStage } from './components/InteractiveMapStage';
import { KempeitaiInterrogationStage } from './components/KempeitaiInterrogationStage';
import { AssemblySimulationStage } from './components/AssemblySimulationStage';
import { EndingReflectionStage } from './components/EndingReflectionStage';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { sound } from './utils/audio';

export default function App() {
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);
  const [endingType, setEndingType] = useState<'bad' | 'golden'>('golden');
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);

  // Master 20-minute timer for the learning session - Initiated by the Teacher!
  const [secondsLeft, setSecondsLeft] = useState<number>(20 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false); // Starts false until teacher triggers
  const [hasTeacherStarted, setHasTeacherStarted] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  const handleToggleTimer = () => {
    if (!hasTeacherStarted) {
      setHasTeacherStarted(true);
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning((prev) => !prev);
    }
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setHasTeacherStarted(false);
    setSecondsLeft(20 * 60);
  };

  const handleSetDuration = (minutes: number) => {
    setIsTimerRunning(false);
    setHasTeacherStarted(false);
    setSecondsLeft(minutes * 60);
  };

  const handleToggleAudio = () => {
    const nextState = !isAudioEnabled;
    setIsAudioEnabled(nextState);
    sound.enabled = nextState;
  };

  const handleTriggerEnding = (type: 'bad' | 'golden') => {
    setEndingType(type);
    setCurrentStage(4);
  };

  const handleRewindToDecision = () => {
    // Rewind back to Stage 3 for re-deciding the 18 August dilemma
    setCurrentStage(3);
  };

  const handleResetGame = () => {
    setCurrentStage(1);
    setEndingType('golden');
    handleResetTimer();
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-600 selection:text-white">
      
      {/* Top Header & 20-min Countdown HUD (Teacher-Initiated) */}
      <HeaderNav
        currentStage={currentStage}
        onSelectStage={(stg) => setCurrentStage(stg)}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onResetGame={handleResetGame}
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={handleToggleAudio}
        secondsLeft={secondsLeft}
        isTimerRunning={isTimerRunning}
        hasTeacherStarted={hasTeacherStarted}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
      />

      {/* Main Dynamic Stage Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {currentStage === 1 && (
          <InteractiveMapStage 
            onCompleteStage={() => setCurrentStage(2)} 
          />
        )}

        {currentStage === 2 && (
          <KempeitaiInterrogationStage 
            onCompleteStage={() => setCurrentStage(3)}
            onBackToStage1={() => setCurrentStage(1)}
          />
        )}

        {currentStage === 3 && (
          <AssemblySimulationStage 
            onTriggerEnding={handleTriggerEnding}
            onBackToStage2={() => setCurrentStage(2)}
          />
        )}

        {currentStage === 4 && (
          <EndingReflectionStage 
            endingType={endingType}
            onRewindToDecision={handleRewindToDecision}
            onResetGame={handleResetGame}
          />
        )}
      </main>

      {/* Footer / Educational Identity */}
      <footer className="border-t border-stone-800/80 bg-stone-950/80 py-4 text-xs text-stone-400 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">Lorong Waktu Nusantara: Misi Sidang 1945</span>
            <span aria-hidden="true">·</span>
            <span>Pendidikan Pancasila SMA Kelas 11 (Kurikulum Merdeka)</span>
          </div>
          <div className="text-stone-400 text-[11px]">
            Discovery Learning & Culturally Responsive Teaching (CRT) · Alokasi Waktu: 20 Menit (Kontrol Guru)
          </div>
        </div>
      </footer>

      {/* Teacher Guide & RPP Modal with Teacher Timer Control */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
        secondsLeft={secondsLeft}
        isTimerRunning={isTimerRunning}
        hasTeacherStarted={hasTeacherStarted}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        onSetDuration={handleSetDuration}
      />

    </div>
  );
}
