// ═══════════════════════════════════════════════════════
// จอมยุทธกิมย้ง — Jin Yong ATB War
// Demo System & Practice Dummy Arena
// ═══════════════════════════════════════════════════════

// ─── HEROES DATA (Accurate to CHARACTERS_50.md) ───
export const HEROES_DATA = {
  guo_jing: {
    id: 'guo_jing',
    name: 'ก๊วยเจ๋ง',
    title: 'มังกรหยก / พรรคกระยาจก',
    element: 'earth',
    portrait: '/assets/guo_jing.jpg',
    role: 'แทงก์ / ป้องกัน & ควบคุม',
    baseStats: {
      hp: 1320,
      atk: 115,
      def: 130,
      spd: 95,
      crit: 0.05,
      cdmg: 1.30,
      acc: 0.05,
      res: 0.15,
      qi: 30,
      maxQi: 100
    },
    passive: {
      name: 'คัมภีร์เก้าอิมคุ้มกาย',
      desc: 'เมื่อได้รับดาเมจเกิน 35% ของ Max HP ในครั้งเดียว กาง Shield 15% ของ Max HP นาน 2 เทิร์น'
    },
    moves: [
      {
        id: 'guo_1',
        name: 'ฝ่ามือสยบมังกร',
        type: 'basic',
        targetType: 'enemy',
        target: 'single',
        qiCost: 0,
        cd: 0,
        icon: '/assets/skills/guo_skill1.png',
        desc: 'ตีเดี่ยวตาม ATK+DEF มีโอกาส 30% ติด Attack Break (ลด ATK 30%) 2 เทิร์น',
        execute: (user, target, team, enemies) => {
          const rawDmg = (user.atk * 1.1) + (user.def * 0.8);
          const isCrit = Math.random() < user.crit;
          const dmg = calculateDamage(rawDmg, target.def, isCrit ? user.cdmg : 1);
          applyDamage(target, dmg, isCrit, user);
          if (Math.random() < 0.30) {
            addStatus(target, 'atk_break', 2, 'Attack Break (ลด ATK 30%)');
          }
          user.qi = Math.min(user.maxQi, user.qi + 10);
        }
      },
      {
        id: 'guo_2',
        name: 'คชสารศิลาคำราม',
        type: 'skill',
        targetType: 'ally',
        target: 'single_ally',
        qiCost: 25,
        cd: 3,
        icon: '/assets/skills/guo_skill2.png',
        desc: 'บัฟพลังป้องกัน: มอบ DEF Up 30% และ Shield ปราณศิลาคุ้มกาย 600 หน่วย แก่เพื่อนหรือตนเอง 2 เทิร์น',
        execute: (user, target, team, enemies) => {
          const allyTarget = target || user;
          addStatus(allyTarget, 'def_up', 2, 'Def Up (เพิ่ม DEF 30%)');
          allyTarget.shield = (allyTarget.shield || 0) + 600;
          addStatus(allyTarget, 'shield', 2, 'Shield (600)');
          addFloatingText(allyTarget, '🛡️ DEF UP & SHIELD', 'buff');
          logCombat(`${user.name} ร่าย [คชสารศิลาคำราม] มอบเกราะศิลาคุ้มกายให้แก่ ${allyTarget.name}!`, 'buff');
        }
      },
      {
        id: 'guo_3',
        name: 'มังกรสะบัดหาง',
        type: 'aoe',
        targetType: 'enemy',
        target: 'all_enemies',
        qiCost: 35,
        cd: 4,
        icon: '/assets/skills/guo_skill3.png',
        desc: 'โจมตีหมู่ตาม DEF มีโอกาส 40% ลดเกจ ATB ศัตรูลง 20%',
        execute: (user, target, team, enemies) => {
          enemies.forEach(tgt => {
            if (tgt.isDead) return;
            const rawDmg = user.def * 1.6;
            const isCrit = Math.random() < user.crit;
            const dmg = calculateDamage(rawDmg, tgt.def, isCrit ? user.cdmg : 1);
            applyDamage(tgt, dmg, isCrit, user);
            if (Math.random() < 0.40) {
              tgt.atb = Math.max(0, tgt.atb - 20);
              addFloatingText(tgt, '-20% ATB', 'debuff');
            }
          });
        }
      },
      {
        id: 'guo_4',
        name: '18 ฝ่ามือพิชิตมังกร',
        type: 'ultimate',
        targetType: 'enemy',
        target: 'all_enemies',
        qiCost: 50,
        cd: 5,
        icon: '/assets/skills/guo_skill4.png',
        desc: 'โจมตีหมู่ตาม DEF + Max HP รุนแรง โอกาส 55% ติด Stun (มึนงง) 1 เทิร์น',
        execute: (user, target, team, enemies) => {
          triggerScreenShake();
          enemies.forEach(tgt => {
            if (tgt.isDead) return;
            const rawDmg = (user.def * 2.0) + (user.maxHp * 0.15);
            const isCrit = Math.random() < (user.crit + 0.1);
            const dmg = calculateDamage(rawDmg, tgt.def, isCrit ? user.cdmg : 1);
            applyDamage(tgt, dmg, isCrit, user);
            if (Math.random() < 0.55) {
              addStatus(tgt, 'stun', 1, 'Stun (มึนงง)');
              addFloatingText(tgt, 'STUN!', 'stun');
            }
          });
        }
      }
    ]
  },

  huang_rong: {
    id: 'huang_rong',
    name: 'อึ้งย้ง',
    title: 'มังกรหยก / เกาะดอกท้อ',
    element: 'water',
    portrait: '/assets/huang_rong.jpg',
    role: 'ซัพพอร์ต / บัฟทีม & คุมจังหวะ ATB',
    baseStats: {
      hp: 1050,
      atk: 110,
      def: 98,
      spd: 108,
      crit: 0.05,
      cdmg: 1.30,
      acc: 0.15,
      res: 0.10,
      qi: 30,
      maxQi: 100
    },
    passive: {
      name: 'ยอดปัญญารู้ทัน',
      desc: 'ศัตรูที่ติดดีบัฟจะสร้างความเสียหายต่ออึ้งย้งลดลง 15% และเพิ่มค่า ACC ให้ตนเอง 15%'
    },
    moves: [
      {
        id: 'huang_1',
        name: 'ไม้เท้าตีสุนัข (เคาะแข้ง)',
        type: 'basic',
        targetType: 'enemy',
        target: 'single',
        qiCost: 0,
        cd: 0,
        icon: '/assets/skills/huang_skill1.png',
        desc: 'ตีเดี่ยวตาม ATK+SPD โอกาส 30% ลดเกจ ATB ศัตรูลง 15%',
        execute: (user, target, team, enemies) => {
          const rawDmg = (user.atk * 1.0) + (user.spd * 0.7);
          const isCrit = Math.random() < user.crit;
          const dmg = calculateDamage(rawDmg, target.def, isCrit ? user.cdmg : 1);
          applyDamage(target, dmg, isCrit, user);
          if (Math.random() < 0.35) {
            target.atb = Math.max(0, target.atb - 15);
            addFloatingText(target, '-15% ATB', 'debuff');
          }
          user.qi = Math.min(user.maxQi, user.qi + 10);
        }
      },
      {
        id: 'huang_2',
        name: 'ไม้เท้าตีสุนัข (แยงรังแตน)',
        type: 'aoe',
        targetType: 'enemy',
        target: 'all_enemies',
        qiCost: 30,
        cd: 3,
        icon: '/assets/skills/huang_skill2.png',
        desc: 'โจมตีหมู่ โอกาส 45% ติด Attack Break หรือ Speed Down 2 เทิร์น',
        execute: (user, target, team, enemies) => {
          enemies.forEach(tgt => {
            if (tgt.isDead) return;
            const rawDmg = user.atk * 1.25;
            const isCrit = Math.random() < user.crit;
            const dmg = calculateDamage(rawDmg, tgt.def, isCrit ? user.cdmg : 1);
            applyDamage(tgt, dmg, isCrit, user);
            if (Math.random() < 0.45) {
              const debuff = Math.random() < 0.5 ? 'atk_break' : 'spd_down';
              addStatus(tgt, debuff, 2, debuff === 'atk_break' ? 'Attack Break' : 'Speed Down');
            }
          });
        }
      },
      {
        id: 'huang_3',
        name: 'ค่ายกลศิลาคัดแปดทิศ',
        type: 'aoe',
        targetType: 'enemy',
        target: 'all_enemies',
        qiCost: 35,
        cd: 4,
        icon: '/assets/skills/huang_skill3.png',
        desc: 'ลดเกจ ATB ศัตรูทั้งหมด 15-25% สุ่มลดจังหวะ',
        execute: (user, target, team, enemies) => {
          enemies.forEach(tgt => {
            if (tgt.isDead) return;
            const reduceAmount = Math.floor(Math.random() * 11) + 15; // 15-25%
            tgt.atb = Math.max(0, tgt.atb - reduceAmount);
            addFloatingText(tgt, `-${reduceAmount}% ATB`, 'debuff');
          });
          logCombat(`${user.name} ร่ายค่ายกลศิลาคัดแปดทิศ สลายจังหวะ ATB ศัตรูทั้งหมด!`, 'buff');
        }
      },
      {
        id: 'huang_4',
        name: 'กลยุทธ์ยอดปัญญาขงเบ้งหญิง',
        type: 'ultimate',
        targetType: 'ally',
        target: 'all_allies',
        qiCost: 50,
        cd: 5,
        icon: '/assets/skills/huang_skill4.png',
        desc: 'บัฟทัพสวรรค์: มอบ ATK Up + Speed Up 2 เทิร์น และเร่งเกจ ATB ทีม 20%',
        execute: (user, target, team, enemies) => {
          team.forEach(ally => {
            if (ally.isDead) return;
            addStatus(ally, 'atk_up', 2, 'ATK Up (เพิ่มพลังโจมตี 30%)');
            addStatus(ally, 'spd_up', 2, 'Speed Up (เพิ่มความเร็ว 30%)');
            ally.atb = Math.min(100, ally.atb + 20);
            addFloatingText(ally, '⚔️ ATK & ⚡ SPD UP', 'buff');
          });
          logCombat(`${user.name} ใช้ [กลยุทธ์ยอดปัญญาขงเบ้งหญิง] เร่งทัพทั้งทีม!`, 'system');
        }
      }
    ]
  },

  dongfang_bubai: {
    id: 'dongfang_bubai',
    name: 'ตงฟางปุ๊ป้าย',
    title: 'กระบี่เย้ยยุทธจักร / ตะวันจันทรา',
    element: 'wind',
    portrait: '/assets/dongfang_bubai.jpg',
    role: 'สปีดแดเมจ / ปลิดชีพ & ดีบัฟ',
    baseStats: {
      hp: 950,
      atk: 146,
      def: 85,
      spd: 115,
      crit: 0.12,
      cdmg: 1.30,
      acc: 0.10,
      res: 0.05,
      qi: 25,
      maxQi: 100
    },
    passive: {
      name: 'ว่องไวดุจภูติพราย',
      desc: 'ค่า SPD เพิ่มขึ้น 1 หน่วยต่อทุกๆ 2% ของ HP ที่ลดลง'
    },
    moves: [
      {
        id: 'dongfang_1',
        name: 'เข็มปักไหมฟ้าระดมแทง',
        type: 'basic',
        targetType: 'enemy',
        target: 'single',
        qiCost: 0,
        cd: 0,
        icon: '/assets/skills/dongfang_skill1.png',
        desc: 'แทงเดี่ยว 2 ฮิตตาม SPD โอกาส 25% ต่อฮิตติด Heal Block (ห้ามฮีล) 1 เทิร์น',
        execute: (user, target, team, enemies) => {
          for (let hit = 1; hit <= 2; hit++) {
            const rawDmg = (user.atk * 0.75) + (user.spd * 0.55);
            const isCrit = Math.random() < user.crit;
            const dmg = calculateDamage(rawDmg, target.def, isCrit ? user.cdmg : 1);
            applyDamage(target, dmg, isCrit, user);
            if (Math.random() < 0.25) {
              addStatus(target, 'heal_block', 1, 'Heal Block (ห้ามฮีล)');
            }
          }
          user.qi = Math.min(user.maxQi, user.qi + 10);
        }
      },
      {
        id: 'dongfang_2',
        name: 'ทานตะวันร่างแยกล่องหน',
        type: 'skill',
        targetType: 'ally',
        target: 'single_ally',
        qiCost: 20,
        cd: 3,
        icon: '/assets/skills/dongfang_skill2.png',
        desc: 'บัฟเงาพราย: มอบ Speed Up 2 เทิร์น และเร่งเกจ ATB 25% ให้เพื่อนหรือตนเอง',
        execute: (user, target, team, enemies) => {
          const allyTarget = target || user;
          addStatus(allyTarget, 'spd_up', 2, 'Speed Up');
          allyTarget.atb = Math.min(100, allyTarget.atb + 25);
          addFloatingText(allyTarget, '⚡ SPD UP & +25% ATB', 'buff');
          logCombat(`${user.name} ร่าย [ทานตะวันแยกร่าง] เร่งความเร็วให้แก่ ${allyTarget.name}!`, 'buff');
        }
      },
      {
        id: 'dongfang_3',
        name: 'ไหมฟ้าสังหารร้อยทิศ',
        type: 'aoe',
        targetType: 'enemy',
        target: 'all_enemies',
        qiCost: 35,
        cd: 4,
        icon: '/assets/skills/dongfang_skill3.png',
        desc: 'โจมตีหมู่ตาม SPD โอกาส 45% Strip บัฟ 1 อย่าง และลด Speed 2 เทิร์น',
        execute: (user, target, team, enemies) => {
          enemies.forEach(tgt => {
            if (tgt.isDead) return;
            const rawDmg = (user.atk * 1.1) + (user.spd * 0.8);
            const isCrit = Math.random() < user.crit;
            const dmg = calculateDamage(rawDmg, tgt.def, isCrit ? user.cdmg : 1);
            applyDamage(tgt, dmg, isCrit, user);
            if (Math.random() < 0.45) {
              stripBuff(tgt);
              addStatus(tgt, 'spd_down', 2, 'Speed Down');
            }
          });
        }
      },
      {
        id: 'dongfang_4',
        name: 'ทานตะวันสะบัดชีพจรปลิดวิญญาณ',
        type: 'ultimate',
        targetType: 'enemy',
        target: 'single',
        qiCost: 45,
        cd: 4,
        icon: '/assets/skills/dongfang_skill4.png',
        desc: 'แทงเดี่ยวความเร็วสูงตาม SPD เจาะเกราะ 40% หากสังหารได้ลดคูลดาวน์ท่านี้ 2 เทิร์น',
        execute: (user, target, team, enemies) => {
          triggerScreenShake();
          const effectiveDef = target.def * 0.6; // 40% Ignore DEF
          const rawDmg = (user.atk * 2.3) + (user.spd * 1.8);
          const isCrit = Math.random() < (user.crit + 0.15);
          const dmg = calculateDamage(rawDmg, effectiveDef, isCrit ? user.cdmg : 1);
          const killed = applyDamage(target, dmg, isCrit, user);
          if (killed) {
            const move = user.moves.find(m => m.id === 'dongfang_4');
            if (move && move.currentCd) move.currentCd = Math.max(0, move.currentCd - 2);
            logCombat(`${user.name} ปลิดชีพเป้าหมาย! ลดคูลดาวน์ท่าไม้ตายลง 2 เทิร์น!`, 'system');
          }
        }
      }
    ]
  }
};

