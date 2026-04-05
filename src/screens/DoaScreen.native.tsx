import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../components/atoms/Text.native';
import { Card } from '../components/atoms/Card.native';
import { Layout } from '../components/organisms/Layout.native';
import { BottomNav } from '../components/organisms/BottomNav.native';
import { doaData, Doa, doaCategories } from '../data/doaData';

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
      <View style={styles.container}>
        <Layout
          title={selectedDoa.title}
          showBackButton
          onBack={() => setSelectedDoa(null)}
        >
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.doaDetailContent}>
            <Card style={styles.doaDetailCard}>
              <View style={styles.doaDetailHeader}>
                <Text variant="h2" weight="bold" align="center">
                  {selectedDoa.title}
                </Text>
                <View style={styles.categoryBadge}>
                  <Text variant="caption" weight="medium" style={styles.categoryText}>
                    {selectedDoa.category}
                  </Text>
                </View>
              </View>

              <View style={styles.doaDetailBody}>
                <View style={styles.section}>
                  <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                    Teks Arab
                  </Text>
                  <Text variant="h2" align="right" style={styles.arabicText}>
                    {selectedDoa.arabic}
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                    Transliterasi
                  </Text>
                  <Text variant="body" style={styles.latinText}>
                    {selectedDoa.latin}
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                    Terjemahan
                  </Text>
                  <Text variant="body">"{selectedDoa.translation}"</Text>
                </View>
              </View>
            </Card>
          </ScrollView>
        </Layout>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Layout title="Doa Harian" showBackButton>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari doa..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Category Filter */}
          <TouchableOpacity
            onPress={() => setShowCategoryFilter(true)}
            style={styles.filterButton}
            activeOpacity={0.7}
          >
            <Ionicons name="filter" size={16} color="#14B8A6" />
            <Text variant="body" weight="medium" style={styles.filterText}>
              {selectedCategory === 'Semua' ? 'Semua Kategori' : selectedCategory}
            </Text>
          </TouchableOpacity>

          {/* Doa List */}
          <View style={styles.doaList}>
            {filteredDoas.map((doa: Doa) => (
              <View key={doa.id}>
                <Card
                  padding="none"
                  hoverable
                  onPress={() => setSelectedDoa(doa)}
                  style={styles.doaCard}
                >
                <View style={styles.doaCardContent}>
                  <View style={styles.doaIcon}>
                    <Ionicons name="book" size={20} color="#FFFFFF" />
                  </View>

                  <View style={styles.doaInfo}>
                    <Text variant="body" weight="semibold" style={styles.doaTitle}>
                      {doa.title}
                    </Text>
                    <Text variant="caption" color="secondary" numberOfLines={2} style={styles.doaLatin}>
                      {doa.latin}
                    </Text>
                    <View style={styles.categoryBadgeSmall}>
                      <Text variant="caption" style={styles.categoryTextSmall}>
                        {doa.category}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
              </View>
            ))}
          </View>

          {filteredDoas.length === 0 && (
            <View style={styles.emptyState}>
              <Text variant="h3" color="secondary" align="center">
                Tidak ada doa yang ditemukan
              </Text>
              <Text variant="body" color="secondary" align="center" style={styles.emptyHint}>
                Coba kata kunci lain atau pilih kategori yang berbeda
              </Text>
            </View>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </Layout>

      <BottomNav />

      {/* Category Filter Modal */}
      <Modal
        visible={showCategoryFilter}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryFilter(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="h3" weight="semibold">
                Pilih Kategori
              </Text>
              <TouchableOpacity onPress={() => setShowCategoryFilter(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('Semua');
                  setShowCategoryFilter(false);
                }}
                style={[
                  styles.categoryItem,
                  selectedCategory === 'Semua' && styles.categoryItemActive,
                ]}
              >
                <Text
                  variant="body"
                  weight={selectedCategory === 'Semua' ? 'semibold' : 'regular'}
                >
                  Semua Kategori
                </Text>
              </TouchableOpacity>

              {doaCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => {
                    setSelectedCategory(category);
                    setShowCategoryFilter(false);
                  }}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category && styles.categoryItemActive,
                  ]}
                >
                  <Text
                    variant="body"
                    weight={selectedCategory === category ? 'semibold' : 'regular'}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  doaDetailContent: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F0FDFA',
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  filterText: {
    color: '#14B8A6',
  },
  doaList: {
    gap: 12,
  },
  doaCard: {
    marginBottom: 0,
  },
  doaCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  doaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#14B8A6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doaInfo: {
    flex: 1,
  },
  doaTitle: {
    marginBottom: 4,
  },
  doaLatin: {
    fontStyle: 'italic',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#14B8A6',
    borderRadius: 20,
    marginTop: 16,
  },
  categoryText: {
    color: '#FFFFFF',
  },
  categoryBadgeSmall: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F0FDFA',
    borderRadius: 4,
  },
  categoryTextSmall: {
    color: '#14B8A6',
    fontSize: 11,
  },
  emptyState: {
    paddingVertical: 48,
  },
  emptyHint: {
    marginTop: 8,
  },
  bottomPadding: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryItemActive: {
    backgroundColor: '#F0FDFA',
  },
  doaDetailCard: {
    marginBottom: 16,
  },
  doaDetailHeader: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 24,
  },
  doaDetailBody: {
    gap: 24,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    marginBottom: 4,
  },
  arabicText: {
    fontSize: 24,
    lineHeight: 40,
  },
  latinText: {
    fontStyle: 'italic',
  },
});