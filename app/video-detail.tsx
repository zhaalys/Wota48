import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const profilJkt48 = require("@/assets/profile/profil_jkt48.jpg");

const { width } = Dimensions.get("window");

const COMMENTS = [
  {
    id: "1",
    user: "WotaSejati",
    text: "Marsha keren banget di sini! 😍",
    time: "2h ago",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
  },
  {
    id: "2",
    user: "AninFans",
    text: "Gak sabar nunggu single berikutnya!",
    time: "5h ago",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    id: "3",
    user: "TheaterGoer",
    text: "Setlist Pajama Drive emang gak ada matinya.",
    time: "1d ago",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
  },
];

export default function VideoDetailScreen() {
  const { title, thumbnail } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Video Player Placeholder */}
      <View style={styles.playerContainer}>
        <Image
          source={
            typeof thumbnail === "string"
              ? thumbnail.startsWith("http")
                ? { uri: thumbnail }
                : parseInt(thumbnail, 10)
              : (thumbnail as any)
          }
          style={styles.player}
        />
        <View style={styles.playerOverlay}>
          <TouchableOpacity style={styles.mainPlayButton}>
            <IconSymbol name="play.fill" size={48} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.videoInfo}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={styles.metadata}>1.2M views • 2 days ago</Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionItem}>
              <IconSymbol
                name="paperplane.fill"
                size={20}
                color={colors.text}
              />
              <Text style={[styles.actionText, { color: colors.text }]}>
                124K
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <IconSymbol name="bubble.left" size={20} color={colors.text} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                8.5K
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <IconSymbol
                name="paperplane.fill"
                size={20}
                color={colors.text}
              />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Share
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <IconSymbol name="plus" size={20} color={colors.text} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.channelInfo}>
            <Image source={profilJkt48} style={styles.channelAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.channelName, { color: colors.text }]}>
                JKT48 Official
              </Text>
              <Text style={styles.subCount}>5.2M subscribers</Text>
            </View>
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>SUBSCRIBE</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Comments Section */}
          <View style={styles.commentsHeader}>
            <Text style={[styles.commentsTitle, { color: colors.text }]}>
              Comments
            </Text>
            <Text style={styles.commentsCount}>8.5K</Text>
          </View>

          <View style={styles.commentInputRow}>
            <Image source={profilJkt48} style={styles.smallAvatar} />
            <TextInput
              placeholder="Add a public comment..."
              placeholderTextColor="#94a3b8"
              style={[styles.input, { color: colors.text }]}
            />
          </View>

          {COMMENTS.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Image
                source={{ uri: comment.avatar }}
                style={styles.smallAvatar}
              />
              <View style={{ flex: 1 }}>
                <View style={styles.commentMeta}>
                  <Text style={[styles.userName, { color: colors.text }]}>
                    {comment.user}
                  </Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
                <Text style={[styles.commentText, { color: colors.text }]}>
                  {comment.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    position: "relative",
  },
  player: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  playerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  mainPlayButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(236,19,19,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  videoInfo: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
  },
  metadata: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionItem: {
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 20,
  },
  channelInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  channelName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subCount: {
    fontSize: 12,
    color: "#64748b",
  },
  subscribeButton: {
    backgroundColor: "#ec1313",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  subscribeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  commentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentsCount: {
    fontSize: 16,
    color: "#64748b",
  },
  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  commentItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  commentMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  userName: {
    fontSize: 13,
    fontWeight: "bold",
  },
  commentTime: {
    fontSize: 12,
    color: "#64748b",
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
