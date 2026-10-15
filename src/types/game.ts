export type ElementType = 'fire' | 'water' | 'wind' | 'earth' | 'yin' | 'yang';

export interface Skill {
  id: string;
  name: string;
  nameTh: string;
  description: string;
  cooldown: number; // in turns
  currentCooldown: number;
  qiCost: number;
  targetType: 'single_enemy' | 'all_enemies' | 'single_ally' | 'all_allies' | 'self';
  powerMultiplier: number;
  effect?: {
    type: 'buff_atk' | 'buff_spd' | 'debuff_def' | 'heal' | 'stun' | 'dot' | 'cleanse' | 'shield';
    duration: number;
    value: number;
  };
  animation: 'slash' | 'palm' | 'dragon' | 'yin_yang' | 'heal' | 'lightning' | 'buff';
  soundType?: string;
}

export interface CharacterStats {
  hp: number;
  maxHp: number;
  qi: number; // Mana / Chi (0-100)
  maxQi: number;
  atk: number;
  def: number;
  spd: number; // Determines ATB gauge fill speed (Like Summoners War / Pokemon Speed)
  critRate: number; // 0.0 - 1.0
  critDmg: number; // 1.5 default
}

export interface Buff {
  id: string;
  type: 'buff_atk' | 'buff_spd' | 'debuff_def' | 'shield' | 'stun' | 'dot';
  name: string;
  duration: number;
  value: number;
  icon?: string;
}

export interface Hero {
  id: string;
  name: string;
  title: string;
  sect: 'พรรคกระยาจก' | 'สุสานโบราณ' | 'บู๊ตึ๊ง' | 'หัวซาน' | 'เส้าหลิน' | 'พรรคมาร / เม้งก่า' | 'เกาะดอกท้อ' | 'พุทธะ';
  element: ElementType;
  rarity: 3 | 4 | 5; // 5-star Gacha style
  level: number;
  exp: number;
  avatar: string; // Emoji or SVG character representation
  bgGradient: string;
  themeColor: string;
  stats: CharacterStats;
  currentAtb: number; // 0 to 100 (ATB gauge)
  skills: Skill[];
  buffs: Buff[];
  isEnemy?: boolean;
  isBoss?: boolean;
}

export interface DungeonStage {
  id: string;
  chapter: number;
  stageNum: number;
  name: string;
  subtitle: string;
  description: string;
  enemies: Omit<Hero, 'currentAtb' | 'buffs'>[];
  rewards: {
    exp: number;
    gold: number;
    summonScrolls?: number;
  };
}
