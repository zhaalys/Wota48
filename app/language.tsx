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

const LANGUAGES = [
  { id: "en", name: "English", sub: "Default" },
  { id: "id", name: "Bahasa Indonesia", sub: "Native" },
  { id: "jp", name: "日本語", sub: "Japanese" },
];

export default function LanguageScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedId, setSelectedId] = React.useState("en");
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof LANGUAGES)[0] }) => (
    <TouchableOpacity
      style={[styles.langItem, { borderBottomColor: colors.border }]}
      onPress={() => setSelectedId(item.id)}
    >
      <View>
        <Text style={[styles.langName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={styles.langSub}>{item.sub}</Text>
      </View>
      {selectedId === item.id && (
        <View style={styles.checkIcon}>
          <IconSymbol name="star.fill" size={16} color="#fff" />
        </View>
      )}
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
          Language
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={LANGUAGES}
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
    paddingVertical: 12,
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  langName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  langSub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ec1313",
    justifyContent: "center",
    alignItems: "center",
  },
});
