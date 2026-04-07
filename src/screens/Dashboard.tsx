import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { Text } from '../components/atoms/Text';
import { BottomNav } from '../components/organisms/BottomNav';
import { MapPin, BookOpen, HandMetal, Volume2, LayoutGrid, Sunrise, Sun, Sunset, Moon, CloudSun, Clock } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { nextPrayer, allPrayers, loading } = usePrayerTimes();
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
      } catch {
        setUserCity('Indonesia');
      }
    }
  }, []);

  const quickAccessMenu = [
    {
      title: 'Al-Quran',
      icon: <BookOpen className="w-6 h-6" />,
      path: '/quran',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      title: 'Doa',
      icon: <HandMetal className="w-6 h-6" />,
      path: '/doa',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Wirid',
      icon: <LayoutGrid className="w-6 h-6" />,
      path: '/wirid',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Murottal',
      icon: <Volume2 className="w-6 h-6" />,
      path: '/murottal',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
  ];


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto"></div>
          <Text variant="body" color="secondary">
            Loading...
          </Text>
        </div>
      </div>
    );
  }

  const formatDate = () => {
    const hijri = '15, 1446 AH';
    return `Jum'ada Al Akhira ${hijri}`;
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 pb-24">

      {/* ── HERO HEADER ── Full-width gradient section */}
      <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 w-full pt-12 pb-8 px-5 rounded-b-[2.5rem] shadow-lg">

        {/* Location */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold tracking-wide">
              {userCity || 'Indonesia'}
            </span>
          </div>
        </div>

        {/* Date & Clock */}
        <div className="text-center mb-6">
          <p className="text-teal-200 text-sm mb-1">{formatDate()}</p>
          <div className="text-white text-7xl font-extralight tracking-wide leading-none mb-3">
            {getCurrentTime()}
          </div>
          {nextPrayer && (
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mt-2">
              <Clock className="w-4 h-4 text-teal-200" />
              <span className="text-white text-sm font-medium">
                {nextPrayer.countdown} menuju {nextPrayer.name}
              </span>
            </div>
          )}
        </div>

        {/* Prayer Times Row */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-4 mt-2 border border-white/20 shadow-inner">
          <div className="grid grid-cols-6 gap-1.5">
            {allPrayers.slice(0, 6).map((prayer, idx) => {
              const getPrayerIcon = (name: string) => {
                switch(name) {
                  case 'Subuh':   return <Sunrise className="w-5 h-5 mx-auto mb-1" />;
                  case 'Terbit':  return <Sun className="w-5 h-5 mx-auto mb-1" />;
                  case 'Dzuhur': return <Sun className="w-5 h-5 mx-auto mb-1" />;
                  case 'Ashar':  return <CloudSun className="w-5 h-5 mx-auto mb-1" />;
                  case 'Maghrib':return <Sunset className="w-5 h-5 mx-auto mb-1" />;
                  case 'Isya':   return <Moon className="w-5 h-5 mx-auto mb-1" />;
                  default:       return <Clock className="w-5 h-5 mx-auto mb-1" />;
                }
              };

              const isNext = nextPrayer?.name === prayer.name;

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all duration-300 ${
                    isNext
                      ? 'bg-white/30 border border-white/40 shadow-md backdrop-blur-md scale-105 transform z-10'
                      : ''
                  }`}
                >
                  <div className={prayer.isPassed ? 'text-white/40' : (isNext ? 'text-white' : 'text-teal-200')}>
                    {getPrayerIcon(prayer.name)}
                  </div>
                  <span className={`text-[10px] font-medium leading-tight ${prayer.isPassed ? 'text-white/40' : (isNext ? 'text-white' : 'text-teal-100')}`}>
                    {prayer.name}
                  </span>
                  <span className={`text-xs font-bold leading-tight ${prayer.isPassed ? 'text-white/40' : 'text-white'}`}>
                    {prayer.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="px-5 pt-7 space-y-6">

        {/* Section Label */}
        <div>
          <h2 className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Menu Utama
          </h2>

          {/* Quick Access */}
          <div className="grid grid-cols-4 gap-4">
            {quickAccessMenu.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div className={`neo-button w-full aspect-square max-w-[72px] rounded-2xl flex items-center justify-center ${item.iconColor} active:neo-pressed transition-all duration-200`}>
                  {item.icon}
                </div>
                <span className="text-slate-600 dark:text-slate-300 text-xs font-medium text-center leading-tight">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Islamic Art Banner */}
        <div>
          <h2 className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Inspirasi Hari Ini
          </h2>
          <div className="neo-card rounded-2xl overflow-hidden">
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

