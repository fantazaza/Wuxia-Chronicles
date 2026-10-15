import React from 'react';
import { Skill, Hero } from '../types/game';
import { Zap, Flame, Shield, Sparkles } from 'lucide-react';
import { PIXEL_HEROES } from './PixelHeroes';

interface SkillBarProps {
  hero: Hero;
  selectedSkill: Skill | null;
  onSelectSkill: (skill: Skill) => void;
  disabled: boolean;
}

export const SkillBar: React.FC<SkillBarProps> = ({
  hero,
  selectedSkill,
  onSelectSkill,
  disabled,
}) => {
  const PixelComp = PIXEL_HEROES[hero.id] || PIXEL_HEROES[hero.id.replace('boss_', '')];

  return (
    <div className="w-full bg-slate-900/90 border-t-2 border-amber-600/60 p-3 sm:p-4 backdrop-blur-md rounded-t-2xl shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Active Hero Portrait info */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hero.bgGradient} flex items-center justify-center shadow-lg border border-yellow-400/50 overflow-hidden`}>
            {PixelComp ? <PixelComp size={44} /> : <span className="text-3xl">{hero.avatar}</span>}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base sm:text-lg">{hero.name}</span>
              <span className="text-xs text-amber-400 font-semibold px-1.5 py-0.5 bg-amber-950/80 rounded border border-amber-700/50">
                {hero.sect}
              </span>
            </div>
            <div className="text-xs text-slate-300 flex items-center gap-3 mt-0.5">
              <span className="text-emerald-400 font-bold">HP: {hero.stats.hp}/{hero.stats.maxHp}</span>
              <span className="text-cyan-400 font-bold">ปราณชี่: {hero.stats.qi}/{hero.stats.maxQi}</span>
              <span className="text-yellow-400 font-bold">ความเร็ว: {hero.stats.spd}</span>
            </div>
          </div>
        </div>

        {/* Skill Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {hero.skills.map((skill, index) => {
            const isSelected = selectedSkill?.id === skill.id;
            const onCooldown = skill.currentCooldown > 0;
            const notEnoughQi = hero.stats.qi < skill.qiCost;
            const canUse = !disabled && !onCooldown && !notEnoughQi;

            return (
              <button
                key={skill.id}
                disabled={!canUse}
                onClick={() => onSelectSkill(skill)}
                className={`relative group px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border-2 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[130px] transition-all duration-200 ${
                  isSelected
                    ? 'border-yellow-400 bg-yellow-950/80 scale-105 shadow-lg shadow-yellow-500/30'
                    : canUse
                    ? 'border-slate-700 bg-slate-800/90 hover:border-amber-500 hover:bg-slate-700/80'
                    : 'border-slate-800 bg-slate-900/60 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Cooldown overlay */}
                {onCooldown && (
                  <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center z-10">
                    <span className="text-xl font-black text-white">{skill.currentCooldown}</span>
                  </div>
                )}

                {/* Skill Name & Index */}
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 flex items-center gap-1">
                  <span>{index === 0 ? '🥋 สกิล 1' : index === 1 ? '⚔️ สกิล 2' : '💥 ท่าไม้ตาย'}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-amber-200/90 font-medium truncate max-w-[120px]">
                  {skill.nameTh}
                </div>

                {/* Qi Cost / Requirement */}
                <div className="mt-1 flex items-center gap-1 text-[10px] text-cyan-300 font-bold">
                  {skill.qiCost > 0 ? (
                    <span>ชี่ -{skill.qiCost}</span>
                  ) : (
                    <span className="text-emerald-400">+ชี่</span>
                  )}
                  {skill.targetType === 'all_enemies' && (
                    <span className="bg-red-900/70 text-red-200 px-1 rounded text-[9px]">AOE ทั้งหมด</span>
                  )}
                  {skill.targetType === 'all_allies' && (
                    <span className="bg-blue-900/70 text-blue-200 px-1 rounded text-[9px]">เพื่อนทุกคน</span>
                  )}
                </div>

                {/* Tooltip Description on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-50 w-52 p-2 bg-slate-950/95 border border-amber-500/60 rounded-lg shadow-xl text-[11px] text-left pointer-events-none">
                  <div className="font-bold text-amber-300 mb-1">{skill.name}</div>
                  <div className="text-slate-300 leading-relaxed">{skill.description}</div>
                  {skill.cooldown > 0 && (
                    <div className="text-slate-400 mt-1 text-[10px]">คูลดาวน์: {skill.cooldown} เทิร์น</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
