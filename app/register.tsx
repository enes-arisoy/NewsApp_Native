import { auth } from "@/src/firebase/auth";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Alanlar boş olamaz");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Kayıt başarısız", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://e0.pxfuel.com/wallpapers/7/167/desktop-wallpaper-old-newspaper-texture-newspapers-background-old.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 45,
              fontWeight: "800",
              marginBottom: 10,
              zIndex: 1,
              color: "#ccc",
            }}
          >
            News App
          </Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#cececeff"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 24,
              padding: 12,
              marginBottom: 12,
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
              borderColor: "#ccc",
              borderRadius: 24,
              padding: 12,
              marginBottom: 20,
            }}
          />

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={{
              backgroundColor: loading ? "#999" : "#000",
              padding: 14,
              borderRadius: 24,
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontSize: 17 }}>Register</Text>
            )}
          </TouchableOpacity>

          {/* LOGIN LINK */}
          <Text
            onPress={() => router.push("/login")}
            style={{
              marginTop: 16,
              textAlign: "center",
              color: "#ffffffac",
            }}
          >
            Already have an account?{" "}
            <Text style={{ color: "#ffffff", fontWeight: "500" }}>Log In</Text>
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
  },
});
