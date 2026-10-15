import React, { useState } from 'react';
import { Hero } from '../types/game';
import { ELEMENT_INFO } from '../data/heroes';
import { Swords, Users, Sparkles, Trophy, BookOpen, Shield, Zap, Flame, Plus, X, ArrowRight, Star } from 'lucide-react';
import { PIXEL_HEROES } from './PixelHeroes';

interface LobbyScreenProps {
  gold: number;
  summonScrolls: number;
  collection: Hero[];
  team: Hero[];
  onSetTeam: (team: Hero[]) => void;
  onOpenSummon: () => void;
  onGoToCampaign: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  gold,
  summonScrolls,
  collection,
  team,
  onSetTeam,
  onOpenSummon,
  onGoToCampaign,
}) => {
  const [selectedHeroDetail, setSelectedHeroDetail] = useState<Hero | null>(team[0] || collection[0] || null);

  const toggleTeamMember = (hero: Hero) => {
    const isAlreadyInTeam = team.some(h => h.id === hero.id);
    if (isAlreadyInTeam) {
      if (team.length <= 1) return; // Must have at least 1 hero
      onSetTeam(team.filter(h => h.id !== hero.id));
    } else {
      if (team.length >= 3) {
        // Replace last slot or alert
        const newTeam = [...team.slice(0, 2), hero];
        onSetTeam(newTeam);
      } else {
        onSetTeam([...team, hero]);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-black p-4 sm:p-6 lg:p-8">
      {/* Hero Banner / Highlight Stage */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-amber-950/80 border border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl mb-6 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 select-none pointer-events-none">
            🐉
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> ตำนานยอดยุทธ์จักรวาลกิมย้ง
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 drop-shadow">
              ศาลาว่าการยุทธภพ (Martial Lobby)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              จัดกระบวนทัพจอมยุทธ์ 3 ตำแหน่ง ผสานธาตุแพ้ทาง และฝึกฝนวิชาประจำตัวก่อนออกเดินทางประลองยุทธ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSummon}
              className="px-5 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>ศาลาเทียบเชิญ ({summonScrolls})</span>
            </button>
            <button
              onClick={onGoToCampaign}
              className="px-6 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white hover:brightness-110 shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 animate-pulse"
            >
              <Swords className="w-4 h-4" />
              <span>ออกประลองยุทธ (Battle)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Active Battle Formation (3 Slots) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>กระบวนทัพออกศึก (Team Formation: {team.length}/3)</span>
            </h3>
            <span className="text-xs text-slate-400">
              คลิกที่การ์ดยอดยุทธ์ด้านล่างเพื่อสลับเข้า-ออกจากทีม
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map(slotIndex => {
              const hero = team[slotIndex];
              return hero ? (
                <div
                  key={hero.id}
                  onClick={() => setSelectedHeroDetail(hero)}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer backdrop-blur-md flex flex-col justify-between group shadow-xl ${
                    selectedHeroDetail?.id === hero.id
                      ? 'border-yellow-400 bg-amber-950/40 shadow-yellow-500/20'
                      : 'border-slate-700/80 bg-slate-900/80 hover:border-amber-500/70'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTeamMember(hero);
                    }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-slate-800/90 text-slate-400 hover:bg-red-600 hover:text-white flex items-center justify-center text-xs font-bold transition-colors z-20"
                    title="ปลดออกจากทีม"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${hero.bgGradient} flex items-center justify-center shadow-inner border border-yellow-300/40 group-hover:scale-105 transition-transform overflow-hidden`}>
                      {(() => {
                        const PixelComp = PIXEL_HEROES[hero.id] || PIXEL_HEROES[hero.id.replace('boss_', '')];
                        return PixelComp ? <PixelComp size={56} /> : <span className="text-4xl">{hero.avatar}</span>;
                      })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-yellow-400 text-xs font-black">{'★'.repeat(hero.rarity)}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-slate-200 border border-slate-700">
                          {ELEMENT_INFO[hero.element].icon} {ELEMENT_INFO[hero.element].name.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                        {hero.name.split(' ')[0]}
                      </div>
                      <div className="text-xs text-amber-400/90 font-medium">{hero.sect}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-1 text-center text-[10px]">
                    <div className="bg-slate-950/60 p-1 rounded">
                      <div className="text-slate-400">พลังโจมตี</div>
                      <div className="text-amber-300 font-bold">{hero.stats.atk}</div>
                    </div>
                    <div className="bg-slate-950/60 p-1 rounded">
                      <div className="text-slate-400">ป้องกัน</div>
                      <div className="text-blue-300 font-bold">{hero.stats.def}</div>
                    </div>
                    <div className="bg-slate-950/60 p-1 rounded">
                      <div className="text-slate-400">สปีด ATB</div>
                      <div className="text-yellow-300 font-bold">{hero.stats.spd}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={`empty_${slotIndex}`}
                  className="p-6 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/40 flex flex-col items-center justify-center text-center text-slate-500 min-h-[140px]"
                >
                  <Plus className="w-8 h-8 text-slate-600 mb-1" />
                  <span className="text-xs font-bold text-slate-400">ตำแหน่งว่าง {slotIndex + 1}</span>
                  <span className="text-[10px] text-slate-600">เลือกยอดยุทธ์จากคลังด้านล่าง</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Split View: Roster (Left) & Hero Skill/Lore Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roster Collection List (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>คลังยอดยุทธ์ทั้งหมด ({collection.length})</span>
              </h3>
              <span className="text-xs text-amber-400 font-bold">
                แตะตัวละครเพื่อดูรายละเอียดวิชา
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {collection.map(hero => {
                const isSelected = selectedHeroDetail?.id === hero.id;
                const isInTeam = team.some(h => h.id === hero.id);

                return (
                  <div
                    key={hero.id}
                    onClick={() => {
                      setSelectedHeroDetail(hero);
                      toggleTeamMember(hero);
                    }}
                    className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center text-center group ${
                      isInTeam
                        ? 'border-amber-400 bg-amber-950/30'
                        : isSelected
                        ? 'border-yellow-500/60 bg-slate-900/90'
                        : 'border-slate-800 bg-slate-950/70 hover:border-slate-600'
                    }`}
                  >
                    {isInTeam && (
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-emerald-600 text-[9px] font-black text-white shadow">
                        ในทีม
                      </span>
                    )}
                    <span className="absolute top-2 right-2 text-yellow-400 text-[10px] font-black">
                      {'★'.repeat(hero.rarity)}
                    </span>

                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-b ${hero.bgGradient} flex items-center justify-center shadow-md my-1 group-hover:scale-110 transition-transform overflow-hidden`}>
                      {(() => {
                        const PixelComp = PIXEL_HEROES[hero.id] || PIXEL_HEROES[hero.id.replace('boss_', '')];
                        return PixelComp ? <PixelComp size={48} /> : <span className="text-3xl">{hero.avatar}</span>;
                      })()}
                    </div>

                    <div className="text-xs font-bold text-white truncate w-full">
                      {hero.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-amber-400/80 truncate w-full">{hero.sect}</div>
                    <div className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
                      <span>{ELEMENT_INFO[hero.element].icon}</span>
                      <span>SPD: {hero.stats.spd}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Hero Inspector / Skill Breakdown (1 Col) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between backdrop-blur-md">
            {selectedHeroDetail ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${selectedHeroDetail.bgGradient} flex items-center justify-center shadow-xl border border-yellow-400/40 overflow-hidden`}>
                    {(() => {
                      const PixelComp = PIXEL_HEROES[selectedHeroDetail.id] || PIXEL_HEROES[selectedHeroDetail.id.replace('boss_', '')];
                      return PixelComp ? <PixelComp size={58} /> : <span className="text-4xl">{selectedHeroDetail.avatar}</span>;
                    })()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400 text-xs font-black">
                      {'★'.repeat(selectedHeroDetail.rarity)}
                    </div>
                    <h4 className="text-lg font-black text-white">{selectedHeroDetail.name}</h4>
                    <p className="text-xs text-amber-400 font-semibold">{selectedHeroDetail.title}</p>
                    <p className="text-[11px] text-slate-400">{selectedHeroDetail.sect}</p>
                  </div>
                </div>

                {/* Base Stats */}
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-slate-400">HP สูงสุด:</span> <span className="text-emerald-400 font-bold">{selectedHeroDetail.stats.maxHp}</span></div>
                  <div><span className="text-slate-400">พลังโจมตี (ATK):</span> <span className="text-amber-400 font-bold">{selectedHeroDetail.stats.atk}</span></div>
                  <div><span className="text-slate-400">พลังป้องกัน (DEF):</span> <span className="text-blue-400 font-bold">{selectedHeroDetail.stats.def}</span></div>
                  <div><span className="text-slate-400">สปีด ATB (SPD):</span> <span className="text-yellow-400 font-bold">{selectedHeroDetail.stats.spd}</span></div>
                  <div><span className="text-slate-400">โอกาสคริติคอล:</span> <span className="text-rose-400 font-bold">{Math.round(selectedHeroDetail.stats.critRate * 100)}%</span></div>
                  <div><span className="text-slate-400">ธาตุประจำกาย:</span> <span className="text-white font-bold">{ELEMENT_INFO[selectedHeroDetail.element].icon} {ELEMENT_INFO[selectedHeroDetail.element].name.split(' ')[0]}</span></div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <div className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    กระบวนท่าวรยุทธ์ (Martial Skills)
                  </div>
                  {selectedHeroDetail.skills.map((skill, idx) => (
                    <div key={skill.id} className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-bold text-white mb-0.5">
                        <span className="text-amber-300">
                          {idx === 0 ? '🥋 ท่า 1' : idx === 1 ? '⚔️ ท่า 2' : '💥 ไม้ตาย'}: {skill.nameTh}
                        </span>
                        <span className="text-[10px] text-cyan-400">
                          {skill.qiCost > 0 ? `ชี่ -${skill.qiCost}` : '+ชี่'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{skill.description}</p>
                      {skill.cooldown > 0 && (
                        <div className="text-[9px] text-slate-500 mt-1">คูลดาวน์: {skill.cooldown} เทิร์น</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Team Toggle Button */}
                <button
                  onClick={() => toggleTeamMember(selectedHeroDetail)}
                  className={`w-full py-2.5 rounded-xl font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all ${
                    team.some(h => h.id === selectedHeroDetail.id)
                      ? 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/60'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110'
                  }`}
                >
                  {team.some(h => h.id === selectedHeroDetail.id)
                    ? 'ปลดออกจากทัพ'
                    : 'บรรจุเข้าทัพออกศึก (Add to Team)'}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                เลือกยอดยุทธ์เพื่อดูรายละเอียด
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
