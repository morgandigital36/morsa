import { useState, useEffect } from 'react';
import { Card } from '../components/atoms/Card';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { BottomNav } from '../components/organisms/BottomNav';
import { RotateCcw, Filter } from 'lucide-react';
import { wiridData, Wirid, wiridCategories } from '../data/wiridData';

export function WiridCounter() {
  const [selectedWirid, setSelectedWirid] = useState<Wirid | null>(null);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const filteredWirid = selectedCategory === 'Semua'
    ? wiridData
    : wiridData.filter(w => w.category === selectedCategory);

  const selectWirid = (wirid: Wirid) => {
    setSelectedWirid(wirid);
    setCount(0);
    setTarget(wirid.count || 33);
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

  if (!selectedWirid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 pb-24">
        <div className="container-app space-y-6">
          <div>
            <Text variant="h1" weight="bold" className="text-gradient">
              Wirid
            </Text>
            <Text variant="body" color="secondary" className="mt-1">
              Pilih wirid untuk memulai
            </Text>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <Text variant="body" weight="medium">
                {selectedCategory === 'Semua' ? 'Semua Kategori' : selectedCategory}
              </Text>
            </button>

            {showCategoryFilter && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto z-10">
                <button
                  onClick={() => {
                    setSelectedCategory('Semua');
                    setShowCategoryFilter(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedCategory === 'Semua' ? 'bg-teal-50 dark:bg-teal-900/20' : ''
                  }`}
                >
                  <Text variant="body" weight={selectedCategory === 'Semua' ? 'semibold' : 'regular'}>
                    Semua Kategori
                  </Text>
                </button>
                {wiridCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryFilter(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedCategory === category ? 'bg-teal-50 dark:bg-teal-900/20' : ''
                    }`}
                  >
                    <Text variant="body" weight={selectedCategory === category ? 'semibold' : 'regular'}>
                      {category}
                    </Text>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWirid.map((wirid) => (
              <Card
                key={wirid.id}
                hoverable
                onClick={() => selectWirid(wirid)}
                className="cursor-pointer relative"
              >
                <div className="space-y-3">
                  <Text variant="arabic" align="center" className="text-2xl leading-relaxed">
                    {wirid.arabic}
                  </Text>

                  <Text variant="h3" weight="semibold" align="center">
                    {wirid.title}
                  </Text>

                  <Text variant="caption" color="secondary" align="center" className="italic line-clamp-2">
                    {wirid.translation}
                  </Text>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="inline-block px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded">
                      <Text variant="caption" className="text-xs">
                        {wirid.category}
                      </Text>
                    </div>
                    <Text variant="caption" color="secondary">
                      {wirid.count || 1}x
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container-app max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedWirid(null)}>
            ← Kembali
          </Button>
        </div>

        <Card padding="lg" className="text-center space-y-6">
          <Text variant="arabic" align="center" className="text-4xl md:text-5xl leading-relaxed">
            {selectedWirid.arabic}
          </Text>

          <div>
            <Text variant="h2" weight="bold">
              {selectedWirid.title}
            </Text>

            <div className="inline-block px-3 py-1 mt-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">
              <Text variant="caption" weight="medium">
                {selectedWirid.category}
              </Text>
            </div>

            {selectedWirid.latin && (
              <Text variant="body" color="secondary" className="mt-4 italic">
                {selectedWirid.latin}
              </Text>
            )}

            <Text variant="caption" color="secondary" className="mt-3 block">
              "{selectedWirid.translation}"
            </Text>
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
          <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
          className="w-full h-32 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-200"
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
            className="w-32 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            placeholder="Target"
            min="1"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
