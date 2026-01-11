import { auth } from "@/src/firebase/auth";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        {auth.currentUser?.email}
      </Text>

      <TouchableOpacity
        onPress={async () => {
          await auth.signOut();
          router.replace("/login");
        }}
        style={{
          backgroundColor: "black",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
