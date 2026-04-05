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
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-3 safe-bottom z-50">
      <div className="flex justify-around items-center max-w-2xl mx-auto">
        {bottomNav.map((item, idx) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 min-w-[60px] group"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400 group-hover:text-gray-600'}`}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <Text
                variant="caption"
                className={`text-xs ${isActive ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-400'}`}
              >
                {item.title}
              </Text>
              {isActive && (
                <div className="w-12 h-1 bg-teal-600 dark:bg-teal-400 rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
