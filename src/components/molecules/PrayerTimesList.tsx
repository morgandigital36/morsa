import { Sun, Sunrise, Sunset } from 'lucide-react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';

interface Prayer {
  name: string;
  time: string;
  isPast: boolean;
}

interface PrayerTimesListProps {
  prayers: Prayer[];
}

const prayerIcons: Record<string, React.ReactNode> = {
  Subuh: <Sunrise className="w-5 h-5" />,
  Terbit: <Sun className="w-5 h-5" />,
  Dzuhur: <Sun className="w-5 h-5" />,
  Ashar: <Sun className="w-5 h-5" />,
  Maghrib: <Sunset className="w-5 h-5" />,
  Isya: <Sunrise className="w-5 h-5" />,
};

export function PrayerTimesList({ prayers }: PrayerTimesListProps) {
  return (
    <Card padding="md">
      <Text variant="h3" weight="semibold" className="mb-4">
        Jadwal Sholat Hari Ini
      </Text>
      <div className="space-y-2">
        {prayers.map((prayer, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
              prayer.isPast
                ? 'bg-gray-50 dark:bg-gray-800/50 opacity-60'
                : 'bg-white dark:bg-gray-700/50'
            } hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <div className="flex items-center gap-3">
              <div className={prayer.isPast ? 'text-gray-400' : 'text-primary-main dark:text-primary-light'}>
                {prayerIcons[prayer.name] || <Sun className="w-5 h-5" />}
              </div>
              <Text variant="body" weight={prayer.isPast ? 'regular' : 'medium'} color={prayer.isPast ? 'secondary' : 'primary'}>
                {prayer.name}
              </Text>
            </div>
            <div className={`text-lg font-mono font-semibold ${prayer.isPast ? 'text-gray-500' : 'text-primary-main dark:text-primary-light'}`}>
              {prayer.time}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