// ─── GAME STATE ───
export const state = {
  currentScreen: 'lobby',
  resources: {
    gold: 5000,
    fragments: 35
  },
  // Active selected team for battle / trial:
  selectedTeam: ['guo_jing', 'huang_rong', 'dongfang_bubai'],
  
  // Dummy trial configuration:
  trialConfig: {
    dummyCount: 1, // 1 or 3
    dummyType: 'immortal', // 'immortal', 'standard', 'armored'
    dummyAction: 'pass' // 'pass' or 'counter'
  },

  // Active Battle State:
  battle: {
    active: false,
    isTrial: false,
    speed: 1, // 1x or 2x
    isPaused: false,
    allies: [],
    enemies: [],
    activeUnit: null,
    selectedMoveIndex: null,
    selectedTargetIndex: null,
    totalDamageDealt: 0,
    maxCriticalHit: 0,
    totalTurns: 0,
    timer: null,
    lastTick: performance.now()
  }
};

// ─── INITIALIZATION ───
function initGame() {
  setupNavigation();
  setupLobbyScreen();
  setupTrialScreen();
  setupBattleSandboxEvents();
  renderLobby();
  renderTrialSetup();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}

// ─── SCREEN NAVIGATION ───
function setupNavigation() {
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetScreen = btn.getAttribute('data-goto');
      switchScreen(targetScreen);
    });
  });

  // Flee / Leave battle button
  const btnFlee = document.getElementById('btn-flee');
  if (btnFlee) {
    btnFlee.addEventListener('click', () => {
      endBattle();
      switchScreen('trial');
    });
  }

  // Result continue button
  const btnResultContinue = document.getElementById('btn-result-continue');
  if (btnResultContinue) {
    btnResultContinue.addEventListener('click', () => {
      document.getElementById('battle-result').classList.add('hidden');
      endBattle();
      switchScreen('trial');
    });
  }

  // Dismiss rotate device prompt
  const btnDismissRotate = document.getElementById('btn-dismiss-rotate');
  if (btnDismissRotate) {
    btnDismissRotate.addEventListener('click', () => {
      const promptEl = document.getElementById('rotate-device-prompt');
      if (promptEl) promptEl.style.display = 'none';
    });
  }
}

