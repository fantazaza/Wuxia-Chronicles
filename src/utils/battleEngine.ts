import { Hero, Skill, ElementType } from '../types/game';
import { ELEMENT_ADVANTAGE } from '../data/heroes';

export interface CombatResult {
  damage: number;
  isCrit: boolean;
  isAdvantage: boolean;
  isDisadvantage: boolean;
  elementMultiplier: number;
}

export function calculateDamage(
  attacker: Hero,
  target: Hero,
  skill: Skill
): CombatResult {
  // Base ATK vs DEF calculation (Summoners War / classic RPG style)
  // Effective DEF = target.def (mitigates damage based on curve)
  let effectiveAtk = attacker.stats.atk;
  let effectiveDef = target.stats.def;

  // Apply Buffs & Debuffs
  attacker.buffs.forEach(buff => {
    if (buff.type === 'buff_atk') effectiveAtk *= (1 + buff.value / 100);
  });
  target.buffs.forEach(buff => {
    if (buff.type === 'debuff_def') effectiveDef *= (1 - buff.value / 100);
    if (buff.type === 'shield') effectiveDef *= 1.35;
  });

  // Elemental Advantage calculation
  let elementMultiplier = 1.0;
  let isAdvantage = false;
  let isDisadvantage = false;

  if (ELEMENT_ADVANTAGE[attacker.element] === target.element) {
    elementMultiplier = 1.3; // 30% bonus damage
    isAdvantage = true;
  } else if (ELEMENT_ADVANTAGE[target.element] === attacker.element) {
    elementMultiplier = 0.8; // 20% reduced damage
    isDisadvantage = true;
  }

  // Critical Hit check
  const critRoll = Math.random();
  const isCrit = critRoll < attacker.stats.critRate;
  const critMultiplier = isCrit ? attacker.stats.critDmg : 1.0;

  // Formula: (ATK * Multiplier * 100) / (100 + DEF) * Element * Crit
  // Random variance +/- 5%
  const variance = 0.95 + Math.random() * 0.1;
  const rawDamage = (effectiveAtk * skill.powerMultiplier * 100) / (100 + effectiveDef * 0.8);
  const totalDamage = Math.max(15, Math.round(rawDamage * elementMultiplier * critMultiplier * variance));

  return {
    damage: totalDamage,
    isCrit,
    isAdvantage,
    isDisadvantage,
    elementMultiplier,
  };
}

export function deepCloneHero(hero: Omit<Hero, 'currentAtb' | 'buffs'>, isEnemy: boolean = false): Hero {
  return {
    ...JSON.parse(JSON.stringify(hero)),
    currentAtb: Math.floor(Math.random() * 20), // slight random start gauge
    buffs: [],
    isEnemy,
  };
}
