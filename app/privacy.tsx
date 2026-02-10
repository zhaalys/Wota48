import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const [privateAccount, setPrivateAccount] = React.useState(false);
  const [dataSharing, setDataSharing] = React.useState(true);

  const PrivacyItem = ({ title, sub, isSwitch, value, onToggle }: any) => (
    <View style={[styles.item, { borderBottomColor: colors.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.itemTitle, { color: colors.text }]}>{title}</Text>
        <Text style={styles.itemSub}>{sub}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "#767577", true: "#ec1313" }}
          thumbColor={value ? "#fff" : "#f4f3f4"}
        />
      ) : (
        <IconSymbol name="chevron.right" size={16} color="#94a3b8" />
      )}
    </View>
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
          Privacy & Security
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Account Privacy</Text>
        <PrivacyItem
          title="Private Account"
          sub="When your account is private, only people you approve can see your posts and activity."
          isSwitch
          value={privateAccount}
          onToggle={setPrivateAccount}
        />

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Security</Text>
        <TouchableOpacity>
          <PrivacyItem title="Two-Factor Authentication" sub="Enabled" />
        </TouchableOpacity>
        <TouchableOpacity>
          <PrivacyItem
            title="Login Activity"
            sub="View where you are logged in"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <PrivacyItem
            title="Apps and Websites"
            sub="Manage third-party access"
          />
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Data Usage</Text>
        <PrivacyItem
          title="Collect Usage Data"
          sub="Help us improve Wota48 by sharing anonymous usage statistics."
          isSwitch
          value={dataSharing}
          onToggle={setDataSharing}
        />
        <TouchableOpacity>
          <PrivacyItem
            title="Download Your Information"
            sub="Get a copy of your data"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
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
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ec1313",
    letterSpacing: 1,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSub: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
    lineHeight: 18,
  },
  deleteButton: {
    marginTop: 40,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "rgba(239,68,68,0.1)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.2)",
  },
  deleteText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "bold",
  },
});
