import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';

interface CardProps {
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hoverable?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onPress,
  style,
}: CardProps) {
  const handlePress = () => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const cardStyle = [
    styles.base,
    styles[variant],
    styles[padding],
    style,
  ];

  if (hoverable || onPress) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={cardStyle}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  default: {
    backgroundColor: '#FFFFFF',
  },
  primary: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#BFDBFE',
  },
  accent: {
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#BBF7D0',
  },
  sm: {
    padding: 16,
  },
  md: {
    padding: 24,
  },
  lg: {
    padding: 32,
  },
  none: {
    padding: 0,
  },
});
