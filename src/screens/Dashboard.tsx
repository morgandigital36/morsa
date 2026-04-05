import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { Text } from '../components/atoms/Text';
import { BottomNav } from '../components/organisms/BottomNav';
import { MapPin, BookOpen, HandMetal, Volume2, LayoutGrid, Sunrise, Sun, Sunset, Moon, CloudSun, Clock } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { prayerTimes, nextPrayer, allPrayers, loading } = usePrayerTimes();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userCity, setUserCity] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        setUserCity(location.city || 'Indonesia');
      } catch (e) {
        setUserCity('Indonesia');
      }
    }
  }, []);

  const quickAccessMenu = [
    {
      title: 'Al-Quran',
      icon: <BookOpen className="w-6 h-6" />,
      path: '/quran',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      title: 'Doa',
      icon: <HandMetal className="w-6 h-6" />,
      path: '/doa',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Wirid',
      icon: <LayoutGrid className="w-6 h-6" />,
      path: '/wirid',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Murottal',
      icon: <Volume2 className="w-6 h-6" />,
      path: '/murottal',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
  ];


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <Text variant="body" color="secondary">
            Loading...
          </Text>
        </div>
      </div>
    );
  }

  const formatDate = () => {
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const now = new Date();
    const hijri = '15, 1446 AH';
    return `Jum'ada Al Akhira ${hijri}`;
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 dark:from-teal-800 dark:via-teal-900 dark:to-gray-900 pb-24">
      <div className="container-app">
        <div className="px-6 pt-12 pb-8 text-white">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <Text variant="caption" className="text-white/90">
                {userCity || 'Indonesia'}
              </Text>
            </div>
          </div>

          <div className="text-center mb-3">
            <Text variant="caption" className="text-white/80 mb-1">
              {formatDate()}
            </Text>
            <div className="text-6xl font-light mb-2">
              {getCurrentTime()}
            </div>
            {nextPrayer && (
              <Text variant="body" className="text-white/90">
                {nextPrayer.countdown} menuju {nextPrayer.name}
              </Text>
            )}
          </div>

          <div className="flex justify-between items-center text-center mt-6">
            {allPrayers.slice(0, 6).map((prayer, idx) => {
              const getPrayerIcon = (name: string) => {
                switch(name) {
                  case 'Subuh': return <Sunrise className="w-5 h-5" />;
                  case 'Terbit': return <Sun className="w-5 h-5" />;
                  case 'Dzuhur': return <Sun className="w-5 h-5" />;
                  case 'Ashar': return <CloudSun className="w-5 h-5" />;
                  case 'Maghrib': return <Sunset className="w-5 h-5" />;
                  case 'Isya': return <Moon className="w-5 h-5" />;
                  default: return <Clock className="w-5 h-5" />;
                }
              };

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`mb-1 ${prayer.isPassed ? 'text-white/40' : 'text-white'}`}>
                    {getPrayerIcon(prayer.name)}
                  </div>
                  <Text variant="caption" className={prayer.isPassed ? 'text-white/40' : 'text-white/90'}>
                    {prayer.name}
                  </Text>
                  <Text variant="caption" weight="semibold" className={prayer.isPassed ? 'text-white/40' : 'text-white'}>
                    {prayer.time}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-t-3xl px-6 py-8 min-h-[50vh]">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {quickAccessMenu.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`${item.bgColor} ${item.iconColor} p-4 rounded-2xl transition-transform group-hover:scale-110`}>
                  {item.icon}
                </div>
                <Text variant="caption" className="text-gray-700 dark:text-gray-300 text-center">
                  {item.title}
                </Text>
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
            <img
              src="https://res.cloudinary.com/dbi8w5ps2/image/upload/v1775312623/Gemini_Generated_Image_d3htrxd3htrxd3ht_rj3usc.webp"
              alt="Islamic Art"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

