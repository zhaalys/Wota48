import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
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

const { width } = Dimensions.get("window");

const SAVED_PERFORMANCES = [
  {
    id: "1",
    title: "JKT48 New Era Special Performance - Pajama Drive",
    thumbnail: jkt48_1,
    date: "Watched: 3 Jun 2024",
  },
  {
    id: "2",
    title: "JKT48 Theatre Show: Ramune No Nomikata",
    thumbnail: jkt48_2,
    date: "Watched: 20 May 2024",
  },
  {
    id: "3",
    title: "JKT48 Wonderland: Behind the Scenes",
    thumbnail: wonderland_4,
    date: "Watched: 15 May 2024",
  },
  {
    id: "4",
    title: "JKT48 Summer Festival 2024 - Highlight",
    thumbnail: jkt48_3,
    date: "Watched: 10 May 2024",
  },
];

const UPCOMING_EVENTS = [
  {
    id: "e1",
    title: "JKT48 Summer Festival 2024",
    location: "Tennis Indoor Senayan",
    date: "July 28, 2024",
    image: jkt48_3,
  },
  {
    id: "e2",
    title: "Handshake Event: Gen 12 First Meet",
    location: "JKT48 Theater",
    date: "August 05, 2024",
    image: wonderland_4,
  },
  {
    id: "e3",
    title: "JKT48 13th Anniversary Concert",
    location: "Indonesia Arena",
    date: "December 21, 2024",
    image: jkt48_1,
  },
];

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const renderSavedItem = ({
    item,
  }: {
    item: (typeof SAVED_PERFORMANCES)[0];
  }) => (
    <TouchableOpacity
      style={[
        styles.savedCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={() =>
        router.push({
          pathname: "/video-detail",
          params: { id: item.id, title: item.title, thumbnail: item.thumbnail },
        })
      }
    >
      <Image source={item.thumbnail} style={styles.savedThumbnail} />
      <View style={styles.savedInfo}>
        <Text
          style={[styles.savedTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text style={styles.savedDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Events & Saved
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[
                styles.headerIcon,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => router.push("/search")}
            >
              <IconSymbol name="magnifyingglass" size={20} color="#ec1313" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.headerIcon,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => router.push("/notifications")}
            >
              <IconSymbol name="bell" size={20} color="#ec1313" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Upcoming Events
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.upcomingScroll}
          >
            {UPCOMING_EVENTS.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.upcomingCard}
                onPress={() =>
                  router.push({
                    pathname: "/event-detail",
                    params: {
                      id: event.id,
                      title: event.title,
                      image: event.image,
                    },
                  })
                }
              >
                <Image source={event.image} style={styles.upcomingImage} />
                <View style={styles.upcomingOverlay}>
                  <View style={styles.upcomingDateBadge}>
                    <Text style={styles.upcomingDateText}>{event.date}</Text>
                  </View>
                  <Text style={styles.upcomingTitle}>{event.title}</Text>
                  <View style={styles.upcomingLocation}>
                    <IconSymbol
                      name="mappin.and.ellipse"
                      size={12}
                      color="rgba(255,255,255,0.8)"
                    />
                    <Text style={styles.upcomingLocationText}>
                      {event.location}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Saved Performances */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Saved Performances
            </Text>
            <View style={styles.filterRow}>
              <IconSymbol
                name="slider.horizontal.3"
                size={14}
                color={colors.icon}
              />
              <Text style={[styles.filterText, { color: colors.icon }]}>
                Filter
              </Text>
            </View>
          </View>
          <FlatList
            data={SAVED_PERFORMANCES}
            renderItem={renderSavedItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.savedGrid}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 13,
    color: "#ec1313",
    fontWeight: "600",
  },
  upcomingScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  upcomingCard: {
    width: width * 0.75,
    height: 200,
    marginRight: 15,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  upcomingImage: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  upcomingOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  upcomingDateBadge: {
    backgroundColor: "#ec1313",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  upcomingDateText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  upcomingTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  upcomingLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  upcomingLocationText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
  },
  savedGrid: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  savedCard: {
    width: (width - 55) / 2,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  savedThumbnail: {
    width: "100%",
    aspectRatio: 16 / 10,
  },
  savedInfo: {
    padding: 12,
  },
  savedTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
  savedDate: {
    fontSize: 10,
    color: "#94a3b8",
  },
});
