import React from 'react';
import { Hero } from '../types/game';
import { ELEMENT_INFO } from '../data/heroes';
import { Shield, Zap, Sparkles } from 'lucide-react';

import { PIXEL_HEROES } from './PixelHeroes';

interface HeroCardProps {
  hero: Hero;
  isSelected?: boolean;
  isTargetable?: boolean;
  isActiveTurn?: boolean;
  onClick?: () => void;
  floatingText?: { text: string; isCrit?: boolean; isHeal?: boolean } | null;
  animatingSkill?: string | null;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  hero,
  isSelected,
  isTargetable,
  isActiveTurn,
  onClick,
  floatingText,
  animatingSkill,
}) => {
  const hpPercent = Math.max(0, Math.min(100, (hero.stats.hp / hero.stats.maxHp) * 100));
  const atbPercent = Math.max(0, Math.min(100, hero.currentAtb));
  const qiPercent = Math.max(0, Math.min(100, (hero.stats.qi / hero.stats.maxQi) * 100));
  const isDead = hero.stats.hp <= 0;
  const elem = ELEMENT_INFO[hero.element];
  const PixelComponent = PIXEL_HEROES[hero.id] || PIXEL_HEROES[hero.id.replace('boss_', '')];

  return (
    <div
      onClick={isTargetable && !isDead ? onClick : undefined}
      className={`relative flex flex-col items-center select-none transition-all duration-300 ${
        isDead ? 'opacity-30 grayscale pointer-events-none scale-95' : ''
      } ${isTargetable ? 'cursor-pointer hover:scale-110 active:scale-95' : ''} ${
        isSelected ? 'scale-105' : ''
      } ${isActiveTurn ? 'scale-105' : ''}`}
    >
      {/* Target Marker Pointer */}
      {isTargetable && !isDead && (
        <div className="absolute -top-7 text-xs font-black text-red-400 animate-bounce bg-slate-900/90 px-2 py-0.5 rounded-full border border-red-500/80 shadow-md">
          🎯 เลือกโจมตี
        </div>
      )}

      {/* Floating Damage / Heal text */}
      {floatingText && (
        <div
          className={`absolute -top-12 z-50 font-black text-xl px-2.5 py-1 rounded-lg shadow-2xl pointer-events-none animate-bounce ${
            floatingText.isHeal
              ? 'bg-gradient-to-r from-emerald-500 to-green-400 text-white border-2 border-white'
              : floatingText.isCrit
              ? 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-yellow-100 text-2xl scale-125 border-2 border-yellow-300 shadow-red-500/50'
              : 'bg-red-600 text-white border border-red-300'
          }`}
        >
          {floatingText.text}
        </div>
      )}

      {/* Visual Animation overlay */}
      {animatingSkill && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          {animatingSkill === 'dragon' && (
            <div className="text-7xl animate-ping drop-shadow-[0_0_20px_rgba(245,158,11,1)]">🐉🔥</div>
          )}
          {animatingSkill === 'slash' && (
            <div className="text-7xl animate-spin text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,1)]">⚔️</div>
          )}
          {animatingSkill === 'palm' && (
            <div className="text-7xl animate-pulse text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,1)]">💥</div>
          )}
          {animatingSkill === 'yin_yang' && (
            <div className="text-7xl animate-spin text-purple-400 drop-shadow-[0_0_20px_rgba(192,132,252,1)]">☯️</div>
          )}
          {animatingSkill === 'heal' && (
            <div className="text-7xl animate-bounce text-emerald-300 drop-shadow-[0_0_20px_rgba(52,211,153,1)]">✨</div>
          )}
          {animatingSkill === 'lightning' && (
            <div className="text-7xl animate-ping text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,1)]">⚡</div>
          )}
          {animatingSkill === 'buff' && (
            <div className="text-7xl animate-bounce text-sky-400 drop-shadow-[0_0_20px_rgba(56,189,248,1)]">🛡️</div>
          )}
        </div>
      )}

      {/* Hero Badge & Avatar Box (Gacha style Card) */}
      <div
        className={`w-28 h-36 sm:w-32 sm:h-40 rounded-2xl flex flex-col items-center justify-between p-2.5 shadow-2xl relative border-2 backdrop-blur-md transition-all duration-300 ${
          isActiveTurn
            ? 'border-yellow-400 ring-4 ring-yellow-400/50 shadow-yellow-500/40 shadow-2xl'
            : isSelected
            ? 'border-cyan-400 ring-2 ring-cyan-400/40'
            : isTargetable
            ? 'border-red-500/70 hover:border-red-400 hover:shadow-red-500/30'
            : 'border-slate-800'
        } bg-gradient-to-b ${hero.bgGradient}`}
      >
        {/* Turn Indicator Crown */}
        {isActiveTurn && (
          <div className="absolute -top-3.5 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1 border border-yellow-200 animate-pulse">
            <Zap className="w-3 h-3 fill-slate-950" /> ตาออกท่า
          </div>
        )}

        {/* Top Badges (Element & Rarity) */}
        <div className="w-full flex items-center justify-between text-xs z-10">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 font-bold text-white text-[11px] border border-white/10" title={elem.name}>
            <span>{elem.icon}</span>
          </span>
          <span className="text-yellow-300 font-black text-xs drop-shadow">
            {'★'.repeat(hero.rarity)}
          </span>
        </div>

        {/* Character Icon / Avatar */}
        <div className="relative my-auto flex items-center justify-center">
          {PixelComponent ? (
            <div className="drop-shadow-[0_8px_12px_rgba(0,0,0,0.85)] filter hover:scale-110 transition-transform">
              <PixelComponent size={72} />
            </div>
          ) : (
            <div className="text-5xl sm:text-6xl drop-shadow-[0_8px_10px_rgba(0,0,0,0.9)] filter hover:scale-110 transition-transform">
              {hero.avatar}
            </div>
          )}
          {hero.isBoss && (
            <span className="absolute -bottom-2 bg-gradient-to-r from-red-600 to-rose-700 text-[10px] font-black text-white px-2 py-0.5 rounded-full border border-red-300 uppercase shadow-lg">
              BOSS
            </span>
          )}
        </div>

        {/* Sect / Name Preview */}
        <div className="w-full text-center bg-black/60 rounded-lg py-1 px-1 border border-white/5">
          <div className="text-white font-black text-xs truncate drop-shadow">
            {hero.name.split(' ')[0]}
          </div>
          <div className="text-amber-300 text-[9px] truncate font-medium">
            {hero.sect}
          </div>
        </div>
      </div>

      {/* Progress Bars (HP, QI, ATB) */}
      <div className="w-28 sm:w-32 mt-1.5 space-y-1">
        {/* HP Bar */}
        <div className="relative w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700/80 shadow-inner">
          <div
            className={`h-full transition-all duration-300 ${
              hpPercent > 50
                ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                : hpPercent > 25
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                : 'bg-gradient-to-r from-red-600 to-rose-500 animate-pulse'
            }`}
            style={{ width: `${hpPercent}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-white drop-shadow">
            {hero.stats.hp}/{hero.stats.maxHp}
          </span>
        </div>

        {/* Qi (MP) Bar */}
        <div className="relative w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-blue-900 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 transition-all duration-300"
            style={{ width: `${qiPercent}%` }}
          />
        </div>

        {/* ATB Turn Gauge (Real-Time Speed Indicator) */}
        <div className="relative w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-amber-500/50 shadow-inner">
          <div
            className={`h-full transition-all duration-100 ${
              atbPercent >= 100
                ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-200 animate-pulse'
                : 'bg-gradient-to-r from-amber-600 to-yellow-500'
            }`}
            style={{ width: `${atbPercent}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-yellow-100 drop-shadow">
            {atbPercent >= 100 ? '⚡ พร้อมออกท่า' : `${Math.floor(atbPercent)}%`}
          </span>
        </div>
      </div>

      {/* Active Buffs & Debuffs */}
      {hero.buffs.length > 0 && (
        <div className="flex gap-1 mt-1 flex-wrap justify-center max-w-[130px]">
          {hero.buffs.map((buff, idx) => (
            <span
              key={idx}
              className="text-[9px] px-1.5 py-0.2 bg-slate-900/90 text-amber-300 border border-slate-700 rounded-md flex items-center gap-0.5 shadow"
              title={`${buff.name} (${buff.duration} เทิร์น)`}
            >
              {buff.type.includes('buff') ? '⬆️' : '⬇️'} {buff.duration}t
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
