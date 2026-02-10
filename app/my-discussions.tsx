import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MY_THREADS = [
  {
    id: "1",
    title: "Prediction for JKT48 next setlist",
    replies: 42,
    time: "2 days ago",
    category: "General",
  },
  {
    id: "2",
    title: "Looking for Marsha Gen 10 Photocard",
    replies: 12,
    time: "1 week ago",
    category: "Trading",
  },
];

export default function MyDiscussionsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof MY_THREADS)[0] }) => (
    <TouchableOpacity
      style={[styles.threadItem, { borderBottomColor: colors.border }]}
      onPress={() =>
        router.push({
          pathname: "/thread-detail",
          params: { id: item.id, title: item.title, author: "Anindya Putri" },
        })
      }
    >
      <View style={styles.threadInfo}>
        <Text
          style={[styles.threadTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <View style={styles.threadMeta}>
          <Text style={styles.categoryText}>{item.category} • </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.repliesBadge}>
        <IconSymbol name="bubble.left" size={12} color="#ec1313" />
        <Text style={styles.repliesCount}>{item.replies}</Text>
      </View>
    </TouchableOpacity>
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Discussions
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Threads</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={[styles.tabText, { color: colors.icon }]}>
            Participated
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MY_THREADS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol
              name="bubble.left.and.bubble.right.fill"
              size={64}
              color={colors.border}
            />
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              No discussions yet
            </Text>
          </View>
        }
      />
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
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginVertical: 12,
    gap: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  activeTab: {
    backgroundColor: "#ec1313",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  listContent: {
    paddingBottom: 20,
  },
  threadItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  threadInfo: {
    flex: 1,
    marginRight: 16,
  },
  threadTitle: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 22,
  },
  threadMeta: {
    flexDirection: "row",
    marginTop: 6,
  },
  categoryText: {
    fontSize: 12,
    color: "#ec1313",
    fontWeight: "600",
  },
  timeText: {
    fontSize: 12,
    color: "#64748b",
  },
  repliesBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(236,19,19,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  repliesCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ec1313",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
