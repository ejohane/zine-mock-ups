import { Surface } from 'heroui-native';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// =============================================================================
// Mock Data
// =============================================================================

const mockInboxItems = [
  {
    id: '1',
    title: 'Understanding TypeScript Generics',
    creator: 'Matt Pocock',
    source: 'YouTube',
    type: 'video',
    duration: '15:32',
  },
  {
    id: '2',
    title: 'The State of JavaScript 2024',
    creator: 'Syntax.fm',
    source: 'Spotify',
    type: 'podcast',
    duration: '1:23:45',
  },
  {
    id: '3',
    title: 'Why React Server Components Matter',
    creator: 'Dan Abramov',
    source: 'Substack',
    type: 'article',
    readTime: '8 min read',
  },
  {
    id: '4',
    title: 'Building a Design System from Scratch',
    creator: 'Figma',
    source: 'YouTube',
    type: 'video',
    duration: '42:18',
  },
  {
    id: '5',
    title: 'The Future of Mobile Development',
    creator: 'React Native Radio',
    source: 'Spotify',
    type: 'podcast',
    duration: '58:12',
  },
];

// =============================================================================
// Components
// =============================================================================

function InboxItem({
  item,
  colors,
  index,
}: {
  item: (typeof mockInboxItems)[0];
  colors: typeof Colors.light;
  index: number;
}) {
  const typeColors = {
    video: '#EF4444',
    podcast: '#8B5CF6',
    article: '#3B82F6',
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
      <Pressable
        style={[styles.inboxItem, { backgroundColor: colors.backgroundSecondary }]}
      >
        <View
          style={[
            styles.itemTypeIcon,
            { backgroundColor: typeColors[item.type as keyof typeof typeColors] },
          ]}
        >
          <Text style={styles.itemTypeText}>
            {item.type === 'video' ? 'V' : item.type === 'podcast' ? 'P' : 'A'}
          </Text>
        </View>
        <View style={styles.itemContent}>
          <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.itemMeta, { color: colors.textSecondary }]}>
            {item.creator} · {item.source}
          </Text>
          <Text style={[styles.itemDuration, { color: colors.textTertiary }]}>
            {item.duration || item.readTime}
          </Text>
        </View>
        <View style={styles.itemActions}>
          <Pressable
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.actionButtonText}>Save</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButtonSecondary, { borderColor: colors.border }]}
          >
            <Text style={[styles.actionButtonSecondaryText, { color: colors.textSecondary }]}>
              Skip
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// =============================================================================
// Main Screen
// =============================================================================

export default function InboxScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const renderItem = ({ item, index }: { item: (typeof mockInboxItems)[0]; index: number }) => (
    <InboxItem item={item} colors={colors} index={index} />
  );

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Inbox</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {mockInboxItems.length} items to triage
          </Text>
        </View>

        {/* Content */}
        <FlatList
          data={mockInboxItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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

  // List
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  separator: {
    height: Spacing.md,
  },

  // Inbox Item
  inboxItem: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  itemTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  itemTypeText: {
    color: '#FFFFFF',
    ...Typography.titleMedium,
  },
  itemContent: {
    marginBottom: Spacing.lg,
  },
  itemTitle: {
    ...Typography.titleMedium,
    marginBottom: Spacing.xs,
  },
  itemMeta: {
    ...Typography.bodySmall,
    marginBottom: Spacing.xs,
  },
  itemDuration: {
    ...Typography.labelSmall,
  },

  // Actions
  itemActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    ...Typography.labelLarge,
  },
  actionButtonSecondary: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionButtonSecondaryText: {
    ...Typography.labelLarge,
  },
});