export function switchScreen(screenName) {
  state.currentScreen = screenName;
  document.querySelectorAll('.screen').forEach(scr => scr.classList.remove('active'));
  const target = document.getElementById(`screen-${screenName}`);
  if (target) {
    target.classList.add('active');
  }

  if (screenName === 'lobby') {
    renderLobby();
  } else if (screenName === 'trial') {
    renderTrialSetup();
  }
}

// ─── LOBBY SCREEN LOGIC ───
function setupLobbyScreen() {
  const goldEl = document.getElementById('lobby-gold');
  const fragEl = document.getElementById('lobby-fragments');
  if (goldEl) goldEl.textContent = state.resources.gold.toLocaleString();
  if (fragEl) fragEl.textContent = state.resources.fragments.toLocaleString();

  // Team slots click
  const teamSlots = document.querySelectorAll('#team-slots .team-slot');
  teamSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      switchScreen('trial');
    });
  });
}

function renderLobby() {
  // Update team display in lobby (Summoners War Island Pedestals)
  const slotsContainer = document.getElementById('team-slots');
  if (!slotsContainer) return;

  slotsContainer.innerHTML = '';
  state.selectedTeam.forEach((heroId, index) => {
    const hero = HEROES_DATA[heroId];
    const slot = document.createElement('div');

    if (hero) {
      slot.className = 'sw-pedestal team-slot filled';
      slot.innerHTML = `
        <img src="${hero.portrait}" class="slot-portrait" alt="${hero.name}" />
        <span class="slot-name">${hero.name}</span>
        <span class="char-elem-badge ${hero.element}">${hero.element.toUpperCase()}</span>
      `;
    } else {
      slot.className = 'sw-pedestal team-slot empty';
      slot.innerHTML = `
        <span class="slot-label" style="color:#718093; font-size:12px;">+ เลือกจอมยุทธ<br>ตำแหน่ง ${index + 1}</span>
      `;
    }
    slot.addEventListener('click', () => switchScreen('trial'));
    slotsContainer.appendChild(slot);
  });

  // Render Roster in Lobby (Summoners War Monster Grid)
  const rosterGrid = document.getElementById('character-roster');
  if (rosterGrid) {
    rosterGrid.innerHTML = '';
    Object.values(HEROES_DATA).forEach(hero => {
      const card = document.createElement('div');
      card.className = 'roster-card';
      card.innerHTML = `
        <img src="${hero.portrait}" class="card-portrait" alt="${hero.name}" />
        <div style="font-weight: 800; font-size: 11px; color:#f5f6fa;">${hero.name}</div>
        <div style="font-size: 9px; color: #a4b0be;">${hero.role}</div>
      `;
      card.addEventListener('click', () => showCharacterDetail(hero));
      rosterGrid.appendChild(card);
    });
  }
}

// ─── TRIAL / TRAINING GROUND SETUP ───
function setupTrialScreen() {
  // Quick fill team
  const btnQuickFill = document.getElementById('btn-quick-fill-team');
  if (btnQuickFill) {
    btnQuickFill.addEventListener('click', () => {
      state.selectedTeam = ['guo_jing', 'huang_rong', 'dongfang_bubai'];
      renderTrialSetup();
    });
  }

  // Dummy Count options
  document.querySelectorAll('#opt-dummy-count .cfg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#opt-dummy-count .cfg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.trialConfig.dummyCount = parseInt(btn.getAttribute('data-count'), 10);
    });
  });

  // Dummy Type options
  document.querySelectorAll('#opt-dummy-type .cfg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#opt-dummy-type .cfg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.trialConfig.dummyType = btn.getAttribute('data-type');
    });
  });

  // Dummy Action options
  document.querySelectorAll('#opt-dummy-action .cfg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#opt-dummy-action .cfg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.trialConfig.dummyAction = btn.getAttribute('data-action');
    });
  });

  // Start trial button
  const btnStartTrial = document.getElementById('btn-start-trial');
  if (btnStartTrial) {
    btnStartTrial.addEventListener('click', () => {
      startTrialBattle();
    });
  }
}

function renderTrialSetup() {
  // Render trial team slots
  const slotsContainer = document.getElementById('trial-team-slots');
  if (!slotsContainer) return;
  slotsContainer.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const heroId = state.selectedTeam[i];
    const hero = HEROES_DATA[heroId];
    const slot = document.createElement('div');
    slot.className = `trial-slot ${hero ? 'filled' : 'empty'}`;

    if (hero) {
      slot.innerHTML = `
        <span class="trial-slot-title">ตำแหน่ง ${i + 1}</span>
        <img src="${hero.portrait}" class="trial-hero-thumb" alt="${hero.name}" />
        <span class="trial-hero-name">${hero.name}</span>
        <span class="char-elem-badge ${hero.element}">${hero.element.toUpperCase()}</span>
      `;
    } else {
      slot.innerHTML = `
        <span class="trial-slot-title">ตำแหน่ง ${i + 1}</span>
        <div class="slot-content">แตะตัวละครด้านล่าง</div>
      `;
    }

    slot.addEventListener('click', () => {
      // Toggle or remove from slot
      if (state.selectedTeam[i]) {
        state.selectedTeam[i] = null;
        renderTrialSetup();
      }
    });

    slotsContainer.appendChild(slot);
  }

  // Render hero selection roster in trial
  const rosterContainer = document.getElementById('trial-roster-list');
  if (!rosterContainer) return;
  rosterContainer.innerHTML = '';

  Object.values(HEROES_DATA).forEach(hero => {
    const isSelected = state.selectedTeam.includes(hero.id);
    const card = document.createElement('div');
    card.className = `trial-char-card ${isSelected ? 'selected' : ''}`;
    card.innerHTML = `
      <img src="${hero.portrait}" class="trial-char-img" alt="${hero.name}" />
      <div class="trial-char-name">${hero.name}</div>
      <div class="trial-char-role">${hero.role}</div>
      <div class="char-elem-badge ${hero.element}" style="margin-top: 4px; display: inline-block;">${hero.element.toUpperCase()}</div>
      ${isSelected ? '<div style="color: var(--gold-bright); font-size: 9px; font-weight: bold; margin-top: 2px;">✓ อยู่ในทีม</div>' : ''}
    `;

    card.addEventListener('click', () => {
      if (isSelected) {
        // Remove from team
        const idx = state.selectedTeam.indexOf(hero.id);
        if (idx !== -1) state.selectedTeam[idx] = null;
      } else {
        // Place in first empty slot
        const emptyIdx = state.selectedTeam.findIndex(s => !s);
        if (emptyIdx !== -1) {
          state.selectedTeam[emptyIdx] = hero.id;
        } else {
          // Replace slot 0 if all filled
          state.selectedTeam[0] = hero.id;
        }
      }
      renderTrialSetup();
    });

    rosterContainer.appendChild(card);
  });
}

