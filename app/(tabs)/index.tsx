import { Surface } from 'heroui-native';
import { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// =============================================================================
// Utility Functions
// =============================================================================

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

// =============================================================================
// Mock Data
// =============================================================================

const mockStats = {
  savedCount: 42,
  inProgressCount: 7,
  thisWeekCount: 12,
};

const mockFeaturedContent = {
  id: 'featured-1',
  title: 'The Art of Calm Technology',
  subtitle: 'How to design products that respect human attention',
  source: 'Substack',
};

const mockRecentItems = [
  { id: '1', title: 'Building Better APIs', source: 'YouTube', type: 'video' },
  { id: '2', title: 'The Future of AI', source: 'Spotify', type: 'podcast' },
  { id: '3', title: 'React Native Best Practices', source: 'Substack', type: 'article' },
];

// =============================================================================
// Components
// =============================================================================

function QuickStats({ colors }: { colors: typeof Colors.light }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(400)}
      style={styles.statsContainer}
    >
      <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.statNumber, { color: colors.primary }]}>
          {mockStats.savedCount}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Saved</Text>
      </View>
      <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.statNumber, { color: colors.primary }]}>
          {mockStats.inProgressCount}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>In Progress</Text>
      </View>
      <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.statNumber, { color: colors.primary }]}>
          {mockStats.thisWeekCount}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>This Week</Text>
      </View>
    </Animated.View>
  );
}

function FeaturedCard({ colors }: { colors: typeof Colors.light }) {
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(400)}>
      <View style={[styles.featuredCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.featuredSource}>{mockFeaturedContent.source}</Text>
        <Text style={styles.featuredTitle}>{mockFeaturedContent.title}</Text>
        <Text style={styles.featuredSubtitle}>{mockFeaturedContent.subtitle}</Text>
      </View>
    </Animated.View>
  );
}

function RecentItems({ colors }: { colors: typeof Colors.light }) {
  return (
    <Animated.View entering={FadeInDown.delay(300).duration(400)}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent</Text>
      <View style={styles.recentList}>
        {mockRecentItems.map((item) => (
          <View
            key={item.id}
            style={[styles.recentItem, { backgroundColor: colors.backgroundSecondary }]}
          >
            <View style={[styles.recentItemIcon, { backgroundColor: colors.primary }]}>
              <Text style={styles.recentItemIconText}>
                {item.type === 'video' ? 'V' : item.type === 'podcast' ? 'P' : 'A'}
              </Text>
            </View>
            <View style={styles.recentItemContent}>
              <Text style={[styles.recentItemTitle, { color: colors.text }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={[styles.recentItemSource, { color: colors.textSecondary }]}>
                {item.source}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

// =============================================================================
// Main Screen
// =============================================================================

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const greeting = useMemo(() => getGreeting(), []);
  const dateStr = useMemo(() => formatDate(), []);

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>{greeting}</Text>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Your Library</Text>
            <Text style={[styles.dateText, { color: colors.textTertiary }]}>{dateStr}</Text>
          </Animated.View>

          {/* Quick Stats */}
          <QuickStats colors={colors} />

          {/* Featured Card */}
          <View style={styles.section}>
            <FeaturedCard colors={colors} />
          </View>

          {/* Recent Items */}
          <View style={styles.section}>
            <RecentItems colors={colors} />
          </View>

          {/* Bottom spacing for tab bar */}
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },

  // Header
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  greeting: {
    ...Typography.labelMedium,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    ...Typography.displayMedium,
    marginBottom: Spacing.xs,
  },
  dateText: {
    ...Typography.bodyMedium,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
  },
  statCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.headlineMedium,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.labelMedium,
  },

  // Sections
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    ...Typography.titleLarge,
    marginBottom: Spacing.lg,
  },

  // Featured
  featuredCard: {
    padding: Spacing['2xl'],
    borderRadius: Radius.xl,
  },
  featuredSource: {
    ...Typography.labelSmall,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: Spacing.sm,
  },
  featuredTitle: {
    ...Typography.headlineMedium,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  featuredSubtitle: {
    ...Typography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Recent Items
  recentList: {
    gap: Spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  recentItemIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentItemIconText: {
    color: '#FFFFFF',
    ...Typography.titleMedium,
  },
  recentItemContent: {
    flex: 1,
  },
  recentItemTitle: {
    ...Typography.titleMedium,
    marginBottom: Spacing.xs,
  },
  recentItemSource: {
    ...Typography.bodySmall,
  },

  // Bottom spacer
  bottomSpacer: {
    height: 40,
  },
});
