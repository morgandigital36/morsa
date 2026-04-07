import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, LayoutGrid, Volume2, Settings } from 'lucide-react';

const navItems = [
  { title: 'Beranda',    icon: Home,       path: '/' },
  { title: 'Al-Quran',  icon: BookOpen,    path: '/quran' },
  { title: 'Wirid',     icon: LayoutGrid,  path: '/wirid' },
  { title: 'Murottal',  icon: Volume2,     path: '/murottal' },
  { title: 'Pengaturan',icon: Settings,    path: '/settings' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-200 dark:bg-slate-800/96 backdrop-blur-lg safe-bottom shadow-[0_-4px_10px_rgba(255,255,255,0.8),0_-2px_10px_rgba(148,163,184,0.3)] dark:shadow-[0_-4px_10px_rgba(2,6,23,0.5),0_-2px_10px_rgba(51,65,85,0.3)]">
      <div className="flex justify-around items-center max-w-md mx-auto px-2 h-[62px]">
        {navItems.map(({ title, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full group"
            >
              {/* Pill background untuk icon aktif */}
              <div
                className={`flex items-center justify-center w-12 h-7 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'neo-pressed transition-shadow'
                    : 'group-hover:neo-button'
                }`}
              >
                <Icon
                  className={`w-[22px] h-[22px] transition-all duration-300 ${
                    isActive
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-medium leading-none transition-colors duration-300 ${
                  isActive
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {title}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
