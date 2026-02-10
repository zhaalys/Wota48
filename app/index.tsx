import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const logo = require("@/assets/logo/LogoWota48.png");

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/foto/vidio/jkt481.jpg")}
        style={styles.background}
        blurRadius={2}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
              </View>

              <View style={styles.textSection}>
                <Text style={styles.welcomeText}>WELCOME TO</Text>
                <Text style={styles.brandText}>WOTA48</Text>
                <Text style={styles.tagline}>
                  Your Ultimate JKT48 Fan Experience Hub. Stay connected with
                  your oshi, anytime, anywhere.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/login")}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <View style={styles.buttonIcon}>
                  <IconSymbol name="chevron.right" size={20} color="#fff" />
                </View>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                Version 1.0.0 • Made for Wota
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: width * 0.6,
    height: 120,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  textSection: {
    alignItems: "center",
    marginBottom: 60,
  },
  welcomeText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 4,
    marginBottom: 8,
  },
  brandText: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 16,
  },
  tagline: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#ec1313",
    width: "100%",
    height: 64,
    borderRadius: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ec1313",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    position: "absolute",
    bottom: 20,
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
  },
});
