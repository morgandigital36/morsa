# Assets untuk RabithahAPP

Folder ini berisi assets yang dibutuhkan untuk aplikasi Expo.

## Required Assets

Silakan tambahkan file-file berikut:

### App Icons
- `icon.png` - 1024x1024px - App icon
- `adaptive-icon.png` - 1024x1024px - Android adaptive icon
- `favicon.png` - 48x48px - Web favicon

### Splash Screen
- `splash.png` - 1284x2778px - Splash screen image

### Notifications
- `notification-icon.png` - 96x96px - Notification icon (Android)

## Temporary Placeholders

Untuk sementara, kamu bisa generate placeholder dengan:

```bash
# Buat folder assets jika belum ada
mkdir -p assets

# Generate placeholder icons (butuh ImageMagick)
convert -size 1024x1024 xc:#2A4D69 -gravity center -pointsize 200 -fill white -annotate +0+0 "RA" assets/icon.png
convert -size 1024x1024 xc:#2A4D69 -gravity center -pointsize 200 -fill white -annotate +0+0 "RA" assets/adaptive-icon.png
convert -size 48x48 xc:#2A4D69 assets/favicon.png
convert -size 1284x2778 xc:#2A4D69 -gravity center -pointsize 100 -fill white -annotate +0+0 "RabithahAPP" assets/splash.png
convert -size 96x96 xc:#2A4D69 assets/notification-icon.png
```

Atau gunakan online tools:
- [App Icon Generator](https://www.appicon.co/)
- [Splash Screen Generator](https://www.appicon.co/#app-icon)

## Design Guidelines

### Colors
- Primary: `#2A4D69` (Blue)
- Accent: `#4CAF50` (Green)
- Gold: `#FFD700` (Highlights)

### Icon Style
- Minimalist Islamic design
- Mosque silhouette atau crescent moon
- Clean dan modern

### Splash Screen
- Background: Primary blue
- Logo/Text: White
- Simple dan elegant
