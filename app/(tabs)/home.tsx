import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const jkt48_1 = require("@/assets/foto/vidio/jkt481.jpg");
const jkt48_2 = require("@/assets/foto/vidio/JKT482.jpg");
const jkt48_3 = require("@/assets/foto/vidio/JKT483.jpg");
const wonderland_4 = require("@/assets/foto/vidio/JKT48 WONDERLAND4.jpg");
const profilJkt48 = require("@/assets/profile/profil_jkt48.jpg");

const { width } = Dimensions.get("window");

const CATEGORIES = [
  "All Shows",
  "Theater",
  "JKT48 TV",
  "Performance",
  "Behind the Scenes",
  "Variety",
  "Event",
];

const VIDEOS = [
  {
    id: "1",
    title: "JKT48 New Era Special Performance - Pajama Drive",
    thumbnail: jkt48_1,
    duration: "15:24",
    views: "1.2M views",
    date: "2 days ago",
    channelAvatar: profilJkt48,
    channelName: "JKT48 Official",
    category: "Performance",
  },
  {
    id: "2",
    title: "JKT48 Theatre Show: Ramune No Nomikata",
    thumbnail: jkt48_2,
    duration: "42:10",
    views: "850K views",
    date: "1 week ago",
    channelAvatar: profilJkt48,
    channelName: "JKT48 Official",
    category: "Theater",
  },
  {
    id: "3",
    title: "JKT48 Wonderland: Behind the Scenes",
    thumbnail: wonderland_4,
    duration: "18:15",
    views: "2.4M views",
    date: "3 weeks ago",
    channelAvatar: profilJkt48,
    channelName: "JKT48 Official",
    category: "Behind the Scenes",
  },
  {
    id: "4",
    title: "JKT48 Summer Festival 2024 - Highlight",
    thumbnail: jkt48_3,
    duration: "12:05",
    views: "500K views",
    date: "4 days ago",
    channelAvatar: profilJkt48,
    channelName: "JKT48 Official",
    category: "Event",
  },
  {
    id: "5",
    title: "JKT48 TV: Culinary Challenge with Gen 12",
    thumbnail: jkt48_1,
    duration: "25:30",
    views: "150K views",
    date: "5 hours ago",
    channelAvatar: profilJkt48,
    channelName: "JKT48 Official",
    category: "JKT48 TV",
  },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("All Shows");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const filteredVideos = VIDEOS.filter((video) => {
    if (activeCategory === "All Shows") return true;
    return video.category === activeCategory;
  });

  const renderVideoItem = ({ item }: { item: (typeof VIDEOS)[0] }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() =>
        router.push({
          pathname: "/video-detail",
          params: { id: item.id, title: item.title, thumbnail: item.thumbnail },
        })
      }
    >
      <View style={styles.thumbnailContainer}>
        <Image source={item.thumbnail} style={styles.thumbnail} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        <View style={styles.playButton}>
          <IconSymbol name="play.fill" size={24} color="#fff" />
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Image source={item.channelAvatar} style={styles.channelAvatar} />
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.videoTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text style={styles.videoMetadata}>
            {item.channelName} • {item.views} • {item.date}
          </Text>
        </View>
        <TouchableOpacity>
          <IconSymbol name="ellipsis" size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>WOTA</Text>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>48</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/search")}
            >
              <IconSymbol
                name="magnifyingglass"
                size={22}
                color={colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/profile")}
            >
              <Image source={profilJkt48} style={styles.profileAvatar} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        >
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.categoryButtonActive,
                { marginLeft: index === 0 ? 0 : 8 },
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  logoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ec1313",
    letterSpacing: -1,
  },
  logoBadge: {
    backgroundColor: "#000",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 2,
  },
  logoBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#ec1313",
  },
  categories: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  categoryButtonActive: {
    backgroundColor: "#000",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  categoryTextActive: {
    color: "#fff",
  },
  listContent: {
    paddingBottom: 20,
  },
  videoCard: {
    marginBottom: 24,
  },
  thumbnailContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -28,
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(236,19,19,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  videoInfo: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 22,
  },
  videoMetadata: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },
});
