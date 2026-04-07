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
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900">
      {(title || showBackButton) && (
        <header className="sticky top-0 z-40 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4 px-6 py-4">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="p-2 -ml-2 neo-button rounded-lg text-slate-700 dark:text-slate-300 active:neo-pressed"
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
