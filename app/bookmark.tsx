import { Ionicons } from '@expo/vector-icons';
import { Surface } from 'heroui-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Typography, Spacing, Radius, ContentColors, ProviderColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import sharpTech from '@/fixtures/spotify-sharp-tech-show.json';
import founders from '@/fixtures/spotify-founders-show.json';
import jre from '@/fixtures/spotify-jre-show.json';
import modernWisdom from '@/fixtures/spotify-modern-wisdom-show.json';
import dithering from '@/fixtures/spotify-dithering-show.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fixtures: Record<string, any> = {
  'sharp-tech': sharpTech,
  'founders': founders,
  'jre': jre,
  'modern-wisdom': modernWisdom,
  'dithering': dithering,
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// =============================================================================
// Types
// =============================================================================

interface Episode {
  id: string;
  name: string;
  description: string;
  duration_ms: number;
  release_date: string;
  images: { url: string; height: number; width: number }[];
  external_urls: { spotify: string };
}

// =============================================================================
// Helpers
// =============================================================================

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// =============================================================================
// Components
// =============================================================================

function BackButton({ colors, onPress }: { colors: typeof Colors.light; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.backButton, { backgroundColor: colors.backgroundSecondary }]}
    >
      <Ionicons name="chevron-back" size={24} color={colors.text} />
    </Pressable>
  );
}

function SourceBadge({ colors }: { colors: typeof Colors.light }) {
  return (
    <View style={[styles.sourceBadge, { backgroundColor: ProviderColors.spotify }]}>
      <Text style={styles.sourceBadgeText}>Spotify</Text>
    </View>
  );
}

function TypeBadge({ colors }: { colors: typeof Colors.light }) {
  return (
    <View style={[styles.typeBadge, { backgroundColor: ContentColors.podcast }]}>
      <Text style={styles.typeBadgeText}>Podcast</Text>
    </View>
  );
}

function ActionButton({
  label,
  variant,
  colors,
  icon,
  onPress,
}: {
  label: string;
  variant: 'primary' | 'secondary';
  colors: typeof Colors.light;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.actionButton,
        isPrimary
          ? { backgroundColor: colors.primary }
          : { backgroundColor: colors.backgroundSecondary, borderWidth: 1, borderColor: colors.border },
      ]}
    >
      <View style={styles.actionButtonContent}>
        <Text
          style={[
            styles.actionButtonText,
            { color: isPrimary ? '#FFFFFF' : colors.text },
          ]}
        >
          {label}
        </Text>
        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color={isPrimary ? '#FFFFFF' : colors.text}
            style={styles.actionButtonIcon}
          />
        )}
      </View>
    </Pressable>
  );
}

// =============================================================================
// Main Screen
// =============================================================================

export default function BookmarkScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { fixtureId } = useLocalSearchParams<{ fixtureId: string }>();

  // Get the fixture data based on route params, fallback to sharp-tech
  const podcastData = fixtures[fixtureId ?? 'sharp-tech'] ?? fixtures['sharp-tech'];

  // Get the first non-null episode from the fixture data
  const episode = podcastData.episodes.items.find((item: Episode | null) => item !== null) as Episode;
  const showName = podcastData.name;
  const publisher = podcastData.publisher;
  const showImage = podcastData.images[0]?.url;
  const coverImage = episode.images[0]?.url ?? showImage;

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        {/* Cover Image - Full width, 1/3 screen height */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.coverContainer}>
          <Image
            source={{ uri: coverImage }}
            style={[styles.coverImage, { backgroundColor: colors.backgroundSecondary }]}
          />
        </Animated.View>

        {/* Episode Info */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.episodeInfo}>
          <View style={styles.badgeRow}>
            <SourceBadge colors={colors} />
            <TypeBadge colors={colors} />
          </View>
          <Text style={[styles.showName, { color: colors.textSecondary }]}>
            {showName}
          </Text>
          <Text style={[styles.episodeTitle, { color: colors.text }]}>
            {episode.name}
          </Text>
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
              {publisher}
            </Text>
            <Text style={[styles.metaDot, { color: colors.textTertiary }]}>
              {' \u00B7 '}
            </Text>
            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
              {formatDate(episode.release_date)}
            </Text>
            <Text style={[styles.metaDot, { color: colors.textTertiary }]}>
              {' \u00B7 '}
            </Text>
            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
              {formatDuration(episode.duration_ms)}
            </Text>
          </View>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.actionsContainer}>
          <ActionButton label="Play Episode" variant="primary" colors={colors} icon="open-outline" />
          <ActionButton label="Add to Queue" variant="secondary" colors={colors} />
        </Animated.View>

        {/* Description */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.descriptionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About this episode
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {episode.description}
          </Text>
        </Animated.View>

        {/* Bookmark Info Card */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(400)}
          style={[styles.bookmarkCard, { backgroundColor: colors.backgroundSecondary }]}
        >
          <View style={styles.bookmarkCardHeader}>
            <View style={[styles.bookmarkIcon, { backgroundColor: colors.primary }]}>
              <Text style={styles.bookmarkIconText}>B</Text>
            </View>
            <View style={styles.bookmarkCardContent}>
              <Text style={[styles.bookmarkCardTitle, { color: colors.text }]}>
                Saved to your library
              </Text>
              <Text style={[styles.bookmarkCardMeta, { color: colors.textSecondary }]}>
                Bookmarked just now
              </Text>
            </View>
          </View>
          <Pressable
            style={[styles.removeButton, { borderColor: colors.border }]}
          >
            <Text style={[styles.removeButtonText, { color: colors.error }]}>
              Remove Bookmark
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>

      {/* Floating Back Button */}
      <SafeAreaView style={styles.floatingHeader} edges={['top']} pointerEvents="box-none">
        <Animated.View entering={FadeIn.duration(300)}>
          <BackButton colors={colors} onPress={() => router.back()} />
        </Animated.View>
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
    padding: 0,
    margin: 0,
  },

  // Floating Header
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing['4xl'],
  },

  // Cover
  coverContainer: {
    marginBottom: Spacing.xl,
    marginTop: 0,
    marginHorizontal: 0,
  },
  coverImage: {
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    marginTop: 0,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sourceBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  sourceBadgeText: {
    ...Typography.labelMedium,
    color: '#FFFFFF',
  },
  typeBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  typeBadgeText: {
    ...Typography.labelMedium,
    color: '#FFFFFF',
  },

  // Episode Info
  episodeInfo: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing['2xl'],
  },
  showName: {
    ...Typography.labelLarge,
    marginBottom: Spacing.xs,
  },
  episodeTitle: {
    ...Typography.headlineMedium,
    marginBottom: Spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaText: {
    ...Typography.bodySmall,
  },
  metaDot: {
    ...Typography.bodySmall,
  },

  // Actions
  actionsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    ...Typography.labelLarge,
  },
  actionButtonIcon: {
    marginLeft: Spacing.xs,
  },

  // Description
  descriptionContainer: {
    marginBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.titleLarge,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.bodyMedium,
    lineHeight: 24,
  },

  // Bookmark Card
  bookmarkCard: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.xl,
  },
  bookmarkCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  bookmarkIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  bookmarkIconText: {
    ...Typography.titleLarge,
    color: '#FFFFFF',
  },
  bookmarkCardContent: {
    flex: 1,
  },
  bookmarkCardTitle: {
    ...Typography.titleMedium,
    marginBottom: Spacing.xs,
  },
  bookmarkCardMeta: {
    ...Typography.bodySmall,
  },
  removeButton: {
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  removeButtonText: {
    ...Typography.labelLarge,
  },
});
