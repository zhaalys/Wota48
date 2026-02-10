import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profilJkt48 = require("@/assets/profile/profil_jkt48.jpg");

export default function AccountDetailsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

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
          Account Details
        </Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <Image source={profilJkt48} style={styles.avatar} />
          <TouchableOpacity style={styles.changeAvatar}>
            <Text style={styles.changeAvatarText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            defaultValue="Anindya Putri"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Handle</Text>
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            defaultValue="@jkt48_forever_anin"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border, opacity: 0.6 },
            ]}
            defaultValue="anin_fans@gmail.com"
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                borderColor: colors.border,
                height: 100,
                paddingTop: 12,
              },
            ]}
            defaultValue="Just a simple girl who loves JKT48 and all the members. Oshi: Marsha Gen 10! ✨"
            multiline
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View
          style={[
            styles.tierSection,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View>
            <Text style={[styles.tierTitle, { color: colors.text }]}>
              Gold Fan Tier
            </Text>
            <Text style={styles.tierSub}>Active since 2022</Text>
          </View>
          <IconSymbol name="star.fill" size={24} color="#fbbf24" />
        </View>
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
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveText: {
    color: "#ec1313",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    padding: 24,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  changeAvatar: {
    padding: 8,
  },
  changeAvatarText: {
    color: "#ec1313",
    fontWeight: "600",
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94a3b8",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  tierSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tierSub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
});
