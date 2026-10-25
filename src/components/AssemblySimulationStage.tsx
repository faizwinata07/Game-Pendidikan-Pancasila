/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ASSEMBLY_DIALOGUES, 
  DialogueNode 
} from '../data/gameData';
import { 
  Users, 
  Sparkles, 
  AlertCircle, 
  Hammer, 
  History, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { sound } from '../utils/audio';

interface AssemblySimulationStageProps {
  onTriggerEnding: (endingType: 'bad' | 'golden') => void;
  onBackToStage2: () => void;
}

export const AssemblySimulationStage: React.FC<AssemblySimulationStageProps> = ({
  onTriggerEnding,
}) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('intro_assembly');
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [historyTrail, setHistoryTrail] = useState<string[]>([]);

  const node: DialogueNode = ASSEMBLY_DIALOGUES[currentNodeId] || ASSEMBLY_DIALOGUES['intro_assembly'];

  // Check if this node directly triggers an ending
  useEffect(() => {
    if (currentNodeId === 'bad_ending_screen') {
      onTriggerEnding('bad');
    } else if (currentNodeId === 'golden_ending_screen') {
      onTriggerEnding('golden');
    }
  }, [currentNodeId, onTriggerEnding]);

  // Typewriter effect for authentic historical feel
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let idx = 0;
    const full = node.text;

    const interval = setInterval(() => {
      if (idx < full.length) {
        setDisplayedText(full.slice(0, idx + 1));
        if (idx % 6 === 0) sound.playTypewriter();
        idx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [node]);

  const handleSelectOption = (targetNodeId: string, impactScore?: number) => {
    sound.playClick();
    if (targetNodeId === 'gavel_ratification') {
      sound.playGavel();
    } else if (targetNodeId.includes('warp') || targetNodeId.includes('to_bad')) {
      sound.playWarp();
    }

    setHistoryTrail((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(targetNodeId);
  };

  const handleSkipTyping = () => {
    setDisplayedText(node.text);
    setIsTyping(false);
  };

  const getAvatarBadge = (avatarType: DialogueNode['avatarType']) => {
    switch (avatarType) {
      case 'soekarno':
        return {
          initials: 'BK',
          title: 'Bung Karno',
          color: 'from-amber-600 to-amber-900 border-amber-400 text-amber-100',
          desc: 'Ketua Panitia Sembilan / Proklamator'
        };
      case 'hatta':
        return {
          initials: 'MH',
          title: 'Bung Hatta',
          color: 'from-blue-700 to-slate-900 border-blue-400 text-blue-100',
          desc: 'Wakil Ketua PPKI / Negosiator Ulung'
        };
      case 'soepomo':
        return {
          initials: 'SP',
          title: 'Prof. Soepomo',
          color: 'from-stone-700 to-stone-900 border-amber-600 text-amber-200',
          desc: 'Pakar Hukum Adat & Teori Integralistik'
        };
      case 'yamin':
        return {
          initials: 'MY',
          title: 'Mr. Muh. Yamin',
          color: 'from-red-800 to-stone-900 border-red-500 text-red-100',
          desc: 'Pelopor Asas Kebangsaan & Sumpah Pemuda'
        };
      case 'utusanTimur':
        return {
          initials: 'UT',
          title: 'Utusan Indonesia Timur',
          color: 'from-cyan-700 to-slate-900 border-cyan-400 text-cyan-100',
          desc: 'Perwakilan Maluku, Minahasa, Bali & Nusra'
        };
      case 'kibagus':
        return {
          initials: 'KB',
          title: 'Ki Bagus Hadikusumo',
          color: 'from-emerald-800 to-stone-900 border-emerald-400 text-emerald-100',
          desc: 'Pemimpin Muhammadiyah / Negosiator Syariat'
        };
      case 'player':
      default:
        return {
          initials: 'DS',
          title: 'Detektif Sejarah (Wartawan 1945)',
          color: 'from-amber-500 to-stone-800 border-amber-300 text-stone-950',
          desc: 'Penyelidik Garis Waktu BPUPKI'
        };
    }
  };

  const currentBadge = getAvatarBadge(node.avatarType);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Simulation Banner Header */}
      <div className="bg-stone-900/90 border border-amber-900/50 rounded-xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Users className="w-4 h-4 text-amber-500" />
              <span>Tahap 3: Simulasi Sidang & Konsensus Kebangsaan (Alokasi: 10 Menit)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-historical text-amber-100">
              Gedung Pejambon: Titik Temu Gagasan & Ujian 18 Agustus 1945
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Kamu berada di tengah perdebatan sengit dasar negara. Dengarkan argumen para pendiri bangsa dan berikan saran terbaik saat Republik berada di ambang krisis perpecahan!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950/80 px-3 py-2 rounded-lg border border-stone-800 text-xs shrink-0">
            <Building className="w-4 h-4 text-amber-500" />
            <div className="text-left">
              <div className="text-stone-400 text-[10px]">Lokasi Sidang</div>
              <div className="font-semibold text-amber-200">Chuo Sangi In, Pejambon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dialogue Chamber Stage (Visual Novel Interface) */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-5 sm:p-7 shadow-2xl relative space-y-6">
        
        {/* Top Metadata in Chamber */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs">
          <span className="text-stone-400 flex items-center gap-1.5 font-mono">
            <History className="w-3.5 h-3.5 text-amber-400" />
            Node: {node.id.toUpperCase()}
          </span>
          {node.historicalContext && (
            <span className="text-[11px] bg-stone-950 text-amber-400/90 px-2.5 py-0.5 rounded border border-amber-900/40 truncate max-w-[280px] sm:max-w-md">
              📜 {node.historicalContext}
            </span>
          )}
        </div>

        {/* Character Speaking Stage */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          
          {/* Avatar Portrait Card */}
          <div className="flex flex-col items-center gap-2 shrink-0 self-center sm:self-start">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${currentBadge.color} border-2 flex items-center justify-center shadow-lg relative overflow-hidden`}>
              <span className="font-heading font-black text-2xl sm:text-3xl tracking-wider">
                {currentBadge.initials}
              </span>
              <div className="absolute inset-0 bg-stone-950/20 pointer-events-none" />
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-amber-200">{currentBadge.title}</div>
              <div className="text-[10px] text-stone-400 max-w-[120px]">{currentBadge.desc}</div>
            </div>
          </div>

          {/* Dialogue Speech Bubble */}
          <div className="flex-1 bg-stone-950/90 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-inner relative flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-historical text-amber-400 tracking-wide">
                  {node.speaker} <span className="text-stone-500 font-sans font-normal text-[11px]">({node.speakerRole})</span>
                </span>
                {isTyping && (
                  <button
                    type="button"
                    onClick={handleSkipTyping}
                    className="text-[10px] text-stone-500 hover:text-amber-300 underline cursor-pointer"
                  >
                    Tampilkan Semua
                  </button>
                )}
              </div>

              {/* Text Body */}
              <div className="text-sm sm:text-base text-stone-100 font-serif leading-relaxed whitespace-pre-line">
                "{displayedText}"
                {isTyping && <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse" />}
              </div>
            </div>

            {/* Historical context kicker */}
            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                Catatan Berita 1945
              </span>
              <span className="text-[11px] text-stone-400">
                Langkah Penyelidikan #{historyTrail.length + 1}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Decision / Choice Buttons (BRANCHING CHOICES) */}
        <div className="space-y-3 pt-3">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pilihan Tindakanmu (Tentukan Jalur Sejarah):</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {node.options && node.options.map((opt, idx) => {
              const isGolden = opt.isGoldenPath === true;
              const isBad = opt.isGoldenPath === false;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt.targetNodeId, opt.impactScore)}
                  className={`group p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                    isBad
                      ? 'bg-red-950/20 border-red-900/60 hover:bg-red-950/40 hover:border-red-500 text-stone-200'
                      : isGolden
                      ? 'bg-amber-950/40 border-amber-600/70 hover:bg-amber-950/70 hover:border-amber-400 text-amber-100 shadow-md'
                      : 'bg-stone-950/80 border-stone-800 hover:border-amber-700 hover:bg-stone-900 text-stone-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isGolden
                        ? 'bg-amber-500 text-stone-950'
                        : isBad
                        ? 'bg-red-700 text-white'
                        : 'bg-stone-800 text-stone-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="text-xs sm:text-sm font-semibold group-hover:text-amber-200 transition-colors leading-snug">
                        {opt.text}
                      </div>
                      {opt.subtext && (
                        <div className="text-[11px] sm:text-xs text-stone-400 leading-relaxed">
                          {opt.subtext}
                        </div>
                      )}
                      {opt.consequenceDesc && (
                        <div className="text-[10px] text-amber-400/90 font-mono pt-1">
                          ⚡ Konsekuensi: {opt.consequenceDesc}
                        </div>
                      )}
                    </div>

                    <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 self-center" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Historical Pedagogy Note */}
      <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-3 text-xs text-stone-400 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>
          <strong>Kunci Pembelajaran Pancasila:</strong> Keputusan pagi 18 Agustus 1945 mengajarkan kita bahwa musyawarah mufakat sejati membutuhkan kerendahan hati untuk mendengarkan saudara yang minoritas. Sila Pertama "Ketuhanan Yang Maha Esa" menjadi payung agung yang menaungi seluruh agama di Indonesia.
        </span>
      </div>

    </div>
  );
};
