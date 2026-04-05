# 🎯 Next Steps - RabithahAPP

## 🚀 Immediate Actions (Do This Now)

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Assets
```bash
npm run generate-assets
```

### 3. Check Setup
```bash
npm run check-setup
```

### 4. Start Development
```bash
npm start
```

### 5. Test on Device
- Scan QR code dengan Expo Go app
- Atau run: `npm run android` / `npm run ios`

## 📋 What You Have Now

### ✅ Complete
1. **Project Structure** - Expo setup lengkap
2. **Routing** - File-based routing dengan Expo Router
3. **Atomic Components** - Button, Card, Text (native)
4. **Example Screen** - Dashboard.native.tsx sebagai template
5. **Documentation** - Lengkap dengan panduan
6. **Scripts** - Helper scripts untuk development
7. **Configuration** - EAS Build ready

### 🔄 In Progress
1. **Screens** - Perlu convert 7 screens lagi
2. **Components** - Perlu convert molecules & organisms
3. **Contexts** - Perlu convert 3 contexts
4. **Services** - Perlu convert 3 services

## 🎯 Priority Tasks (Start Here)

### Week 1-2: Core Infrastructure

#### Task 1: Convert ThemeContext
```typescript
// File: src/contexts/ThemeContext.tsx
// Replace localStorage with AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Before:
localStorage.setItem('theme', theme);

// After:
await AsyncStorage.setItem('theme', theme);
```

**Steps:**
1. Install: `npx expo install @react-native-async-storage/async-storage`
2. Replace all localStorage calls
3. Make functions async
4. Test theme persistence
5. Test theme switching

#### Task 2: Convert PermissionContext
```typescript
// File: src/contexts/PermissionContext.tsx
// Use expo-location and expo-notifications

import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
```

**Steps:**
1. Install: `npx expo install expo-location expo-notifications`
2. Implement location permission request
3. Implement notification permission request
4. Test on device
5. Handle permission denied states

#### Task 3: Convert AudioContext
```typescript
// File: src/contexts/AudioContext.tsx
// Use expo-av

import { Audio } from 'expo-av';
```

**Steps:**
1. Install: `npx expo install expo-av`
2. Implement audio player
3. Implement controls (play, pause, stop)
4. Test audio playback
5. Handle background audio

### Week 3-4: Core Components

#### Task 4: Convert Layout Component
```typescript
// File: src/components/organisms/Layout.native.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
```

**Steps:**
1. Create Layout.native.tsx
2. Use SafeAreaView
3. Add header
4. Add back button
5. Test on devices with notch

#### Task 5: Convert BottomNav
```typescript
// File: src/components/organisms/BottomNav.native.tsx
// Use React Navigation bottom tabs
```

**Steps:**
1. Install: `npx expo install @react-navigation/bottom-tabs`
2. Create bottom tab navigator
3. Add icons
4. Add haptic feedback
5. Test navigation

### Week 5-6: Screens

#### Task 6: Convert QuranReader
**Priority: HIGH**

**Steps:**
1. Create QuranReader.native.tsx
2. Use FlatList for performance
3. Implement surah list
4. Implement ayah rendering
5. Add bookmark functionality
6. Test with large datasets

**Template:**
```typescript
import { FlatList } from 'react-native';

export function QuranReader() {
  return (
    <FlatList
      data={surahs}
      renderItem={({ item }) => <SurahCard surah={item} />}
      keyExtractor={(item) => item.number.toString()}
    />
  );
}
```

#### Task 7: Convert QiblaCompass
**Priority: HIGH**

**Steps:**
1. Install: `npx expo install expo-sensors`
2. Create QiblaCompass.native.tsx
3. Use Magnetometer from expo-sensors
4. Calculate qibla direction
5. Implement compass UI
6. Test accuracy on device

**Template:**
```typescript
import { Magnetometer } from 'expo-sensors';

export function QiblaCompass() {
  const [heading, setHeading] = useState(0);
  
  useEffect(() => {
    const subscription = Magnetometer.addListener(({ x, y, z }) => {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setHeading(angle);
    });
    
    return () => subscription.remove();
  }, []);
  
  // Render compass UI
}
```

#### Task 8: Convert MurottalScreen
**Priority: HIGH**

**Steps:**
1. Create MurottalScreen.native.tsx
2. Use expo-av for audio
3. Implement player controls
4. Add playlist
5. Test audio playback

