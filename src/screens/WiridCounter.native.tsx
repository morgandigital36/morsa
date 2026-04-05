import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Text } from '../components/atoms/Text.native';
import { Card } from '../components/atoms/Card.native';
import { Button } from '../components/atoms/Button.native';
import { Layout } from '../components/organisms/Layout.native';
import { BottomNav } from '../components/organisms/BottomNav.native';
import { wiridData, Wirid, wiridCategories } from '../data/wiridData';

export function WiridCounter() {
  const [selectedWirid, setSelectedWirid] = useState<Wirid | null>(null);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const filteredWirid =
    selectedCategory === 'Semua'
      ? wiridData
      : wiridData.filter((w) => w.category === selectedCategory);

  const selectWirid = (wirid: Wirid) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedWirid(wirid);
    setCount(0);
    setTarget(wirid.count || 33);
  };

  const increment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCount((prev) => prev + 1);
  };

  const reset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCount(0);
  };

  const progress = (count / target) * 100;
  const isComplete = count >= target;

  if (!selectedWirid) {
    return (
      <View style={styles.container}>
        <Layout title="Wirid">
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
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

            {/* Wirid List */}
            <View style={styles.wiridGrid}>
              {filteredWirid.map((wirid) => (
                <Card
                  key={wirid.id}
                  padding="md"
                  hoverable
                  onPress={() => selectWirid(wirid)}
                  style={styles.wiridCard}
                >
                  <Text variant="h3" align="center" style={styles.arabic}>
                    {wirid.arabic}
                  </Text>

                  <Text variant="h4" weight="semibold" align="center" style={styles.title}>
                    {wirid.title}
                  </Text>

                  <Text
                    variant="caption"
                    color="secondary"
                    align="center"
                    numberOfLines={2}
                    style={styles.translation}
                  >
                    {wirid.translation}
                  </Text>

                  <View style={styles.wiridFooter}>
                    <View style={styles.categoryBadge}>
                      <Text variant="caption" style={styles.categoryText}>
                        {wirid.category}
                      </Text>
                    </View>
                    <Text variant="caption" color="secondary">
                      {wirid.count || 1}x
                    </Text>
                  </View>
                </Card>
              ))}
            </View>

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

                {wiridCategories.map((category) => (
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

  // Counter View
  return (
    <View style={styles.container}>
      <Layout
        title={selectedWirid.title}
        showBackButton
        onBack={() => setSelectedWirid(null)}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.counterContent}>
          {/* Wirid Info */}
          <Card padding="lg" style={styles.infoCard}>
            <Text variant="h2" align="center" style={styles.arabicLarge}>
              {selectedWirid.arabic}
            </Text>

            <View style={styles.categoryBadgeLarge}>
              <Text variant="body" weight="medium" style={styles.categoryTextLarge}>
                {selectedWirid.category}
              </Text>
            </View>

            {selectedWirid.latin && (
              <Text variant="body" color="secondary" align="center" style={styles.latin}>
                {selectedWirid.latin}
              </Text>
            )}

            <Text variant="caption" color="secondary" align="center" style={styles.meaning}>
              "{selectedWirid.translation}"
            </Text>
          </Card>

          {/* Counter Display */}
          <View style={styles.counterDisplay}>
            <Text
              variant="h1"
              weight="bold"
              align="center"
              style={[styles.counterNumber, isComplete && styles.counterComplete]}
            >
              {count}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(progress, 100)}%` },
                  isComplete && styles.progressComplete,
                ]}
              />
            </View>

            <View style={styles.progressInfo}>
              <Text variant="caption" color="secondary">
                {count} / {target}
              </Text>
              <Text variant="caption" color={isComplete ? 'success' : 'secondary'}>
                {isComplete ? '✓ Selesai!' : `${Math.round(progress)}%`}
              </Text>
            </View>
          </View>

          {/* Tap Button */}
          <TouchableOpacity
            onPress={increment}
            style={styles.tapButton}
            activeOpacity={0.8}
          >
            <Text variant="h2" weight="bold" style={styles.tapButtonText}>
              KETUK
            </Text>
          </TouchableOpacity>

          {/* Controls */}
          <View style={styles.controls}>
            <Button
              variant="secondary"
              size="large"
              onPress={reset}
              disabled={count === 0}
              leftIcon={<Ionicons name="refresh" size={20} color="#1F2937" />}
              style={styles.resetButton}
            >
              Reset
            </Button>

            <View style={styles.targetInput}>
              <Text variant="caption" color="secondary" style={styles.targetLabel}>
                Target
              </Text>
              <TextInput
                value={target.toString()}
                onChangeText={(text) => setTarget(parseInt(text) || 33)}
                keyboardType="number-pad"
                style={styles.input}
                maxLength={3}
              />
            </View>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </Layout>

      <BottomNav />
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
  counterContent: {
    padding: 16,
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
  wiridGrid: {
    gap: 12,
  },
  wiridCard: {
    marginBottom: 12,
  },
  arabic: {
    fontSize: 20,
    lineHeight: 32,
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
  },
  translation: {
    fontStyle: 'italic',
    marginBottom: 12,
  },
  wiridFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F0FDFA',
    borderRadius: 4,
  },
  categoryText: {
    color: '#14B8A6',
    fontSize: 11,
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
  infoCard: {
    marginBottom: 24,
  },
  arabicLarge: {
    fontSize: 32,
    lineHeight: 48,
    marginBottom: 16,
  },
  categoryBadgeLarge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#14B8A6',
    borderRadius: 20,
    marginBottom: 16,
  },
  categoryTextLarge: {
    color: '#FFFFFF',
  },
  latin: {
    fontStyle: 'italic',
    marginBottom: 12,
  },
  meaning: {
    marginTop: 8,
  },
  counterDisplay: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  counterNumber: {
    fontSize: 120,
    color: '#14B8A6',
  },
  counterComplete: {
    color: '#10B981',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 6,
  },
  progressComplete: {
    backgroundColor: '#10B981',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tapButton: {
    height: 120,
    backgroundColor: '#14B8A6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tapButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  resetButton: {
    flex: 1,
  },
  targetInput: {
    width: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    alignItems: 'center',
  },
  targetLabel: {
    marginBottom: 4,
  },
  input: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    padding: 0,
  },
  bottomPadding: {
    height: 100,
  },
});
