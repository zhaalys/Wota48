import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const jkt48_1 = require("@/assets/foto/vidio/jkt481.jpg");

const { width } = Dimensions.get("window");

export default function EventDetailScreen() {
  const { title, image } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={
              typeof image === "string"
                ? image.startsWith("http")
                  ? { uri: image }
                  : parseInt(image, 10)
                : (image as any) || jkt48_1
            }
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>JULY 28, 2024 • 15:00 WIB</Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

          <View style={styles.locationRow}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: "rgba(236,19,19,0.1)" },
              ]}
            >
              <IconSymbol name="mappin.and.ellipse" size={20} color="#ec1313" />
            </View>
            <View>
              <Text style={[styles.locationTitle, { color: colors.text }]}>
                Tennis Indoor Senayan
              </Text>
              <Text style={styles.locationSubtitle}>
                Jl. Pintu Satu Senayan, Jakarta Pusat
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About Event
          </Text>
          <Text style={[styles.description, { color: colors.text }]}>
            Get ready for the biggest summer festival of the year! JKT48 Summer
            Festival 2024 will feature all members performing your favorite
            summer hits. There will be multiple stages, fan booths, and special
            merchandise available exclusively at the venue. Don't miss the
            firework finale!
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Ticketing Information
          </Text>
          <View
            style={[
              styles.ticketCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.ticketInfo}>
              <Text style={[styles.ticketName, { color: colors.text }]}>
                Festival Alpha
              </Text>
              <Text style={styles.ticketPrice}>IDR 500,000</Text>
            </View>
            <TouchableOpacity style={styles.buyButtonSmall}>
              <Text style={styles.buyButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.ticketCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.ticketInfo}>
              <Text style={[styles.ticketName, { color: colors.text }]}>
                Festival Beta
              </Text>
              <Text style={styles.ticketPrice}>IDR 350,000</Text>
            </View>
            <TouchableOpacity style={styles.buyButtonSmall}>
              <Text style={styles.buyButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { backgroundColor: colors.background, borderTopColor: colors.border },
        ]}
      >
        <View>
          <Text style={styles.footerPriceLabel}>Starts from</Text>
          <Text style={[styles.footerPrice, { color: colors.text }]}>
            IDR 350,000
          </Text>
        </View>
        <TouchableOpacity style={styles.buyButtonLarge}>
          <Text style={styles.buyButtonTextLarge}>Buy Tickets Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "inherit",
    marginTop: -30,
  },
  dateBadge: {
    backgroundColor: "rgba(236,19,19,0.1)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  dateText: {
    color: "#ec1313",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
    marginBottom: 24,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#64748b",
  },
  ticketCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  ticketInfo: {
    gap: 4,
  },
  ticketName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  ticketPrice: {
    fontSize: 14,
    color: "#ec1313",
    fontWeight: "bold",
  },
  buyButtonSmall: {
    backgroundColor: "#ec1313",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
  },
  footerPriceLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buyButtonLarge: {
    backgroundColor: "#ec1313",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#ec1313",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buyButtonTextLarge: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
