import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/contexts/ThemeContext.native';
import { PermissionProvider } from '../src/contexts/PermissionContext.native';
import { AudioProvider } from '../src/contexts/AudioContext.native';
import { StatusBar } from 'expo-status-bar';
import { PermissionModal } from '../src/components/molecules/PermissionModal.native';
import { MiniAudioPlayer } from '../src/components/organisms/MiniAudioPlayer.native';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <PermissionProvider>
        <AudioProvider>
          <StatusBar style="auto" />
          <PermissionModal />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="quran" />
            <Stack.Screen name="wirid" />
            <Stack.Screen name="qibla" />
            <Stack.Screen name="doa" />
            <Stack.Screen name="murottal" />
            <Stack.Screen name="settings" />
          </Stack>
          <MiniAudioPlayer />
        </AudioProvider>
      </PermissionProvider>
    </ThemeProvider>
  );
}