// ─── BATTLE / TRIAL ARENA SYSTEM ───
export function startTrialBattle() {
  const activeHeroIds = state.selectedTeam.filter(Boolean);
  if (activeHeroIds.length === 0) {
    alert('กรุณาเลือกจอมยุทธอย่างน้อย 1 คนลงทีม!');
    return;
  }

  state.battle.active = true;
  state.battle.isTrial = true;
  state.battle.totalDamageDealt = 0;
  state.battle.maxCriticalHit = 0;
  state.battle.totalTurns = 0;
  state.battle.isPaused = false;
  state.battle.activeUnit = null;
  state.battle.selectedMoveIndex = null;
  state.battle.selectedTargetIndex = null;

  // Build allies
  state.battle.allies = activeHeroIds.map((heroId, index) => {
    const hero = HEROES_DATA[heroId];
    return {
      instanceId: `ally_${index}`,
      id: hero.id,
      name: hero.name,
      element: hero.element,
      portrait: hero.portrait,
      side: 'player',
      maxHp: hero.baseStats.hp,
      hp: hero.baseStats.hp,
      atk: hero.baseStats.atk,
      def: hero.baseStats.def,
      spd: hero.baseStats.spd,
      crit: hero.baseStats.crit,
      cdmg: hero.baseStats.cdmg,
      acc: hero.baseStats.acc,
      res: hero.baseStats.res,
      qi: hero.baseStats.qi,
      maxQi: hero.baseStats.maxQi,
      atb: Math.floor(Math.random() * 20), // slight stagger
      statuses: [],
      moves: hero.moves.map(m => ({ ...m, currentCd: 0 })),
      passive: hero.passive,
      isDead: false,
      shield: 0
    };
  });

  // Build Dummy target(s)
  const dummyCount = state.trialConfig.dummyCount;
  const dummyType = state.trialConfig.dummyType;
  const dummyAction = state.trialConfig.dummyAction;

  let dummyHp = 15000;
  let dummyDef = 100;
  if (dummyType === 'immortal') {
    dummyHp = 999999;
    dummyDef = 100;
  } else if (dummyType === 'armored') {
    dummyHp = 20000;
    dummyDef = 250;
  }

  state.battle.enemies = [];
  for (let i = 0; i < dummyCount; i++) {
    const titleSuffix = dummyCount > 1 ? ` #${i + 1}` : '';
    state.battle.enemies.push({
      instanceId: `dummy_${i}`,
      id: 'training_dummy',
      name: `หุ่นไม้ซ้อมยุทธ์${titleSuffix}`,
      element: 'earth',
      portrait: '/assets/dummy.png?v=2',
      side: 'enemy',
      maxHp: dummyHp,
      hp: dummyHp,
      atk: 50,
      def: dummyDef,
      spd: dummyAction === 'counter' ? 85 : 0, // Standby dummies don't tick ATB
      crit: 0.05,
      cdmg: 1.30,
      acc: 0.05,
      res: 0.15,
      qi: 0,
      maxQi: 100,
      atb: 0,
      statuses: [],
      moves: [],
      isDead: false,
      shield: 0,
      isImmortal: dummyType === 'immortal',
      isDummy: true,
      dummyAction: dummyAction
    });
  }

  // Switch to Battle Screen
  switchScreen('battle');
  document.getElementById('battle-stage-name').textContent = '🥋 ลานทดลองทีม (Dummy Arena)';
  document.getElementById('battle-log').innerHTML = '';
  logCombat('เริ่มต้นการซ้อมสกิล! ลานฝึกยุทธ์เปิดแล้ว', 'system');

  updateDpsMeterUI();
  renderBattleUnits();

  // Start the ATB Tick Loop
  if (state.battle.timer) cancelAnimationFrame(state.battle.timer);
  state.battle.lastTick = performance.now();
  runAtbLoop();
}

// ─── ATB TICK LOOP ───
function runAtbLoop() {
  if (!state.battle.active) return;

  const now = performance.now();
  const dt = (now - state.battle.lastTick) / 1000; // seconds
  state.battle.lastTick = now;

  if (!state.battle.isPaused && !state.battle.activeUnit) {
    const timeScale = state.battle.speed;
    const tickStep = dt * 25 * timeScale; // ATB speed scaling

    const allUnits = [...state.battle.allies, ...state.battle.enemies];

    for (const unit of allUnits) {
      if (unit.isDead) continue;
      if (unit.isDummy && unit.dummyAction === 'pass') continue;

      // Speed modifiers from statuses
      let effectiveSpd = unit.spd;
      if (hasStatus(unit, 'spd_up')) effectiveSpd *= 1.3;
      if (hasStatus(unit, 'spd_down')) effectiveSpd *= 0.7;

      // Passive bonus for Dongfang Bubai:
      if (unit.id === 'dongfang_bubai') {
        const hpLostPct = ((unit.maxHp - unit.hp) / unit.maxHp) * 100;
        effectiveSpd += Math.floor(hpLostPct / 2);
      }

      // Check Stun
      if (hasStatus(unit, 'stun')) {
        // stunned units don't gain ATB until stun wears off
        continue;
      }

      unit.atb += (effectiveSpd / 100) * tickStep;

      if (unit.atb >= 100) {
        unit.atb = 100;
        triggerTurn(unit);
        break; // stop loop to handle turn
      }
    }

    updateBattleBarsUI();
  }

  state.battle.timer = requestAnimationFrame(runAtbLoop);
}

// ─── TURN EXECUTION ───
function triggerTurn(unit) {
  state.battle.activeUnit = unit;
  state.battle.totalTurns++;
  updateDpsMeterUI();

  // Tick Status Effects (Buffs / Debuffs) at turn start
  tickStatusEffects(unit);

  if (unit.isDead) {
    endTurn(unit);
    return;
  }

  // Handle Stun
  if (hasStatus(unit, 'stun')) {
    logCombat(`${unit.name} ติดสถานะมึนงง (Stun) ข้ามเทิร์น!`, 'debuff');
    addFloatingText(unit, 'STUNNED', 'stun');
    removeStatus(unit, 'stun');
    endTurn(unit);
    return;
  }

  // Reduce skill cooldowns on turn start
  if (unit.moves) {
    unit.moves.forEach(m => {
      if (m.currentCd > 0) m.currentCd--;
    });
  }

  // Passive turn-start check for Guo Jing / Huang Rong
  if (unit.id === 'guo_jing' && unit.hp < unit.maxHp * 0.35 && !hasStatus(unit, 'shield')) {
    const shieldVal = Math.floor(unit.maxHp * 0.15);
    unit.shield = shieldVal;
    addStatus(unit, 'shield', 2, `Shield (${shieldVal})`);
    addFloatingText(unit, `SHIELD +${shieldVal}`, 'shield');
    logCombat(`พาสซีฟ [คัมภีร์เก้าอิมคุ้มกาย] ของก๊วยเจ๋งทำงาน! กางโล่คุ้มกัน ${shieldVal}!`, 'buff');
  }

  renderBattleUnits();

  if (unit.side === 'player') {
    showMovePanel(unit);
    if (state.battle.isAuto) {
      runAutoTurn(unit);
    }
  } else {
    // Enemy / Dummy turn
    executeEnemyTurn(unit);
  }
}

function runAutoTurn(unit) {
  setTimeout(() => {
    if (!state.battle.active || !state.battle.isAuto || state.battle.activeUnit !== unit) return;
    const availableMoves = unit.moves
      .map((m, idx) => ({ m, idx }))
      .filter(({ m }) => (m.currentCd || 0) === 0 && unit.qi >= (m.qiCost || 0));

    const selected = availableMoves[availableMoves.length - 1] || { m: unit.moves[0], idx: 0 };
    if (selected.m.targetType === 'ally') {
      const livingAllies = state.battle.allies.filter(a => !a.isDead);
      const targetAlly = livingAllies[0] || unit;
      fireMove(unit, selected.m, targetAlly);
    } else {
      const livingEnemies = state.battle.enemies.filter(e => !e.isDead);
      const targetEnemy = livingEnemies[0];
      fireMove(unit, selected.m, targetEnemy);
    }
  }, 350 / (state.battle.speed || 1));
}

function executeEnemyTurn(dummy) {
  setTimeout(() => {
    if (!state.battle.active) return;
    if (dummy.dummyAction === 'counter') {
      // Pick random alive ally to strike gently
      const livingAllies = state.battle.allies.filter(a => !a.isDead);
      if (livingAllies.length > 0) {
        const target = livingAllies[Math.floor(Math.random() * livingAllies.length)];
        const dmg = Math.floor(dummy.atk * 0.8);
        logCombat(`${dummy.name} ชกลองเชิงใส่ ${target.name}!`, 'system');
        applyDamage(target, dmg, false, dummy);
      }
    }
    endTurn(dummy);
  }, 600 / state.battle.speed);
}

function endTurn(unit) {
  unit.atb = 0;
  state.battle.activeUnit = null;
  state.battle.selectedMoveIndex = null;
  state.battle.selectedTargetIndex = null;
  hideMovePanel();
  hideTargetPanel();
  renderBattleUnits();

  // Check victory / defeat (unless immortal dummy)
  const allAlliesDead = state.battle.allies.every(a => a.isDead);
  const allDummiesDead = state.battle.enemies.every(e => e.isDead);

  if (allAlliesDead) {
    showBattleResult(false);
  } else if (allDummiesDead && !state.battle.enemies[0]?.isImmortal) {
    showBattleResult(true);
  }
}

