import { loginWithEmail } from "@/src/firebase/auth";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      await loginWithEmail(email, password);
      router.replace("/(tabs)/home");

    } catch (error: any) {
      Alert.alert("Email or password is incorrect", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<ImageBackground
      source={{ uri: "https://e0.pxfuel.com/wallpapers/7/167/desktop-wallpaper-old-newspaper-texture-newspapers-background-old.jpg" }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
        <Text style={{ fontSize: 45, fontWeight: "800", marginBottom: 10, zIndex: 1, color: "#ccc" }}>
          News App
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderRadius: 24,
            borderColor: "#ccc",
            padding: 12,
            marginBottom: 12,
            color: "#ffffffff",
          }}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#cececeff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            borderRadius: 24,
            borderColor: "#ccc",
            padding: 12,
            marginBottom: 20,
            color: "#ffffffff",
          }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#393939" : "#000000",
            padding: 14,
            borderRadius: 24,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 17 }}>Log In</Text>
          )}
        </TouchableOpacity>

        {/* REGISTER LINK */}
        <Text
          onPress={() => router.push("/register")}
          style={{
            marginTop: 16,
            textAlign: "center",
            color: "#ffffffac",
            fontWeight: "500",
            
          }}
        >
          Don't have an account? <Text style={{ color: "#ffffff" }}>Register</Text>
        </Text>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.49)",
  }
});