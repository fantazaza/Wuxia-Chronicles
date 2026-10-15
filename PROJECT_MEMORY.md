# Context & Rule Memory

## 1. Trigger Rule
- เมื่อผู้ใช้ถามว่า "ok ไหม" ให้ตอบว่า:
  `ok พร้อมรับคำสั่ง`

---

## 2. ข้อมูลโปรเจกต์เกมจอมยุทธกิมย้ง (Jin Yong ATB War)
- **Path โฟลเดอร์เกม**: `C:\Users\ruchi_lrixne8\OneDrive\Desktop\game`
- **แนวเกม**: Real-time Turn-based RPG (ระบบ ATB เกจความเร็ว 0-100% สไตล์ Summoners War / โปเกมอน)
- **ระบบการต่อสู้**: 3 VS 3 เต็มรูปแบบ (3 ผู้เล่น vs 3 ศัตรู/บอส)
- **ระบบหน้าจอหลัก**:
  - เริ่มเกมที่หน้า **ศาลาว่าการยุทธภพ (Lobby)** เสมอ สำหรับจัดทัพ 3 ตำแหน่ง และดูข้อมูลวิชา/สเตตัส
  - หน้า **ศาลาอัญเชิญ (Summon Altar)** สุ่มยอดยุทธ 3-5 ดาว
  - หน้า **ด่านยุทธภพ (Campaign Select)** เลือกด่าน 3v3 ก่อนกดเข้าสมรภูมิรบ
- **กราฟิกตัวละคร**:
  - ใช้ **Handmade Pixel Art SVG Sprites (16-bit JRPG)** แทนอิโมจิ ครบถ้วนทุกตัวละครทั้งผู้เล่นและศัตรู 100%:
    - **ฝ่ายยอดยุทธหลัก (10 คน)**: ก๊วยเจ๋ง (`guo_jing`), เอี้ยก้วย (`yang_guo`), เล่งฮู้ชง (`linghu_chong`), เซียวเหล่งนึ่ง (`xiaolongnv`), จางซานฟง (`zhang_sanfeng`), เตียบ่อกี้ (`zhang_wuji`), ต้วนอี้ (`duan_yu`), เฉียวฟง (`qiao_feng`), ตงฟางปุ๊ป้าย (`dongfang_bubai`), อึ้งเอียะซือ (`huang_yaoshi`)
    - **ฝ่ายศัตรูด่านยุทธภพ (5 ตัว)**: จอมโจรเก้ากระบองไฟ (`bandit_leader`), มือมีดบินทมิฬ (`bandit_1`), หมอพิษภูเขาหิมะ (`bandit_doctor`), จ้าวจี่เก่ง (`zhao_zhijing`), นักพรตกระบี่วายุ (`quanzhen_disciple_1`), เต๋าลมปราณบริสุทธิ์ (`quanzhen_elder`)

---

## 3. เครื่องมือสร้างตัวละครและการควบคุมระบบ Windows
- **LibreSprite (Pixel Art Editor)**: ติดตั้งแล้วที่ `C:\Program Files\LibreSprite\libresprite.exe` (มีชอร์ตคัทบน Desktop)
- **Windows-MCP Server**: ติดตั้งและลงทะเบียนใน `C:\Users\ruchi_lrixne8\.gemini\config\mcp_config.json` เรียบร้อยแล้ว
  - สำหรับให้ AI ควบคุมเมาส์, คีย์บอร์ด, แคปหน้าจอ และสั่งการโปรแกรมบน Windows
