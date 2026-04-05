/// <reference types="expo/types" />

declare module 'expo-haptics' {
  export function impactAsync(style: ImpactFeedbackStyle): Promise<void>;
  export function notificationAsync(type: NotificationFeedbackType): Promise<void>;
  export function selectionAsync(): Promise<void>;
  
  export enum ImpactFeedbackStyle {
    Light = 'light',
    Medium = 'medium',
    Heavy = 'heavy',
    Soft = 'soft',
    Rigid = 'rigid',
  }
  
  export enum NotificationFeedbackType {
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
  }
}