import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text.native';
import * as Haptics from 'expo-haptics';

interface NavItem {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: string;
}

export function BottomNav() {
  const pathname = usePathname();

  const bottomNav: NavItem[] = [
    { title: 'Beranda', icon: 'home', path: '/' },
    { title: 'Al-Quran', icon: 'book', path: '/quran' },
    { title: 'Wirid', icon: 'grid', path: '/wirid' },
    { title: 'Murottal', icon: 'musical-notes', path: '/murottal' },
    { title: 'Pengaturan', icon: 'settings', path: '/settings' },
  ];

  const handlePress = (path: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.nav}>
        {bottomNav.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handlePress(item.path)}
              style={styles.navItem}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={isActive ? item.icon : `${item.icon}-outline` as any}
                  size={24}
                  color={isActive ? '#14B8A6' : '#9CA3AF'}
                />
              </View>
              <Text
                variant="caption"
                style={[
                  styles.navText,
                  isActive && styles.navTextActive,
                ]}
              >
                {item.title}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  iconContainer: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  navTextActive: {
    color: '#14B8A6',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 32,
    height: 3,
    backgroundColor: '#14B8A6',
    borderRadius: 2,
  },
});
