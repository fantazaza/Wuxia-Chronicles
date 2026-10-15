import React from 'react';

// Highly-detailed Pixel Art Character Sprites rendered with clean SVG
// Each character has: Hair, Headband/Band, Robe/Attire, Weapon/Hand Effect, Belt, Eyes, Shadow
export const PIXEL_HEROES: Record<string, React.FC<{ size?: number; className?: string; isAttacking?: boolean }>> = {
  // ก๊วยเจ๋ง (Guo Jing) - ชุดหนังมองโกล/จอมยุทธพรรคกระยาจก แถบคาดหัวสีทอง ลายมังกร
  guo_jing: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      {/* Shadow */}
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Hair & Top Knot */}
      <rect x="13" y="3" width="6" height="3" fill="#1e1b18" />
      <rect x="14" y="2" width="4" height="2" fill="#d97706" /> {/* Golden hairband */}
      <rect x="11" y="5" width="10" height="4" fill="#292524" />
      <rect x="10" y="7" width="12" height="4" fill="#292524" />
      
      {/* Face & Skin */}
      <rect x="12" y="8" width="8" height="6" fill="#fcd34d" />
      <rect x="13" y="10" width="2" height="2" fill="#0f172a" /> {/* Left Eye */}
      <rect x="17" y="10" width="2" height="2" fill="#0f172a" /> {/* Right Eye */}
      <rect x="14" y="13" width="4" height="1" fill="#b45309" /> {/* Mouth */}
      
      {/* Robe / Chest (Earthy Brown & Gold Trim) */}
      <rect x="11" y="14" width="10" height="8" fill="#78350f" />
      <rect x="14" y="14" width="4" height="8" fill="#d97706" /> {/* Golden Dragon inner vest */}
      
      {/* Arms & Dragon Aura Fist */}
      <rect x="8" y="15" width="3" height="6" fill="#78350f" />
      <rect x="8" y="20" width="3" height="3" fill="#fcd34d" /> {/* Left Fist */}
      
      <rect x="21" y="15" width="3" height="6" fill="#78350f" />
      <rect x="21" y="19" width="4" height="4" fill="#f59e0b" /> {/* Right Fist with Dragon Qi */}
      <rect x="23" y="18" width="3" height="3" fill="#fbbf24" /> {/* Qi Glow */}
      
      {/* Belt */}
      <rect x="11" y="21" width="10" height="2" fill="#f59e0b" />
      <rect x="15" y="21" width="2" height="2" fill="#ffffff" />
      
      {/* Legs & Boots */}
      <rect x="12" y="23" width="3" height="6" fill="#451a03" />
      <rect x="17" y="23" width="3" height="6" fill="#451a03" />
      <rect x="11" y="28" width="4" height="2" fill="#1c1917" />
      <rect x="17" y="28" width="4" height="2" fill="#1c1917" />
    </svg>
  ),

  // เอี้ยก้วย (Yang Guo) - จอมยุทธแขนเดียว ชุดคลุมเทาหม่น สะพายกระบี่หนักเหล็กดำ
  yang_guo: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Heavy Giant Iron Sword on back */}
      <rect x="22" y="4" width="4" height="22" fill="#334155" />
      <rect x="23" y="2" width="2" height="4" fill="#64748b" /> {/* Hilt */}
      <rect x="21" y="6" width="6" height="2" fill="#0f172a" /> {/* Guard */}
      
      {/* White streak Hair (ผมขาวแซม) */}
      <rect x="12" y="4" width="8" height="5" fill="#334155" />
      <rect x="11" y="6" width="2" height="6" fill="#f8fafc" /> {/* White hair strand */}
      <rect x="13" y="5" width="2" height="3" fill="#f8fafc" />
      <rect x="19" y="6" width="3" height="6" fill="#334155" />
      
      {/* Face & Sharp Eye */}
      <rect x="12" y="9" width="8" height="6" fill="#fed7aa" />
      <rect x="13" y="11" width="2" height="2" fill="#1e1b4b" />
      <rect x="17" y="11" width="2" height="2" fill="#1e1b4b" />
      <rect x="14" y="14" width="4" height="1" fill="#9a3412" />
      
      {/* Dark Robe (สุสานโบราณ/พเนจร) */}
      <rect x="11" y="15" width="10" height="8" fill="#312e81" />
      <rect x="14" y="15" width="4" height="8" fill="#4338ca" />
      
      {/* Empty Sleeve on Left (แขนเสื้อขาดข้างซ้าย) */}
      <rect x="8" y="16" width="3" height="4" fill="#312e81" />
      
      {/* Right Arm (Heavy punch hand) */}
      <rect x="21" y="16" width="3" height="6" fill="#312e81" />
      <rect x="21" y="21" width="3" height="3" fill="#fed7aa" />
      
      {/* Belt */}
      <rect x="11" y="22" width="10" height="2" fill="#6366f1" />
      
      {/* Legs & Boots */}
      <rect x="12" y="24" width="3" height="5" fill="#1e1b4b" />
      <rect x="17" y="24" width="3" height="5" fill="#1e1b4b" />
      <rect x="11" y="28" width="4" height="2" fill="#020617" />
      <rect x="17" y="28" width="4" height="2" fill="#020617" />
    </svg>
  ),

  // เล่งฮู้ชง (Linghu Chong) - กระบี่หัวซาน + น้ำเต้าสุราติดเอว
  linghu_chong: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Thin Dugu Nine Sword in Hand */}
      <rect x="5" y="6" width="1" height="18" fill="#38bdf8" /> {/* Glowing Cyan Blade */}
      <rect x="4" y="22" width="3" height="1" fill="#f59e0b" />
      <rect x="5" y="23" width="1" height="3" fill="#78350f" />
      
      {/* Wild Hair & Blue Ribbon */}
      <rect x="12" y="3" width="8" height="4" fill="#18181b" />
      <rect x="10" y="5" width="12" height="4" fill="#18181b" />
      <rect x="18" y="2" width="3" height="6" fill="#0284c7" /> {/* Blue hair ribbon */}
      
      {/* Face & Smirk */}
      <rect x="12" y="8" width="8" height="6" fill="#fde047" />
      <rect x="13" y="10" width="2" height="2" fill="#0f172a" />
      <rect x="17" y="10" width="2" height="2" fill="#0f172a" />
      <rect x="15" y="13" width="3" height="1" fill="#b45309" /> {/* Smirk */}
      
      {/* Green/Teal Huashan Robe */}
      <rect x="11" y="14" width="10" height="8" fill="#065f46" />
      <rect x="14" y="14" width="4" height="8" fill="#f8fafc" /> {/* White inner lapel */}
      
      {/* Wine Gourd (น้ำเต้าสุราสีแดง/ทอง) */}
      <rect x="7" y="18" width="4" height="3" fill="#b91c1c" />
      <rect x="8" y="16" width="2" height="2" fill="#b91c1c" />
      <rect x="8" y="15" width="2" height="1" fill="#f59e0b" />
      
      {/* Right Arm */}
      <rect x="21" y="15" width="3" height="6" fill="#065f46" />
      <rect x="21" y="20" width="3" height="3" fill="#fde047" />
      
      {/* Belt */}
      <rect x="11" y="21" width="10" height="2" fill="#0284c7" />
      
      {/* Pants & Shoes */}
      <rect x="12" y="23" width="3" height="6" fill="#0f172a" />
      <rect x="17" y="23" width="3" height="6" fill="#0f172a" />
      <rect x="11" y="28" width="4" height="2" fill="#334155" />
      <rect x="17" y="28" width="4" height="2" fill="#334155" />
    </svg>
  ),

  // เซียวเหล่งนึ่ง (Xiaolongnv) - ชุดขาวบริสุทธิ์ แพรไหมหยก
  xiaolongnv: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.3)" />
      
      {/* Long Flowing Black Hair */}
      <rect x="12" y="2" width="8" height="4" fill="#0f172a" />
      <rect x="9" y="5" width="14" height="6" fill="#0f172a" />
      <rect x="8" y="10" width="3" height="12" fill="#0f172a" />
      <rect x="21" y="10" width="3" height="12" fill="#0f172a" />
      <rect x="14" y="3" width="4" height="2" fill="#e0f2fe" /> {/* Jade Hairpin */}
      
      {/* Pale Fair Face */}
      <rect x="12" y="7" width="8" height="6" fill="#fef08a" />
      <rect x="13" y="9" width="2" height="2" fill="#0284c7" />
      <rect x="17" y="9" width="2" height="2" fill="#0284c7" />
      <rect x="14" y="12" width="4" height="1" fill="#f43f5e" /> {/* Pink lips */}
      
      {/* Pure White Silk Dress */}
      <rect x="11" y="13" width="10" height="10" fill="#f8fafc" />
      <rect x="14" y="13" width="4" height="10" fill="#e0f2fe" />
      
      {/* Floating Silk Ribbons (แพรขาวพริ้วไหว) */}
      <rect x="6" y="14" width="4" height="8" fill="#e0f2fe" />
      <rect x="22" y="14" width="4" height="8" fill="#e0f2fe" />
      
      {/* Belt */}
      <rect x="11" y="20" width="10" height="2" fill="#38bdf8" />
      
      {/* Skirt Base */}
      <rect x="10" y="23" width="12" height="6" fill="#f8fafc" />
      <rect x="11" y="29" width="10" height="1" fill="#cbd5e1" />
    </svg>
  ),

  // ตงฟางปุ๊ป้าย (Dongfang Bubai) - เสื้อคลุมแดงทอง ซัดเข็มปักไหม
  dongfang_bubai: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Red Embroidery Needle & Threads (สายไหมทองและเข็มแดง) */}
      <rect x="3" y="10" width="8" height="1" fill="#ef4444" />
      <rect x="2" y="9" width="2" height="3" fill="#fbbf24" />
      <rect x="22" y="8" width="7" height="1" fill="#ef4444" />
      
      {/* Hair & High Crown */}
      <rect x="13" y="1" width="6" height="4" fill="#fbbf24" /> {/* Golden Crown */}
      <rect x="11" y="4" width="10" height="5" fill="#09090b" />
      <rect x="9" y="8" width="3" height="10" fill="#09090b" />
      <rect x="20" y="8" width="3" height="10" fill="#09090b" />
      
      {/* Face & Seductive Red Eyes */}
      <rect x="12" y="8" width="8" height="6" fill="#fef08a" />
      <rect x="13" y="10" width="2" height="2" fill="#be123c" />
      <rect x="17" y="10" width="2" height="2" fill="#be123c" />
      <rect x="14" y="13" width="4" height="1" fill="#dc2626" />
      
      {/* Imperial Crimson & Gold Robe */}
      <rect x="11" y="14" width="10" height="9" fill="#991b1b" />
      <rect x="13" y="14" width="6" height="9" fill="#e11d48" />
      <rect x="15" y="14" width="2" height="9" fill="#fbbf24" />
      
      {/* Hands holding Red Needle */}
      <rect x="8" y="15" width="3" height="5" fill="#991b1b" />
      <rect x="7" y="19" width="3" height="3" fill="#fef08a" />
      <rect x="21" y="15" width="3" height="5" fill="#991b1b" />
      <rect x="22" y="19" width="3" height="3" fill="#fef08a" />
      
      {/* Belt */}
      <rect x="11" y="21" width="10" height="2" fill="#f59e0b" />
      
      {/* Crimson Skirt */}
      <rect x="10" y="23" width="12" height="6" fill="#881337" />
      <rect x="11" y="29" width="10" height="1" fill="#4c0519" />
    </svg>
  ),

  // เตียบ่อกี้ (Zhang Wuji) - ยันต์สุริยันเก้าเอี๊ยง เปลวเพลิงหมุนวน
  zhang_wuji: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Top Hair Bun */}
      <rect x="13" y="3" width="6" height="3" fill="#18181b" />
      <rect x="14" y="2" width="4" height="2" fill="#ef4444" /> {/* Red band */}
      <rect x="11" y="6" width="10" height="3" fill="#18181b" />
      
      {/* Face */}
      <rect x="12" y="8" width="8" height="6" fill="#fde047" />
      <rect x="13" y="10" width="2" height="2" fill="#451a03" />
      <rect x="17" y="10" width="2" height="2" fill="#451a03" />
      <rect x="14" y="13" width="4" height="1" fill="#b45309" />
      
      {/* Flame Robe (เม้งก่า) */}
      <rect x="11" y="14" width="10" height="8" fill="#7f1d1d" />
      <rect x="14" y="14" width="4" height="8" fill="#ea580c" />
      
      {/* Fire Qi Balls around hands */}
      <rect x="7" y="18" width="4" height="4" fill="#f97316" />
      <rect x="8" y="19" width="2" height="2" fill="#fef08a" />
      <rect x="21" y="18" width="4" height="4" fill="#f97316" />
      <rect x="22" y="19" width="2" height="2" fill="#fef08a" />
      
      {/* Belt */}
      <rect x="11" y="21" width="10" height="2" fill="#f97316" />
      
      {/* Legs */}
      <rect x="12" y="23" width="3" height="6" fill="#1c1917" />
      <rect x="17" y="23" width="3" height="6" fill="#1c1917" />
      <rect x="11" y="28" width="4" height="2" fill="#451a03" />
      <rect x="17" y="28" width="4" height="2" fill="#451a03" />
    </svg>
  ),

  // อึ้งเอียะซือ (Huang Yaoshi) - ถือขลุ่ยหยก เสื้อคลุมเขียวมรกต
  huang_yaoshi: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Jade Flute (ขลุ่ยหยกมรกต) */}
      <rect x="6" y="12" width="12" height="2" fill="#10b981" />
      <rect x="8" y="11" width="2" height="1" fill="#ecfdf5" />
      
      {/* Grey scholar hair */}
      <rect x="12" y="3" width="8" height="4" fill="#475569" />
      <rect x="10" y="6" width="12" height="4" fill="#475569" />
      
      {/* Face */}
      <rect x="12" y="8" width="8" height="6" fill="#fde047" />
      <rect x="13" y="10" width="2" height="2" fill="#064e3b" />
      <rect x="17" y="10" width="2" height="2" fill="#064e3b" />
      
      {/* Emerald Green Scholar Robe */}
      <rect x="11" y="14" width="10" height="9" fill="#064e3b" />
      <rect x="14" y="14" width="4" height="9" fill="#059669" />
      
      {/* Belt */}
      <rect x="11" y="22" width="10" height="2" fill="#10b981" />
      
      {/* Robe bottom */}
      <rect x="11" y="24" width="10" height="5" fill="#064e3b" />
      <rect x="12" y="28" width="3" height="2" fill="#0f172a" />
      <rect x="17" y="28" width="3" height="2" fill="#0f172a" />
    </svg>
  ),

  // นักพรตช้วนจิน (Quanzhen Taoist)
  zhao_zhijing: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Taoist Top Hair & Hairpin */}
      <rect x="14" y="2" width="4" height="3" fill="#1e293b" />
      <rect x="12" y="3" width="8" height="1" fill="#f59e0b" />
      <rect x="11" y="5" width="10" height="4" fill="#1e293b" />
      
      {/* Face */}
      <rect x="12" y="8" width="8" height="6" fill="#fef08a" />
      <rect x="13" y="10" width="2" height="2" fill="#1e3a8a" />
      <rect x="17" y="10" width="2" height="2" fill="#1e3a8a" />
      <rect x="14" y="13" width="4" height="1" fill="#78350f" />
      
      {/* Taoist Robe (Blue/Grey with YinYang) */}
      <rect x="11" y="14" width="10" height="9" fill="#1e3a8a" />
      <rect x="14" y="14" width="4" height="9" fill="#f8fafc" />
      <rect x="15" y="17" width="2" height="2" fill="#0f172a" /> {/* Mini YinYang */}
      
      {/* Sword in Hand */}
      <rect x="23" y="10" width="2" height="15" fill="#94a3b8" />
      <rect x="21" y="20" width="5" height="2" fill="#d97706" />
      
      {/* Belt */}
      <rect x="11" y="22" width="10" height="2" fill="#d97706" />
      
      {/* Boots */}
      <rect x="12" y="25" width="3" height="4" fill="#0f172a" />
      <rect x="17" y="25" width="3" height="4" fill="#0f172a" />
    </svg>
  ),

  // โจรทะเลทราย (Bandit Leader)
  bandit_leader: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Red Headwrap / Scarf */}
      <rect x="11" y="4" width="10" height="6" fill="#991b1b" />
      <rect x="9" y="8" width="4" height="8" fill="#991b1b" />
      
      {/* Face & Eye Patch */}
      <rect x="12" y="8" width="8" height="6" fill="#d97706" />
      <rect x="13" y="10" width="2" height="2" fill="#0f172a" /> {/* Eye Patch */}
      <rect x="17" y="10" width="2" height="2" fill="#fef08a" />
      <rect x="14" y="13" width="5" height="1" fill="#451a03" /> {/* Beard */}
      
      {/* Bandit Armor & Scimitar */}
      <rect x="11" y="14" width="10" height="8" fill="#451a03" />
      <rect x="13" y="14" width="6" height="8" fill="#78350f" />
      
      {/* Big Curved Scimitar Sword */}
      <rect x="4" y="12" width="4" height="12" fill="#e2e8f0" />
      <rect x="3" y="10" width="3" height="3" fill="#cbd5e1" />
      
      {/* Belt */}
      <rect x="11" y="21" width="10" height="2" fill="#991b1b" />
      
      {/* Boots */}
      <rect x="12" y="23" width="3" height="6" fill="#1c1917" />
      <rect x="17" y="23" width="3" height="6" fill="#1c1917" />
    </svg>
  ),

  // จางซานฟง (Zhang Sanfeng) - ปรมาจารย์ไท้เก๊ก เคราขาวยาว มุ่นมวยผมเต๋า หมุนพลังหยินหยาง
  zhang_sanfeng: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* White Hair Bun & Hairpin */}
      <rect x="14" y="2" width="4" height="3" fill="#e2e8f0" />
      <rect x="12" y="3" width="8" height="1" fill="#d97706" />
      <rect x="11" y="5" width="10" height="5" fill="#f1f5f9" />
      
      {/* Face */}
      <rect x="12" y="8" width="8" height="6" fill="#fde047" />
      <rect x="13" y="10" width="2" height="1" fill="#1e293b" /> {/* Gentle Eyes */}
      <rect x="17" y="10" width="2" height="1" fill="#1e293b" />
      
      {/* Long Flowing White Beard */}
      <rect x="13" y="13" width="6" height="5" fill="#f8fafc" />
      <rect x="14" y="18" width="4" height="3" fill="#e2e8f0" />
      <rect x="15" y="21" width="2" height="2" fill="#cbd5e1" />
      
      {/* Grandmaster Tai Chi Robe (Black/White/Gold Yin-Yang theme) */}
      <rect x="10" y="14" width="12" height="9" fill="#1e293b" />
      <rect x="13" y="14" width="6" height="9" fill="#f8fafc" />
      <rect x="15" y="16" width="2" height="3" fill="#ca8a04" />
      
      {/* Yin-Yang Energy Spheres in Hands */}
      <rect x="6" y="16" width="4" height="4" fill="#0f172a" />
      <rect x="7" y="17" width="2" height="2" fill="#e2e8f0" />
      <rect x="22" y="16" width="4" height="4" fill="#f8fafc" />
      <rect x="23" y="17" width="2" height="2" fill="#0f172a" />
      
      {/* Belt */}
      <rect x="11" y="22" width="10" height="2" fill="#ca8a04" />
      
      {/* Robe Bottom */}
      <rect x="10" y="24" width="12" height="5" fill="#1e293b" />
      <rect x="12" y="29" width="3" height="2" fill="#0f172a" />
      <rect x="17" y="29" width="3" height="2" fill="#0f172a" />
    </svg>
  ),

  // ต้วนอี้ (Duan Yu) - องค์ชายต้าหลี่ มงกุฎหยกทอง นิ้วปล่อยดรรชนีกระบี่หกชีพจร
  duan_yu: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Six Meridian Laser Beams from Finger */}
      <rect x="24" y="6" width="6" height="1" fill="#38bdf8" />
      <rect x="23" y="7" width="7" height="1" fill="#60a5fa" />
      <rect x="25" y="8" width="5" height="1" fill="#93c5fd" />
      
      {/* Golden Prince Crown & Dark Hair */}
      <rect x="13" y="2" width="6" height="3" fill="#eab308" />
      <rect x="15" y="1" width="2" height="2" fill="#38bdf8" /> {/* Jade Gem on Crown */}
      <rect x="11" y="5" width="10" height="4" fill="#0f172a" />
      <rect x="10" y="7" width="12" height="4" fill="#0f172a" />
      
      {/* Handsome Face */}
      <rect x="12" y="8" width="8" height="6" fill="#fef08a" />
      <rect x="13" y="10" width="2" height="2" fill="#1e3a8a" />
      <rect x="17" y="10" width="2" height="2" fill="#1e3a8a" />
      <rect x="14" y="13" width="4" height="1" fill="#e11d48" />
      
      {/* Royal Dali Blue & Gold Silk Robe */}
      <rect x="11" y="14" width="10" height="8" fill="#1d4ed8" />
      <rect x="14" y="14" width="4" height="8" fill="#93c5fd" />
      <rect x="15" y="14" width="2" height="8" fill="#facc15" />
      
      {/* Left Arm / Sleeve */}
      <rect x="8" y="15" width="3" height="6" fill="#1d4ed8" />
      <rect x="8" y="20" width="3" height="3" fill="#fef08a" />
      
      {/* Right Arm Pointing Finger (Six Meridian Sword Stance) */}
      <rect x="21" y="14" width="4" height="3" fill="#1d4ed8" />
      <rect x="23" y="10" width="2" height="5" fill="#fef08a" /> {/* Pointing index finger */}
      <rect x="24" y="9" width="1" height="2" fill="#67e8f9" /> {/* Qi at fingertip */}
      
      {/* Belt */}
      <rect x="11" y="21" width="10" height="2" fill="#facc15" />
      
      {/* Skirt & Shoes */}
      <rect x="12" y="23" width="3" height="6" fill="#1e3a8a" />
      <rect x="17" y="23" width="3" height="6" fill="#1e3a8a" />
      <rect x="11" y="28" width="4" height="2" fill="#0f172a" />
      <rect x="17" y="28" width="4" height="2" fill="#0f172a" />
    </svg>
  ),

  // เฉียวฟง (Qiao Feng) - ประมุขพรรคกระยาจก ผมยาวสยาย ผ้าคาดหัว หมัดเพลิงสยบมังกร
  qiao_feng: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Wild Heroic Mane Hair & Red Headband */}
      <rect x="10" y="2" width="12" height="4" fill="#1c1917" />
      <rect x="9" y="5" width="14" height="2" fill="#b91c1c" /> {/* Red Warrior Headband */}
      <rect x="8" y="7" width="16" height="5" fill="#1c1917" />
      <rect x="7" y="12" width="3" height="7" fill="#1c1917" />
      <rect x="22" y="12" width="3" height="7" fill="#1c1917" />
      
      {/* Brave & Fierce Face with Stubble/Beard */}
      <rect x="12" y="7" width="8" height="7" fill="#fed7aa" />
      <rect x="13" y="9" width="2" height="2" fill="#451a03" />
      <rect x="17" y="9" width="2" height="2" fill="#451a03" />
      <rect x="13" y="12" width="6" height="2" fill="#78350f" /> {/* Fierce beard */}
      
      {/* Beggar Sect Hero Robe (Rugged Brown with Gold patches) */}
      <rect x="10" y="14" width="12" height="9" fill="#78350f" />
      <rect x="13" y="14" width="6" height="9" fill="#9a3412" />
      <rect x="15" y="16" width="2" height="2" fill="#d97706" />
      
      {/* Left Mighty Arm */}
      <rect x="7" y="15" width="3" height="6" fill="#78350f" />
      <rect x="7" y="20" width="3" height="3" fill="#fed7aa" />
      
      {/* Right Arm with Fiery Dragon Fist */}
      <rect x="21" y="15" width="4" height="5" fill="#78350f" />
      <rect x="22" y="18" width="4" height="4" fill="#ea580c" />
      <rect x="24" y="17" width="3" height="3" fill="#facc15" /> {/* Fire flare */}
      <rect x="25" y="16" width="2" height="2" fill="#ef4444" />
      
      {/* Sash / Belt */}
      <rect x="10" y="22" width="12" height="2" fill="#b91c1c" />
      
      {/* Legs & Rugged Boots */}
      <rect x="11" y="24" width="4" height="5" fill="#431407" />
      <rect x="17" y="24" width="4" height="5" fill="#431407" />
      <rect x="10" y="28" width="5" height="2" fill="#1c1917" />
      <rect x="17" y="28" width="5" height="2" fill="#1c1917" />
    </svg>
  ),

  // มือมีดบินทมิฬ (Bandit Knife Thrower)
  bandit_1: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Flying Daggers in Air */}
      <rect x="3" y="14" width="4" height="1" fill="#cbd5e1" />
      <rect x="7" y="13" width="2" height="3" fill="#64748b" />
      <rect x="25" y="11" width="4" height="1" fill="#cbd5e1" />
      
      {/* Ninja/Bandit Mask & Cowl (Dark Green/Stone) */}
      <rect x="11" y="4" width="10" height="8" fill="#14532d" />
      <rect x="10" y="6" width="12" height="6" fill="#14532d" />
      
      {/* Sharp Eyes Peeking Through Mask */}
      <rect x="12" y="8" width="8" height="3" fill="#fed7aa" />
      <rect x="13" y="9" width="2" height="1" fill="#dc2626" />
      <rect x="17" y="9" width="2" height="1" fill="#dc2626" />
      
      {/* Desert Bandit Assassin Tunic */}
      <rect x="11" y="13" width="10" height="9" fill="#14532d" />
      <rect x="13" y="13" width="6" height="9" fill="#166534" />
      
      {/* Arms holding Throwing Knives */}
      <rect x="8" y="15" width="3" height="5" fill="#14532d" />
      <rect x="7" y="18" width="2" height="4" fill="#94a3b8" /> {/* Dagger */}
      <rect x="21" y="15" width="3" height="5" fill="#14532d" />
      <rect x="23" y="18" width="2" height="4" fill="#94a3b8" />
      
      {/* Belt with knife pouches */}
      <rect x="11" y="21" width="10" height="2" fill="#0f172a" />
      <rect x="13" y="21" width="2" height="2" fill="#854d0e" />
      <rect x="17" y="21" width="2" height="2" fill="#854d0e" />
      
      {/* Agile Pants & Boots */}
      <rect x="12" y="23" width="3" height="6" fill="#0f172a" />
      <rect x="17" y="23" width="3" height="6" fill="#0f172a" />
      <rect x="11" y="28" width="4" height="2" fill="#14532d" />
      <rect x="17" y="28" width="4" height="2" fill="#14532d" />
    </svg>
  ),

  // หมอพิษภูเขาหิมะ (Poison Doctor)
  bandit_doctor: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Poison Mist / Flask Bubbles */}
      <rect x="24" y="12" width="3" height="3" fill="#a855f7" />
      <rect x="26" y="9" width="2" height="2" fill="#c084fc" />
      <rect x="23" y="7" width="2" height="2" fill="#e9d5ff" />
      
      {/* Conical Straw/Poisoner Hat */}
      <polygon points="16,2 8,8 24,8" fill="#0f766e" />
      <rect x="7" y="8" width="18" height="2" fill="#134e4a" />
      
      {/* Face & Sinister Expression */}
      <rect x="12" y="9" width="8" height="5" fill="#e0e7ff" />
      <rect x="13" y="10" width="2" height="2" fill="#047857" />
      <rect x="17" y="10" width="2" height="2" fill="#047857" />
      <rect x="14" y="13" width="4" height="1" fill="#4c1d95" />
      
      {/* Deep Teal & Purple Poison Alchemist Robe */}
      <rect x="11" y="14" width="10" height="9" fill="#0f766e" />
      <rect x="14" y="14" width="4" height="9" fill="#7e22ce" />
      
      {/* Left Hand Holding Poison Needle */}
      <rect x="8" y="16" width="3" height="5" fill="#0f766e" />
      <rect x="7" y="19" width="1" height="5" fill="#a855f7" />
      
      {/* Right Hand Holding Potion Gourd/Flask */}
      <rect x="21" y="15" width="3" height="5" fill="#0f766e" />
      <rect x="23" y="17" width="4" height="5" fill="#6b21a8" />
      <rect x="24" y="15" width="2" height="2" fill="#22c55e" /> {/* Poison Liquid */}
      
      {/* Belt with vials */}
      <rect x="11" y="22" width="10" height="2" fill="#134e4a" />
      
      {/* Robe Bottom */}
      <rect x="11" y="24" width="10" height="5" fill="#042f2e" />
      <rect x="12" y="28" width="3" height="2" fill="#020617" />
      <rect x="17" y="28" width="3" height="2" fill="#020617" />
    </svg>
  ),

  // นักพรตกระบี่วายุ (Quanzhen Disciple)
  quanzhen_disciple_1: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Swift Wind Sword in Hand */}
      <rect x="23" y="7" width="2" height="17" fill="#67e8f9" />
      <rect x="22" y="22" width="4" height="2" fill="#0284c7" />
      <rect x="23" y="24" width="2" height="3" fill="#1e293b" />
      
      {/* Taoist Hair Topknot with Wooden Pin */}
      <rect x="14" y="3" width="4" height="3" fill="#1e293b" />
      <rect x="13" y="4" width="6" height="1" fill="#78350f" />
      <rect x="11" y="6" width="10" height="3" fill="#1e293b" />
      
      {/* Face */}
      <rect x="12" y="8" width="8" height="6" fill="#fef08a" />
      <rect x="13" y="10" width="2" height="2" fill="#0369a1" />
      <rect x="17" y="10" width="2" height="2" fill="#0369a1" />
      
      {/* Cyan/Blue Wind Taoist Robe */}
      <rect x="11" y="14" width="10" height="9" fill="#0284c7" />
      <rect x="14" y="14" width="4" height="9" fill="#f8fafc" />
      
      {/* Left Sleeve */}
      <rect x="8" y="15" width="3" height="6" fill="#0284c7" />
      <rect x="8" y="20" width="3" height="3" fill="#fef08a" />
      
      {/* Belt */}
      <rect x="11" y="22" width="10" height="2" fill="#075985" />
      
      {/* Boots */}
      <rect x="12" y="24" width="3" height="5" fill="#0f172a" />
      <rect x="17" y="24" width="3" height="5" fill="#0f172a" />
      <rect x="11" y="28" width="4" height="2" fill="#1e293b" />
      <rect x="17" y="28" width="4" height="2" fill="#1e293b" />
    </svg>
  ),

  // เต๋าลมปราณบริสุทธิ์ (Quanzhen Elder)
  quanzhen_elder: ({ size = 64, className = '', isAttacking = false }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${className} ${isAttacking ? 'scale-110' : ''}`}
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.4)" />
      
      {/* Taoist Whisks / Horsetail Whisk (แส้ม้าปัดมาร) */}
      <rect x="6" y="9" width="2" height="10" fill="#78350f" />
      <rect x="4" y="7" width="5" height="4" fill="#f8fafc" />
      <rect x="3" y="10" width="4" height="8" fill="#e2e8f0" />
      
      {/* Grey Taoist Bun with Golden Hairpin */}
      <rect x="14" y="2" width="4" height="3" fill="#64748b" />
      <rect x="12" y="3" width="8" height="1" fill="#eab308" />
      <rect x="11" y="5" width="10" height="4" fill="#64748b" />
      
      {/* Face & White Beard */}
      <rect x="12" y="8" width="8" height="6" fill="#fef08a" />
      <rect x="13" y="10" width="2" height="1" fill="#0f172a" />
      <rect x="17" y="10" width="2" height="1" fill="#0f172a" />
      <rect x="13" y="13" width="6" height="4" fill="#f8fafc" />
      
      {/* High Taoist Golden & White Robe with Eight Trigrams Aura */}
      <rect x="10" y="14" width="12" height="9" fill="#ca8a04" />
      <rect x="13" y="14" width="6" height="9" fill="#fef08a" />
      <rect x="15" y="16" width="2" height="2" fill="#1e293b" />
      
      {/* Left Hand Holding Whisk */}
      <rect x="7" y="15" width="3" height="5" fill="#ca8a04" />
      <rect x="7" y="19" width="3" height="3" fill="#fef08a" />
      
      {/* Right Hand Palm Blessing */}
      <rect x="21" y="15" width="3" height="5" fill="#ca8a04" />
      <rect x="22" y="18" width="3" height="4" fill="#fef08a" />
      <rect x="24" y="17" width="2" height="2" fill="#fbbf24" /> {/* Golden light */}
      
      {/* Belt */}
      <rect x="10" y="22" width="12" height="2" fill="#713f12" />
      
      {/* Robe Bottom & Shoes */}
      <rect x="10" y="24" width="12" height="5" fill="#a16207" />
      <rect x="12" y="28" width="3" height="2" fill="#1c1917" />
      <rect x="17" y="28" width="3" height="2" fill="#1c1917" />
    </svg>
  ),
};

