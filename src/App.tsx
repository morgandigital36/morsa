import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { PermissionProvider } from './contexts/PermissionContext';
import { AudioProvider } from './contexts/AudioContext';
import { PermissionModal } from './components/molecules/PermissionModal';
import { MiniAudioPlayer } from './components/organisms/MiniAudioPlayer';
import { Dashboard } from './screens/Dashboard';
import { QuranReader } from './screens/QuranReader';
import { WiridCounter } from './screens/WiridCounter';
import { QiblaCompass } from './screens/QiblaCompass';
import { DoaScreen } from './screens/DoaScreen';
import MurottalScreen from './screens/MurottalScreen';
import { SettingsScreen } from './screens/SettingsScreen';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PermissionProvider>
          <AudioProvider>
            <PermissionModal />
            <MiniAudioPlayer />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/quran" element={<QuranReader />} />
              <Route path="/wirid" element={<WiridCounter />} />
              <Route path="/qibla" element={<QiblaCompass />} />
              <Route path="/doa" element={<DoaScreen />} />
              <Route path="/murottal" element={<MurottalScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
          </AudioProvider>
        </PermissionProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
