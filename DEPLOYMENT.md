# 🚀 Panduan Deployment RabithahAPP ke Expo

## Prerequisites

1. **Expo Account**
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Project Setup**
   ```bash
   eas init
   ```

## Development Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Run on Device/Emulator
```bash
# Android
npm run android

# iOS (Mac only)
npm run ios

# Web
npm run web
```

## Production Build

### Android APK (Testing)

```bash
# Build APK untuk testing
eas build --platform android --profile preview

# Download APK dan install di device
```

### Android AAB (Google Play Store)

```bash
# Build AAB untuk production
eas build --platform android --profile production

# Submit ke Google Play Store
eas submit --platform android
```

### iOS (App Store)

```bash
# Build untuk iOS
eas build --platform ios --profile production

# Submit ke App Store
eas submit --platform ios
```

## Environment Variables

Buat file `.env` di root project:

```env
# Supabase (Optional)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys (if needed)
EXPO_PUBLIC_API_KEY=your_api_key
```

## Build Profiles

### Development
- Development client dengan hot reload
- Untuk testing di device
```bash
eas build --profile development --platform android
```

### Preview
- APK untuk internal testing
- Tidak perlu Google Play Store
```bash
eas build --profile preview --platform android
```

### Production
- AAB untuk Google Play Store
- IPA untuk App Store
```bash
eas build --profile production --platform all
```

## Google Play Store Setup

### 1. Create App
1. Buka [Google Play Console](https://play.google.com/console)
2. Create new app
3. Fill app details

### 2. Service Account
1. Google Cloud Console → IAM & Admin → Service Accounts
2. Create service account
3. Download JSON key
4. Save as `google-service-account.json`

### 3. App Signing
1. Google Play Console → Setup → App signing
2. Enroll in Play App Signing
3. Upload signing key

### 4. Submit
```bash
eas submit --platform android
```

## App Store Setup (iOS)

### 1. Apple Developer Account
- Enroll di [Apple Developer Program](https://developer.apple.com/) ($99/year)

### 2. App Store Connect
1. Buka [App Store Connect](https://appstoreconnect.apple.com/)
2. Create new app
3. Fill app information

### 3. Certificates & Provisioning
```bash
# EAS akan handle automatically
eas build --platform ios
```

### 4. Submit
```bash
eas submit --platform ios
```

## Update Over-The-Air (OTA)

Untuk update tanpa rebuild:

```bash
# Publish update
eas update --branch production --message "Bug fixes"

# Auto update di app
```

## Testing

### Internal Testing (Android)
1. Build preview APK
2. Share dengan testers
3. Install langsung di device

### TestFlight (iOS)
1. Build production
2. Submit ke TestFlight
3. Invite testers via email

## App Store Listing

### Screenshots Required
- **Android**: 
  - Phone: 1080x1920 (min 2 screenshots)
  - Tablet: 1536x2048 (optional)
  
- **iOS**:
  - iPhone 6.7": 1290x2796
  - iPhone 6.5": 1242x2688
  - iPad Pro 12.9": 2048x2732

### App Description

**Short Description (80 chars)**
```
Aplikasi pendamping ibadah harian untuk umat Muslim modern
```

**Full Description**
```
RabithahAPP adalah aplikasi mobile yang membantu umat Muslim dalam menjalankan ibadah harian dengan mudah dan praktis.

Fitur Utama:
✅ Jadwal Sholat Akurat - Berdasarkan lokasi GPS
✅ Al-Qur'an Digital - 114 Surah lengkap dengan terjemahan
✅ Wirid & Dzikir Counter - Dengan haptic feedback
✅ Kompas Qibla - Real-time compass
✅ Doa Harian - Koleksi lengkap doa-doa
✅ Murottal - Audio Al-Qur'an
✅ Dark Mode - Nyaman di mata
✅ Offline Support - Bekerja tanpa internet

Gratis, tanpa iklan, dan open source!
```

### Keywords
```
islam, muslim, quran, prayer, sholat, dzikir, qibla, doa, islamic, ramadan
```

### Category
- **Primary**: Lifestyle
- **Secondary**: Education

### Content Rating
- Everyone
- No ads
- No in-app purchases

## Monitoring

### Expo Dashboard
- [expo.dev](https://expo.dev/) - Build status, updates, analytics

### Sentry (Error Tracking)
```bash
npm install @sentry/react-native
```

### Analytics
```bash
npm install expo-firebase-analytics
```

## Checklist Before Launch

- [ ] Test di berbagai devices (Android & iOS)
- [ ] Test semua permissions (Location, Notifications)
- [ ] Test offline functionality
- [ ] Prepare screenshots (berbagai screen sizes)
- [ ] Write app description (ID & EN)
- [ ] Create app icon (1024x1024)
- [ ] Create feature graphic (1024x500 for Android)
- [ ] Privacy policy URL
- [ ] Terms of service URL
- [ ] Support email
- [ ] Test payment/subscription (if any)
- [ ] Prepare promotional materials

## Post-Launch

### Monitor
- Crash reports
- User reviews
- Analytics
- Performance metrics

### Update Strategy
- Bug fixes: OTA update
- New features: New build
- Breaking changes: Force update

### Marketing
- Social media announcement
- App Store Optimization (ASO)
- User feedback collection
- Regular updates

## Troubleshooting

### Build Failed
```bash
# Clear cache
eas build:cancel
eas build --clear-cache

# Check logs
eas build:list
```

### Submission Failed
- Check app signing
- Verify bundle identifier
- Check privacy permissions
- Review app content

### OTA Update Not Working
- Check branch name
- Verify runtime version
- Check network connection

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com/)

---

**Good luck with your deployment! 🚀**