// ─── MOVE PANEL & REAL PNG SKILL ICONS (NO EMOJIS!) ───
function showMovePanel(unit) {
  const panel = document.getElementById('move-panel');
  if (!panel) return;
  panel.classList.remove('hidden');

  const nameEl = document.getElementById('active-char-name');
  const elemBadge = document.getElementById('active-char-elem');
  const qiEl = document.getElementById('active-char-qi');
  const buttonsContainer = document.getElementById('move-buttons');
  const tooltipEl = document.getElementById('skill-tooltip');

  if (nameEl) nameEl.textContent = unit.name;
  if (elemBadge) {
    elemBadge.className = `char-elem-badge ${unit.element}`;
    elemBadge.textContent = unit.element.toUpperCase();
  }
  if (qiEl) qiEl.textContent = `ชี่: ${unit.qi}/${unit.maxQi}`;

  buttonsContainer.innerHTML = '';
  tooltipEl.innerHTML = `<span class="tt-title">👉 เลือกวิชาที่จะใช้:</span> แตะที่สกิลเพื่อดูรายละเอียด หรือกดเพื่อใช้งาน`;

  unit.moves.forEach((move, index) => {
    const isUlt = move.type === 'ultimate';
    const isCd = move.currentCd > 0;
    const notEnoughQi = unit.qi < move.qiCost;
    const isDisabled = isCd || notEnoughQi;

    const btn = document.createElement('button');
    btn.className = `move-btn ${isUlt ? 'ult-btn' : ''}`;
    if (isDisabled) btn.disabled = true;

    // REAL CROPPED PNG SKILL ICONS - NO EMOJIS!
    btn.innerHTML = `
      <img src="${move.icon}" class="move-icon-img" alt="${move.name}" />
      <div class="move-btn-content">
        <span class="move-name">${move.name}</span>
        <div class="move-tags-row">
          <span class="move-type-tag">${getMoveTypeLabel(move.type)}</span>
          ${move.qiCost > 0 ? `<span class="move-qi-cost">ชี่: ${move.qiCost}</span>` : '<span class="move-qi-cost" style="color:var(--text-dim)">ชี่: 0</span>'}
        </div>
      </div>
      ${isCd ? `<span class="move-cd-overlay">CD ${move.currentCd}</span>` : ''}
    `;

    // Tooltip interaction
    btn.addEventListener('mouseenter', () => {
      tooltipEl.innerHTML = `
        <span class="tt-title">${move.name}</span> (${getMoveTypeLabel(move.type)})
        ${move.qiCost > 0 ? `| ค่าชี่: <b style="color:#be6eff">${move.qiCost}</b>` : ''}
        ${move.cd > 0 ? `| คูลดาวน์: <b>${move.cd} เทิร์น</b>` : ''}
        <br><span class="tt-detail">${move.desc}</span>
      `;
    });

    btn.addEventListener('click', () => {
      selectMove(unit, index);
    });

    buttonsContainer.appendChild(btn);
  });

  // Automatically select the first available move so player can immediately click target!
  const firstAvailableIdx = unit.moves.findIndex(m => (m.currentCd || 0) === 0 && unit.qi >= (m.qiCost || 0));
  selectMove(unit, firstAvailableIdx !== -1 ? firstAvailableIdx : 0);
}

function getMoveTypeLabel(type) {
  switch (type) {
    case 'basic': return 'ตีธรรมดา';
    case 'skill': return 'วิชา';
    case 'aoe': return 'โจมตีหมู่';
    case 'ultimate': return 'ท่าไม้ตาย';
    default: return 'วิชา';
  }
}

function hideMovePanel() {
  const panel = document.getElementById('move-panel');
  if (panel) panel.classList.add('hidden');
}

function hideTargetPanel() {
  const panel = document.getElementById('target-panel');
  if (panel) panel.classList.add('hidden');
}

// ─── TARGET SELECTION & MOVE FIRING ───
export function clearTargetingMode() {
  const promptBanner = document.getElementById('target-prompt-banner');
  if (promptBanner) promptBanner.classList.add('hidden');

  document.querySelectorAll('.dummy-unit').forEach(c => c.classList.remove('targetable-enemy'));
  document.querySelectorAll('.player-side .battle-unit').forEach(c => c.classList.remove('targetable-ally'));
  document.querySelectorAll('.move-btn').forEach(b => b.classList.remove('selected-move'));
}

export function selectMove(unit, moveIndex) {
  const move = unit.moves[moveIndex];
  if (!move) return;
  state.battle.selectedMoveIndex = moveIndex;

  // Highlight active move button in UI
  const buttonsContainer = document.getElementById('move-buttons');
  if (buttonsContainer) {
    const allBtns = buttonsContainer.querySelectorAll('.move-btn');
    allBtns.forEach((btn, idx) => {
      if (idx === moveIndex) {
        btn.classList.add('selected-move');
      } else {
        btn.classList.remove('selected-move');
      }
    });
  }

  // Update Skill Tooltip
  const tooltipEl = document.getElementById('skill-tooltip');
  if (tooltipEl) {
    tooltipEl.innerHTML = `
      <span class="tt-title">${move.name}</span> (${getMoveTypeLabel(move.type)})
      ${move.qiCost > 0 ? `| ค่าชี่: <b style="color:#be6eff">${move.qiCost}</b>` : ''}
      ${move.cd > 0 ? `| คูลดาวน์: <b>${move.cd} เทิร์น</b>` : ''}
      <br><span class="tt-detail">${move.desc}</span>
    `;
  }

  // Update Target Prompt & Element Highlights
  const promptBanner = document.getElementById('target-prompt-banner');
  const enemyCards = document.querySelectorAll('.dummy-unit');
  const allyCards = document.querySelectorAll('.player-side .battle-unit');

  if (move.targetType === 'ally') {
    // Buff targeting: Highlight allies, unhighlight dummy
    enemyCards.forEach(c => c.classList.remove('targetable-enemy'));
    allyCards.forEach(c => c.classList.add('targetable-ally'));

    if (promptBanner) {
      promptBanner.className = 'target-prompt-banner target-ally';
      promptBanner.innerHTML = `
        <span class="prompt-icon"><re-icon icon="sparkle" weight="filled" size="18" color="#2ed573"></re-icon></span>
        <span class="prompt-text">คลิกที่ตัวละครเพื่อน หรือตัวเอง เพื่อร่ายบัฟ!</span>
      `;
    }
  } else {
    // Attack targeting: Highlight dummy, unhighlight allies
    allyCards.forEach(c => c.classList.remove('targetable-ally'));
    enemyCards.forEach(c => c.classList.add('targetable-enemy'));

    if (promptBanner) {
      promptBanner.className = 'target-prompt-banner target-enemy';
      promptBanner.innerHTML = `
        <span class="prompt-icon"><re-icon icon="target" weight="filled" size="18" color="#e74c3c"></re-icon></span>
        <span class="prompt-text">คลิกที่หุ่นไม้ (Dummy) เพื่อปล่อยกระบวนท่า!</span>
      `;
    }
  }
}

export function fireMove(unit, move, target) {
  clearTargetingMode();
  hideTargetPanel();
  hideMovePanel();

  // Deduct Qi & start Cooldown
  unit.qi = Math.max(0, unit.qi - move.qiCost);
  move.currentCd = move.cd;

  logCombat(`${unit.name} ร่ายกระบวนท่า [${move.name}]!`, 'system');

  if (move.targetType === 'ally') {
    // ─── Ally / Self Buff Animation ───
    playBuffAnimation(unit, move, target);
    move.execute(unit, target, state.battle.allies, state.battle.enemies);
  } else {
    // ─── Enemy Attack Animation (Hero Lunge + Projectile + Dummy Impact) ───
    playAttackAnimation(unit, move, target, () => {
      move.execute(unit, target, state.battle.allies, state.battle.enemies);
    });
  }

  // Update UI & end turn after animation delay
  renderBattleUnits();
  setTimeout(() => {
    endTurn(unit);
  }, 750 / state.battle.speed);
}

// ─── DAMAGE & COMBAT CALCULATIONS ───
export function calculateDamage(rawDmg, targetDef, critMultiplier = 1) {
  // Damage mitigation formula standard to GDD:
  const mitigation = 1000 / (1000 + (targetDef * 3.5));
  let finalDmg = rawDmg * mitigation * critMultiplier;
  // Variance +/- 5%
  finalDmg *= (0.95 + (Math.random() * 0.10));
  return Math.max(1, Math.floor(finalDmg));
}

