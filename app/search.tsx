import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const jkt48_1 = require("@/assets/foto/vidio/jkt481.jpg");
const jkt48_2 = require("@/assets/foto/vidio/JKT482.jpg");
const wonderland_4 = require("@/assets/foto/vidio/JKT48 WONDERLAND4.jpg");

const SEARCH_FILTERS = ["All", "Shows", "Events", "Threads", "Members"];

const TRENDING = [
  { id: "t1", tag: "#JKT48SummerFest", count: "124K posts" },
  { id: "t2", tag: "Marsha Solo Performance", count: "85K posts" },
  { id: "t3", tag: "Gen 12 First Meet", count: "42K posts" },
  { id: "t4", tag: "Special Pajama Drive", count: "31K posts" },
];

const SEARCH_RESULTS = [
  {
    id: "1",
    type: "video",
    title: "JKT48 New Era Special Performance - Pajama Drive",
    sub: "JKT48 Official • 1.2M views",
    image: jkt48_1,
  },
  {
    id: "2",
    type: "event",
    title: "Summer Festival 2024",
    sub: "July 28 • Tennis Indoor Senayan",
    image: jkt48_2,
  },
  {
    id: "3",
    type: "thread",
    title: "Review of today's show",
    sub: "Started by MelodyLuv • 124 replies",
    icon: "bubble.left.and.bubble.right.fill",
  },
  {
    id: "4",
    type: "video",
    title: "Behind the Scenes: Wonderland",
    sub: "JKT48 Official • 300K views",
    image: wonderland_4,
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const renderResult = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        if (item.type === "video")
          router.push({
            pathname: "/video-detail",
            params: { id: item.id, title: item.title, thumbnail: item.image },
          });
        else if (item.type === "event")
          router.push({
            pathname: "/event-detail",
            params: { id: item.id, title: item.title, image: item.image },
          });
        else if (item.type === "thread")
          router.push({
            pathname: "/thread-detail",
            params: { id: item.id, title: item.title, author: "MelodyLuv" },
          });
      }}
    >
      {item.image ? (
        <Image source={item.image} style={styles.resultImage} />
      ) : (
        <View style={[styles.resultIcon, { backgroundColor: colors.border }]}>
          <IconSymbol name={item.icon} size={20} color={colors.icon} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={[styles.resultTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text style={styles.resultSub}>{item.sub}</Text>
      </View>
      <IconSymbol name="chevron.right" size={16} color={colors.icon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: colorScheme === "dark" ? "#3d1c1c" : "#f1f5f9",
              },
            ]}
          >
            <IconSymbol name="magnifyingglass" size={18} color="#94a3b8" />
            <TextInput
              placeholder="Search JKT48 world..."
              placeholderTextColor="#94a3b8"
              style={[styles.input, { color: colors.text }]}
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <IconSymbol
                  name="plus"
                  size={18}
                  color="#94a3b8"
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {SEARCH_FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTag,
                activeFilter === filter && styles.filterTagActive,
                { borderColor: colors.border },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                  { color: activeFilter === filter ? "#fff" : colors.text },
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {!query ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Trending Now
          </Text>
          <View style={styles.trendingList}>
            {TRENDING.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.trendingItem,
                  { borderBottomColor: colors.border },
                ]}
                onPress={() => setQuery(item.tag.replace("#", ""))}
              >
                <View style={styles.trendingIcon}>
                  <Text style={styles.trendingRank}>#</Text>
                </View>
                <View>
                  <Text style={[styles.trendingTag, { color: colors.text }]}>
                    {item.tag}
                  </Text>
                  <Text style={styles.trendingCount}>{item.count}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={[styles.sectionTitle, { color: colors.text, marginTop: 32 }]}
          >
            Recent Searches
          </Text>
          <View style={styles.tagCloud}>
            {["Pajama Drive", "Marsha", "Zee Gen 12"].map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={() => setQuery(tag)}
              >
                <Text style={[styles.tagText, { color: colors.text }]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={SEARCH_RESULTS.filter(
            (r) =>
              activeFilter === "All" ||
              r.type === activeFilter.toLowerCase().replace("s", ""),
          )}
          renderItem={renderResult}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  searchBar: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  filterScroll: {
    marginTop: 4,
  },
  filterTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterTagActive: {
    backgroundColor: "#ec1313",
    borderColor: "#ec1313",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  trendingList: {
    gap: 4,
  },
  trendingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 16,
  },
  trendingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(236,19,19,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  trendingRank: {
    color: "#ec1313",
    fontWeight: "900",
    fontSize: 18,
  },
  trendingTag: {
    fontSize: 15,
    fontWeight: "700",
  },
  trendingCount: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  tagCloud: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    paddingVertical: 12,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  resultImage: {
    width: 80,
    height: 45,
    borderRadius: 8,
  },
  resultIcon: {
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  resultSub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
});
