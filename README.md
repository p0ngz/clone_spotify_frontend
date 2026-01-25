# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,

    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Zimpligital Spotify Clone (Frontend)

โปรเจกต์นี้สร้างด้วย **Vite + React + TypeScript** เพื่อความเร็วและประสิทธิภาพสูงสุดในการพัฒนาเว็บแอปพลิเคชัน

## วิธีติดตั้งและเริ่มต้นโปรเจกต์

### 1. ติดตั้งแพ็กเกจ (หลังจากโคลนจาก GitHub)
```bash
npm install
```

### 2. การตั้งค่าไฟล์ .env
- สร้างไฟล์ `.env` ที่ root ของโปรเจกต์
- ตัวอย่างค่าที่ควรมี (ขึ้นกับ backend/service ที่ใช้):
```
VITE_API_URL=http://localhost:5000
```

### 3. รันโปรเจกต์
```bash
npm run dev
```

---

## โฟลว์การทำงานของโปรเจกต์ (ข้ามหน้า Login)

### 1. หน้า HomePage
- แถบซ้าย (Left Sidebar) สามารถกรอง (filter) รายการเป็น "เพลย์ลิสต์ของฉัน" และ "ศิลปินทั้งหมด"
- ตารางเพลง (Table) ในหน้าแรกจะแสดงเพลงทั้งหมดก่อน
- สามารถกรองเพลงในตารางตามศิลปินได้ (เมื่อเลือกศิลปินจากแถบซ้าย)

### 2. การสร้าง Playlist
- สามารถเพิ่มเพลงเข้า Playlist ได้จากปุ่ม `+` ในแต่ละเพลง
- เมื่อสร้าง Playlist แล้ว สามารถคลิกชื่อ Playlist ในแถบซ้ายเพื่อไปยังหน้า Playlist นั้น (navigate by id)

### 3. หน้า Playlist
- สามารถลบเพลงออกจาก Playlist ได้
- สามารถลบ Playlist ได้ทั้งอัน

### 4. การเล่นเพลง
- สามารถเล่นเพลงจากที่ไหนก็ได้ (ทั้งหน้า HomePage และ PlaylistPage)
- Player จะอยู่ด้านล่างสุดของหน้าจอเสมอ
- มีฟีเจอร์เล่นสุ่ม (Random/Shuffle) และเล่นซ้ำ (Loop)

---

## หมายเหตุ
- หน้า Login ยังไม่สมบูรณ์และไม่สามารถเข้าถึงได้ในเวอร์ชันนี้
- หากพบปัญหาเกี่ยวกับ API หรือ .env กรุณาตรวจสอบ URL และค่า environment ให้ถูกต้อง

---

**ขอให้สนุกกับการใช้งาน!**
