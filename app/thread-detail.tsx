import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profilJkt48 = require("@/assets/profile/profil_jkt48.jpg");

const { width } = Dimensions.get("window");

const REPLIES = [
  {
    id: "r1",
    user: "AninFans",
    text: "Setuju banget! Kemarin aku di row 3 juga rasanya energinya sampe belakang. Marsha emang improve banget vokalnya.",
    time: "1h ago",
    avatar: profilJkt48,
  },
  {
    id: "r2",
    user: "TheaterGoer",
    text: "Ada yang tau gak choreo tweak-nya di part mana? Tadi aku agak kurang ngeh.",
    time: "45m ago",
    avatar: profilJkt48,
  },
  {
    id: "r3",
    user: "MelodyLuv",
    text: "Itu lho pas bridge 'Tenshi no Shippo', gerakan tangannya sekarang lebih sharp.",
    time: "30m ago",
    avatar: profilJkt48,
  },
];

export default function ThreadDetailScreen() {
  const { title, author } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const renderReply = ({ item }: { item: (typeof REPLIES)[0] }) => (
    <View style={[styles.replyItem, { borderBottomColor: colors.border }]}>
      <Image source={item.avatar} style={styles.smallAvatar} />
      <View style={{ flex: 1 }}>
        <View style={styles.replyMeta}>
          <Text style={[styles.userName, { color: colors.text }]}>
            {item.user}
          </Text>
          <Text style={styles.replyTime}>{item.time}</Text>
        </View>
        <Text style={[styles.replyText, { color: colors.text }]}>
          {item.text}
        </Text>
        <TouchableOpacity style={styles.replyAction}>
          <IconSymbol name="bubble.left" size={14} color="#64748b" />
          <Text style={styles.replyActionText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text
          style={[styles.headerTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          Discussion
        </Text>
        <TouchableOpacity style={styles.moreButton}>
          <IconSymbol name="ellipsis" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={REPLIES}
        renderItem={renderReply}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.mainPost}>
            <View style={styles.authorRow}>
              <Image source={profilJkt48} style={styles.authorAvatar} />
              <View>
                <Text style={[styles.authorName, { color: colors.text }]}>
                  {author}
                </Text>
                <Text style={styles.postTime}>Just now • General</Text>
              </View>
            </View>
            <Text style={[styles.postTitle, { color: colors.text }]}>
              {title}
            </Text>
            <Text style={[styles.postContent, { color: colors.text }]}>
              The energy was incredible! Marsha's performance in 'Tenshi no
              Shippo' really stood out today. Anyone else notice the new choreo
              tweak? The bridge part feels much more dynamic now. Overall,
              Pajama Drive still remains one of the best setlists in the
              theater.
            </Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionItem}>
                <IconSymbol name="star.fill" size={18} color="#ec1313" />
                <Text style={[styles.actionText, { color: colors.text }]}>
                  124
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <IconSymbol name="bubble.left" size={18} color={colors.icon} />
                <Text style={[styles.actionText, { color: colors.text }]}>
                  3 replies
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <IconSymbol
                  name="paperplane.fill"
                  size={18}
                  color={colors.icon}
                />
                <Text style={[styles.actionText, { color: colors.text }]}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />
            <Text style={[styles.repliesTitle, { color: colors.text }]}>
              All Replies
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.card, borderTopColor: colors.border },
        ]}
      >
        <TextInput
          placeholder="Write a reply..."
          placeholderTextColor="#94a3b8"
          style={[styles.input, { color: colors.text }]}
        />
        <TouchableOpacity style={styles.sendButton}>
          <IconSymbol name="paperplane.fill" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  mainPost: {
    padding: 16,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 12,
    color: "#64748b",
  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 30,
    marginBottom: 12,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  repliesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
  replyItem: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  replyMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  replyTime: {
    fontSize: 12,
    color: "#64748b",
  },
  replyText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  replyAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  replyActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 14,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ec1313",
    justifyContent: "center",
    alignItems: "center",
  },
});
