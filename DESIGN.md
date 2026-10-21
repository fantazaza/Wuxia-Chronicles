---
name: "Jin Yong ATB War — Summoners War Edition"
version: "2.1.0"
author: "Antigravity Design Engine (getdesign.md / getdesignsystem.io standard)"
license: "MIT"
description: "Design System and Token Specification for 3v3 ATB Turn-Based Wuxia RPG inspired by Summoners War: Sky Arena, utilizing Reicon (reicon.dev) iconography."

tokens:
  theme: "dark-fantasy-wuxia"
  viewport:
    orientation: "landscape-locked"
    aspect_ratio: "16:9"
    min_width: "800px"
    min_height: "480px"

  colors:
    # Summoners War Beveled Gold & Bronze Frames
    gold:
      50: "#fff9e6"
      100: "#ffecb3"
      200: "#ffd54f"
      300: "#f6c23e"
      400: "#f39c12"
      500: "#e67e22"
      600: "#d35400"
      700: "#b9770e"
      800: "#784212"
      900: "#4e2c0b"
      glow: "rgba(243, 156, 18, 0.45)"
      border: "#d4ac0d"
      bevel_light: "#f9e79f"
      bevel_dark: "#7d6608"

    # Dark Sky Island Stone & Slate Plating
    slate:
      900: "#0b0e14" # Deepest canvas
      850: "#0f141d" # Sky island background
      800: "#151b26" # Card & container surface
      700: "#1e293b" # Secondary surface
      600: "#2c3e50" # Bevel inner borders
      500: "#34495e" # Inactive buttons
      400: "#475569" # Subtitle text
      300: "#94a3b8" # Body text
      100: "#f8fafc" # Primary high-contrast text

    # Summoners War Combat Gauges
    hp:
      fill_top: "#55efc4"
      fill_bottom: "#00b894" # Iconic Lime Green
      border: "#006266"
      track: "rgba(0, 0, 0, 0.65)"
    
    atb:
      fill_top: "#74b9ff"
      fill_bottom: "#0984e3" # Iconic Sky Cyan
      border: "#0c2461"
      track: "rgba(0, 0, 0, 0.65)"
      glow: "rgba(116, 185, 255, 0.6)"

    # Five Elements
    elements:
      water:
        primary: "#3498db"
        glow: "rgba(52, 152, 219, 0.5)"
      wind:
        primary: "#2ecc71"
        glow: "rgba(46, 204, 113, 0.5)"
      fire:
        primary: "#e74c3c"
        glow: "rgba(231, 76, 60, 0.5)"
      earth:
        primary: "#e67e22"
        glow: "rgba(230, 126, 34, 0.5)"
      light:
        primary: "#f1c40f"
        glow: "rgba(241, 196, 15, 0.6)"
      dark:
        primary: "#9b59b6"
        glow: "rgba(155, 89, 182, 0.6)"

    # Combat Feedback
    status:
      damage_white: "#f5f6fa"
      damage_crit: "#ff3838"
      damage_element_adv: "#fffa65"
      heal: "#2ed573"
      shield: "#70a1ff"
      buff: "#ffbe76"
      debuff: "#eb4d4b"

  typography:
    fonts:
      primary: "'Noto Sans Thai', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      display: "'Cinzel', 'Noto Sans Thai', serif"
      numbers: "'Roboto Mono', 'Noto Sans Thai', monospace"
    weights:
      regular: 400
      semibold: 600
      bold: 700
      black: 900
    scale:
      xs: "10px"
      sm: "12px"
      md: "14px"
      lg: "16px"
      xl: "20px"
      2xl: "24px"
      3xl: "32px"
      hero: "40px"

  spacing:
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    5: "20px"
    6: "24px"
    8: "32px"
    10: "40px"

  radii:
    sm: "4px"
    md: "8px"
    lg: "12px"
    xl: "16px"
    pill: "9999px"
    circle: "50%"

  elevations:
    flat: "none"
    beveled_gold: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.6)"
    floating_hud: "0 8px 24px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(243, 156, 18, 0.3)"
    card_glow: "0 0 16px rgba(243, 156, 18, 0.35)"
    active_turn: "0 0 24px rgba(241, 196, 15, 0.8), 0 0 6px rgba(255, 255, 255, 0.9)"

  iconography:
    library: "Reicon (reicon.dev)"
    grid: "24x24"
    weights:
      default: "Filled"
      controls: "Outline"
    color_inheritance: "currentColor"