export function applyDamage(target, damage, isCrit = false, attacker = null) {
  if (target.isDead) return false;

  let actualDamage = damage;

  // Check Shield absorption
  if (target.shield > 0) {
    if (target.shield >= actualDamage) {
      target.shield -= actualDamage;
      addFloatingText(target, `-${actualDamage} (SHIELD)`, 'shield');
      logCombat(`${target.name} ดูดซับดาเมจ ${actualDamage} ด้วยโล่คุ้มกัน!`, 'buff');
      return false;
    } else {
      actualDamage -= target.shield;
      target.shield = 0;
      removeStatus(target, 'shield');
    }
  }

  // Apply to HP
  target.hp = Math.max(0, target.hp - actualDamage);

  // Track DPS Meter stats
  state.battle.totalDamageDealt += actualDamage;
  if (isCrit && actualDamage > state.battle.maxCriticalHit) {
    state.battle.maxCriticalHit = actualDamage;
  }
  updateDpsMeterUI();

  // Trigger direct martial arts effects on the Dummy
  if (attacker) {
    const activeMove = (state.battle.selectedMoveIndex !== null && attacker.moves)
      ? attacker.moves[state.battle.selectedMoveIndex]
      : { type: 'basic' };
    playSkillFXOnTarget(attacker, activeMove, target, isCrit);
  }

  // Floating Damage Text directly on the Dummy
  addFloatingText(target, `${actualDamage}${isCrit ? ' 💥 CRIT!' : ''}`, isCrit ? 'crit' : 'damage');

  logCombat(
    `${attacker ? attacker.name + ' โจมตี ' : ''}${target.name} ได้รับดาเมจ ${actualDamage}${isCrit ? ' (คริติคอล!)' : ''}`,
    isCrit ? 'damage' : 'damage'
  );

  // If target is Immortal dummy, auto-refill HP
  if (target.isImmortal && target.hp <= target.maxHp * 0.2) {
    target.hp = target.maxHp;
    logCombat(`${target.name} ฟื้นคืนเลือดเต็มทันที (หุ่นฝึกอมตะ)`, 'system');
  }

  if (target.hp <= 0) {
    target.isDead = true;
    logCombat(`${target.name} ล้มลงแล้ว!`, 'system');
    return true; // killed
  }
  return false;
}

// ─── STATUS EFFECTS / BUFFS / DEBUFFS ───
export function addStatus(unit, type, turns, label) {
  const existing = unit.statuses.find(s => s.type === type);
  if (existing) {
    existing.turns = Math.max(existing.turns, turns);
  } else {
    unit.statuses.push({ type, turns, label });
  }
  addFloatingText(unit, `+${label}`, 'buff');
}

export function removeStatus(unit, type) {
  unit.statuses = unit.statuses.filter(s => s.type !== type);
}

export function hasStatus(unit, type) {
  return unit.statuses.some(s => s.type === type);
}

export function stripBuff(unit) {
  const buffTypes = ['atk_up', 'def_up', 'spd_up', 'shield'];
  const buffIdx = unit.statuses.findIndex(s => buffTypes.includes(s.type));
  if (buffIdx !== -1) {
    const stripped = unit.statuses.splice(buffIdx, 1)[0];
    addFloatingText(unit, `STRIP: ${stripped.label}`, 'debuff');
    logCombat(`ลบล้างบัฟ [${stripped.label}] ออกจาก ${unit.name}!`, 'debuff');
  }
}

function tickStatusEffects(unit) {
  for (let i = unit.statuses.length - 1; i >= 0; i--) {
    const s = unit.statuses[i];
    s.turns--;
    if (s.turns <= 0) {
      unit.statuses.splice(i, 1);
      logCombat(`สถานะ [${s.label}] บนตัว ${unit.name} หมดเวลา`, 'system');
    }
  }
}

// ─── SANDBOX DEBUG TOOLBAR LOGIC ───
function setupBattleSandboxEvents() {
  // Reset Dummy
  const btnResetDummy = document.getElementById('sb-reset-dummy');
  if (btnResetDummy) {
    btnResetDummy.addEventListener('click', () => {
      state.battle.enemies.forEach(d => {
        d.hp = d.maxHp;
        d.isDead = false;
        d.statuses = [];
        d.shield = 0;
        d.atb = 0;
      });
      renderBattleUnits();
      logCombat('🔄 รีเซ็ตหุ่นฝึกซ้อมเรียบร้อย (ล้างดีบัฟ & เลือดเต็ม)', 'system');
    });
  }

  // Max Qi 100
  const btnMaxQi = document.getElementById('sb-max-qi');
  if (btnMaxQi) {
    btnMaxQi.addEventListener('click', () => {
      state.battle.allies.forEach(a => {
        a.qi = a.maxQi;
      });
      updateBattleBarsUI();
      if (state.battle.activeUnit && state.battle.activeUnit.side === 'player') {
        showMovePanel(state.battle.activeUnit);
      }
      logCombat('⚡ เติมชี่เต็ม 100 ให้ทั้งทีม! สามารถลองท่าไม้ตายได้ทันที', 'buff');
    });
  }

  // Reset Cooldowns
  const btnResetCd = document.getElementById('sb-reset-cd');
  if (btnResetCd) {
    btnResetCd.addEventListener('click', () => {
      state.battle.allies.forEach(a => {
        a.moves.forEach(m => m.currentCd = 0);
      });
      if (state.battle.activeUnit && state.battle.activeUnit.side === 'player') {
        showMovePanel(state.battle.activeUnit);
      }
      logCombat('⏳ รีเซ็ตคูลดาวน์สกิลทั้งหมดของทั้งทีม!', 'buff');
    });
  }

  // Gain Turn (Next Turn)
  const btnGainTurn = document.getElementById('sb-gain-turn');
  if (btnGainTurn) {
    btnGainTurn.addEventListener('click', () => {
      const firstLivingAlly = state.battle.allies.find(a => !a.isDead);
      if (firstLivingAlly) {
        firstLivingAlly.atb = 100;
        triggerTurn(firstLivingAlly);
        logCombat(`⚔️ มอบเทิร์นให้ ${firstLivingAlly.name} ทันที!`, 'system');
      }
    });
  }

  // Toggle Collapsible Sandbox Tray
  const btnToggleSandbox = document.getElementById('btn-toggle-sandbox');
  if (btnToggleSandbox) {
    btnToggleSandbox.addEventListener('click', () => {
      const tray = document.getElementById('sandbox-bar');
      if (tray) tray.classList.toggle('hidden');
    });
  }

  // Summoners War Auto Play Toggle
  const btnAuto = document.getElementById('btn-battle-auto');
  if (btnAuto) {
    btnAuto.addEventListener('click', () => {
      state.battle.isAuto = !state.battle.isAuto;
      btnAuto.classList.toggle('active-auto', state.battle.isAuto);
      logCombat(state.battle.isAuto ? '⚔️ เปิดระบบต่อสู้อัตโนมัติ (AUTO PLAY ON)' : '✋ ปิดระบบต่อสู้อัตโนมัติ (AUTO PLAY OFF)', 'system');
      if (state.battle.isAuto && state.battle.activeUnit && state.battle.activeUnit.side === 'player') {
        runAutoTurn(state.battle.activeUnit);
      }
    });
  }

  // Battle Speed toggle (1x -> 2x -> 3x)
  const btnSpeed = document.getElementById('btn-battle-speed');
  if (btnSpeed) {
    btnSpeed.addEventListener('click', () => {
      if (state.battle.speed === 1) state.battle.speed = 2;
      else if (state.battle.speed === 2) state.battle.speed = 3;
      else state.battle.speed = 1;

      const txtEl = btnSpeed.querySelector('.sw-btn-text') || btnSpeed;
      txtEl.textContent = `${state.battle.speed}x`;
      btnSpeed.style.color = state.battle.speed > 1 ? '#f1c40f' : '#fff';
      logCombat(`⚡ ปรับความเร็วการต่อสู้เป็น ${state.battle.speed}x`, 'system');
    });
  }

  // Battle Pause toggle
  const btnPause = document.getElementById('btn-battle-pause');
  if (btnPause) {
    btnPause.addEventListener('click', () => {
      state.battle.isPaused = !state.battle.isPaused;
      btnPause.innerHTML = state.battle.isPaused ? '<span>▶️</span>' : '<span>⏸️</span>';
      logCombat(state.battle.isPaused ? '⏸️ หยุดเวลาชั่วคราว' : '▶️ เล่นต่อ', 'system');
    });
  }

  // Clear DPS Meter
  const btnClearDps = document.getElementById('btn-clear-dps');
  if (btnClearDps) {
    btnClearDps.addEventListener('click', () => {
      state.battle.totalDamageDealt = 0;
      state.battle.maxCriticalHit = 0;
      state.battle.totalTurns = 0;
      updateDpsMeterUI();
      logCombat('ล้างสถิติ DPS เรียบร้อย', 'system');
    });
  }
}

