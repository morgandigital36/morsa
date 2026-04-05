import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Text } from '../atoms/Text';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Layout({ children, title, showBackButton, onBack }: LayoutProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {(title || showBackButton) && (
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 px-6 py-4">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {title && (
              <Text variant="h3" weight="bold">
                {title}
              </Text>
            )}
          </div>
        </header>
      )}

      <main className="flex-1 px-6 py-6">{children}</main>

      <BottomNav />
    </div>
  );
}
