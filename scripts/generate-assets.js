#!/usr/bin/env node

/**
 * Script untuk generate placeholder assets
 * Run: node scripts/generate-assets.js
 */

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

// Pastikan folder assets ada
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('📦 Generating placeholder assets...\n');

// SVG untuk icon (1024x1024)
const iconSVG = `
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#2A4D69"/>
  <text x="512" y="600" font-family="Arial" font-size="200" fill="white" text-anchor="middle" font-weight="bold">RA</text>
  <circle cx="512" cy="300" r="80" fill="none" stroke="white" stroke-width="8"/>
  <path d="M 512 220 L 512 380" stroke="white" stroke-width="8"/>
</svg>
`.trim();

// SVG untuk splash (1284x2778)
const splashSVG = `
<svg width="1284" height="2778" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2A4D69;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a3d59;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1284" height="2778" fill="url(#grad)"/>
  <text x="642" y="1300" font-family="Arial" font-size="120" fill="white" text-anchor="middle" font-weight="bold">RabithahAPP</text>
  <text x="642" y="1450" font-family="Arial" font-size="48" fill="#BBB" text-anchor="middle">Pendamping Spiritual Muslim</text>
  <circle cx="642" cy="1000" r="120" fill="none" stroke="white" stroke-width="10"/>
  <path d="M 642 880 L 642 1120" stroke="white" stroke-width="10"/>
</svg>
`.trim();

// SVG untuk favicon (48x48)
const faviconSVG = `
<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" fill="#2A4D69" rx="8"/>
  <text x="24" y="32" font-family="Arial" font-size="20" fill="white" text-anchor="middle" font-weight="bold">R</text>
</svg>
`.trim();

// SVG untuk notification icon (96x96)
const notificationSVG = `
<svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" fill="#2A4D69"/>
  <circle cx="48" cy="48" r="30" fill="none" stroke="white" stroke-width="4"/>
  <path d="M 48 18 L 48 78" stroke="white" stroke-width="4"/>
</svg>
`.trim();

// Tulis file SVG
const files = [
  { name: 'icon.svg', content: iconSVG },
  { name: 'adaptive-icon.svg', content: iconSVG },
  { name: 'splash.svg', content: splashSVG },
  { name: 'favicon.svg', content: faviconSVG },
  { name: 'notification-icon.svg', content: notificationSVG },
];

files.forEach(file => {
  const filePath = path.join(assetsDir, file.name);
  fs.writeFileSync(filePath, file.content);
  console.log(`✅ Created: ${file.name}`);
});

console.log('\n✨ Placeholder assets generated successfully!');
console.log('\n📝 Note: These are SVG placeholders. For production:');
console.log('   1. Convert to PNG using online tools or ImageMagick');
console.log('   2. Or replace with custom designed assets');
console.log('   3. Recommended: Use https://www.appicon.co/ for proper sizing\n');