function updateDpsMeterUI() {
  const totalEl = document.getElementById('dps-total');
  const maxHitEl = document.getElementById('dps-max-hit');
  const turnsEl = document.getElementById('dps-turns');
  if (totalEl) totalEl.textContent = state.battle.totalDamageDealt.toLocaleString();
  if (maxHitEl) maxHitEl.textContent = state.battle.maxCriticalHit.toLocaleString();
  if (turnsEl) turnsEl.textContent = state.battle.totalTurns.toString();
}

// ─── AUDIO SYNTHESIZER (WEB AUDIO API) ───
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playHitSound(isCrit = false) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isCrit) {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    }
  } catch (e) {
    // Audio context may be blocked by autoplay policies until user clicks
  }
}

export function playSlashSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

export function playDragonBlastSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    // Roar burst
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {}
}

export function playBuffSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    // Pleasant musical chord chime (C5 - E5 - G5 - C6)
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      const startTime = ctx.currentTime + (idx * 0.07);
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch (e) {}
}

// ─── HERO ATTACK ANIMATION (LUNGE + IMPACT) ───
export function playAttackAnimation(attacker, move, target, onImpact) {
  const attackerCard = document.getElementById(`unit-${attacker.instanceId}`);
  if (attackerCard) {
    attackerCard.classList.remove('hero-lunge-attack');
    void attackerCard.offsetWidth; // trigger reflow
    attackerCard.classList.add('hero-lunge-attack');
    setTimeout(() => attackerCard.classList.remove('hero-lunge-attack'), 520);
  }

  // Delay impact slightly to match the peak forward lunge
  const impactDelay = 160 / (state.battle.speed || 1);
  setTimeout(() => {
    if (onImpact) onImpact();
  }, impactDelay);
}

// ─── HERO BUFF ANIMATION (PULSE + PILLAR + RINGS) ───
export function playBuffAnimation(caster, move, target) {
  playBuffSound();

  // Caster chanting pulse
  const casterCard = document.getElementById(`unit-${caster.instanceId}`);
  if (casterCard) {
    casterCard.classList.remove('hero-buff-cast');
    void casterCard.offsetWidth; // trigger reflow
    casterCard.classList.add('hero-buff-cast');
    setTimeout(() => casterCard.classList.remove('hero-buff-cast'), 600);
  }

  // Determine which allies receive the pillar effect
  let targets = [];
  if (move.target === 'all_allies') {
    targets = state.battle.allies.filter(a => !a.isDead);
  } else {
    targets = [target || caster];
  }

  targets.forEach(t => {
    const card = document.getElementById(`unit-${t.instanceId}`);
    if (!card) return;

    // Sacred Buff Pillar
    const pillar = document.createElement('div');
    pillar.className = 'buff-pillar-fx';
    card.appendChild(pillar);
    setTimeout(() => pillar.remove(), 700);

    // Expanding Qi Ring
    const ring = document.createElement('div');
    ring.className = 'buff-ring-fx';
    card.appendChild(ring);
    setTimeout(() => ring.remove(), 600);
  });
}

// ─── DIRECT VISUAL FX ENGINE ON DUMMY ───
export function playSkillFXOnTarget(attacker, move, target, isCrit = false) {
  if (!target) return;
  const targetCard = document.getElementById(`unit-${target.instanceId}`);
  if (!targetCard) return;

  const fxOverlay = targetCard.querySelector('.dummy-fx-overlay') || targetCard;

  // Shake dummy and flash red/gold
  const shakeClass = isCrit ? 'dummy-crit-shake' : 'dummy-hit-shake';
  targetCard.classList.remove('dummy-hit-shake', 'dummy-crit-shake');
  void targetCard.offsetWidth; // trigger reflow
  targetCard.classList.add(shakeClass);
  setTimeout(() => targetCard.classList.remove(shakeClass), 500);

  // Play audio
  if (isCrit) {
    playHitSound(true);
  } else {
    playHitSound(false);
  }

  // Create FX element
  const fx = document.createElement('div');

  if (attacker.id === 'guo_jing') {
    if (move.type === 'ultimate') {
      fx.className = 'fx-dragon-blast';
      playDragonBlastSound();
      triggerScreenShake();
    } else {
      fx.className = 'fx-claw-slash';
      playSlashSound();
    }
  } else if (attacker.id === 'huang_rong') {
    fx.className = 'fx-bamboo-flurry';
    playSlashSound();
  } else if (attacker.id === 'dongfang_bubai') {
    if (move.type === 'ultimate') {
      fx.className = 'fx-needle-pierce fx-dragon-blast';
      playDragonBlastSound();
      triggerScreenShake();
    } else {
      fx.className = 'fx-needle-pierce';
      playSlashSound();
    }
  } else {
    fx.className = 'fx-claw-slash';
    playSlashSound();
  }

  fxOverlay.appendChild(fx);
  setTimeout(() => fx.remove(), 600);
}

function getElementIcon(elem) {
  switch (elem) {
    case 'water': return '💧';
    case 'wind': return '🌪️';
    case 'earth': return '🪨';
    case 'fire': return '🔥';
    default: return '✨';
  }
}

// ─── RENDERING UNITS IN BATTLE FIELD (SUMMONERS WAR SKY ARENA) ───
export function renderBattleUnits() {
  const enemyContainer = document.getElementById('enemy-side');
  const playerContainer = document.getElementById('player-side');
  if (!enemyContainer || !playerContainer) return;

  const isPlayerTurn = state.battle.activeUnit?.side === 'player';
  const activeMove = (isPlayerTurn && state.battle.selectedMoveIndex !== null)
    ? state.battle.activeUnit.moves[state.battle.selectedMoveIndex]
    : null;

  // Render Dummies (Right Side in Landscape)
  enemyContainer.innerHTML = '';
  state.battle.enemies.forEach((enemy) => {
    const card = document.createElement('div');
    const isActive = state.battle.activeUnit === enemy;
    const isEnemyTargetable = isPlayerTurn && (!activeMove || activeMove.targetType === 'enemy') && !enemy.isDead;
    card.className = `battle-unit dummy-unit ${isActive ? 'active-turn' : ''} ${enemy.isDead ? 'dead' : ''} ${isEnemyTargetable ? 'targetable-enemy' : ''}`;
    card.id = `unit-${enemy.instanceId}`;

    const hpPct = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));
    const atbPct = Math.max(0, Math.min(100, enemy.atb));
    const isStunned = hasStatus(enemy, 'stun');

    card.innerHTML = `
      <!-- Summoners War Floating Overhead HP & ATB Bar -->
      <div class="sw-overhead-bar">
        <span class="sw-elem-lvl earth">🪨 50</span>
        <div class="sw-bars-stack">
          <div class="sw-hp-track">
            <div class="sw-hp-fill" style="width: ${hpPct}%;"></div>
          </div>
          <div class="sw-atb-track">
            <div class="sw-atb-fill ${atbPct >= 100 ? 'ready' : ''}" style="width: ${atbPct}%;"></div>
          </div>
        </div>
      </div>

      <!-- Summoners War Iconic 3D Target Arrow -->
      <div class="sw-target-arrow"></div>

      <!-- FX Overlay Layer on Dummy -->
      <div class="dummy-fx-overlay">
        ${isStunned ? '<div class="fx-stun-stars">💫 💫 💫</div>' : ''}
      </div>

      <div class="sw-unit-model-wrap">
        <img src="${enemy.portrait}" class="unit-sprite-img" alt="${enemy.name}" />
        <div class="sw-ground-pedestal enemy-pedestal"></div>
        <div class="unit-name" style="font-size: 13px; margin: 4px 0 2px;">${enemy.name}</div>
        <span class="dummy-tag">${enemy.isImmortal ? 'อมตะ (Sandbag)' : 'เป้าซ้อม'}</span>
      </div>

      <div class="status-icons">
        ${renderStatusBadges(enemy)}
      </div>
    `;

    // Click directly on dummy to strike!
    card.addEventListener('click', () => {
      if (state.battle.activeUnit?.side === 'player') {
        const moveIdx = state.battle.selectedMoveIndex ?? 0;
        const move = state.battle.activeUnit.moves[moveIdx];
        if (!move) return;
        if (move.targetType === 'enemy') {
          fireMove(state.battle.activeUnit, move, enemy);
        } else {
          logCombat('⚠️ ท่านี้เป็นสกิลบัฟ กรุณาแตะที่เพื่อนร่วมทีมหรือตัวเองเพื่อร่ายบัฟ', 'debuff');
        }
      }
    });

    enemyContainer.appendChild(card);
  });

  // Render Allies (Left Side in Landscape)
  playerContainer.innerHTML = '';
  state.battle.allies.forEach((ally, index) => {
    const card = document.createElement('div');
    const isActive = state.battle.activeUnit === ally;
    const isAllyTargetable = isPlayerTurn && (activeMove && activeMove.targetType === 'ally') && !ally.isDead;
    card.className = `battle-unit ally-unit slot-${index} ${isActive ? 'active-turn' : ''} ${ally.isDead ? 'dead' : ''} ${isAllyTargetable ? 'targetable-ally' : ''}`;
    card.id = `unit-${ally.instanceId}`;

    const hpPct = Math.max(0, Math.min(100, (ally.hp / ally.maxHp) * 100));
    const atbPct = Math.max(0, Math.min(100, ally.atb));

    card.innerHTML = `
      <!-- Summoners War Floating Overhead HP & ATB Bar -->
      <div class="sw-overhead-bar">
        <span class="sw-elem-lvl ${ally.element}">${getElementIcon(ally.element)} 40</span>
        <div class="sw-bars-stack">
          <div class="sw-hp-track">
            <div class="sw-hp-fill" style="width: ${hpPct}%;"></div>
          </div>
          <div class="sw-atb-track">
            <div class="sw-atb-fill ${atbPct >= 100 ? 'ready' : ''}" style="width: ${atbPct}%;"></div>
          </div>
        </div>
      </div>

      <!-- Summoners War Iconic 3D Target Arrow -->
      <div class="sw-target-arrow"></div>

      <div class="sw-unit-model-wrap">
        ${isActive ? '<div class="sw-turn-beacon"></div>' : ''}
        <img src="${ally.portrait}" class="sw-unit-sprite" alt="${ally.name}" />
        <div class="sw-ground-pedestal ally-pedestal"></div>
        <span class="unit-name" style="font-size: 13px; font-weight:800; margin-top: 6px;">${ally.name}</span>
      </div>

      <div class="status-icons">
        ${renderStatusBadges(ally)}
      </div>
    `;

    // Click directly on ally / self to cast buff!
    card.addEventListener('click', () => {
      if (state.battle.activeUnit?.side === 'player') {
        const moveIdx = state.battle.selectedMoveIndex ?? 0;
        const move = state.battle.activeUnit.moves[moveIdx];
        if (!move) return;
        if (move.targetType === 'ally') {
          fireMove(state.battle.activeUnit, move, ally);
        } else {
          logCombat('⚠️ ท่านี้เป็นสกิลโจมตี กรุณาแตะที่หุ่นไม้ Dummy เพื่อปล่อยท่า', 'damage');
        }
      }
    });

    playerContainer.appendChild(card);
  });
}

