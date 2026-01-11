import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewsDetailPage() {
  const router = useRouter();
  const PLACEHOLDER = require("../../assets/images/istockphoto-1139822389-612x612.jpg");

  const { title, imageUrl, source, date } = useLocalSearchParams<{
    title: string;
    imageUrl: string;
    source: string;
    date: string;
    url: string;
  }>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Image
          source={imageUrl ? { uri: imageUrl } : PLACEHOLDER}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.meta}>
            {source} • {date}
          </Text>

          <Text style={styles.description}>
            Bu alanda haberin detay içeriği yer alacak. Bir sonraki adımda
            API’dan full content alacağız.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 1)",
    padding: 4,
    borderRadius: 20,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
});
