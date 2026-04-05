#!/usr/bin/env node

/**
 * Script untuk check setup Expo
 * Run: node scripts/check-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Expo setup...\n');

const checks = [
  {
    name: 'package.json',
    path: 'package.json',
    required: true,
  },
  {
    name: 'app.json',
    path: 'app.json',
    required: true,
  },
  {
    name: 'babel.config.js',
    path: 'babel.config.js',
    required: true,
  },
  {
    name: 'metro.config.js',
    path: 'metro.config.js',
    required: true,
  },
  {
    name: 'tsconfig.json',
    path: 'tsconfig.json',
    required: true,
  },
  {
    name: 'eas.json',
    path: 'eas.json',
    required: false,
  },
  {
    name: 'app/_layout.tsx',
    path: 'app/_layout.tsx',
    required: true,
  },
  {
    name: 'app/index.tsx',
    path: 'app/index.tsx',
    required: true,
  },
  {
    name: 'assets folder',
    path: 'assets',
    required: true,
    isDirectory: true,
  },
];

let allGood = true;

checks.forEach(check => {
  const fullPath = path.join(process.cwd(), check.path);
  const exists = fs.existsSync(fullPath);
  
  if (check.isDirectory) {
    const isDir = exists && fs.statSync(fullPath).isDirectory();
    if (isDir) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`${check.required ? '❌' : '⚠️'} ${check.name} - Missing`);
      if (check.required) allGood = false;
    }
  } else {
    if (exists) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`${check.required ? '❌' : '⚠️'} ${check.name} - Missing`);
      if (check.required) allGood = false;
    }
  }
});

console.log('\n📦 Checking node_modules...');
const nodeModulesExists = fs.existsSync(path.join(process.cwd(), 'node_modules'));
if (nodeModulesExists) {
  console.log('✅ node_modules installed');
} else {
  console.log('❌ node_modules not found - Run: npm install');
  allGood = false;
}

console.log('\n📱 Checking assets...');
const assetsPath = path.join(process.cwd(), 'assets');
if (fs.existsSync(assetsPath)) {
  const assetFiles = ['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'];
  const missingAssets = assetFiles.filter(file => 
    !fs.existsSync(path.join(assetsPath, file))
  );
  
  if (missingAssets.length === 0) {
    console.log('✅ All required assets present');
  } else {
    console.log('⚠️ Missing assets (will use placeholders):');
    missingAssets.forEach(asset => console.log(`   - ${asset}`));
    console.log('   Run: node scripts/generate-assets.js');
  }
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('✨ Setup looks good! Ready to run:');
  console.log('   npm start');
} else {
  console.log('❌ Setup incomplete. Please fix the issues above.');
}
console.log('='.repeat(50) + '\n');
