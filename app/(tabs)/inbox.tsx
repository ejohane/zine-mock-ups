import { Surface } from 'heroui-native';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useMemo } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import sharpTech from '@/fixtures/spotify-sharp-tech-show.json';
import founders from '@/fixtures/spotify-founders-show.json';
import jre from '@/fixtures/spotify-jre-show.json';
import modernWisdom from '@/fixtures/spotify-modern-wisdom-show.json';
import dithering from '@/fixtures/spotify-dithering-show.json';

const fixturesData = [
  { id: 'sharp-tech', data: sharpTech },
  { id: 'founders', data: founders },
  { id: 'jre', data: jre },
  { id: 'modern-wisdom', data: modernWisdom },
  { id: 'dithering', data: dithering },
];

// =============================================================================
// Helpers
// =============================================================================

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
}

// =============================================================================
// Types
// =============================================================================

interface InboxItemData {
  id: string;
  fixtureId: string;
  title: string;
  showName: string;
  publisher: string;
  imageUrl: string;
  duration: string;
}

// =============================================================================
// Components
// =============================================================================

function InboxItem({
  item,
  colors,
  index,
  onPress,
}: {
  item: InboxItemData;
  colors: typeof Colors.light;
  index: number;
  onPress: () => void;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
      <Pressable
        onPress={onPress}
        style={[styles.inboxItem, { backgroundColor: colors.backgroundSecondary }]}
      >
        <View style={styles.itemHeader}>
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
          <View style={styles.itemContent}>
            <Text style={[styles.itemShowName, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.showName}
            </Text>
            <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.itemMeta, { color: colors.textTertiary }]}>
              {item.publisher} · {item.duration}
            </Text>
          </View>
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
  const router = useRouter();

  const inboxItems = useMemo(() => {
    return fixturesData
      .map(({ id, data }) => {
        const episode = data.episodes.items.find((ep: unknown) => ep !== null);
        if (!episode) return null;
        return {
          id,
          fixtureId: id,
          title: episode.name,
          showName: data.name,
          publisher: data.publisher,
          imageUrl: data.images[0]?.url ?? '',
          duration: formatDuration(episode.duration_ms),
        };
      })
      .filter((item): item is InboxItemData => item !== null);
  }, []);

  const handleItemPress = (fixtureId: string) => {
    router.push({ pathname: '/bookmark', params: { fixtureId } });
  };

  const renderItem = ({ item, index }: { item: InboxItemData; index: number }) => (
    <InboxItem item={item} colors={colors} index={index} onPress={() => handleItemPress(item.fixtureId)} />
  );

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Inbox</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {inboxItems.length} items to triage
          </Text>
        </View>

        {/* Content */}
        <FlatList
          data={inboxItems}
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
  itemHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: Radius.md,
    marginRight: Spacing.md,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemShowName: {
    ...Typography.labelSmall,
    marginBottom: Spacing.xs,
  },
  itemTitle: {
    ...Typography.titleMedium,
    marginBottom: Spacing.xs,
  },
  itemMeta: {
    ...Typography.bodySmall,
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
