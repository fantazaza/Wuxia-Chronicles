import React, { useState, useEffect } from 'react';
import { Hero, Skill, DungeonStage } from './types/game';
import { ALL_HEROES_ROSTER, CAMPAIGN_STAGES } from './data/heroes';
import { calculateDamage, deepCloneHero } from './utils/battleEngine';
import { HeroCard } from './components/HeroCard';
import { SkillBar } from './components/SkillBar';
import { SummonModal } from './components/SummonModal';
import { LobbyScreen } from './components/LobbyScreen';
import { CampaignSelectScreen } from './components/CampaignSelectScreen';
import { Swords, Play, Pause, RotateCcw, ArrowLeft, Sparkles, Home, BookOpen, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  // Navigation View State: Starts at 'lobby' for team building!
  const [currentScreen, setCurrentScreen] = useState<'lobby' | 'campaign' | 'battle'>('lobby');

  // Player Inventory & Roster State
  const [collection, setCollection] = useState<Hero[]>(() => {
    return [
      deepCloneHero(ALL_HEROES_ROSTER.find(h => h.id === 'guo_jing')!),
      deepCloneHero(ALL_HEROES_ROSTER.find(h => h.id === 'linghu_chong')!),
      deepCloneHero(ALL_HEROES_ROSTER.find(h => h.id === 'xiaolongnv')!),
    ];
  });

  // Active Team Formation (Max 3)
  const [teamSelection, setTeamSelection] = useState<Hero[]>(() => {
    return [
      deepCloneHero(ALL_HEROES_ROSTER.find(h => h.id === 'guo_jing')!),
      deepCloneHero(ALL_HEROES_ROSTER.find(h => h.id === 'linghu_chong')!),
      deepCloneHero(ALL_HEROES_ROSTER.find(h => h.id === 'xiaolongnv')!),
    ];
  });

  // Battle Arena Instances
  const [team, setTeam] = useState<Hero[]>([]);
  const [enemies, setEnemies] = useState<Hero[]>([]);
  const [currentStage, setCurrentStage] = useState<DungeonStage>(CAMPAIGN_STAGES[0]);

  // Battle Flow & ATB State
  const [isBattleRunning, setIsBattleRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTurnHero, setActiveTurnHero] = useState<Hero | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // FX & Logs
  const [floatingTexts, setFloatingTexts] = useState<Record<string, { text: string; isCrit?: boolean; isHeal?: boolean } | null>>({});
  const [animatingSkills, setAnimatingSkills] = useState<Record<string, string | null>>({});
  const [combatLogs, setCombatLogs] = useState<string[]>([
    'ยินดีต้อนรับสู่ศึกยุทธภพกิมย้ง! วางแผนและเลือกใช้วิชายุทธ์เพื่อพิชิตศัตรู',
  ]);
  const [battleResult, setBattleResult] = useState<'victory' | 'defeat' | null>(null);

  // Currency & Modals
  const [gold, setGold] = useState(2000);
  const [summonScrolls, setSummonScrolls] = useState(5);
  const [isSummonOpen, setIsSummonOpen] = useState(false);

  // Initialize Battle when entering 'battle' screen
  const startBattle = (stage: DungeonStage) => {
    setCurrentStage(stage);
    const playerParty = teamSelection.map(h => deepCloneHero(h, false));
    const enemyParty = stage.enemies.map(e => deepCloneHero(e, true));

    setTeam(playerParty);
    setEnemies(enemyParty);
    setActiveTurnHero(null);
    setSelectedSkill(null);
    setBattleResult(null);
    setIsBattleRunning(true);
    setIsPaused(false);
    setCombatLogs([`ศึกปะทะเดือด ณ "${stage.name}"! เกจ ATB กำลังเริ่มเดิน...`]);
    setCurrentScreen('battle');
  };

  const addLog = (msg: string) => {
    setCombatLogs(prev => [msg, ...prev.slice(0, 20)]);
  };

  // Main ATB Real-Time Loop
  useEffect(() => {
    if (currentScreen !== 'battle' || !isBattleRunning || isPaused || activeTurnHero !== null || battleResult !== null) {
      return;
    }

    const interval = setInterval(() => {
      // Check Victory / Defeat conditions
      const allTeamDead = team.length > 0 && team.every(h => h.stats.hp <= 0);
      const allEnemiesDead = enemies.length > 0 && enemies.every(h => h.stats.hp <= 0);

      if (allEnemiesDead) {
        setBattleResult('victory');
        setIsBattleRunning(false);
        setGold(g => g + currentStage.rewards.gold);
        setSummonScrolls(s => s + (currentStage.rewards.summonScrolls || 0));
        addLog(`🎉 ชัยชนะ! ได้รับ ${currentStage.rewards.gold} ตำลึงทอง และป้ายเทียบเชิญ ${currentStage.rewards.summonScrolls || 0} ชิ้น!`);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        return;
      }

      if (allTeamDead) {
        setBattleResult('defeat');
        setIsBattleRunning(false);
        addLog('☠️ พ่ายแพ้! พลังยุทธยังไม่เพียงพอ โปรดฝึกฝนแล้วกลับมาท้าชิงใหม่');
        return;
      }

      // Tick ATB Speed Gauge for all alive characters
      let nextTurnCandidate: Hero | null = null;
      let highestAtb = 100;

      // Update Team ATB
      const updatedTeam = team.map(h => {
        if (h.stats.hp <= 0) return h;
        const speedBonus = h.buffs.find(b => b.type === 'buff_spd')?.value || 0;
        const effectiveSpeed = h.stats.spd * (1 + speedBonus / 100);
        const nextAtb = Math.min(100, h.currentAtb + (effectiveSpeed * 0.18));
        if (nextAtb >= 100 && nextAtb >= highestAtb) {
          nextTurnCandidate = { ...h, currentAtb: nextAtb };
          highestAtb = nextAtb;
        }
        return { ...h, currentAtb: nextAtb };
      });

      // Update Enemies ATB
      const updatedEnemies = enemies.map(e => {
        if (e.stats.hp <= 0) return e;
        const effectiveSpeed = e.stats.spd;
        const nextAtb = Math.min(100, e.currentAtb + (effectiveSpeed * 0.18));
        if (nextAtb >= 100 && nextAtb >= highestAtb) {
          nextTurnCandidate = { ...e, currentAtb: nextAtb };
          highestAtb = nextAtb;
        }
        return { ...e, currentAtb: nextAtb };
      });

      setTeam(updatedTeam);
      setEnemies(updatedEnemies);

      // Trigger Turn for the first hero to hit 100% ATB
      if (nextTurnCandidate) {
        setActiveTurnHero(nextTurnCandidate);
        if ((nextTurnCandidate as Hero).isEnemy) {
          executeEnemyTurn(nextTurnCandidate as Hero, updatedTeam);
        } else {
          setSelectedSkill((nextTurnCandidate as Hero).skills[0]);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentScreen, isBattleRunning, isPaused, activeTurnHero, battleResult, team, enemies]);

  // Enemy AI Action
  const executeEnemyTurn = (enemy: Hero, currentTeam: Hero[]) => {
    setTimeout(() => {
      const availableSkills = enemy.skills.filter(s => s.currentCooldown === 0 && enemy.stats.qi >= s.qiCost);
      const skillToUse = availableSkills[availableSkills.length - 1] || enemy.skills[0];

      const alivePlayers = currentTeam.filter(h => h.stats.hp > 0);
      if (alivePlayers.length === 0) return;
      const targetPlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];

      executeSkill(enemy, skillToUse, targetPlayer);
    }, 600);
  };

  // Perform Skill Execution (Core Action)
  const executeSkill = (caster: Hero, skill: Skill, target: Hero) => {
    const updatedSkills = caster.skills.map(s => {
      if (s.id === skill.id) {
        return { ...s, currentCooldown: s.cooldown };
      }
      return { ...s, currentCooldown: Math.max(0, s.currentCooldown - 1) };
    });

    setAnimatingSkills(prev => ({ ...prev, [caster.id]: skill.animation }));
    setTimeout(() => {
      setAnimatingSkills(prev => ({ ...prev, [caster.id]: null }));
    }, 600);

    if (skill.targetType === 'single_enemy' || skill.targetType === 'all_enemies') {
      const targets = skill.targetType === 'all_enemies'
        ? (caster.isEnemy ? team.filter(h => h.stats.hp > 0) : enemies.filter(h => h.stats.hp > 0))
        : [target];

      targets.forEach(tgt => {
        const result = calculateDamage(caster, tgt, skill);
        const newHp = Math.max(0, tgt.stats.hp - result.damage);

        setFloatingTexts(prev => ({
          ...prev,
          [tgt.id]: {
            text: `-${result.damage} ${result.isCrit ? '💥 CRIT!' : ''} ${result.isAdvantage ? '⚡ ชนะธาตุ!' : ''}`,
            isCrit: result.isCrit,
          },
        }));

        setTimeout(() => {
          setFloatingTexts(prev => ({ ...prev, [tgt.id]: null }));
        }, 900);

        if (tgt.isEnemy) {
          setEnemies(prev => prev.map(e => e.id === tgt.id ? { ...e, stats: { ...e.stats, hp: newHp } } : e));
        } else {
          setTeam(prev => prev.map(h => h.id === tgt.id ? { ...h, stats: { ...h.stats, hp: newHp } } : h));
        }

        addLog(`${caster.name.split(' ')[0]} ร่าย "${skill.nameTh}" ใส่ ${tgt.name.split(' ')[0]} ดาเมจ ${result.damage}!`);
      });
    } else if (skill.targetType === 'all_allies' || skill.targetType === 'single_ally' || skill.targetType === 'self') {
      const allies = skill.targetType === 'all_allies'
        ? (caster.isEnemy ? enemies.filter(e => e.stats.hp > 0) : team.filter(h => h.stats.hp > 0))
        : [target || caster];

      allies.forEach(ally => {
        if (skill.effect?.type === 'shield' || skill.effect?.type === 'buff_atk' || skill.effect?.type === 'buff_spd') {
          ally.buffs.push({
            id: `${skill.id}_buff`,
            name: skill.nameTh,
            type: skill.effect.type,
            duration: skill.effect.duration,
            value: skill.effect.value,
          });
          addLog(`${caster.name.split(' ')[0]} เพิ่มบัฟ "${skill.nameTh}" แก่ ${ally.name.split(' ')[0]}!`);
        } else if (skill.effect?.type === 'heal' || skill.effect?.type === 'cleanse') {
          const healAmount = Math.round(ally.stats.maxHp * ((skill.effect?.value || 30) / 100));
          const newHp = Math.min(ally.stats.maxHp, ally.stats.hp + healAmount);
          ally.stats.hp = newHp;
          if (skill.effect?.type === 'cleanse') ally.buffs = [];

          setFloatingTexts(prev => ({
            ...prev,
            [ally.id]: { text: `+${healAmount} HP`, isHeal: true },
          }));
          setTimeout(() => setFloatingTexts(prev => ({ ...prev, [ally.id]: null })), 800);
          addLog(`${caster.name.split(' ')[0]} ฟื้นฟู "${skill.nameTh}" ให้ ${ally.name.split(' ')[0]} +${healAmount} HP!`);
        }
      });
    }

    const newQi = Math.max(0, Math.min(caster.stats.maxQi, caster.stats.qi - skill.qiCost + (skill.qiCost === 0 ? 25 : 0)));

    if (caster.isEnemy) {
      setEnemies(prev => prev.map(e => e.id === caster.id ? {
        ...e,
        currentAtb: 0,
        stats: { ...e.stats, qi: newQi },
        skills: updatedSkills,
      } : e));
    } else {
      setTeam(prev => prev.map(h => h.id === caster.id ? {
        ...h,
        currentAtb: 0,
        stats: { ...h.stats, qi: newQi },
        skills: updatedSkills,
      } : h));
    }

    setActiveTurnHero(null);
    setSelectedSkill(null);
  };

  const handlePlayerAction = (target: Hero) => {
    if (!activeTurnHero || activeTurnHero.isEnemy || !selectedSkill) return;
    executeSkill(activeTurnHero, selectedSkill, target);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Header Navigation */}
      <header className="bg-slate-900/90 border-b border-amber-500/30 px-4 py-2.5 flex items-center justify-between shadow-xl backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('lobby')}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-2xl shadow-lg border border-yellow-300 hover:scale-105 transition-transform"
            title="กลับสู่หน้าแรก"
          >
            🐉
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-black text-amber-400 tracking-wide flex items-center gap-2">
              <span>มหายุทธภพกิมย้ง</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                ATB RPG
              </span>
            </h1>
            <p className="text-[10px] sm:text-[11px] text-slate-400">
              {currentScreen === 'lobby' ? 'หน้าหลักจัดทีม & เสริมพลังยอดยุทธ์' : currentScreen === 'campaign' ? 'เลือกด่านยุทธภพ' : 'สมรภูมิรบเรียลไทม์ ATB'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs & Currency */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentScreen('lobby')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                currentScreen === 'lobby' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" /> หน้าแรก (จัดทีม)
            </button>
            <button
              onClick={() => setCurrentScreen('campaign')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                currentScreen === 'campaign' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> ด่านยุทธภพ
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold">💰 {gold.toLocaleString()}</span>
            <span className="text-yellow-400 font-bold">📜 {summonScrolls}</span>
          </div>

          <button
            onClick={() => setIsSummonOpen(true)}
            className="px-3 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" /> กาชา
          </button>
        </div>
      </header>

      {/* Screen Render Routing */}
      {currentScreen === 'lobby' && (
        <LobbyScreen
          gold={gold}
          summonScrolls={summonScrolls}
          collection={collection}
          team={teamSelection}
          onSetTeam={setTeamSelection}
          onOpenSummon={() => setIsSummonOpen(true)}
          onGoToCampaign={() => setCurrentScreen('campaign')}
        />
      )}

      {currentScreen === 'campaign' && (
        <CampaignSelectScreen
          stages={CAMPAIGN_STAGES}
          currentStage={currentStage}
          onSelectStage={setCurrentStage}
          onStartBattle={() => startBattle(currentStage)}
          onBackToLobby={() => setCurrentScreen('lobby')}
        />
      )}

      {currentScreen === 'battle' && (
        <main className="flex-1 flex flex-col justify-between relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-3 sm:p-6 overflow-hidden">
          {/* Top Stage Bar Info & Speed Controls */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentScreen('campaign')}
                className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-bold border border-slate-700 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> ถอยทัพ
              </button>
              <div className="bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="text-amber-400 font-extrabold text-xs sm:text-sm">{currentStage.name}</span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">({currentStage.subtitle})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold border border-slate-700 flex items-center gap-1"
              >
                {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
                {isPaused ? 'เริ่มต่อ' : 'หยุดชั่วคราว'}
              </button>
              <button
                onClick={() => startBattle(currentStage)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold border border-slate-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> สู้ใหม่
              </button>
            </div>
          </div>

          {/* Battle Arena Battlefield */}
          <div className="flex-1 flex flex-col justify-center items-center gap-6 my-auto">
            {/* Enemy Party (Top) */}
            <div className="flex flex-col items-center">
              <div className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <span>⚔️ ศัตรูฝ่ายตรงข้าม</span>
              </div>
              <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
                {enemies.map(enemy => (
                  <HeroCard
                    key={enemy.id}
                    hero={enemy}
                    isTargetable={activeTurnHero !== null && !activeTurnHero.isEnemy}
                    isActiveTurn={activeTurnHero?.id === enemy.id}
                    onClick={() => handlePlayerAction(enemy)}
                    floatingText={floatingTexts[enemy.id]}
                    animatingSkill={animatingSkills[enemy.id]}
                  />
                ))}
              </div>
            </div>

            {/* VS Divider */}
            <div className="flex items-center gap-4 text-xs font-black text-amber-500/70 uppercase tracking-widest">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-600" />
              <span>⚡ ปะทะวิชายุทธ์เรียลไทม์ ATB ⚡</span>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-600" />
            </div>

            {/* Player Team (Bottom) */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
                {team.map(hero => (
                  <HeroCard
                    key={hero.id}
                    hero={hero}
                    isTargetable={selectedSkill?.targetType === 'single_ally'}
                    isActiveTurn={activeTurnHero?.id === hero.id}
                    onClick={() => handlePlayerAction(hero)}
                    floatingText={floatingTexts[hero.id]}
                    animatingSkill={animatingSkills[hero.id]}
                  />
                ))}
              </div>
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mt-2">
                🛡️ ฝ่ายจอมยุทธของคุณ (แตะที่ศัตรูด้านบนเพื่อออกท่า)
              </div>
            </div>
          </div>

          {/* Combat Log (Clean marquee/box) */}
          <div className="w-full max-w-xl mx-auto my-2 bg-slate-950/80 border border-slate-800/80 rounded-xl p-2 text-[11px] max-h-16 overflow-y-auto shadow-inner">
            {combatLogs.map((log, i) => (
              <div key={i} className={`truncate ${i === 0 ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>
                • {log}
              </div>
            ))}
          </div>

          {/* Victory / Defeat Modal Alert */}
          {battleResult && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
              <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl p-6 text-center max-w-md shadow-2xl">
                {battleResult === 'victory' ? (
                  <>
                    <div className="text-6xl mb-2">🏆</div>
                    <h2 className="text-2xl font-black text-amber-400 mb-1">ชัยชนะสะท้านยุทธภพ!</h2>
                    <p className="text-slate-300 text-xs mb-4">
                      คุณกำราบศัตรูสำเร็จ ได้รับชื่อเสียงและของรางวัลล้ำค่า
                    </p>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-amber-300 font-bold mb-4 flex justify-around">
                      <span>💰 +{currentStage.rewards.gold} ตำลึง</span>
                      <span>📜 +{currentStage.rewards.summonScrolls || 0} ป้ายเทียบเชิญ</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setCurrentScreen('lobby')}
                        className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600"
                      >
                        กลับหน้าหลัก
                      </button>
                      <button
                        onClick={() => startBattle(currentStage)}
                        className="px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110"
                      >
                        สู้ใหม่อีกครั้ง
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-2">💀</div>
                    <h2 className="text-2xl font-black text-rose-500 mb-1">พ่ายแพ้ในศึกยุทธภพ!</h2>
                    <p className="text-slate-300 text-xs mb-4">
                      จอมยุทธพักฟื้นกำลัง จัดทัพใหม่แล้วกลับมาประลองอีกครั้ง
                    </p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setCurrentScreen('lobby')}
                        className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600"
                      >
                        กลับหน้าหลัก (จัดทีม)
                      </button>
                      <button
                        onClick={() => startBattle(currentStage)}
                        className="px-5 py-2.5 rounded-xl font-black text-xs bg-rose-600 hover:bg-rose-500 text-white"
                      >
                        ลองใหม่อีกครั้ง
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Bottom Skill Bar (Active during player's turn) */}
          {activeTurnHero && !activeTurnHero.isEnemy ? (
            <SkillBar
              hero={activeTurnHero}
              selectedSkill={selectedSkill}
              onSelectSkill={skill => setSelectedSkill(skill)}
              disabled={false}
            />
          ) : (
            <div className="w-full bg-slate-900/60 border-t border-slate-800/80 p-3 text-center text-xs text-amber-200/80 backdrop-blur-md rounded-t-xl">
              ⏳ กำลังเดินลมปราณ ATB ความเร็วแบบเรียลไทม์...
            </div>
          )}
        </main>
      )}

      {/* Summon / Gacha Modal */}
      <SummonModal
        isOpen={isSummonOpen}
        onClose={() => setIsSummonOpen(false)}
        scrolls={summonScrolls}
        onSummonHero={newHero => setCollection(prev => [...prev, newHero])}
        onDeductScroll={() => setSummonScrolls(s => Math.max(0, s - 1))}
      />
    </div>
  );
}

export default App;
