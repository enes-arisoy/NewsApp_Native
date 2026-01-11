import { subscribeFavorites } from "@/src/firebase/favorite";
import { router } from "expo-router";
import { Trash } from "iconsax-react-nativejs";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeFavoriteByNewsId } from "./../../src/firebase/favorite";

export default function FavoritesPage() {
  const PLACEHOLDER = require("../../assets/images/istockphoto-1139822389-612x612.jpg");
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeFavorites((data) => {
      setFavorites(data);
      setLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  if (!favorites.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No favorites yet</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ position: "relative", padding: 10 }}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/news/[id]",
                  params: {
                    id: item.newsId,
                    title: item.title,
                    imageUrl: item.imageUrl,
                    source: item.source,
                    date: item.date,
                    url: item.url,
                  },
                })
              }
            >
              <Image
                source={item.imageUrl ? { uri: item.imageUrl } : PLACEHOLDER}
                resizeMode="cover"
                style={{ width: "100%", height: 150, borderRadius: 12 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 8 }}>
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={10}
              onPress={() => removeFavoriteByNewsId(item.newsId)}
              style={{ position: "absolute", right: 20, top: 20 }}
            >
              <Trash size="24" color="#ff774eff"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
