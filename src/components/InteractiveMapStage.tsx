/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  HistoricalFigure, 
  NUSANTARA_FIGURES 
} from '../data/gameData';
import { 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Quote, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  Info,
  Map as MapIcon,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/audio';

interface InteractiveMapStageProps {
  onCompleteStage: () => void;
  onSelectFigureForDossier?: (figureId: string) => void;
}

export const InteractiveMapStage: React.FC<InteractiveMapStageProps> = ({
  onCompleteStage,
}) => {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure>(NUSANTARA_FIGURES[0]);
  const [exploredFigureIds, setExploredFigureIds] = useState<string[]>([NUSANTARA_FIGURES[0].id]);
  const [activeIslandFilter, setActiveIslandFilter] = useState<string>('all');

  const handleSelectFigure = (fig: HistoricalFigure) => {
    sound.playTypewriter();
    setSelectedFigure(fig);
    if (!exploredFigureIds.includes(fig.id)) {
      setExploredFigureIds((prev) => [...prev, fig.id]);
    }
  };

  const filteredFigures = activeIslandFilter === 'all'
    ? NUSANTARA_FIGURES
    : NUSANTARA_FIGURES.filter((f) => f.island.toLowerCase().includes(activeIslandFilter.toLowerCase()));

  const explorationProgress = Math.round((exploredFigureIds.length / NUSANTARA_FIGURES.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Intro Mission Briefing Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/60 border border-amber-900/40 p-5 sm:p-6 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-500" />
              <span>Misi 1: Orientasi Garis Waktu Nusantara (Alokasi: 3 Menit)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-historical text-amber-100">
              Peta Kebinekaan Tokoh BPUPKI & Kearifan Lokal (CRT)
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Sebelum menyamar masuk ke ruang sidang BPUPKI di Pejambon, telitilah asal-usul para perumus dasar negara dari barat hingga timur. 
              Pendekatan <strong className="text-amber-300 font-semibold">Culturally Responsive Teaching (CRT)</strong> membuktikan bahwa Pancasila bukanlah ide asing yang dicangkokkan, melainkan mutiara nilai yang digali dari kearifan suku dan tradisi Nusantara.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="bg-stone-950/70 border border-stone-800 rounded-lg p-3 text-right">
              <div className="text-[11px] text-stone-400">Progres Eksplorasi</div>
              <div className="text-lg font-mono font-bold text-amber-400">
                {exploredFigureIds.length} / {NUSANTARA_FIGURES.length} Tokoh
              </div>
              <div className="w-32 bg-stone-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${explorationProgress}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playWarp();
                onCompleteStage();
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/60 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Lanjut ke Pos Kempeitai</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Center Column: Map Canvas & Island Filter */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-stone-400 flex items-center gap-1 font-medium shrink-0">
              <MapIcon className="w-3.5 h-3.5 text-amber-500" /> Wilayah:
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'Semua Wilayah' },
                { id: 'sumatera', label: 'Sumatera' },
                { id: 'jawa', label: 'Jawa' },
                { id: 'sulawesi', label: 'Sulawesi' },
                { id: 'maluku', label: 'Maluku' },
                { id: 'bali', label: 'Sunda Kecil/Bali' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveIslandFilter(tab.id);
                  }}
                  className={`px-2.5 py-1 rounded-md transition-colors text-xs font-medium cursor-pointer ${
                    activeIslandFilter === tab.id
                      ? 'bg-amber-600 text-stone-950 font-bold'
                      : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Visual Stage */}
          <div className="relative bg-stone-900/90 border border-stone-800 rounded-xl p-4 sm:p-6 overflow-hidden shadow-inner min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
            {/* Watermark grid & Compass */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <div className="flex items-center justify-between text-xs text-stone-400 relative z-10 mb-2">
              <span className="font-mono text-amber-400/80">KARTOGRAFI HINDIA TIMUR / NUSANTARA 1945</span>
              <span className="text-[11px] bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800 text-stone-300">
                Klik pin lokasi untuk membuka berkas tokoh
              </span>
            </div>

            {/* Stylized SVG Map of Indonesian Archipelago */}
            <div className="relative w-full aspect-[2/1] my-auto">
              <svg 
                viewBox="0 0 1000 500" 
                className="w-full h-full drop-shadow-md select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ocean Background Tint */}
                <rect width="1000" height="500" fill="#141210" rx="12" />

                {/* Ocean Current Contour Lines */}
                <path d="M 50 250 Q 250 200 450 260 T 900 240" fill="none" stroke="#2e261e" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 100 380 Q 400 320 650 390 T 950 360" fill="none" stroke="#2e261e" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 200 120 Q 500 80 750 140" fill="none" stroke="#2e261e" strokeWidth="1" strokeDasharray="4 4" />

                {/* Landmass Outlines (Stylized Nusantara Islands) */}
                {/* Sumatera */}
                <path 
                  d="M 120 180 L 170 230 L 250 330 L 290 380 L 260 400 L 210 350 L 140 270 L 100 200 Z" 
                  fill="#2c241b" 
                  stroke="#57422f" 
                  strokeWidth="2" 
                />
                {/* Jawa */}
                <path 
                  d="M 290 410 L 350 415 L 430 425 L 530 435 L 540 450 L 440 445 L 320 435 L 285 425 Z" 
                  fill="#382d20" 
                  stroke="#6b5037" 
                  strokeWidth="2" 
                />
                {/* Kalimantan */}
                <path 
                  d="M 360 220 L 450 200 L 510 240 L 520 310 L 460 350 L 390 340 L 350 290 Z" 
                  fill="#2c241b" 
                  stroke="#57422f" 
                  strokeWidth="2" 
                />
                {/* Sulawesi */}
                <path 
                  d="M 580 230 L 630 200 L 650 220 L 610 260 L 670 300 L 650 320 L 600 280 L 600 350 L 580 340 L 580 280 L 560 260 Z" 
                  fill="#382d20" 
                  stroke="#6b5037" 
                  strokeWidth="2" 
                />
                {/* Maluku */}
                <path 
                  d="M 720 230 L 740 250 L 725 270 Z M 750 310 L 770 330 L 745 345 Z M 780 260 L 800 280 L 770 300 Z" 
                  fill="#423525" 
                  stroke="#78593a" 
                  strokeWidth="2" 
                />
                {/* Bali & Nusa Tenggara */}
                <path 
                  d="M 555 445 L 575 448 L 570 458 Z M 585 450 L 625 455 L 615 465 Z M 640 458 L 710 465 L 690 478 Z" 
                  fill="#382d20" 
                  stroke="#6b5037" 
                  strokeWidth="1.5" 
                />
                {/* Papua */}
                <path 
                  d="M 830 270 L 920 280 L 960 340 L 950 400 L 880 370 L 840 330 L 810 300 Z" 
                  fill="#2c241b" 
                  stroke="#57422f" 
                  strokeWidth="2" 
                />

                {/* Island Names Labels */}
                <text x="140" y="270" fill="#8c7358" fontSize="13" fontFamily="Cinzel" letterSpacing="2">SUMATERA</text>
                <text x="360" y="445" fill="#a8896c" fontSize="13" fontFamily="Cinzel" letterSpacing="2">JAWA</text>
                <text x="400" y="260" fill="#8c7358" fontSize="13" fontFamily="Cinzel" letterSpacing="2">KALIMANTAN</text>
                <text x="590" y="240" fill="#a8896c" fontSize="13" fontFamily="Cinzel" letterSpacing="2">SULAWESI</text>
                <text x="730" y="280" fill="#a8896c" fontSize="13" fontFamily="Cinzel" letterSpacing="2">MALUKU</text>
                <text x="580" y="480" fill="#8c7358" fontSize="11" fontFamily="Cinzel">SUNDA KECIL</text>
                <text x="860" y="330" fill="#8c7358" fontSize="13" fontFamily="Cinzel" letterSpacing="2">PAPUA</text>
              </svg>

              {/* Interactive DOM Pin Overlays on Map */}
              {NUSANTARA_FIGURES.map((fig) => {
                const isSelected = selectedFigure.id === fig.id;
                const isExplored = exploredFigureIds.includes(fig.id);

                return (
                  <button
                    key={fig.id}
                    type="button"
                    onClick={() => handleSelectFigure(fig)}
                    style={{ left: `${fig.coordinates.x}%`, top: `${fig.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse beacon for active selection */}
                      {isSelected && (
                        <span className="absolute w-8 h-8 rounded-full bg-amber-400/30 animate-ping" />
                      )}
                      
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg border transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-white ring-2 ring-amber-400'
                          : isExplored
                          ? 'bg-amber-900/90 text-amber-200 border-amber-600/80 hover:bg-amber-800'
                          : 'bg-stone-900/90 text-stone-300 border-stone-600 hover:border-amber-400'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Pin Label tooltip */}
                    <div className={`mt-1 px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow-md transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'bg-stone-950/90 text-stone-200 border border-stone-800'
                    }`}>
                      {fig.name.split(' ')[0]} ({fig.origin.split(',')[0]})
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Figures Avatar Row */}
            <div className="pt-3 border-t border-stone-800/80">
              <div className="text-[11px] text-stone-400 mb-2 flex items-center justify-between">
                <span>Daftar Tokoh Perumus (Klik untuk menginvestigasi):</span>
                <span>{filteredFigures.length} Tokoh Tersedia</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {filteredFigures.map((fig) => {
                  const isSelected = selectedFigure.id === fig.id;
                  const isExplored = exploredFigureIds.includes(fig.id);

                  return (
                    <button
                      key={fig.id}
                      type="button"
                      onClick={() => handleSelectFigure(fig)}
                      className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-950/90 border-amber-500 text-amber-100 shadow-sm'
                          : isExplored
                          ? 'bg-stone-900/70 border-stone-800 text-stone-300 hover:border-amber-900'
                          : 'bg-stone-950 border-stone-800/50 text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'
                      }`}>
                        {fig.name[0]}
                      </div>
                      <div className="min-w-0 flex-1 truncate">
                        <div className="text-xs font-semibold truncate leading-tight">{fig.name}</div>
                        <div className="text-[10px] text-stone-400 truncate">{fig.origin}</div>
                      </div>
                      {isExplored && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Discovery Learning Tip for High Schoolers */}
          <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-3 text-xs text-stone-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-200">Fokus Penyelidikan (Discovery Learning):</strong> Perhatikan keberagaman latar belakang agama (Islam, Protestan, Katolik, Hindu) dan suku (Jawa, Minang, Minahasa, Maluku, Bali, Sunda). Mengapa para pendiri bangsa tidak memaksakan konsep negara satu agama atau satu suku? Temukan jawabannya pada berkas di sebelah kanan!
            </div>
          </div>

        </div>

        {/* Right Column: Figure Dossier & Culturally Responsive Teaching (CRT) Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900/90 border border-amber-900/40 rounded-xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            
            {/* Dossier Header */}
            <div className="border-b border-stone-800 pb-4 mb-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono text-amber-500 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Berkas Penyelidikan BPUPKI
                </span>
                <span className="text-[11px] text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                  {selectedFigure.island}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-historical text-amber-100">
                {selectedFigure.name}
              </h3>
              <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                {selectedFigure.role}
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-400 mt-2">
                <span>📍 {selectedFigure.origin}</span>
                <span aria-hidden="true">·</span>
                <span>⚖️ {selectedFigure.religionOrBackground}</span>
              </div>
            </div>

            {/* Peran & Kontribusi Sejarah */}
            <div className="space-y-3.5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Peran & Kontribusi dalam BPUPKI/PPKI
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed bg-stone-950/60 p-3 rounded-lg border border-stone-800">
                  {selectedFigure.contribution}
                </p>
              </div>

              {/* Culturally Responsive Teaching (CRT) Feature Box */}
              <div className="bg-gradient-to-br from-amber-950/40 to-stone-950 border border-amber-700/50 rounded-lg p-3.5 relative">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wide mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kearifan Budaya Lokal (CRT): {selectedFigure.crtWisdom.title}</span>
                </div>
                <div className="text-sm font-bold text-amber-100 font-historical mb-1">
                  "{selectedFigure.crtWisdom.localConcept}"
                </div>
                <p className="text-xs text-stone-300 mb-2 leading-relaxed">
                  <strong className="text-stone-100">Makna Tradisi:</strong> {selectedFigure.crtWisdom.meaning}
                </p>
                <div className="bg-amber-900/30 border-l-2 border-amber-500 pl-2.5 py-1 text-xs text-amber-200/90">
                  <strong className="text-amber-300">Kaitan dengan Pancasila:</strong> {selectedFigure.crtWisdom.pancasilaLink}
                </div>
              </div>

              {/* Direct Historical Quote */}
              <div className="p-3 bg-stone-950/80 rounded-lg border border-stone-800 text-stone-300">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                  <p className="text-xs italic font-serif leading-relaxed text-amber-100/90">
                    {selectedFigure.quote}
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Proceed Action */}
            <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
              <span className="text-xs text-stone-400">
                Lanjut ke tahap interogasi?
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playWarp();
                  onCompleteStage();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <span>Masuk Pos Penjagaan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
