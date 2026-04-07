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
          <div className="neo-card rounded-2xl overflow-hidden mb-6">
            <img
              src="https://res.cloudinary.com/dbi8w5ps2/image/upload/v1775312623/Gemini_Generated_Image_d3htrxd3htrxd3ht_rj3usc.webp"
              alt="Islamic Art"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Community & Motivation */}
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-5 border border-teal-100 dark:border-teal-800/50 mb-8 mt-2 space-y-4">
          <p className="text-sm text-teal-800 dark:text-teal-200 text-center font-medium italic leading-relaxed">
            "Barangsiapa menginginkan dunia, hendaklah dengan ilmu. Barangsiapa menginginkan akhirat, hendaklah dengan ilmu."
            <span className="block mt-1 text-xs font-semibold not-italic opacity-70">— HR Ahmad</span>
          </p>
          
          <a
            href="https://whatsapp.com/channel/0029VaF35bHBKfhrvW9fxH0H"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full neo-button bg-white dark:bg-slate-800 py-3 rounded-xl active:neo-pressed transition-all"
          >
            <svg
              className="w-5 h-5 text-teal-600 dark:text-teal-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Ikuti Channel WhatsApp</span>
          </a>

          <div className="text-center pt-2">
            <a
              href="https://wa.me/628812902593"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
            >
              Bantuan Pengguna: wa.me/628812902593
            </a>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}

