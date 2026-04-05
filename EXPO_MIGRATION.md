# 🚀 Panduan Migrasi ke Expo

## Status Migrasi

Aplikasi RabithahAPP sedang dalam proses konversi dari React Web (Vite) ke React Native (Expo).

### ✅ Yang Sudah Selesai

1. **Setup Expo Project**
   - `app.json` - Konfigurasi Expo
   - `babel.config.js` - Babel configuration
   - `metro.config.js` - Metro bundler
   - `package.json` - Dependencies untuk React Native

2. **Routing Structure (Expo Router)**
   - `app/_layout.tsx` - Root layout dengan providers
   - `app/index.tsx` - Dashboard (home)
   - `app/quran.tsx` - Al-Qur'an reader
   - `app/wirid.tsx` - Wirid counter
   - `app/qibla.tsx` - Qibla compass
   - `app/doa.tsx` - Doa screen
   - `app/murottal.tsx` - Murottal player
   - `app/settings.tsx` - Settings

3. **Atomic Components (Native)**
   - `Button.native.tsx` - Dengan haptic feedback
   - `Card.native.tsx` - Dengan touch support
   - `Text.native.tsx` - Typography system

### 🔄 Yang Perlu Dikonversi

#### 1. Context Providers
- [ ] `ThemeContext.tsx` - Ganti AsyncStorage untuk persistence
- [ ] `PermissionContext.tsx` - Gunakan expo-location & expo-notifications
- [ ] `AudioContext.tsx` - Gunakan expo-av untuk audio

#### 2. Screens (Perlu Rewrite Total)
- [ ] `Dashboard.tsx` - Convert ke React Native components
- [ ] `QuranReader.tsx` - FlatList untuk performance
- [ ] `WiridCounter.tsx` - Haptic feedback integration
- [ ] `QiblaCompass.tsx` - expo-sensors untuk compass
- [ ] `DoaScreen.tsx` - ScrollView dengan search
- [ ] `MurottalScreen.tsx` - expo-av audio player
- [ ] `SettingsScreen.tsx` - Native settings UI

#### 3. Molecules & Organisms
- [ ] `PrayerTimeCard.tsx` - Native card layout
- [ ] `PrayerTimesList.tsx` - FlatList implementation
- [ ] `BottomNav.tsx` - React Navigation bottom tabs
- [ ] `Layout.tsx` - SafeAreaView wrapper
- [ ] `MiniAudioPlayer.tsx` - Native audio controls
- [ ] `PermissionModal.tsx` - React Native Modal
- [ ] `BackButton.tsx` - Navigation back button

#### 4. Services
- [ ] `location.service.ts` - expo-location API
- [ ] `notification.service.ts` - expo-notifications API
- [ ] `bookmark.service.ts` - AsyncStorage
- [ ] API services tetap sama (fetch API)

#### 5. Hooks
- [ ] `usePrayerTimes.ts` - Adjust untuk mobile

### 📦 Dependencies yang Dibutuhkan

```bash
# Install dependencies
npm install

# Expo packages
npx expo install expo-location expo-notifications expo-sensors expo-av expo-haptics expo-font

# Navigation
npx expo install expo-router react-native-safe-area-context react-native-screens

# Storage
npx expo install @react-native-async-storage/async-storage
```

### 🎯 Langkah-Langkah Konversi

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Convert Contexts
Ganti localStorage dengan AsyncStorage:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Before (Web)
localStorage.setItem('key', 'value');

// After (Native)
await AsyncStorage.setItem('key', 'value');
```

#### Step 3: Convert Components
Ganti HTML elements dengan React Native components:
```typescript
// Before (Web)
<div className="...">
  <p>Text</p>
  <button onClick={...}>Click</button>
</div>

// After (Native)
<View style={styles.container}>
  <Text>Text</Text>
  <TouchableOpacity onPress={...}>
    <Text>Click</Text>
  </TouchableOpacity>
</View>
```

#### Step 4: Convert Styling
Ganti Tailwind dengan StyleSheet:
```typescript
// Before (Web)
<div className="bg-white p-4 rounded-lg shadow-md">

// After (Native)
<View style={styles.card}>

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
```

#### Step 5: Convert Navigation
Ganti react-router dengan Expo Router:
```typescript
// Before (Web)
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/quran');

// After (Native)
import { router } from 'expo-router';
router.push('/quran');
```

#### Step 6: Convert APIs
API services tetap sama, tapi perlu handle permissions:
```typescript
// Location
import * as Location from 'expo-location';
const { status } = await Location.requestForegroundPermissionsAsync();

// Notifications
import * as Notifications from 'expo-notifications';
const { status } = await Notifications.requestPermissionsAsync();
```

### 🚀 Running the App

```bash
# Start Expo dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web (still supported)
npm run web
```

### 📱 Testing

1. **Android**: Gunakan Android Studio emulator atau device fisik
2. **iOS**: Gunakan Xcode simulator atau device fisik (Mac only)
3. **Web**: Browser (fallback, beberapa fitur tidak akan work)

### 🎨 Design Considerations

1. **SafeArea**: Gunakan SafeAreaView untuk notch/status bar
2. **Haptics**: Tambahkan haptic feedback untuk better UX
3. **Gestures**: Gunakan react-native-gesture-handler
4. **Animations**: Gunakan react-native-reanimated
5. **Icons**: Gunakan @expo/vector-icons

### 🔐 Permissions

Permissions yang dibutuhkan:
- **Location**: Untuk jadwal sholat akurat
- **Notifications**: Untuk reminder sholat
- **Sensors**: Untuk kompas qibla

### 📝 Notes

1. **Web version** akan dihapus setelah migrasi selesai
2. **Tailwind CSS** tidak digunakan di React Native
3. **Supabase** tetap bisa digunakan (supabase-js works on RN)
4. **API calls** tetap sama (fetch API universal)

### 🐛 Common Issues

1. **Metro bundler error**: Clear cache dengan `npx expo start -c`
2. **Module not found**: Install dengan `npx expo install <package>`
3. **iOS build error**: Run `cd ios && pod install`
4. **Android build error**: Clean dengan `cd android && ./gradlew clean`

### 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)

---

**Status**: 🟡 In Progress (20% Complete)

**Next Steps**: Convert Context providers dan Screen components
