import {
  addFavorite,
  removeFavoriteByNewsId,
  subscribeFavorites,
} from "@/src/firebase/favorite";
import { getTopHeadlines } from "@/src/services/newsApi";
import { router } from "expo-router";
import { Heart } from "iconsax-react-nativejs";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NewsItem = {
  id: string;
  title: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
};

export default function HomePage() {
  const PLACEHOLDER = require("../../assets/images/istockphoto-1139822389-612x612.jpg");

  const [news, setNews] = useState<NewsItem[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const articles = await getTopHeadlines();

        const mappedNews = articles.map((item: any) => ({
          id: item.url,
          title: item.title,
          imageUrl: item.urlToImage,
          source: item.source?.name || "Unknown",
          date: item.publishedAt?.split("T")[0],
          url: item.url,
        }));

        setNews(mappedNews);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeFavorites(setFavorites);
    return () => unsubscribe && unsubscribe();
  }, []);

  const toggleFavorite = async (item: NewsItem) => {
    if (isFavorited(item.id)) {
      await removeFavoriteByNewsId(item.id);
    } else {
      await addFavorite(item);
    }
  };

  const isFavorited = (newsId: string) =>
    favorites.some((f) => f.newsId === newsId);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() =>
                router.push({
                  pathname: "/news/[id]",
                  params: {
                    id: item.url,
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
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.meta}>
                  {item.source} • {item.date}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item)}
            >
              <Heart
                size="24"
                color={isFavorited(item.id) ? "#ff774eff" : "#aaa"}
                variant={isFavorited(item.id) ? "Bold" : "Outline"}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#a2a1a1ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  cardContent: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: "#555",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 5,
    right: 5,

    borderRadius: 20,
    elevation: 4,
  },
  favoriteText: {
    color: "#fff",
    fontWeight: "600",
  },
});