function updateBattleBarsUI() {
  const allUnits = [...state.battle.allies, ...state.battle.enemies];
  allUnits.forEach(unit => {
    const card = document.getElementById(`unit-${unit.instanceId}`);
    if (!card) return;

    // Summoners War HP & ATB Bar Fill Update
    const hpFill = card.querySelector('.sw-hp-fill');
    if (hpFill) {
      const hpPct = Math.max(0, Math.min(100, (unit.hp / unit.maxHp) * 100));
      hpFill.style.width = `${hpPct}%`;
    }

    const atbFill = card.querySelector('.sw-atb-fill');
    if (atbFill) {
      const atbPct = Math.max(0, Math.min(100, unit.atb));
      atbFill.style.width = `${atbPct}%`;
      atbFill.classList.toggle('ready', atbPct >= 100);
    }
  });
}

function renderStatusBadges(unit) {
  if (!unit.statuses || unit.statuses.length === 0) return '';
  return unit.statuses.map(s => {
    let color = '#3498db';
    if (s.type.includes('up')) color = '#2ecc71';
    if (s.type.includes('down') || s.type.includes('break')) color = '#e67e22';
    if (s.type === 'stun') color = '#f1c40f';
    if (s.type === 'shield') color = '#5dade2';
    return `<span class="status-icon" style="background:${color}33; color:${color}; font-size: 8px; font-weight:700; padding: 2px 4px; border: 1px solid ${color}66;" title="${s.label} (${s.turns}เทิร์น)">${s.type.slice(0, 3).toUpperCase()}</span>`;
  }).join('');
}

// ─── VISUAL EFFECTS & LOGGING ───
export function addFloatingText(targetUnit, text, type = 'damage') {
  const card = document.getElementById(`unit-${targetUnit.instanceId}`);
  if (!card) return;

  const floatEl = document.createElement('div');
  floatEl.className = `floating-damage ${type}`;
  floatEl.textContent = text;
  // Position directly over the dummy target
  const randomOffsetX = Math.floor(Math.random() * 40) - 20;
  const randomOffsetY = Math.floor(Math.random() * 30) - 15;
  floatEl.style.left = `calc(50% + ${randomOffsetX}px)`;
  floatEl.style.top = `calc(30% + ${randomOffsetY}px)`;

  card.appendChild(floatEl);
  setTimeout(() => floatEl.remove(), 1400);
}

export function logCombat(message, type = 'system') {
  const logEl = document.getElementById('battle-log');
  if (!logEl) return;

  const entry = document.createElement('div');
  entry.className = `log-entry log-${type}`;
  entry.textContent = message;
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;
}

function triggerScreenShake() {
  const app = document.getElementById('app');
  if (!app) return;
  app.classList.add('shake');
  setTimeout(() => app.classList.remove('shake'), 350);
}

function showBattleResult(isVictory) {
  state.battle.active = false;
  const resultPanel = document.getElementById('battle-result');
  const title = document.getElementById('result-title');
  const rewards = document.getElementById('result-rewards');
  if (!resultPanel || !title || !rewards) return;

  resultPanel.classList.remove('hidden');
  if (isVictory) {
    title.textContent = '🎉 ซ้อมวิชาสำเร็จ!';
    title.className = 'victory';
    rewards.innerHTML = `
      <p style="color:var(--text); margin-bottom: 8px;">ทำดาเมจรวมได้ทั้งหมด: <b>${state.battle.totalDamageDealt.toLocaleString()}</b></p>
      <p style="color:var(--gold-bright);">สถิติคริติคอลสูงสุด: <b>${state.battle.maxCriticalHit.toLocaleString()}</b></p>
    `;
  } else {
    title.textContent = '💀 สิ้นพลังยุทธ์';
    title.className = '';
    rewards.innerHTML = `<p style="color:var(--text-dim);">ทีมพ่ายแพ้ในระหว่างการซ้อม สามารถรีเซ็ตและลองใหม่ได้เสมอ</p>`;
  }
}

function endBattle() {
  state.battle.active = false;
  if (state.battle.timer) {
    cancelAnimationFrame(state.battle.timer);
    state.battle.timer = null;
  }
}

// ─── CHARACTER DETAIL MODAL / SCREEN ───
function showCharacterDetail(hero) {
  const screen = document.getElementById('screen-character');
  if (!screen) return;

  document.getElementById('char-detail-name').textContent = hero.name;
  const spriteEl = document.getElementById('char-detail-sprite');
  if (spriteEl) {
    spriteEl.innerHTML = `<img src="${hero.portrait}" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid var(--gold);" />`;
  }

  const elemEl = document.getElementById('char-detail-element');
  if (elemEl) {
    elemEl.textContent = `ธาตุ: ${hero.element.toUpperCase()} | ${hero.role}`;
  }

  const passiveEl = document.getElementById('char-detail-passive');
  if (passiveEl) {
    passiveEl.innerHTML = `<b>พาสซีฟ [${hero.passive.name}]:</b> ${hero.passive.desc}`;
  }

  const movesListEl = document.getElementById('char-detail-moves-list');
  if (movesListEl) {
    movesListEl.innerHTML = '';
    hero.moves.forEach(m => {
      const item = document.createElement('div');
      item.style.cssText = 'background: var(--bg-card); padding: 8px; border-radius: var(--radius); margin-bottom: 6px; display: flex; gap: 8px; align-items: center;';
      item.innerHTML = `
        <img src="${m.icon}" style="width: 40px; height: 40px; border-radius: 6px; border: 1px solid var(--border-gold);" />
        <div>
          <div style="font-weight: 700; font-size: 12px; color: #fff;">${m.name}</div>
          <div style="font-size: 10px; color: var(--text-dim);">${m.desc}</div>
        </div>
      `;
      movesListEl.appendChild(item);
    });
  }

  switchScreen('character');
}