**Template:**
```typescript
import { Audio } from 'expo-av';

export function MurottalScreen() {
  const [sound, setSound] = useState<Audio.Sound>();
  
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl }
    );
    setSound(sound);
    await sound.playAsync();
  };
  
  // Render player UI
}
```

## 📚 Learning Resources

### Must Read
1. [Expo Router Docs](https://docs.expo.dev/router/introduction/)
2. [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
3. [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
4. [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
5. [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/)
6. [Expo Sensors](https://docs.expo.dev/versions/latest/sdk/sensors/)

### Video Tutorials
1. [Expo Router Tutorial](https://www.youtube.com/results?search_query=expo+router+tutorial)
2. [React Native FlatList](https://www.youtube.com/results?search_query=react+native+flatlist)
3. [Expo Audio Player](https://www.youtube.com/results?search_query=expo+audio+player)

## 🛠️ Development Workflow

### Daily Workflow
```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/convert-quran-reader

# 3. Start dev server
npm start

# 4. Make changes
# Edit files...

# 5. Test on device
# Scan QR code or use emulator

# 6. Check types
npm run typecheck

# 7. Lint code
npm run lint

# 8. Commit changes
git add .
git commit -m "feat: convert QuranReader to native"

# 9. Push changes
git push origin feature/convert-quran-reader

# 10. Create PR on GitHub
```

### Testing Workflow
```bash
# Test on Android
npm run android

# Test on iOS (Mac only)
npm run ios

# Clear cache if needed
npx expo start -c

# Check setup
npm run check-setup
```

## 🎯 Success Metrics

### Week 1-2 Goals
- [ ] All 3 contexts converted
- [ ] Layout component working
- [ ] BottomNav working
- [ ] Theme switching working
- [ ] Permissions working

### Week 3-4 Goals
- [ ] 3 screens converted (QuranReader, QiblaCompass, MurottalScreen)
- [ ] Audio player working
- [ ] Compass working
- [ ] FlatList performance optimized

### Week 5-6 Goals
- [ ] All 8 screens converted
- [ ] All features working
- [ ] Tested on both platforms
- [ ] No critical bugs

## 🚨 Common Issues & Solutions

### Issue 1: Metro Bundler Error
```bash
# Solution: Clear cache
npx expo start -c
```

### Issue 2: Module Not Found
```bash
# Solution: Install with expo
npx expo install <package-name>
```

### Issue 3: TypeScript Errors
```bash
# Solution: Check types
npm run typecheck
```

### Issue 4: Can't Connect to Dev Server
```bash
# Solution: Use tunnel mode
npx expo start --tunnel
```

### Issue 5: Permissions Not Working
```bash
# Solution: Check app.json permissions
# Make sure permissions are declared in app.json
```

## 📞 Getting Help

### Documentation
- Check [EXPO_MIGRATION.md](./EXPO_MIGRATION.md)
- Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- Check [QUICKSTART.md](./QUICKSTART.md)
- Check [TODO.md](./TODO.md)

### Community
- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://reactnative.dev/community/overview)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

### Issues
- Open an issue on GitHub
- Check existing issues first
- Provide detailed information

## 🎉 Milestones

### Milestone 1: Foundation Complete ✅
- Project setup
- Routing structure
- Atomic components
- Documentation

### Milestone 2: Core Infrastructure (Target: Week 2)
- Contexts converted
- Core components converted
- Permissions working

### Milestone 3: Main Features (Target: Week 6)
- All screens converted
- All features working
- Tested on devices

### Milestone 4: Polish & Testing (Target: Week 10)
- UI polished
- Performance optimized
- All bugs fixed

### Milestone 5: Production Ready (Target: Week 15)
- Store assets ready
- Submitted to stores
- Launched!

## 🎯 Your Next Action

**Right now, do this:**

1. Open terminal
2. Run: `npm install`
3. Run: `npm run generate-assets`
4. Run: `npm start`
5. Scan QR code with Expo Go
6. See the app running!

Then:
1. Read [EXPO_MIGRATION.md](./EXPO_MIGRATION.md)
2. Start with Task 1: Convert ThemeContext
3. Follow the steps above
4. Test on device
5. Move to next task

**You got this! 🚀**

---

**Remember**: 
- Start small, test often
- One component at a time
- Ask for help when stuck
- Celebrate small wins!

**Good luck! 💪**
