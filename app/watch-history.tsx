import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const jkt48_1 = require("@/assets/foto/vidio/jkt481.jpg");
const jkt48_2 = require("@/assets/foto/vidio/JKT482.jpg");
const jkt48_3 = require("@/assets/foto/vidio/JKT483.jpg");

const HISTORY = [
  {
    id: "1",
    title: "JKT48 New Era Special Performance - Pajama Drive",
    thumbnail: jkt48_1,
    progress: 0.8,
    time: "2 hours ago",
  },
  {
    id: "2",
    title: "JKT48 Theatre Show: Ramune No Nomikata",
    thumbnail: jkt48_2,
    progress: 1.0,
    time: "1 day ago",
  },
  {
    id: "3",
    title: "JKT48 Summer Festival 2024 - Highlight",
    thumbnail: jkt48_3,
    progress: 0.3,
    time: "3 days ago",
  },
];

export default function WatchHistoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof HISTORY)[0] }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() =>
        router.push({
          pathname: "/video-detail",
          params: { id: item.id, title: item.title, thumbnail: item.thumbnail },
        })
      }
    >
      <View style={styles.thumbnailContainer}>
        <Image source={item.thumbnail} style={styles.thumbnail} />
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarForeground,
              { width: `${item.progress * 100}%` },
            ]}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
        <TouchableOpacity style={styles.playAgain}>
          <IconSymbol name="play.fill" size={14} color="#ec1313" />
          <Text style={styles.playAgainText}>Watch Again</Text>
        </TouchableOpacity>
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
          Watch History
        </Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => alert("Clear History?")}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={HISTORY}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
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
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearText: {
    color: "#ec1313",
    fontWeight: "600",
    fontSize: 14,
  },
  listContent: {
    paddingVertical: 12,
  },
  historyItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  thumbnailContainer: {
    width: 140,
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  progressBarBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "#ec1313",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  playAgain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  playAgainText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ec1313",
  },
});
