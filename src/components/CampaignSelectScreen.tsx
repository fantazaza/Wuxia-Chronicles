import React from 'react';
import { DungeonStage } from '../types/game';
import { ELEMENT_INFO } from '../data/heroes';
import { BookOpen, Swords, ArrowLeft, Trophy, Shield, Skull } from 'lucide-react';
import { PIXEL_HEROES } from './PixelHeroes';

interface CampaignSelectScreenProps {
  stages: DungeonStage[];
  currentStage: DungeonStage;
  onSelectStage: (stage: DungeonStage) => void;
  onStartBattle: () => void;
  onBackToLobby: () => void;
}

export const CampaignSelectScreen: React.FC<CampaignSelectScreenProps> = ({
  stages,
  currentStage,
  onSelectStage,
  onStartBattle,
  onBackToLobby,
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToLobby}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs sm:text-sm font-bold text-slate-300 border border-slate-700 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าแรก (Lobby)
          </button>
          <div className="text-right">
            <h2 className="text-xl sm:text-2xl font-black text-amber-400 flex items-center justify-end gap-2">
              <BookOpen className="w-5 h-5" /> ด่านยุทธภพกิมย้ง (Story Chapters)
            </h2>
            <p className="text-xs text-slate-400">เลือกสมรภูมิรบเพื่อท้าประลองยอดฝีมือ</p>
          </div>
        </div>

        {/* Stage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {stages.map(stage => {
            const isSelected = currentStage.id === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => onSelectStage(stage)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between backdrop-blur-md relative overflow-hidden group shadow-xl ${
                  isSelected
                    ? 'border-yellow-400 bg-amber-950/40 shadow-yellow-500/20 scale-102'
                    : 'border-slate-800 bg-slate-900/80 hover:border-amber-600/60 hover:bg-slate-800/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-900/60 border border-amber-700/50">
                      บทที่ {stage.chapter} - ด่าน {stage.stageNum}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Skull className="w-3.5 h-3.5 text-red-400" /> {stage.enemies.length} ยอดยุทธ์
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-amber-200/80 font-medium mb-3">{stage.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{stage.description}</p>
                </div>

                {/* Enemies Preview */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-[11px] text-slate-400 font-bold">ศัตรูประจำด่าน:</div>
                  <div className="flex items-center gap-2">
                    {stage.enemies.map((enemy, idx) => {
                      const PixelComp = PIXEL_HEROES[enemy.id] || PIXEL_HEROES[enemy.id.replace('boss_', '')];
                      return (
                        <div
                          key={idx}
                          className={`w-10 h-10 rounded-xl bg-gradient-to-b ${enemy.bgGradient} flex items-center justify-center shadow-md border border-slate-700 overflow-hidden`}
                          title={enemy.name}
                        >
                          {PixelComp ? <PixelComp size={34} /> : <span className="text-xl">{enemy.avatar}</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-amber-300 font-bold mt-2">
                    <span>💰 {stage.rewards.gold} ตำลึง</span>
                    <span>📜 ป้ายเทียบเชิญ +{stage.rewards.summonScrolls}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail & Enter Battle Button */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900/90 to-amber-950/60 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">ด่านที่เลือกไว้:</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">{currentStage.name}</h3>
            <p className="text-xs text-slate-300">{currentStage.subtitle} — {currentStage.description}</p>
          </div>

          <button
            onClick={onStartBattle}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white hover:brightness-110 shadow-lg shadow-rose-600/40 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 animate-pulse"
          >
            <Swords className="w-5 h-5" />
            <span>เข้าสู่สมรภูมิรบ (Start Battle)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
