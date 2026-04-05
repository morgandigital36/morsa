import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text.native';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

interface LayoutProps {
  children?: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Layout({ children, title, showBackButton, onBack }: LayoutProps) {
  const handleBack = () => {
    impactAsync(ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {(title || showBackButton) && (
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBack}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="#1F2937" />
              </TouchableOpacity>
            )}
            {title && (
              <Text variant="h3" weight="bold" style={styles.title}>
                {title}
              </Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.main}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    borderRadius: 8,
  },
  title: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
});
