import { useState } from 'react';
import { Surface } from 'heroui-native';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Colors, Typography, Spacing, Radius, ContentColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// =============================================================================
// Icons
// =============================================================================

function SearchIcon({ size = 20, color = '#94A3B8' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <Path
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// =============================================================================
// Mock Data
// =============================================================================

const mockLibraryItems = [
  {
    id: '1',
    title: 'Understanding TypeScript Generics',
    creator: 'Matt Pocock',
    type: 'video',
    savedAt: '2 days ago',
    progress: 75,
  },
  {
    id: '2',
    title: 'The State of JavaScript 2024',
    creator: 'Syntax.fm',
    type: 'podcast',
    savedAt: '3 days ago',
    progress: 30,
  },
  {
    id: '3',
    title: 'Why React Server Components Matter',
    creator: 'Dan Abramov',
    type: 'article',
    savedAt: '1 week ago',
    progress: 100,
  },
  {
    id: '4',
    title: 'Advanced CSS Techniques',
    creator: 'Kevin Powell',
    type: 'video',
    savedAt: '1 week ago',
    progress: 0,
  },
  {
    id: '5',
    title: 'Building Accessible Components',
    creator: 'Sara Soueidan',
    type: 'article',
    savedAt: '2 weeks ago',
    progress: 50,
  },
];

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'article', label: 'Articles', color: ContentColors.article },
  { id: 'podcast', label: 'Podcasts', color: ContentColors.podcast },
  { id: 'video', label: 'Videos', color: ContentColors.video },
];

// =============================================================================
// Components
// =============================================================================

function FilterChip({
  label,
  isSelected,
  onPress,
  color,
  colors,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  color?: string;
  colors: typeof Colors.light;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.filterChip,
        {
          backgroundColor: isSelected ? colors.primary : colors.backgroundSecondary,
          borderColor: isSelected ? colors.primary : colors.border,
        },
      ]}
    >
      {color && !isSelected && (
        <View style={[styles.filterDot, { backgroundColor: color }]} />
      )}
      <Text style={[styles.filterChipText, { color: isSelected ? '#fff' : colors.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function LibraryItem({
  item,
  colors,
  index,
}: {
  item: (typeof mockLibraryItems)[0];
  colors: typeof Colors.light;
  index: number;
}) {
  const typeColors = {
    video: ContentColors.video,
    podcast: ContentColors.podcast,
    article: ContentColors.article,
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
      <Pressable style={[styles.libraryItem, { backgroundColor: colors.backgroundSecondary }]}>
        <View style={styles.itemHeader}>
          <View
            style={[
              styles.itemTypeTag,
              { backgroundColor: typeColors[item.type as keyof typeof typeColors] },
            ]}
          >
            <Text style={styles.itemTypeTagText}>{item.type}</Text>
          </View>
          <Text style={[styles.itemSavedAt, { color: colors.textTertiary }]}>{item.savedAt}</Text>
        </View>
        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.itemCreator, { color: colors.textSecondary }]}>{item.creator}</Text>
        {item.progress > 0 && item.progress < 100 && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: colors.primary, width: `${item.progress}%` },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textTertiary }]}>
              {item.progress}%
            </Text>
          </View>
        )}
        {item.progress === 100 && (
          <View style={[styles.completedBadge, { backgroundColor: colors.success }]}>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

// =============================================================================
// Main Screen
// =============================================================================

export default function LibraryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredItems =
    selectedFilter === 'all'
      ? mockLibraryItems
      : mockLibraryItems.filter((item) => item.type === selectedFilter);

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Library</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {filteredItems.length} saved items
          </Text>
        </View>

        {/* Search Bar */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(400)}
          style={styles.searchContainer}
        >
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
              },
            ]}
          >
            <SearchIcon size={18} color={colors.textTertiary} />
            <TextInput
              placeholder="Search your library..."
              placeholderTextColor={colors.textTertiary}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>
        </Animated.View>

        {/* Filter Chips */}
        <Animated.View entering={FadeInRight.delay(150).duration(400)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {filterOptions.map((filter) => (
              <FilterChip
                key={filter.id}
                label={filter.label}
                isSelected={selectedFilter === filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                color={filter.color}
                colors={colors}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Content */}
        <ScrollView
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredItems.map((item, index) => (
            <LibraryItem key={item.id} item={item} colors={colors} index={index} />
          ))}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </Surface>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    ...Typography.displayMedium,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.bodyMedium,
  },

  // Search
  searchContainer: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.bodyMedium,
    paddingVertical: 0,
  },

  // Filters
  filterContainer: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  filterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  filterChipText: {
    ...Typography.labelMedium,
  },

  // List
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },

  // Library Item
  libraryItem: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  itemTypeTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  itemTypeTagText: {
    color: '#FFFFFF',
    ...Typography.labelSmall,
    textTransform: 'capitalize',
  },
  itemSavedAt: {
    ...Typography.bodySmall,
  },
  itemTitle: {
    ...Typography.titleMedium,
    marginBottom: Spacing.xs,
  },
  itemCreator: {
    ...Typography.bodySmall,
    marginBottom: Spacing.md,
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    ...Typography.labelSmall,
    minWidth: 32,
    textAlign: 'right',
  },

  // Completed badge
  completedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  completedText: {
    color: '#FFFFFF',
    ...Typography.labelSmall,
  },

  // Bottom spacer
  bottomSpacer: {
    height: 40,
  },
});
