import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function ScanScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Backend läuft lokal auf deinem PC
const BACKEND_URL = "https://smartbin-backend-0d16.onrender.com";

async function pickAndSendImage() {
  setLoading(true);
  setError(null);

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    const formData = new FormData();

    if (Platform.OS === "web") {
      // WEB: uri ist blob:... -> in Blob umwandeln
      const blob = await (await fetch(asset.uri)).blob();
      formData.append("image", blob, "photo.jpg");
    } else {
      // iOS/Android: RN FormData mit uri-Objekt
      formData.append(
        "image",
        {
          uri: asset.uri,
          name: "photo.jpg",
          type: asset.mimeType ?? "image/jpeg",
        } as any
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/classify`, {
      method: "POST",
      body: formData,
      // WICHTIG: KEIN "Content-Type" manuell setzen!
    });

    if (!response.ok) throw new Error(`Backend error ${response.status}`);

    const data = await response.json();

    router.push({
      pathname: "/(flow)/result",
      params: {
        item: data.item ?? "",
        bin: data.bin ?? "",
        why: data.why ?? "",
        cute_fact: data.cute_fact ?? "",
        motivation: data.motivation ?? "",
        confidence: String(data.confidence ?? ""),
        steps: JSON.stringify(data.steps ?? []),
        alternatives: JSON.stringify(data.alternatives ?? []),
      },
    });
  } catch (err: any) {
    setError(err?.message ?? "Upload fehlgeschlagen");
  } finally {
    setLoading(false);
  }
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan</Text>
      <Text style={styles.subtitle}>Wähle ein Foto aus und SmartBin analysiert es.</Text>

      <Pressable style={styles.primaryBtn} onPress={pickAndSendImage} disabled={loading}>
        <Text style={styles.primaryText}>
          {loading ? "Analysiere..." : "Foto auswählen"}
        </Text>
      </Pressable>

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#071A24" },
  title: { fontSize: 34, fontWeight: "800", color: "#4FD1C5", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#D7EEF0", marginBottom: 28 },
  primaryBtn: { backgroundColor: "#4FD1C5", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  primaryText: { fontSize: 16, fontWeight: "700", color: "#071A24" },
  errorText: { color: "#ffb4b4", marginTop: 12 },
});


