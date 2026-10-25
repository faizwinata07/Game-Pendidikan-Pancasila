/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  X, 
  Clock, 
  Target, 
  CheckCircle, 
  GraduationCap, 
  Play, 
  Pause, 
  RotateCcw,
  Users,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/audio';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  secondsLeft: number;
  isTimerRunning: boolean;
  hasTeacherStarted: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSetDuration: (minutes: number) => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  isOpen,
  onClose,
  secondsLeft,
  isTimerRunning,
  hasTeacherStarted,
  onToggleTimer,
  onResetTimer,
  onSetDuration,
}) => {
  if (!isOpen) return null;

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-stone-900 border border-amber-800/60 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl text-stone-100 animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-historical text-amber-100">
                Panduan Guru & Panel Kendali Waktu (RPP Kurikulum Merdeka)
              </h3>
              <p className="text-xs text-stone-400">
                Pendidikan Pancasila Fase F - SMA Kelas 11 · Bab 1: BPUPKI & PPKI
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-300">
          
          {/* TEACHER TIMER CONTROL PANEL */}
          <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/50 border-2 border-amber-600/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-200 text-xs sm:text-sm uppercase tracking-wider">
                  Panel Kendali Timer Pembelajaran (Khusus Guru)
                </span>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                isTimerRunning 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600 animate-pulse' 
                  : hasTeacherStarted 
                  ? 'bg-amber-950 text-amber-300 border-amber-600'
                  : 'bg-stone-900 text-stone-400 border-stone-700'
              }`}>
                {isTimerRunning ? '● Waktu Berjalan' : hasTeacherStarted ? '❚❚ Dijeda Guru' : '○ Belum Dimulai (Menunggu Guru)'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-black text-amber-100">
                  {formatTime(secondsLeft)}
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Timer tidak akan berjalan otomatis sebelum Guru menekan tombol mulai di bawah ini.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Start / Pause button */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onToggleTimer();
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs shadow-md transition-all cursor-pointer ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-stone-950'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Jeda Waktu Sesi</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Mulai Timer Sekarang (Guru)</span>
                    </>
                  )}
                </button>

                {/* Reset button */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onResetTimer();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs transition-colors cursor-pointer border border-stone-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset (20m)</span>
                </button>

                {/* Duration Presets */}
                <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 text-[11px]">
                  <span className="text-stone-500 px-1 text-[10px]">Durasi:</span>
                  {[15, 20, 25].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onSetDuration(mins);
                      }}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer font-mono ${
                        secondsLeft === mins * 60
                          ? 'bg-amber-600 text-stone-950 font-bold'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Capaian Pembelajaran (CP) & Tujuan Pembelajaran (TP) */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-400" />
              Capaian & Alur Tujuan Pembelajaran (ATP)
            </h4>
            <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800 space-y-2">
              <p>
                <strong>Capaian Pembelajaran (Fase F):</strong> Peserta didik mampu menganalisis kronologi lahirnya Pancasila, membandingkan gagasan para pendiri bangsa dalam sidang BPUPKI dan PPKI, serta mengaplikasikan nilai-nilai musyawarah kompromi dalam kehidupan sosial masyarakat yang majemuk.
              </p>
              <ul className="list-disc list-inside space-y-1 text-stone-300 text-xs">
                <li><strong>TP 1:</strong> Mengidentifikasi tokoh-tokoh BPUPKI dari berbagai daerah dan latar belakang kearifan lokal Nusantara (Pendekatan CRT).</li>
                <li><strong>TP 2:</strong> Menganalisis perbedaan usulan dasar negara serta proses lahirnya Piagam Jakarta 22 Juni 1945.</li>
                <li><strong>TP 3:</strong> Mengambil keputusan etis kebangsaan dalam momen genting lobi 18 Agustus 1945 demi keutuhan NKRI.</li>
                <li><strong>TP 4:</strong> Mengaitkan semangat gotong royong para pendiri bangsa dengan aksi nyata menghadapi masalah lingkungan (misal: musibah banjir musiman).</li>
              </ul>
            </div>
          </div>

          {/* Model Pembelajaran & Pendekatan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800">
              <span className="text-[11px] font-mono text-amber-400 uppercase font-bold block mb-1">
                Model Pembelajaran
              </span>
              <p className="text-xs text-stone-300">
                <strong>Discovery Learning & Problem-Based Learning (PBL):</strong> Siswa berperan aktif sebagai wartawan detektif yang menyingkap fakta sejarah melalui investigasi data dan memecahkan dilema perpecahan bangsa.
              </p>
            </div>
            <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800">
              <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                Pendekatan Pedagogis
              </span>
              <p className="text-xs text-stone-300">
                <strong>Culturally Responsive Teaching (CRT):</strong> Mengintegrasikan tradisi budaya nusantara (Pela Gandong Maluku, Si Tou Timou Tumou Tou Minahasa, Adat Minang, dll) dan analogi empati banjir musiman dalam refleksi siswa.
              </p>
            </div>
          </div>

          {/* Alokasi Waktu 20 Menit */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Skenario Alokasi Waktu (Total: 20 Menit)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                <div className="text-amber-400 font-bold text-sm">3 Menit</div>
                <div className="font-semibold text-stone-200 text-xs">Tahap 1: Peta CRT</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Eksplorasi tokoh & kearifan budaya daerah</div>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                <div className="text-amber-400 font-bold text-sm">5 Menit</div>
                <div className="font-semibold text-stone-200 text-xs">Tahap 2: Kuis Kempeitai</div>
                <div className="text-[10px] text-stone-400 mt-0.5">3 pertanyaan kognitif bertenggat waktu</div>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                <div className="text-amber-400 font-bold text-sm">10 Menit</div>
                <div className="font-semibold text-stone-200 text-xs">Tahap 3: Simulasi Sidang</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Debat integralistik & klimaks 18 Agustus</div>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                <div className="text-amber-400 font-bold text-sm">2 Menit</div>
                <div className="font-semibold text-stone-200 text-xs">Tahap 4: Refleksi & LKPD</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Analogi banjir musiman & cetak piagam</div>
              </div>
            </div>
          </div>

          {/* Rubrik Penilaian Formatif */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Rubrik Asesmen Formatif Guru
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-800">
                <thead className="bg-stone-950 text-stone-300">
                  <tr>
                    <th className="p-2 border-b border-stone-800">Aspek Penilaian</th>
                    <th className="p-2 border-b border-stone-800">Indikator Ketercapaian</th>
                    <th className="p-2 border-b border-stone-800">Skor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  <tr>
                    <td className="p-2 font-semibold text-stone-200">Kognitif (Sejarah BPUPKI/PPKI)</td>
                    <td className="p-2">Ketepatan menjawab 3 kuis Kempeitai & pemahaman Panitia Sembilan.</td>
                    <td className="p-2 text-amber-400 font-mono">10 - 30</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-stone-200">Keterampilan Bernalar Kritis</td>
                    <td className="p-2">Memilih opsi kompromi kebangsaan daripada ego kelompok pada momen 18 Agustus.</td>
                    <td className="p-2 text-amber-400 font-mono">10 - 40</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-stone-200">Sikap & Refleksi CRT</td>
                    <td className="p-2">Kedalaman refleksi LKPD mengaitkan Pancasila dengan aksi nyata gotong royong di lingkungan.</td>
                    <td className="p-2 text-amber-400 font-mono">10 - 30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips Fasilitasi Guru di Kelas */}
          <div className="bg-amber-950/20 border border-amber-900/50 p-4 rounded-xl space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Users className="w-4 h-4" />
              Petunjuk Pelaksanaan Pembelajaran di Kelas:
            </div>
            <p>
              1. <strong>Bermain Individu:</strong> Guru menekan tombol <em>"Mulai Timer (Guru)"</em> secara serentak di kelas. Siswa mengakses via laptop/HP masing-masing selama 20 menit, mengisi refleksi LKPD, dan mengunduh Piagam.
            </p>
            <p>
              2. <strong>Bermain Berkelompok (4-5 Siswa):</strong> Setiap kelompok berdiskusi menentukan jawaban di bawah pengawasan guru. Saat Bung Hatta meminta saran pada klimaks 18 Agustus, kelompok bermusyawarah sebelum menekan tombol keputusan.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Tutup Panel Guru
          </button>
        </div>

      </div>
    </div>
  );
};
