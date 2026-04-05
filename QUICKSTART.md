# ⚡ Quick Start Guide - RabithahAPP

Panduan cepat untuk mulai development dan deployment aplikasi RabithahAPP.

## 🚀 Setup Development (5 menit)

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Placeholder Assets
```bash
node scripts/generate-assets.js
```

### 3. Check Setup
```bash
node scripts/check-setup.js
```

### 4. Start Development Server
```bash
npm start
```

### 5. Run on Device
Scan QR code dengan:
- **Android**: Expo Go app
- **iOS**: Camera app (akan buka Expo Go)

Atau run di emulator:
```bash
# Android
npm run android

# iOS (Mac only)
npm run ios
```

## 📱 Testing on Physical Device

### Android
1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) dari Play Store
2. Scan QR code dari terminal
3. App akan load di device

### iOS
1. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) dari App Store
2. Scan QR code dengan Camera app
3. Tap notification untuk buka di Expo Go

## 🔧 Common Commands

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android emulator
npm run ios            # Run on iOS simulator
npm run web            # Run on web browser

# Type checking
npm run typecheck      # Check TypeScript errors

# Linting
npm run lint           # Run ESLint

# Clear cache
npx expo start -c      # Start with cleared cache
```

## 🏗️ Build for Production

### Setup EAS (One-time)
```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Initialize EAS in project
eas init
```

### Build APK (Android Testing)
```bash
eas build --platform android --profile preview
```

### Build for Stores
```bash
# Android (AAB for Play Store)
eas build --platform android --profile production

# iOS (IPA for App Store)
eas build --platform ios --profile production

# Both platforms
eas build --platform all --profile production
```

## 📦 Environment Variables

Create `.env` file (optional):
```env
# Supabase (optional - app works without it)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎨 Customize Assets

Replace placeholder assets in `assets/` folder:
- `icon.png` - 1024x1024px
- `adaptive-icon.png` - 1024x1024px
- `splash.png` - 1284x2778px
- `favicon.png` - 48x48px

Use [App Icon Generator](https://www.appicon.co/) untuk generate semua sizes.

## 🐛 Troubleshooting

### Metro bundler error
```bash
npx expo start -c
```

### Module not found
```bash
npx expo install <package-name>
```

### iOS build error (Mac)
```bash
cd ios && pod install && cd ..
```

### Android build error
```bash
cd android && ./gradlew clean && cd ..
```

### Can't connect to dev server
- Pastikan device dan computer di network yang sama
- Disable firewall temporarily
- Try tunnel mode: `npx expo start --tunnel`

## 📚 Next Steps

1. **Read Migration Guide**: [EXPO_MIGRATION.md](./EXPO_MIGRATION.md)
2. **Read Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Customize App**: Edit screens in `src/screens/`
4. **Add Features**: Follow atomic design pattern
5. **Test**: Test di berbagai devices
6. **Deploy**: Follow deployment guide

## 🎯 Development Workflow

```
1. Create feature branch
   git checkout -b feature/new-feature

2. Make changes
   - Edit files in src/
   - Test with npm start
   - Check types with npm run typecheck

3. Test on devices
   - Android emulator
   - iOS simulator
   - Physical devices

4. Commit changes
   git add .
   git commit -m "Add new feature"

5. Push and create PR
   git push origin feature/new-feature
```

## 🔗 Useful Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Expo Go App](https://expo.dev/client)

## 💡 Tips

1. **Use Expo Go** untuk quick testing
2. **Development builds** untuk testing native features
3. **EAS Update** untuk OTA updates tanpa rebuild
4. **TypeScript** untuk better code quality
5. **Test di real devices** sebelum production

## 🆘 Need Help?

- Check [EXPO_MIGRATION.md](./EXPO_MIGRATION.md) untuk migration details
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) untuk deployment help
- Read [Expo Forums](https://forums.expo.dev/)
- Check [React Native Community](https://reactnative.dev/community/overview)

---

**Happy coding! 🚀**
