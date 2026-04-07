# morsa - 🕌 RabithahAPP - Pendamping Spiritual Muslim Modern

[![Built with React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e.svg)](https://supabase.com/)

Aplikasi web modern untuk membantu umat Muslim dalam menjalankan ibadah harian dengan desain yang indah dan pengalaman pengguna yang mulus.

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

- **Frontend**: React 18.3 + TypeScript
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Build Tool**: Vite 5.4
- **Icons**: Lucide React

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
Aplikasi bekerja tanpa Supabase menggunakan localStorage. Jika ingin sync data antar device, buat `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Tanpa Supabase:**
- Data tersimpan di localStorage browser
- Tidak perlu setup database
- Langsung bisa dipakai

**Dengan Supabase (opsional):**
- Data sync antar device
- Backup otomatis ke cloud
- Multi-user support

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 📱 Navigation Structure

```
/                    - Dashboard (Prayer times, quick access)
/quran              - Al-Qur'an reader
/dhikr              - Dzikir counter
/doa                - Daily prayers (Doa)
/qibla              - Qibla compass
/progress           - Progress tracking
/settings           - App settings
/auth               - Login/Signup
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

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Future Enhancements

- [ ] PWA support untuk install di mobile
- [ ] Push notifications untuk prayer times
- [ ] Audio player untuk Qur'an recitation
- [ ] Multi-language support (English, Arabic)
- [ ] Social sharing features
- [ ] Prayer time adjustments
- [ ] Calendar Hijriah lengkap
- [ ] Ramadan tracker

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

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
