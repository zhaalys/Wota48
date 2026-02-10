import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profilJkt48 = require("@/assets/profile/profil_jkt48.jpg");

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const router = useRouter();

  const ActivityCard = ({
    icon,
    title,
    subtitle,
    onPress,
  }: {
    icon: string;
    title: string;
    subtitle: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.activityCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
    >
      <View style={styles.activityIconContainer}>
        <IconSymbol name={icon as any} size={20} color="#ec1313" />
      </View>
      <Text style={[styles.activityTitle, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={styles.activitySubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const SettingItem = ({
    icon,
    title,
    value,
    hasChevron = true,
    isSwitch = false,
    onPress,
  }: any) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingLeft}>
        <View
          style={[
            styles.settingIconContainer,
            { backgroundColor: colorScheme === "dark" ? "#3d1c1c" : "#f1f5f9" },
          ]}
        >
          <IconSymbol name={icon} size={18} color={colors.icon} />
        </View>
        <Text style={[styles.settingTitle, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {isSwitch ? (
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#767577", true: "#ec1313" }}
            thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
          />
        ) : hasChevron ? (
          <IconSymbol name="chevron.right" size={16} color="#94a3b8" />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              My Profile
            </Text>
            <TouchableOpacity
              style={[
                styles.settingsButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => router.push("/account-details")}
            >
              <IconSymbol name="gearshape.fill" size={20} color="#ec1313" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarGradient}>
                <Image
                  source={profilJkt48}
                  style={[styles.avatar, { borderColor: colors.background }]}
                />
              </View>
              <View
                style={[
                  styles.verifiedBadge,
                  { borderColor: colors.background },
                ]}
              >
                <IconSymbol name="checkmark.seal.fill" size={12} color="#fff" />
              </View>
            </View>
            <Text style={[styles.userName, { color: colors.text }]}>
              Anindya Putri
            </Text>
            <Text style={styles.userHandle}>@jkt48_forever_anin</Text>

            <TouchableOpacity
              style={[
                styles.tierBadge,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => router.push("/account-details")}
            >
              <View style={styles.tierDot}>
                <IconSymbol name="star.fill" size={10} color="#fff" />
              </View>
              <Text
                style={[
                  styles.tierText,
                  { color: colorScheme === "dark" ? "#cbd5e1" : "#475569" },
                ]}
              >
                GOLD FAN TIER
              </Text>
              <IconSymbol
                name="chevron.right"
                size={12}
                color="#94a3b8"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Dashboard */}
        <View style={styles.statsDashboard}>
          <View
            style={[
              styles.statsCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("/watch-history")}
            >
              <Text style={styles.statValue}>142</Text>
              <Text style={styles.statLabel}>SHOWS WATCHED</Text>
            </TouchableOpacity>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("/my-discussions")}
            >
              <Text style={styles.statValue}>28</Text>
              <Text style={styles.statLabel}>FORUM POSTS</Text>
            </TouchableOpacity>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("/photocards")}
            >
              <Text style={styles.statValue}>85</Text>
              <Text style={styles.statLabel}>CARDS COLLECTED</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              My Activities
            </Text>
            <TouchableOpacity onPress={() => router.push("/watch-history")}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesGrid}>
            <ActivityCard
              icon="play.rectangle.fill"
              title="Watch History"
              subtitle="Last: Show Room 12/04"
              onPress={() => router.push("/watch-history")}
            />
            <ActivityCard
              icon="bubble.left.and.bubble.right.fill"
              title="My Discussions"
              subtitle="3 active threads"
              onPress={() => router.push("/my-discussions")}
            />
            <ActivityCard
              icon="square.grid.2x2.fill"
              title="Photocards"
              subtitle="2 new packs ready"
              onPress={() => router.push("/photocards")}
            />
            <ActivityCard
              icon="calendar.badge.plus"
              title="Event Tickets"
              subtitle="Upcoming: July 15"
              onPress={() => router.push("/(tabs)/events")}
            />
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text, marginBottom: 16 },
            ]}
          >
            App Settings
          </Text>
          <View
            style={[
              styles.settingsCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <SettingItem
              icon="person.fill"
              title="Account Details"
              onPress={() => router.push("/account-details")}
            />
            <SettingItem
              icon="bell.fill"
              title="Push Notifications"
              isSwitch={true}
            />
            <SettingItem
              icon="globe"
              title="Language"
              value="English"
              onPress={() => router.push("/language")}
            />
            <SettingItem
              icon="lock.fill"
              title="Privacy & Security"
              onPress={() => router.push("/privacy")}
            />
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => alert("Logging Out...")}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 10,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarGradient: {
    padding: 3,
    borderRadius: 65,
    backgroundColor: "#ec1313",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#ec1313",
    padding: 4,
    borderRadius: 12,
    borderWidth: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  userHandle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    marginTop: 2,
    marginBottom: 16,
  },
  tierBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tierDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fbbf24",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  tierText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  statsDashboard: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsCard: {
    flexDirection: "row",
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ec1313",
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#94a3b8",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: "60%",
    alignSelf: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ec1313",
  },
  activitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  activityCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(236,19,19,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activitySubtitle: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 4,
  },
  settingsCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingValue: {
    fontSize: 12,
    color: "#94a3b8",
  },
  logoutButton: {
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "rgba(236,19,19,0.1)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(236,19,19,0.2)",
  },
  logoutText: {
    color: "#ec1313",
    fontSize: 14,
    fontWeight: "bold",
  },
});
