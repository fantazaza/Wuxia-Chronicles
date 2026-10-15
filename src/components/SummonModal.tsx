import React, { useState } from 'react';
import { Hero } from '../types/game';
import { ALL_HEROES_ROSTER, ELEMENT_INFO } from '../data/heroes';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Shield, Swords, Star } from 'lucide-react';
import { PIXEL_HEROES } from './PixelHeroes';

interface SummonModalProps {
  isOpen: boolean;
  onClose: () => void;
  scrolls: number;
  onSummonHero: (hero: Hero) => void;
  onDeductScroll: () => void;
}

export const SummonModal: React.FC<SummonModalProps> = ({
  isOpen,
  onClose,
  scrolls,
  onSummonHero,
  onDeductScroll,
}) => {
  const [summonResult, setSummonResult] = useState<Hero | null>(null);
  const [isSummoning, setIsSummoning] = useState(false);

  if (!isOpen) return null;

  const handleSummon = () => {
    if (scrolls <= 0 || isSummoning) return;

    setIsSummoning(true);
    setSummonResult(null);
    onDeductScroll();

    setTimeout(() => {
      // Pick random hero from roster
      const randomIndex = Math.floor(Math.random() * ALL_HEROES_ROSTER.length);
      const picked = ALL_HEROES_ROSTER[randomIndex];
      const newHero: Hero = {
        ...JSON.parse(JSON.stringify(picked)),
        currentAtb: 0,
        buffs: [],
      };

      setSummonResult(newHero);
      setIsSummoning(false);
      onSummonHero(newHero);

      // Trigger Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white font-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-amber-400 mb-1 flex items-center justify-center gap-2">
          <span>📜</span> ศาลาอัญเชิญยอดยุทธ์ (Summon Altar)
        </h2>
        <p className="text-slate-300 text-xs mb-4">
          ใช้วิชาเปิดป้ายเทียบเชิญยอดฝีมือกิมย้งเข้าร่วมทัพ (ก๊วยเจ๋ง, เอี้ยก้วย, เล่งฮู้ชง, ตงฟางปุ๊ป้าย ฯลฯ)
        </p>

        {/* Summon Area */}
        <div className="my-6 min-h-[220px] flex flex-col items-center justify-center border-2 border-dashed border-amber-600/40 rounded-xl bg-slate-950/60 p-4">
          {isSummoning ? (
            <div className="flex flex-col items-center gap-3">
              <div className="text-6xl animate-spin">☯️</div>
              <p className="text-amber-300 font-bold animate-pulse text-sm">
                กำลังโคจรมหาปราณเรียกหายอดยุทธ...
              </p>
            </div>
          ) : summonResult ? (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="text-yellow-400 text-sm font-black mb-1 flex items-center gap-1">
                {'★'.repeat(summonResult.rarity)} ปรากฏกายแล้ว!
              </div>
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-b ${summonResult.bgGradient} flex items-center justify-center shadow-2xl border-2 border-yellow-400 my-2 overflow-hidden`}>
                {(() => {
                  const PixelComp = PIXEL_HEROES[summonResult.id] || PIXEL_HEROES[summonResult.id.replace('boss_', '')];
                  return PixelComp ? <PixelComp size={80} /> : <span className="text-5xl">{summonResult.avatar}</span>;
                })()}
              </div>
              <h3 className="text-xl font-black text-white">{summonResult.name}</h3>
              <p className="text-amber-400 text-xs font-semibold">{summonResult.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                  สำนัก: {summonResult.sect}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                  ธาตุ: {ELEMENT_INFO[summonResult.element].icon} {ELEMENT_INFO[summonResult.element].name}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="text-6xl">📜</div>
              <p className="text-slate-300 text-sm font-semibold">
                มีป้ายเทียบเชิญยุทธภพเหลือ: <span className="text-yellow-400 font-black text-base">{scrolls}</span> ชิ้น
              </p>
              <p className="text-slate-400 text-xs">
                (รับเพิ่มได้จากการชนะด่านยุทธภพและภารกิจ)
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-center gap-3">
          <button
            onClick={handleSummon}
            disabled={scrolls <= 0 || isSummoning}
            className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-lg flex items-center gap-2 ${
              scrolls > 0 && !isSummoning
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" /> อัญเชิญยอดยุทธ (ใช้ 1 ป้าย)
          </button>
        </div>
      </div>
    </div>
  );
};
