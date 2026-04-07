import { useState, useEffect } from 'react';
import { Card } from '../components/atoms/Card';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { BottomNav } from '../components/organisms/BottomNav';
import { RotateCcw, Home } from 'lucide-react';
import { defaultDhikrPresets } from '../data/defaultDhikr';

interface DhikrPreset {
  id: string;
  name: string;
  arabic_text?: string;
  transliteration?: string;
  translation?: string;
  default_target: number;
  is_custom: boolean;
}

export function DhikrCounter() {
  const [presets, setPresets] = useState<DhikrPreset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<DhikrPreset | null>(null);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPresets(defaultDhikrPresets.map((p, i) => ({ ...p, id: `preset-${i}` })));
    setLoading(false);
  }, []);

  const selectPreset = (preset: DhikrPreset) => {
    setSelectedPreset(preset);
    setCount(0);
    setTarget(preset.default_target);
  };

  const increment = () => {
    setCount((prev) => prev + 1);

    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const reset = () => {
    setCount(0);
  };

  const progress = (count / target) * 100;
  const isComplete = count >= target;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main"></div>
      </div>
    );
  }

  if (!selectedPreset) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 pb-24">
        <div className="container-app space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="h1" weight="bold" className="text-gradient">
                Dzikir
              </Text>
              <Text variant="body" color="secondary" className="mt-1">
                Pilih dzikir untuk memulai
              </Text>
            </div>

            <Button variant="secondary" leftIcon={<Home className="w-5 h-5" />}>
              Dashboard
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presets.map((preset) => (
              <Card
                key={preset.id}
                hoverable
                onClick={() => selectPreset(preset)}
                className="cursor-pointer relative"
              >

                <div className="space-y-3">
                  {preset.arabic_text && (
                    <Text variant="arabic" align="center" className="text-3xl font-uthmanic">
                      {preset.arabic_text}
                    </Text>
                  )}

                  <Text variant="h3" weight="semibold" align="center">
                    {preset.name}
                  </Text>

                  {preset.translation && (
                    <Text variant="caption" color="secondary" align="center" className="italic">
                      {preset.translation}
                    </Text>
                  )}

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <Text variant="caption" color="secondary" align="center">
                      Target: {preset.default_target}x
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8">
      <div className="container-app max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedPreset(null)}>
            ← Kembali
          </Button>
        </div>

        <Card padding="lg" className="text-center space-y-6">
          {selectedPreset.arabic_text && (
            <Text variant="arabic" align="center" className="text-5xl md:text-6xl font-uthmanic leading-relaxed">
              {selectedPreset.arabic_text}
            </Text>
          )}

          <div>
            <Text variant="h2" weight="bold">
              {selectedPreset.name}
            </Text>

            {selectedPreset.transliteration && (
              <Text variant="body" color="secondary" className="mt-2">
                {selectedPreset.transliteration}
              </Text>
            )}

            {selectedPreset.translation && (
              <Text variant="caption" color="secondary" className="mt-1 italic">
                {selectedPreset.translation}
              </Text>
            )}
          </div>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`text-9xl font-bold transition-all duration-300 ${
                isComplete
                  ? 'text-emerald-600 scale-110'
                  : 'text-teal-600 dark:text-teal-400'
              }`}
            >
              {count}
            </div>
          </div>

          <div className="h-64"></div>
        </div>

        <div className="space-y-4">
          <div className="relative w-full h-3 neo-pressed rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                isComplete ? 'bg-emerald-500' : 'bg-teal-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Text variant="caption" color="secondary">
              {count} / {target}
            </Text>
            <Text variant="caption" color={isComplete ? 'success' : 'secondary'}>
              {isComplete ? '✓ Selesai!' : `${Math.round(progress)}%`}
            </Text>
          </div>
        </div>

        <button
          onClick={increment}
          className="w-full h-32 rounded-2xl neo-button flex items-center justify-center text-teal-600 dark:text-teal-400 text-3xl font-bold active:neo-pressed transition-all duration-200"
        >
          KETUK
        </button>

        <div className="flex gap-4">
          <Button
            variant="secondary"
            fullWidth
            leftIcon={<RotateCcw className="w-5 h-5" />}
            onClick={reset}
            disabled={count === 0}
          >
            Reset
          </Button>

          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 33)}
            className="w-32 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 neo-pressed border-none text-gray-900 dark:text-gray-100 outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="Target"
            min="1"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
