import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text.native';
import * as Haptics from 'expo-haptics';

export function BackToHomeButton() {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Ionicons name="home" size={20} color="#1F2937" />
      <Text variant="body" weight="medium" style={styles.text}>
        Dashboard
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  text: {
    color: '#1F2937',
  },
});
