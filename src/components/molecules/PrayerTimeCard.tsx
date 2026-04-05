import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Clock, MapPin } from 'lucide-react';

interface PrayerTimeCardProps {
  prayerName: string;
  time: string;
  isNext: boolean;
  countdown?: string;
  location?: string;
}

export function PrayerTimeCard({ prayerName, time, isNext, countdown, location }: PrayerTimeCardProps) {
  return (
    <Card variant={isNext ? 'primary' : 'default'} padding="lg" className="animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-4">
        {isNext && (
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
            <Clock className="w-4 h-4" />
            <span>Waktu Sholat Berikutnya</span>
          </div>
        )}
        <div>
          <Text variant="h2" weight="bold" align="center" className="mb-2">
            {prayerName}
          </Text>
          <div className="text-6xl md:text-7xl font-light text-primary-main dark:text-primary-light">
            {time}
          </div>
        </div>
        {countdown && isNext && (
          <div className="space-y-2">
            <div className="text-lg text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-2xl text-primary-main dark:text-primary-light">
                {countdown}
              </span>
            </div>
            <Text variant="caption" color="secondary">
              hingga waktu sholat
            </Text>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