---

# Jin Yong ATB War — Design Specification (`DESIGN.md`)

## 1. Visual Identity & Game World
*Jin Yong ATB War* merges classical Eastern Wuxia martial arts (วิทยายุทธนิยายกิมย้ง: ก๊วยเจ๋ง, อึ้งย้ง, เอี้ยก้วย, เซียวเหล่งนึ่ง, เตียบ่อกี้) with the iconic, high-stakes tactical arena interface of **Summoners War: Sky Arena**.

### Core Visual Pillars:
1. **Summoners War Metallic Beveling**: All frames, badges, and modals use layered golden chamfers, burnished bronze accents, and deep navy-slate textured stone backdrops.
2. **Clean Overhead Floating Combat Bars**: No clutter on the ground. Health (Lime Green `#00b894`) and Action Time Bar (Sky Cyan `#74b9ff`) float over each hero and enemy dummy alongside element indicators.
3. **No Stars (`★`) Rule**: As per design mandate, monster rarity and stars are entirely removed. Unit tier and strength are communicated through level badges, elemental glow, and stat borders.
4. **Reicon Vector Iconography**: Pure handcrafted SVG icons powered by **Reicon (`reicon.dev`)** replace generic browser emojis across top bar, navigation, combat controls, and skill HUDs.

---

## 2. Reicon Icon Mapping Table (`reicon.dev`)

| UI Area | Concept / Action | Reicon Icon Name | Weight | Visual Treatment |
|---|---|---|---|---|
| **Top Bar** | Energy / Stamina (พลังงาน) | `flash` / `zap` | Filled | Gold glow `#f1c40f` |
| **Top Bar** | Glory / Wings (ปีกประลอง) | `medal` / `award` | Filled | Crimson glow `#e74c3c` |
| **Top Bar** | Mana Stones (มานาสโตน) | `coin` / `coins` | Filled | Ocean Cyan `#3498db` |
| **Top Bar** | Crystals (คริสตัล) | `gem` / `diamond` | Filled | Violet Amethyst `#9b59b6` |
| **Top Bar** | Add / Plus (เติมพลังงาน) | `add` | Outline | Subtle gold `#f9e79f` |
| **Bottom Dock** | Practice / Dummy (ห้องซ้อม) | `activity` | Filled | Circular gold frame |
| **Bottom Dock** | Campaign / Scrolls (คัมภีร์) | `book` / `document` | Filled | Ancient scroll aesthetic |
| **Bottom Dock** | Altar Summon (แท่นอัญเชิญ) | `sparkle` | Filled | Alchemical aura |
| **Bottom Dock** | Giant BATTLE Button | `sword` / `swords` | Filled | 36px hero centerpiece |
| **Battle Controls** | Auto Battle (อัตโนมัติ) | `play` | Filled | Toggle active state `#2ecc71` |
| **Battle Controls** | Action Speed 1x/2x/3x | `forward` | Filled | Speed cycle badge |
| **Battle Controls** | Pause Battle (หยุดเวลา) | `pause` | Filled | Slate circle |
| **Battle Controls** | Flee / Retreat (ถอนตัว) | `logout` | Outline | Red indicator `#e74c3c` |
| **Battle Controls** | Sandbox Tools (เครื่องมือ) | `sliders` / `settings` | Filled | Gold mechanic |
| **Battle DPS** | Reset Statistics (ล้างสถิติ) | `refresh-2` | Outline | Subtle micro-interaction |
| **Target Banner** | Combat Aim Target (ชี้เป้า) | `target` | Filled | Pulsing crimson `#e74c3c` |
| **Orientation** | Rotate Prompt (หมุนจอ) | `arrows-rotate` | Outline | Floating landscape helper |

