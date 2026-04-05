import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'arabic';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'inverse' | 'success' | 'error';
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
}

export function Text({
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  align = 'left',
  children,
  style,
  numberOfLines,
}: TextProps) {
  const baseStyle = [styles[variant], styles[weight], styles[color], { textAlign: align }];
  const textStyle = Array.isArray(style) ? [...baseStyle, ...style] : [...baseStyle, style];

  return (
    <RNText style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 24,
  },
  h4: {
    fontSize: 20,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
  arabic: {
    fontSize: 24,
    lineHeight: 40,
  },
  light: {
    fontWeight: '300',
  },
  regular: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
  primary: {
    color: '#1F2937',
  },
  secondary: {
    color: '#6B7280',
  },
  inverse: {
    color: '#FFFFFF',
  },
  success: {
    color: '#10B981',
  },
  error: {
    color: '#EF4444',
  },
});
