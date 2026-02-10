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

const NOTIFICATIONS = [
  {
    id: "1",
    type: "show",
    title: "New Show Alert!",
    message: "Pajama Drive by Team J is now available.",
    time: "10m ago",
    icon: "play.circle.fill",
    color: "#ec1313",
  },
  {
    id: "2",
    type: "mention",
    title: "New Reply",
    message: "gracia_lover mentioned you in a discussion.",
    time: "1h ago",
    icon: "bubble.left.and.bubble.right.fill",
    color: "#3b82f6",
  },
  {
    id: "3",
    type: "event",
    title: "Event Reminder",
    message: "Summer Festival 2024 is starting in 3 days!",
    time: "5h ago",
    icon: "calendar",
    color: "#f59e0b",
  },
  {
    id: "4",
    type: "system",
    title: "Badge Unlocked!",
    message: 'You have earned the "Theater Regular" badge.',
    time: "1d ago",
    icon: "star.fill",
    color: "#10b981",
  },
];

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof NOTIFICATIONS)[0] }) => (
    <TouchableOpacity
      style={[styles.notiItem, { borderBottomColor: colors.border }]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}
      >
        <IconSymbol name={item.icon as any} size={20} color={item.color} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.notiHeader}>
          <Text style={[styles.notiTitle, { color: colors.text }]}>
            {item.title}
          </Text>
          <Text style={styles.notiTime}>{item.time}</Text>
        </View>
        <Text style={[styles.notiMessage, { color: colors.text }]}>
          {item.message}
        </Text>
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
          Notifications
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={NOTIFICATIONS}
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
  listContent: {
    paddingBottom: 20,
  },
  notiItem: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  notiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notiTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  notiTime: {
    fontSize: 12,
    color: "#64748b",
  },
  notiMessage: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
});
