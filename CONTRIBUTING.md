# 🤝 Contributing to RabithahAPP

Terima kasih atas minat Anda untuk berkontribusi! Panduan ini akan membantu Anda memulai.

## 🎯 Cara Berkontribusi

### 1. Setup Development Environment

```bash
# Fork repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/rabithahapp.git
cd rabithahapp

# Install dependencies
npm install

# Check setup
npm run check-setup

# Generate placeholder assets
npm run generate-assets

# Start development
npm start
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes

Follow our coding standards (see below).

### 4. Test Your Changes

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Test on devices
npm run android
npm run ios
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve bug"
```

### 6. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Coding Standards

### File Naming
- Components: `PascalCase.tsx` or `PascalCase.native.tsx`
- Services: `camelCase.service.ts`
- Hooks: `useCamelCase.ts`
- Types: `PascalCase.types.ts`
- Utils: `camelCase.util.ts`

### Component Structure

```typescript
// 1. Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

// 3. Component
export function MyComponent({ title, onPress }: MyComponentProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handlePress = () => {
    // logic
  };
  
  // Render
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
}

// 4. Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

### Styling Guidelines

```typescript
// ✅ Good
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
});

// ❌ Bad - inline styles
<View style={{ padding: 16, backgroundColor: '#FFFFFF' }}>
```

### TypeScript

```typescript
// ✅ Good - explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad - any types
function getUser(id: any): any {
  // ...
}
```

### Async/Await

```typescript
// ✅ Good
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Error:', error);
  throw error;
}

// ❌ Bad - unhandled promises
fetchData().then(data => {
  // ...
});
```

## 🎨 Design System

### Colors
```typescript
const colors = {
  primary: '#2A4D69',
  accent: '#4CAF50',
  gold: '#FFD700',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};
```

### Spacing
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### Typography
```typescript
const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 28, fontWeight: '600' },
  h3: { fontSize: 24, fontWeight: '600' },
  h4: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 14, fontWeight: '400' },
};
```

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Test on Android emulator
- [ ] Test on iOS simulator
- [ ] Test on physical Android device
- [ ] Test on physical iOS device
- [ ] Test offline functionality
- [ ] Test permissions (location, notifications)
- [ ] Test different screen sizes
- [ ] Test dark mode (if applicable)
- [ ] Test accessibility features

### What to Test
1. **Functionality**: Feature works as expected
2. **UI/UX**: Looks good on all screen sizes
3. **Performance**: No lag or stuttering
4. **Errors**: Proper error handling
5. **Edge Cases**: Empty states, loading states, error states

## 📋 Commit Message Convention

Format: `type: description`

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```
feat: add prayer time notifications
fix: resolve qibla compass accuracy issue
docs: update installation guide
style: format code with prettier
refactor: simplify audio player logic
perf: optimize quran reader rendering
test: add unit tests for prayer service
chore: update dependencies
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: How to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**:
   - Device: (e.g., Pixel 6, iPhone 13)
   - OS: (e.g., Android 13, iOS 16)
   - App Version: (e.g., 1.0.0)

## 💡 Feature Requests

When requesting features, include:

1. **Problem**: What problem does this solve?
2. **Solution**: Proposed solution
3. **Alternatives**: Alternative solutions considered
4. **Additional Context**: Any other relevant info

## 🔍 Code Review Process

### What We Look For
1. **Functionality**: Does it work?
2. **Code Quality**: Is it clean and maintainable?
3. **Performance**: Is it optimized?
4. **Testing**: Is it tested?
5. **Documentation**: Is it documented?
6. **Style**: Does it follow our conventions?

### Review Timeline
- Small PRs: 1-2 days
- Medium PRs: 3-5 days
- Large PRs: 1 week

## 🎯 Priority Areas

### High Priority
1. Converting web components to native
2. Implementing native features (compass, audio, notifications)
3. Bug fixes
4. Performance improvements

### Medium Priority
1. UI/UX improvements
2. New features
3. Documentation
4. Testing

### Low Priority
1. Code refactoring
2. Style improvements
3. Minor optimizations

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Hooks](https://react.dev/reference/react)

## 🤔 Questions?

- Open an issue for questions
- Check existing issues first
- Be respectful and patient

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🙏**
