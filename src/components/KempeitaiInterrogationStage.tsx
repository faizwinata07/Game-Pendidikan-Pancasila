/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  KEMPEITAI_QUIZZES, 
  QuizQuestion 
} from '../data/gameData';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { sound } from '../utils/audio';

interface KempeitaiInterrogationStageProps {
  onCompleteStage: () => void;
  onBackToStage1: () => void;
}

export const KempeitaiInterrogationStage: React.FC<KempeitaiInterrogationStageProps> = ({
  onCompleteStage,
  onBackToStage1,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [suspicionMeter, setSuspicionMeter] = useState<number>(15); // Starts at 15%
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(35); // 35 seconds per question
  const [isGameOverAlert, setIsGameOverAlert] = useState<boolean>(false);

  const currentQ: QuizQuestion = KEMPEITAI_QUIZZES[currentQuestionIndex];

  // Question Timer countdown
  useEffect(() => {
    if (isSubmitted || isGameOverAlert) return;

    if (timeLeft <= 0) {
      // Time is up! Treat as incorrect
      sound.playAlert();
      setIsSubmitted(true);
      setSuspicionMeter((prev) => {
        const next = Math.min(100, prev + 30);
        if (next >= 100) setIsGameOverAlert(true);
        return next;
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, isGameOverAlert]);

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted || isGameOverAlert) return;
    sound.playClick();
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isSubmitted) return;
    setIsSubmitted(true);

    const chosen = currentQ.options.find((o) => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      sound.playSuccess();
      setCorrectAnswersCount((c) => c + 1);
      // Reduce suspicion on sharp answers
      setSuspicionMeter((prev) => Math.max(0, prev - 10));
    } else {
      sound.playAlert();
      setSuspicionMeter((prev) => {
        const next = Math.min(100, prev + currentQ.suspicionIncrease);
        if (next >= 100) {
          setIsGameOverAlert(true);
        }
        return next;
      });
    }
  };

  const handleNextQuestion = () => {
    sound.playTypewriter();
    if (currentQuestionIndex < KEMPEITAI_QUIZZES.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
      setTimeLeft(35);
    } else {
      // Finished all 3 questions
      sound.playSuccess();
      onCompleteStage();
    }
  };

  const handleRestartInterrogation = () => {
    sound.playWarp();
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setSuspicionMeter(15);
    setCorrectAnswersCount(0);
    setTimeLeft(35);
    setIsGameOverAlert(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Stage Briefing Header */}
      <div className="bg-stone-900/90 border border-red-950/80 rounded-xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Tahap 2: Pos Penjagaan Kempeitai Pejambon (5 Menit)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-historical text-stone-100">
              Interogasi Polisi Militer Kempeitai: Ujian Identitas
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Kapten Kenji dari Polisi Militer Jepang mencegat langkahmu di gerbang masuk. Jawab 3 pertanyaan sejarah seputar sidang Dokuritsu Junbi Cosakai dengan cepat dan tepat agar penyamaranmu tidak terbongkar!
            </p>
          </div>

          {/* Suspicion Meter HUD */}
          <div className="bg-stone-950/80 border border-stone-800 rounded-lg p-3 shrink-0 w-full sm:w-56">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Kecurigaan Kempeitai
              </span>
              <span className={`font-mono font-bold ${
                suspicionMeter >= 75 ? 'text-red-400 animate-pulse' : suspicionMeter >= 50 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {suspicionMeter}%
              </span>
            </div>
            <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  suspicionMeter >= 75 ? 'bg-red-500' : suspicionMeter >= 50 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${suspicionMeter}%` }}
              />
            </div>
            <div className="text-[10px] text-stone-500 mt-1">
              {suspicionMeter >= 75 
                ? 'BAHAYA: Kempeitai siap menangkapmu!' 
                : suspicionMeter >= 50 
                ? 'Waspada: Gerak-gerikmu diawasi ketat' 
                : 'Aman: Penyamaranmu meyakinkan'}
            </div>
          </div>
        </div>
      </div>

      {/* GAME OVER ALERT MODAL IF SUSPICION HITS 100% */}
      {isGameOverAlert && (
        <div className="bg-red-950/90 border-2 border-red-600 rounded-xl p-6 text-center space-y-4 shadow-2xl animate-in fade-in">
          <div className="w-14 h-14 bg-red-600/30 rounded-full flex items-center justify-center mx-auto border border-red-500">
            <ShieldAlert className="w-8 h-8 text-red-400 animate-bounce" />
          </div>
          <h3 className="text-xl font-bold font-historical text-red-200">
            PENYAMARAN TERBONGKAR! TERTANGKAP KEMPEITAI!
          </h3>
          <p className="text-sm text-stone-300 max-w-lg mx-auto">
            Kapten Kenji curiga melihatmu ragu menjawab pertanyaan dasar mengenai Dokuritsu Junbi Cosakai. Catatan detektifmu disita dan kamu digiring ke markas Kempeitai!
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestartInterrogation}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-stone-950 font-bold text-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Interogasi dari Awal</span>
            </button>
            <button
              type="button"
              onClick={onBackToStage1}
              className="px-4 py-2.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 hover:text-white text-sm transition-colors cursor-pointer"
            >
              Kembali ke Peta Nusantara
            </button>
          </div>
        </div>
      )}

      {/* MAIN INTERROGATION QUESTION BOX */}
      {!isGameOverAlert && (
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-5 sm:p-7 shadow-xl space-y-6">
          
          {/* Question Header & Countdown Timer */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-amber-950 border border-amber-800/60 text-amber-300 px-2.5 py-1 rounded">
                Pertanyaan {currentQuestionIndex + 1} dari {KEMPEITAI_QUIZZES.length}
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline">
                Skor Benar: {correctAnswersCount}
              </span>
            </div>

            {/* Per-question countdown */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-mono font-bold ${
              timeLeft <= 10 
                ? 'bg-red-950/80 border-red-600 text-red-400 animate-pulse' 
                : 'bg-stone-950 border-stone-800 text-amber-300'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>Waktu Menjawab: {timeLeft}s</span>
            </div>
          </div>

          {/* Kapten Kenji Dialogue Box */}
          <div className="flex items-start gap-3 sm:gap-4 bg-stone-950/70 p-4 rounded-xl border border-stone-800">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-900 to-stone-900 border border-red-700/60 flex items-center justify-center shrink-0 shadow-md">
              <span className="font-heading font-black text-amber-200 text-sm">憲兵</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wide">
                  Kapten Kenji (Polisi Militer Kempeitai)
                </span>
                <span className="text-[10px] text-stone-500">· Pos Pejambon 1945</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-stone-100 leading-snug">
                "{currentQ.question}"
              </p>
            </div>
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'bg-stone-950/90 border-stone-800 text-stone-200 hover:border-amber-700/80 hover:bg-stone-900';

              if (isSubmitted) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-sm';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-red-950/90 border-red-600 text-red-200 shadow-sm';
                } else {
                  btnStyle = 'bg-stone-950/50 border-stone-900 text-stone-500 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-950/90 border-amber-500 text-amber-100 shadow-md';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer ${btnStyle}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-900 text-stone-300 border border-stone-700'
                  }`}>
                    {opt.id}
                  </div>
                  <span className="text-xs sm:text-sm font-medium flex-1">
                    {opt.text}
                  </span>
                  {isSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Historical Explanation */}
          {isSubmitted && (
            <div className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 animate-in fade-in ${
              currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect
                ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-100'
                : 'bg-red-950/30 border-red-800/60 text-stone-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Konteks Sejarah Otentik:</span>
              </div>
              <p className="leading-relaxed text-stone-300">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <span className="text-xs text-stone-400">
              {!isSubmitted ? 'Pilih salah satu jawaban lalu klik Konfirmasi' : 'Pelajari penjelasan lalu lanjutkan'}
            </span>

            {!isSubmitted ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleSubmitAnswer}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedOptionId
                    ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
              >
                Konfirmasi Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>
                  {currentQuestionIndex < KEMPEITAI_QUIZZES.length - 1 ? 'Pertanyaan Berikutnya' : 'Masuk Ruang Sidang BPUPKI'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

      {/* Historical Context Tip */}
      <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-3 text-xs text-stone-400 flex items-center gap-2">
        <FileText className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          <strong>Catatan Investigasi:</strong> BPUPKI dibentuk resmi pada 29 April 1945 bertepatan dengan ulang tahun Kaisar Hirohito (Tencho Setsu) dan dilantik pada 28 Mei 1945 dengan Dr. K.R.T. Radjiman Wedyodiningrat sebagai ketua.
        </span>
      </div>

    </div>
  );
};
