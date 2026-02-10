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
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const jkt48_1 = require("@/assets/foto/vidio/jkt481.jpg");
const jkt48_2 = require("@/assets/foto/vidio/JKT482.jpg");
const profilJkt48 = require("@/assets/profile/profil_jkt48.jpg");

const CATEGORIES = [
  "General",
  "Theater",
  "Fan Project",
  "Trading Cards",
  "Rumors",
  "Member Support",
];

const THREADS = [
  {
    id: "1",
    title: "Review of today's Pajama Drive show (1st Row experience)",
    author: "MelodyLuv",
    time: "2m ago",
    replies: 124,
    excerpt:
      "The energy was incredible! Marsha's performance in 'Tenshi no Shippo' really stood out today. Anyone else notice the new choreo tweak?",
    avatar: profilJkt48,
    category: "General",
  },
  {
    id: "2",
    title: "Gree Day Trading Card Exchange (Gen 10 & 11)",
    author: "OshiHunter",
    time: "15m ago",
    active: 86,
    avatar: profilJkt48,
    category: "Trading Cards",
    isTrading: true,
  },
  {
    id: "3",
    title: "[OFFICIAL] JKT48 12th Anniversary Fan Project Megathread",
    author: "Moderator Announcement",
    time: "1h ago",
    replies: "1.2k",
    excerpt:
      "Submit your creative ideas for the upcoming anniversary project here. Let's make it the best one yet!",
    isFeatured: true,
    category: "General",
  },
  {
    id: "4",
    title: "When will the next Seitansai schedule be released?",
    author: "TheaterGoer88",
    time: "45m ago",
    replies: 32,
    avatar: profilJkt48,
    category: "Theater",
  },
  {
    id: "5",
    title: "Theory: Next Center for the upcoming High Tension?",
    author: "WotaAnalyst",
    time: "1h ago",
    replies: 89,
    excerpt:
      "If we look at the recent media appearances, it's very likely that either Christy or Zee will take the center spot.",
    avatar: profilJkt48,
    category: "Rumors",
  },
  {
    id: "6",
    title: "Support Project for Gracia - Birthday 2024",
    author: "GraciaLova",
    time: "3h ago",
    replies: 56,
    excerpt:
      "We're planning to send 100 bouquets of flowers for the theater birthday show. PM me if you want to contribute!",
    avatar: profilJkt48,
    category: "Fan Project",
  },
];

export default function ForumScreen() {
  const [activeCategory, setActiveCategory] = useState("General");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const filteredThreads = THREADS.filter((thread) => {
    return thread.category === activeCategory;
  });

  const renderThread = ({ item }: { item: (typeof THREADS)[0] }) => {
    const onPress = () => {
      router.push({
        pathname: "/thread-detail",
        params: { id: item.id, title: item.title, author: item.author },
      });
    };

    if (item.isFeatured) {
      return (
        <TouchableOpacity style={styles.featuredCard} onPress={onPress}>
          <View style={styles.featuredHeader}>
            <View style={styles.featuredIconContainer}>
              <IconSymbol name="star.fill" size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Text style={styles.featuredAuthor}>{item.author}</Text>
            </View>
          </View>
          <Text style={styles.featuredExcerpt}>{item.excerpt}</Text>
          <View style={styles.featuredFooter}>
            <View style={styles.statsRow}>
              <IconSymbol
                name="clock"
                size={14}
                color="rgba(255,255,255,0.7)"
              />
              <Text style={styles.featuredStatText}>{item.time}</Text>
              <View style={{ width: 12 }} />
              <IconSymbol
                name="bubble.left"
                size={14}
                color="rgba(255,255,255,0.7)"
              />
              <Text style={styles.featuredStatText}>
                {item.replies} replies
              </Text>
            </View>
            <View style={styles.pinContainer}>
              <IconSymbol name="pin.fill" size={12} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={onPress}
      >
        <View style={styles.cardHeader}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={styles.cardAuthor}>
              Started by{" "}
              <Text style={{ color: Colors.light.tint, fontWeight: "600" }}>
                {item.author}
              </Text>
            </Text>
          </View>
          <IconSymbol name="ellipsis" size={20} color={colors.icon} />
        </View>

        {item.excerpt && (
          <Text
            style={[
              styles.cardExcerpt,
              { color: colorScheme === "dark" ? "#cbd5e1" : "#4b5563" },
            ]}
            numberOfLines={2}
          >
            {item.excerpt}
          </Text>
        )}

        <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
          <View style={styles.statsRow}>
            <IconSymbol name="clock" size={14} color={colors.icon} />
            <Text style={[styles.statText, { color: colors.icon }]}>
              {item.time}
            </Text>
            <View style={{ width: 12 }} />
            {item.replies ? (
              <>
                <IconSymbol name="bubble.left" size={14} color={colors.icon} />
                <Text style={[styles.statText, { color: colors.icon }]}>
                  {item.replies} replies
                </Text>
              </>
            ) : (
              <>
                <IconSymbol name="person.2" size={14} color={colors.icon} />
                <Text style={[styles.statText, { color: colors.icon }]}>
                  {item.active} active
                </Text>
              </>
            )}
          </View>

          {item.isTrading ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>TRADING</Text>
            </View>
          ) : item.category ? (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "#f1f5f9",
                },
              ]}
            >
              <Text style={[styles.badgeText, { color: colors.icon }]}>
                {item.category.toUpperCase()}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]}>Forums</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[
                styles.headerButton,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "rgba(236,19,19,0.1)" : "#fff",
                  borderColor:
                    colorScheme === "dark" ? "rgba(236,19,19,0.2)" : "#e2e8f0",
                },
              ]}
              onPress={() => router.push("/search")}
            >
              <IconSymbol
                name="magnifyingglass"
                size={20}
                color={Colors.light.tint}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.headerButton,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "rgba(236,19,19,0.1)" : "#fff",
                  borderColor:
                    colorScheme === "dark" ? "rgba(236,19,19,0.2)" : "#e2e8f0",
                },
              ]}
              onPress={() => router.push("/notifications")}
            >
              <IconSymbol name="bell" size={20} color={Colors.light.tint} />
              <View style={styles.notificationDot} />
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
        data={filteredThreads}
        renderItem={renderThread}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab}>
        <IconSymbol name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ec1313",
    borderWidth: 2,
    borderColor: "#fff",
  },
  categories: {
    flexDirection: "row",
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  categoryButtonActive: {
    backgroundColor: "#ec1313",
    borderColor: "#ec1313",
    shadowColor: "#ec1313",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 20,
  },
  cardAuthor: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  cardExcerpt: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "rgba(236,19,19,0.1)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ec1313",
  },
  featuredCard: {
    backgroundColor: "#ec1313",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#ec1313",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  featuredHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  featuredIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  featuredTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 20,
  },
  featuredAuthor: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  featuredExcerpt: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  featuredStatText: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255,255,255,0.8)",
    marginLeft: 4,
  },
  pinContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ec1313",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
