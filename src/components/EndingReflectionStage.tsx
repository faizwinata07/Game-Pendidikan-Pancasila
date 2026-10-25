/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  REFLECTION_ANALOGY 
} from '../data/gameData';
import { 
  Award, 
  RotateCcw, 
  Sparkles, 
  Printer, 
  Send, 
  Waves, 
  CheckCircle2, 
  AlertOctagon, 
  BookHeart,
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { sound } from '../utils/audio';

interface EndingReflectionStageProps {
  endingType: 'bad' | 'golden';
  onRewindToDecision: () => void;
  onResetGame: () => void;
}

export const EndingReflectionStage: React.FC<EndingReflectionStageProps> = ({
  endingType,
  onRewindToDecision,
  onResetGame,
}) => {
  // Student reflection form states
  const [studentName, setStudentName] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('XI MIPA / IPS');
  const [reflectionDisaster, setReflectionDisaster] = useState<string>('');
  const [reflectionCompromise, setReflectionCompromise] = useState<string>('');
  const [reflectionPledge, setReflectionPledge] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (endingType === 'golden') {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore confetti errors
      }
    } else {
      sound.playAlert();
    }
  }, [endingType]);

  const handleSubmitReflection = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setIsSubmitted(true);
  };

  const handlePrintCertificate = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* ----------------- BAD ENDING VIEW ----------------- */}
      {endingType === 'bad' && (
        <div className="bg-gradient-to-b from-red-950/80 via-stone-900 to-stone-950 border-2 border-red-700/70 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-100 space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-red-600/30 border border-red-500 flex items-center justify-center">
              <AlertOctagon className="w-9 h-9 text-red-400 animate-pulse" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
              PARADOKS GARIS WAKTU #0845 - KEGAGALAN KONSENSUS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-historical text-red-100">
              Bad Ending: Runtuhnya Republik Sebelum Berdiri
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Karena menolak kompromi dan memaksakan kehendak mayoritas, utusan Indonesia Timur (Maluku, Minahasa, Bali, Nusa Tenggara) menarik diri dari proklamasi. Wilayah Nusantara terpecah menjadi pulau-pulau kecil yang rapuh.
            </p>
          </div>

          {/* Dystopian Consequences Card */}
          <div className="bg-stone-950/90 border border-red-900/40 rounded-xl p-5 space-y-3 text-xs sm:text-sm text-stone-300">
            <h4 className="font-bold text-red-300 uppercase tracking-wider text-xs">
              Dampak Fatal pada Garis Waktu Indonesia:
            </h4>
            <ul className="space-y-2 list-disc list-inside text-stone-300">
              <li>Belanda dan Sekutu (NICA) mendarat pada September 1945 dan dengan mudah menaklukkan pulau-pulau yang berseteru.</li>
              <li>Tidak ada Proklamasi dan Konstitusi tunggal yang diakui dunia internasional.</li>
              <li>Generasi muda di masa depan kehilangan identitas kebangsaan dan Bhinneka Tunggal Ika.</li>
            </ul>
          </div>

          {/* Time Rewind Call to Action */}
          <div className="text-center pt-3 space-y-3">
            <p className="text-xs text-amber-300 font-medium">
              Sebagai Detektif Sejarah, kamu memiliki satu kesempatan memutar balik krono-meter waktu untuk memperbaiki keputusan Bung Hatta dan Ki Bagus Hadikusumo!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playWarp();
                  onRewindToDecision();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Putar Balik Waktu (Pilih Jalur Kompromi)</span>
              </button>
              <button
                type="button"
                onClick={onResetGame}
                className="px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white text-xs transition-colors cursor-pointer"
              >
                Ulangi dari Tahap 1
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- GOLDEN ENDING VIEW ----------------- */}
      {endingType === 'golden' && (
        <div className="space-y-8">
          
          {/* Triumphant Golden Ending Banner */}
          <div className="bg-gradient-to-b from-amber-950/80 via-stone-900 to-stone-950 border-2 border-amber-500/70 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-lg">
                <Award className="w-9 h-9 text-amber-400" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                KONSENSUS SEJARAH OTENTIK BERHASIL DISELAMATKAN!
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-historical text-amber-100">
                Golden Ending: Fajar Konsensus Luhur 18 Agustus 1945
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
                Berkat kerendahan hati dan jiwa besar Ki Bagus Hadikusumo, K.H. Wachid Hasyim, Teuku M. Hasan, dan Bung Hatta, frasa 7 kata Piagam Jakarta disepakati diganti menjadi <strong className="text-amber-300">"Ketuhanan Yang Maha Esa"</strong>. Seluruh wilayah dari Sabang sampai Merauke berdiri teguh dalam satu ikatan Negara Kesatuan Republik Indonesia!
              </p>
            </div>

            {/* Achievement Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-amber-900/50">
              <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800 text-center">
                <div className="text-[11px] text-stone-400">Dasar Falsafah</div>
                <div className="text-sm font-bold text-amber-300 mt-0.5">Pancasila Otentik</div>
                <div className="text-[10px] text-stone-400 mt-1">Meja Statis & Leitstar Dinamis</div>
              </div>
              <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800 text-center">
                <div className="text-[11px] text-stone-400">Konstitusi Negara</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5">UUD 1945 Disahkan</div>
                <div className="text-[10px] text-stone-400 mt-1">Pembukaan & 37 Pasal</div>
              </div>
              <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800 text-center">
                <div className="text-[11px] text-stone-400">Pemimpin Bangsa</div>
                <div className="text-sm font-bold text-amber-200 mt-0.5">Soekarno & Hatta</div>
                <div className="text-[10px] text-stone-400 mt-1">Presiden & Wapres Pertama</div>
              </div>
            </div>
          </div>

          {/* CRT Pedagogical Section: Analogi Bencana Banjir Musiman */}
          <div className="bg-stone-900/90 border border-amber-900/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>Refleksi Kontekstual Siswa (Culturally Responsive Teaching)</span>
            </div>
            <h3 className="text-xl font-bold font-historical text-stone-100 flex items-center gap-2">
              <BookHeart className="w-5 h-5 text-amber-400" />
              {REFLECTION_ANALOGY.title}
            </h3>

            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-5 text-xs sm:text-sm text-stone-300 leading-relaxed space-y-3 font-serif">
              {REFLECTION_ANALOGY.story.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              {[
                { sila: 'Sila 1', label: 'Welas Asih Ilahi', desc: 'Saling mendoakan & menolong tanpa membedakan agama' },
                { sila: 'Sila 2', label: 'Empati Manusia', desc: 'Membuka pintu rumah bagi korban yang kedinginan' },
                { sila: 'Sila 3', label: 'Satu Keluarga', desc: 'Arus bah meleburkan segala sekat kesukuan' },
                { sila: 'Sila 4', label: 'Musyawarah Warga', desc: 'Posko balai RW membagi logistik secara mufakat' },
                { sila: 'Sila 5', label: 'Keadilan Merata', desc: 'Tak ada warga yang dibiarkan kelaparan' },
              ].map((item, idx) => (
                <div key={idx} className="bg-stone-950/90 border border-stone-800 rounded-lg p-2.5 text-center">
                  <span className="text-[10px] font-mono text-amber-400 font-bold block">{item.sila}</span>
                  <span className="text-xs font-semibold text-stone-200 block mt-0.5">{item.label}</span>
                  <span className="text-[10px] text-stone-400 block mt-1 leading-tight">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Student Reflection Form (LKPD Digital) */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Lembar Kerja Refleksi Detektif (LKPD Siswa SMA Kelas 11)</span>
              </div>
              <h3 className="text-lg font-bold font-historical text-stone-100 mt-1">
                Goresan Pena Detektif Sejarah: Menjaga Api Pancasila
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Isilah refleksi ini untuk mengunduh Sertifikat Detektif Sejarah resmi dan menyerahkannya kepada Guru Pendidikan Pancasila.
              </p>
            </div>

            <form onSubmit={handleSubmitReflection} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Nama Siswa / Kelompok: *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Faiz & Tim Garuda Muda"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Kelas / Satuan Pendidikan:
                  </label>
                  <input
                    type="text"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="Contoh: XI-Fase F SMA Negeri 1"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Reflection Prompts based on CRT */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  1. Aksi Nyata Gotong Royong (CRT): Ceritakan contoh peristiwa di lingkunganmu (seperti banjir, kerja bakti warga, atau kegiatan sekolah) di mana orang-orang saling bantu tanpa memandang suku/agama! *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reflectionDisaster}
                  onChange={(e) => setReflectionDisaster(e.target.value)}
                  placeholder="Saat banjir di pemukiman kami, warga saling meminjamkan perahu karet dan memasak di dapur umum balai RT tanpa pernah memperdebatkan latar belakang suku atau agama..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  2. Nilai Kompromi Luhur: Apa pelajaran yang kamu petik dari kerelaan Ki Bagus Hadikusumo menghapus 7 kata Piagam Jakarta saat menghadapi perbedaan pendapat di kelas/kelompokmu? *
                </label>
                <textarea
                  required
                  rows={2}
                  value={reflectionCompromise}
                  onChange={(e) => setReflectionCompromise(e.target.value)}
                  placeholder="Bahwa dalam musyawarah, kemenangan sejati bukanlah ketika pendapat kita menang mutlak, melainkan ketika keutuhan persaudaraan dan keselamatan bersama berhasil dijaga..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  3. Ikrar Penjaga Pancasila: Satu kalimat janjimu sebagai pelajar SMA Kelas 11 untuk merawat keberagaman Indonesia hari ini: *
                </label>
                <input
                  type="text"
                  required
                  value={reflectionPledge}
                  onChange={(e) => setReflectionPledge(e.target.value)}
                  placeholder="Saya berikrar tidak akan pernah membeda-bedakan kawan dan siap bergotong royong menjaga NKRI!"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  Semua isian akan dicetak otomatis ke dalam Piagam Penghargaan.
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim & Terbitkan Piagam</span>
                </button>
              </div>
            </form>
          </div>

          {/* OFFICIAL CERTIFICATE (PRINTABLE) */}
          {isSubmitted && (
            <div className="bg-stone-950 border-4 border-amber-600/80 rounded-2xl p-6 sm:p-10 shadow-2xl relative space-y-6 print:m-0 print:border-4 print:border-black print:text-black">
              {/* Certificate Header */}
              <div className="text-center space-y-2 border-b-2 border-amber-800/60 pb-6 print:border-black">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 font-bold print:text-black">
                  <ShieldCheck className="w-4 h-4" /> REPUBLIK INDONESIA · KEMENTERIAN PENDIDIKAN & KEBUDAYAAN
                </div>
                <h3 className="text-2xl sm:text-4xl font-black font-heading tracking-wider text-amber-200 print:text-black">
                  PIAGAM DETEKTIF SEJARAH
                </h3>
                <p className="text-xs sm:text-sm text-amber-400 font-serif italic print:text-black">
                  Nomor Arsip Waktu: 1945/BPUPKI-PPKI/CRT-SMA11
                </p>
              </div>

              {/* Recipient */}
              <div className="text-center space-y-1.5 py-2">
                <p className="text-xs text-stone-400 uppercase tracking-widest print:text-black">
                  Dengan penuh kehormatan dianugerahkan kepada:
                </p>
                <div className="text-xl sm:text-3xl font-bold font-historical text-white underline decoration-amber-500 print:text-black print:no-underline">
                  {studentName || 'Wartawan Detektif 1945'}
                </div>
                <p className="text-xs text-amber-300 font-medium print:text-black">
                  {studentClass}
                </p>
              </div>

              {/* Achievement Text */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed text-center max-w-2xl mx-auto font-serif print:text-black">
                Telah berhasil menyelesaikan Misi Simulasi 20 Menit <strong>"Lorong Waktu Nusantara: Misi Sidang 1945"</strong>, menembus interogasi Kempeitai, meneliti kebinekaan tokoh BPUPKI dari berbagai penjuru suku dan agama, serta berhasil memandu konsensus luhur 18 Agustus 1945 menuju berdirinya <strong>Negara Kesatuan Republik Indonesia yang berlandaskan Pancasila</strong>.
              </p>

              {/* Embedded Student Reflection Quote */}
              <div className="bg-stone-900/80 border border-amber-900/40 rounded-xl p-4 text-xs space-y-2 text-stone-300 print:bg-white print:border-black print:text-black">
                <div>
                  <strong className="text-amber-300 print:text-black">Refleksi Gotong Royong Lingkungan:</strong> "{reflectionDisaster}"
                </div>
                <div>
                  <strong className="text-amber-300 print:text-black">Komitmen Pribadi:</strong> "{reflectionPledge}"
                </div>
              </div>

              {/* Signature / Validation Row */}
              <div className="grid grid-cols-2 gap-4 pt-6 text-center text-xs text-stone-400 border-t border-stone-800 print:border-black print:text-black">
                <div>
                  <div className="h-10 flex items-center justify-center font-serif italic text-amber-300/80 text-sm print:text-black">
                    Dr. Radjiman & Ir. Soekarno
                  </div>
                  <div className="font-bold text-stone-200 print:text-black">Ketua BPUPKI & PPKI 1945</div>
                  <div className="text-[10px] text-stone-500 print:text-black">Gedung Pejambon, Jakarta</div>
                </div>
                <div>
                  <div className="h-10 flex items-center justify-center font-serif italic text-amber-300/80 text-sm print:text-black">
                    Guru Mata Pelajaran
                  </div>
                  <div className="font-bold text-stone-200 print:text-black">Guru Pendidikan Pancasila</div>
                  <div className="text-[10px] text-stone-500 print:text-black">Fase F - SMA Kelas 11</div>
                </div>
              </div>

              {/* Print Action Button (Hidden during print) */}
              <div className="pt-4 flex items-center justify-center gap-3 print:hidden">
                <button
                  type="button"
                  onClick={handlePrintCertificate}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-xl transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Simpan PDF Piagam Penghargaan</span>
                </button>
              </div>
            </div>
          )}

          {/* Reset / Play Again */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={onResetGame}
              className="px-4 py-2 text-xs text-stone-500 hover:text-amber-400 transition-colors cursor-pointer"
            >
              🔄 Mainkan Kembali Simulasi dari Awal
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
