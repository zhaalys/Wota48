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

const PHOTOCARDS = [
  {
    id: "1",
    name: "Marsha - Pajama Drive",
    raritiy: "Super Rare",
    image: jkt48_1,
    gen: "Gen 10",
  },
  {
    id: "2",
    name: "Zee - New Era Concert",
    raritiy: "Rare",
    image: jkt48_2,
    gen: "Gen 10",
  },
  {
    id: "3",
    name: "Gracia - Summer Fest",
    raritiy: "Common",
    image: jkt48_3,
    gen: "Gen 10",
  },
  {
    id: "4",
    name: "Marsha - Cooking Series",
    raritiy: "Common",
    image: wonderland_4,
    gen: "Gen 10",
  },
];

export default function PhotocardsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof PHOTOCARDS)[0] }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardOverlay}>
        <View
          style={[
            styles.rarityBadge,
            {
              backgroundColor:
                item.raritiy === "Super Rare" ? "#fbbf24" : "#ec1313",
            },
          ]}
        >
          <Text style={styles.rarityText}>{item.raritiy.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text
          style={[styles.cardName, { color: colors.text }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={styles.cardGen}>{item.gen}</Text>
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
          Photocards Collection
        </Text>
        <TouchableOpacity style={styles.headerIcon}>
          <IconSymbol name="square.grid.2x2.fill" size={20} color="#ec1313" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genList}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {["All Generations", "Gen 10", "Gen 11", "Gen 12"].map(
          (item, index) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.genTag,
                index === 0 && styles.activeGenTag,
                { borderColor: colors.border },
              ]}
            >
              <Text
                style={[
                  styles.genText,
                  index === 0 && styles.activeGenText,
                  { color: index === 0 ? "#fff" : colors.text },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>

      <FlatList
        data={PHOTOCARDS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
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
  headerIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  genList: {
    flexGrow: 0,
    marginVertical: 12,
  },
  genTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  activeGenTag: {
    backgroundColor: "#ec1313",
    borderColor: "#ec1313",
  },
  genText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeGenText: {
    color: "#fff",
  },
  listContent: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  card: {
    width: (width - 36) / 2,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  cardOverlay: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rarityText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
  },
  cardInfo: {
    padding: 12,
  },
  cardName: {
    fontSize: 13,
    fontWeight: "bold",
  },
  cardGen: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 2,
  },
});
