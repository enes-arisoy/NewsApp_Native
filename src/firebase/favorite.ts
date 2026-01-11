import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth } from "./auth";
import { firebaseApp } from "./firebaseConfig";

interface Favorite {
  userId: string;
  newsId: string;
  title: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
  createdAt: number;
}

const db = getFirestore(firebaseApp);
const favoritesRef = collection(db, "favorites");

/* 🔁 REALTIME FAVORITES */
export const subscribeFavorites = (callback: (data: Favorite[]) => void) => {
  const user = auth.currentUser;
  if (!user) return () => {};

  const q = query(favoritesRef, where("userId", "==", user.uid));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data: Favorite[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data() as Favorite,
    }));
    callback(data);
  });

  return unsubscribe;
};

/* ❤️ FAVORİ EKLE */
export const addFavorite = async (news: any) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const q = query(
    favoritesRef,
    where("userId", "==", user.uid),
    where("newsId", "==", news.id)
  );

  const snapshot = await getDocs(q);
  if (!snapshot.empty) return; // 🔥 zaten favoride

  await addDoc(favoritesRef, {
    userId: user.uid,
    newsId: news.id,
    title: news.title,
    imageUrl: news.imageUrl,
    source: news.source,
    date: news.date,
    url: news.url,
    createdAt: Date.now(),
  });
};

/* 🗑️ NEWS ID'YE GÖRE FAVORİ SİL */
export const removeFavoriteByNewsId = async (newsId: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    favoritesRef,
    where("userId", "==", user.uid),
    where("newsId", "==", newsId)
  );

  const snapshot = await getDocs(q);

  await Promise.all(
    snapshot.docs.map((d) => deleteDoc(doc(db, "favorites", d.id)))
  );
};
