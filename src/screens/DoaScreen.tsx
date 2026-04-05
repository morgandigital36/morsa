import { useState, useEffect } from 'react';
import { Layout } from '../components/organisms/Layout';
import { doaData, Doa, doaCategories } from '../data/doaData';
import { Card } from '../components/atoms/Card';
import { Text } from '../components/atoms/Text';
import { Search, BookOpen, Filter } from 'lucide-react';

export function DoaScreen() {
  const [filteredDoas, setFilteredDoas] = useState<Doa[]>(doaData);
  const [selectedDoa, setSelectedDoa] = useState<Doa | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  useEffect(() => {
    let filtered = doaData;

    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter((doa) => doa.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(
        (doa) =>
          doa.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doa.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doa.translation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDoas(filtered);
  }, [searchQuery, selectedCategory]);

  if (selectedDoa) {
    return (
      <Layout title={selectedDoa.title} showBackButton onBack={() => setSelectedDoa(null)}>
        <div className="space-y-6 pb-6">
          <Card className="space-y-6">
            <div className="text-center space-y-2 pb-4 border-b border-gray-200 dark:border-gray-700">
              <Text variant="h2" weight="bold">
                {selectedDoa.title}
              </Text>
              <div className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">
                <Text variant="caption" weight="medium">
                  {selectedDoa.category}
                </Text>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Text variant="caption" color="secondary" className="mb-3 block">
                  Teks Arab
                </Text>
                <Text className="text-2xl leading-loose text-right font-arabic">
                  {selectedDoa.arabic}
                </Text>
              </div>

              <div>
                <Text variant="caption" color="secondary" className="mb-3 block">
                  Transliterasi
                </Text>
                <Text variant="body" className="italic">
                  {selectedDoa.latin}
                </Text>
              </div>

              <div>
                <Text variant="caption" color="secondary" className="mb-3 block">
                  Terjemahan
                </Text>
                <Text variant="body">"{selectedDoa.translation}"</Text>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Doa Harian" showBackButton>
      <div className="space-y-6 pb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari doa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
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
              {doaCategories.map((category) => (
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

        <div className="space-y-3">
          {filteredDoas.map((doa) => (
            <Card
              key={doa.id}
              onClick={() => setSelectedDoa(doa)}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 p-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <Text variant="body" weight="semibold" className="mb-1">
                    {doa.title}
                  </Text>
                  <Text variant="caption" color="secondary" className="line-clamp-2 italic mb-2">
                    {doa.latin}
                  </Text>
                  <div className="inline-block px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded">
                    <Text variant="caption" className="text-xs">
                      {doa.category}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDoas.length === 0 && (
          <div className="text-center py-12">
            <Text variant="h3" color="secondary">
              Tidak ada doa yang ditemukan
            </Text>
            <Text variant="body" color="secondary" className="mt-2">
              Coba kata kunci lain atau pilih kategori yang berbeda
            </Text>
          </div>
        )}
      </div>
    </Layout>
  );
}
