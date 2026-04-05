# 🕌 RabithahAPP - Pendamping Spiritual Muslim Modern

[![Built with Expo](https://img.shields.io/badge/Expo-51.0-000020.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e.svg)](https://supabase.com/)

Aplikasi mobile modern untuk membantu umat Muslim dalam menjalankan ibadah harian dengan desain yang indah dan pengalaman pengguna yang mulus.

> **🔄 Status**: Sedang dalam proses migrasi dari React Web ke React Native (Expo). Lihat [EXPO_MIGRATION.md](./EXPO_MIGRATION.md) untuk detail.

## 🎯 **Highlights**

- ✅ **Offline-First**: Bekerja sempurna dengan localStorage (tanpa backend)
- ✅ **Optional Supabase**: Dukungan Supabase untuk sync data antar device
- ✅ **Zero Configuration**: Langsung jalan tanpa setup database
- ✅ **Progressive**: Data tersimpan lokal, upgrade ke cloud kapan saja

## ✨ Fitur Utama

### 🕐 **Jadwal Sholat Akurat**
- Waktu sholat real-time untuk kota-kota di Indonesia
- Countdown timer dinamis ke sholat berikutnya
- Notifikasi browser untuk pengingat sholat
- Data tersimpan offline untuk akses cepat

### 📖 **Al-Qur'an Digital**
- 114 Surah lengkap dengan terjemahan Bahasa Indonesia
- Font Arab Uthmani yang indah dan mudah dibaca
- Bookmark ayat favorit
- Tracking posisi bacaan terakhir
- Progress reading tracker

### 📿 **Dzikir Counter**
- 7 dzikir preset (Subhanallah, Alhamdulillah, Allahu Akbar, dll.)
- Custom dzikir dengan target sendiri
- Haptic feedback saat menghitung
- Riwayat sesi dzikir
- Progress visualization

### 🧭 **Kompas Qibla**
- Real-time compass menggunakan sensor perangkat
- Indikator visual saat sudah mengarah ke Kiblat
- Menampilkan koordinat lokasi dan derajat

### 🤲 **Doa Harian**
- Koleksi lengkap doa-doa harian
- Teks Arab, transliterasi, dan terjemahan
- Audio untuk beberapa doa
- Pencarian doa yang mudah

### 📊 **Progress Tracking**
- Statistik bacaan Al-Qur'an
- Total dzikir harian/mingguan
- Achievement badges
- Visual progress indicators

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2A4D69` - Melambangkan ketenangan dan spiritualitas
- **Accent Green**: `#4CAF50` - Progress dan pertumbuhan
- **Accent Gold**: `#FFD700` - Highlights dan achievements

### Typography
- **UI Font**: Montserrat (300-800 weights)
- **Arabic Font**: Amiri Quran - For Al-Qur'an text

### Features
- 🌓 Dark Mode support
- 📱 Fully responsive (mobile-first)
- ✨ Smooth animations dan transitions
- 🎯 Dribbble-inspired modern UI

## 🚀 Tech Stack

- **Framework**: Expo 51.0 + React Native 0.74
- **Language**: TypeScript 5.3
- **Routing**: Expo Router (File-based)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: React Native StyleSheet
- **Icons**: @expo/vector-icons
- **Sensors**: expo-location, expo-sensors
- **Audio**: expo-av
- **Notifications**: expo-notifications

## 📡 API Integration

### 1. **Quran Cloud API**
```
https://api.alquran.cloud/v1
```
- Al-Qur'an lengkap dengan berbagai edisi
- Terjemahan multiple bahasa
- Metadata Surah dan Ayat

### 2. **MyQuran API**
```
https://api.myquran.com/v2/sholat
```
- Jadwal sholat untuk kota-kota Indonesia
- Update otomatis berdasarkan tanggal
- Timezone support

### 3. **EQuran.id API**
```
https://equran.id/api/v2
```
- Doa-doa harian lengkap
- Asmaul Husna
- Tahlil dan bacaan lainnya

## 🗄️ Database Schema

### Tables
- `user_preferences` - User settings dan preferensi
- `locations` - Saved locations untuk prayer times
- `prayer_times` - Cached jadwal sholat
- `quran_progress` - Tracking bacaan Al-Qur'an
- `quran_bookmarks` - Bookmark ayat
- `dhikr_presets` - Dzikir default dan custom
- `dhikr_sessions` - Riwayat dzikir
- `achievements` - Gamification badges

## 🛠️ Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd rabithahapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables (OPSIONAL)**
Aplikasi bekerja tanpa Supabase menggunakan AsyncStorage. Jika ingin sync data antar device, buat `.env` file:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Tanpa Supabase:**
- Data tersimpan di AsyncStorage device
- Tidak perlu setup database
- Langsung bisa dipakai

**Dengan Supabase (opsional):**
- Data sync antar device
- Backup otomatis ke cloud
- Multi-user support

4. **Start development server**
```bash
npm start
```

5. **Run on device/emulator**
```bash
# Android
npm run android

# iOS (Mac only)
npm run ios

# Web (fallback)
npm run web
```

6. **Build for production**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build
eas build --platform android
eas build --platform ios
```

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap deployment ke Play Store dan App Store.

## 📱 Navigation Structure

```
app/
├── _layout.tsx     - Root layout dengan providers
├── index.tsx       - Dashboard (Prayer times, quick access)
├── quran.tsx       - Al-Qur'an reader
├── wirid.tsx       - Wirid/Dzikir counter
├── doa.tsx         - Daily prayers (Doa)
├── qibla.tsx       - Qibla compass
├── murottal.tsx    - Murottal audio player
└── settings.tsx    - App settings
```

## 🎯 Component Architecture

```
src/
├── components/
│   ├── atoms/          - Basic UI elements (Button, Card, Text)
│   ├── molecules/      - Compound components (PrayerTimeCard, etc.)
│   └── organisms/      - Complex components (Layout, etc.)
├── screens/            - Page components
├── contexts/           - React contexts (Auth, Theme)
├── hooks/              - Custom hooks
├── services/
│   ├── api/           - API service layers
│   └── database/      - Supabase client and helpers
├── types/              - TypeScript interfaces
└── styles/             - Design system constants
```

## 🔐 Security Features

- Row Level Security (RLS) pada semua tables
- Authenticated users only untuk personal data
- Secure password authentication via Supabase
- Environment variables untuk sensitive data

## 📱 Platform Support

- ✅ Android 5.0+ (API 21+)
- ✅ iOS 13.0+
- ⚠️ Web (limited features, fallback only)

## 📝 Development Status

### ✅ Completed
- [x] Expo project setup
- [x] File-based routing (Expo Router)
- [x] Native component atoms (Button, Card, Text)
- [x] Build configuration (EAS)

### 🔄 In Progress
- [ ] Convert all screens to React Native
- [ ] Implement native navigation
- [ ] AsyncStorage for data persistence
- [ ] expo-location integration
- [ ] expo-notifications setup
- [ ] expo-sensors for Qibla compass
- [ ] expo-av for audio player

### 📝 Future Enhancements
- [ ] Push notifications untuk prayer times
- [ ] Haptic feedback untuk better UX
- [ ] Multi-language support (English, Arabic)
- [ ] Social sharing features
- [ ] Prayer time adjustments
- [ ] Calendar Hijriah lengkap
- [ ] Ramadan tracker
- [ ] Widget support (Android/iOS)

## 📚 Documentation

Dokumentasi lengkap tersedia untuk membantu Anda:

### 🚀 Getting Started
- **[START_HERE.md](./START_HERE.md)** ⭐ - Mulai di sini!
- **[QUICKSTART.md](./QUICKSTART.md)** - Setup cepat (5 menit)
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Index semua dokumentasi

### 📖 Development
- **[EXPO_MIGRATION.md](./EXPO_MIGRATION.md)** - Panduan migrasi lengkap
- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Langkah-langkah konkret
- **[TODO.md](./TODO.md)** - Checklist lengkap tasks
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guidelines kontribusi

### 📊 Project Management
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Status proyek real-time
- **[CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)** - Summary konversi
- **[EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md)** - Overview untuk stakeholders

### 🚀 Deployment
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Panduan deployment ke stores

**Lihat [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) untuk navigasi lengkap.**

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Quran Cloud API for Al-Qur'an data
- MyQuran API for prayer times
- EQuran.id for Dua collection
- Supabase for backend infrastructure
- Lucide React for beautiful icons

---

**Dibuat dengan ❤️ untuk umat Muslim di seluruh dunia**

_"Sesungguhnya bersama kesulitan ada kemudahan" - QS. Al-Insyirah: 6_

# rabithahappp