---

## 3. UI Component Anatomy

### 3.1 Top Profile & Currencies Bar (`.sw-top-bar`)
- **Avatar Ring**: 48px circle with a multi-layered gold beveled bezel (`box-shadow: inset 0 2px 4px rgba(255,255,255,0.4)`). Embedded level badge (`Lv.50`) at the bottom-right corner.
- **Currencies Grid**: Horizontal pills (`.sw-cur-item`) with recessed dark glass backdrops (`rgba(10, 14, 22, 0.75)`), Reicon currency tokens, and a mini gold `+` button.

### 3.2 Sky Island Pedestals (`.sw-pedestals-container`)
- Three floating 3D rock podiums displaying current defense/attack party members in full isometric perspective.
- Unit badges show Character Name, Level `[Lv.50]`, and Elemental Symbol. **Zero stars rendered.**

### 3.3 Giant Battle CTA Button (`.sw-big-battle-btn`)
- Located at bottom-right corner, protruding with deep red-to-amber radial gradient, heavy beveled gold ring, pulsating back-glow, and high-impact `BATTLE` typography with Reicon dual swords.

### 3.4 Floating Combat Overhead Bar (`.sw-overhead-bar`)
- Positioned strictly above the 3D sprite (`position: absolute; top: -38px; left: 50%; transform: translateX(-50%);`).
- Left badge: Elemental Tag + Level `[💧 40]`.
- Stacked bars:
  - **HP Fill**: Dual gradient `#55efc4` to `#00b894` (Lime Green).
  - **ATB Fill**: Dual gradient `#74b9ff` to `#0984e3` (Sky Cyan) displaying turn acceleration in real-time.
- Buff/Debuff Icons: Row of 16px mini badges directly underneath the ATB bar.

### 3.5 Bottom-Right Circular Skill Dock (`.sw-skill-hud`)
- Four 56px circular buttons with golden bezels arranged in a curved dock.
- Skill 1: Basic Strike (0 Qi).
- Skill 2: Tactical Technique (Cooldown 2-3 turns).
- Skill 3: Ultimate Secret Art (Qi 50-70, Cooldown 4 turns).
- Skill 4: Awakening Passive / Support Buff.
- Cooldown Overlay: Dark radial mask displaying remaining turns (`CD 2`).

### 3.6 Interactive Targeting System
- **Offensive Moves (`targetType: 'enemy'`)**: Player clicks on Enemy Dummy (`.dummy-unit.targetable-enemy`). Shows red 3D hover arrow and cursor crosshair.
- **Support / Healing Moves (`targetType: 'ally'` or `'self'`)**: Player clicks on Ally Hero card or self. Shows jade green aura and cursor wand.

---

## 4. Responsive & Orientation Standard
- **Forced Landscape**: On devices held in portrait mode, a non-intrusive backdrop with `rotate-device-prompt` is triggered requesting horizontal orientation.
- **Responsive Fluid Scale**: Dynamic `clamp()` typography and percentages guarantee crisp rendering from 1080p desktop monitors down to 5.5-inch mobile displays.

---

## 5. Audio-Visual Feedback System
- **Web Audio Synthesis**: Pure procedural audio synthesis via Web Audio API oscillators:
  - *Dragon Roar Strike* (Square wave sub-bass ramp)
  - *Dog Beating Stick* (High-frequency ping-pong click)
  - *Peach Blossom Melody* (Sine harmonic chord stack)
  - *Heavy Sandbag Thud* (Low-pass filtered brown noise pulse)
- **Floating Numbers**:
  - Regular damage: Pop-up floating white numbers.
  - Critical strike: 1.5x scale red comic impact with camera shake.
  - Elemental advantage: Golden electric spark.
