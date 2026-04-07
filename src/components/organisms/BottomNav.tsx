import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, LayoutGrid, Volume2, CircleUser as UserCircle } from 'lucide-react';
import { Text } from '../atoms/Text';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const bottomNav = [
    { title: 'Beranda', icon: Home, path: '/' },
    { title: 'Al-Quran', icon: BookOpen, path: '/quran' },
    { title: 'Wirid', icon: LayoutGrid, path: '/wirid' },
    { title: 'Murottal', icon: Volume2, path: '/murottal' },
    { title: 'Pengaturan', icon: UserCircle, path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800/50 px-6 py-2 safe-bottom z-50 shadow-[0_-4px_25px_rgba(0,0,0,0.02)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.2)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {bottomNav.map((item, idx) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-between min-w-[64px] h-[52px] group pt-1 pb-1"
            >
              <div className="relative flex flex-col items-center gap-1.5 w-full">
                <Icon
                  className={`w-6 h-6 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isActive 
                      ? 'text-teal-600 dark:text-teal-400 scale-110 drop-shadow-sm' 
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                  }`}
                  fill={isActive ? 'currentColor' : 'none'}
                  strokeWidth={isActive ? 2 : 2}
                  stroke={isActive ? 'currentColor' : 'currentColor'}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isActive 
                      ? 'text-teal-600 dark:text-teal-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {item.title}
                </span>

                {/* Animated Indicator Bar */}
                <div 
                  className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-[3px] rounded-t-full bg-teal-600 dark:bg-teal-400 transition-all duration-300 ease-out origin-center ${
                    isActive ? 'w-8 opacity-100 scale-100' : 'w-0 opacity-0 scale-0'
                  }`} 
                />
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
