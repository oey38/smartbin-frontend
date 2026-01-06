import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function DoneScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glückwunsch! 🎉</Text>
      <Text style={styles.subtitle}>
        Du kriegst +5 Punkte und siehst später deine CO₂-Wirkung.
      </Text>

      <Pressable style={styles.primaryBtn} onPress={() => router.push("/(tabs)")}>
        <Text style={styles.primaryText}>Zurück zur Homepage</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#071A24" },
  title: { fontSize: 34, fontWeight: "800", color: "#4FD1C5", marginBottom: 10 },
  subtitle: { color: "#D7EEF0", marginBottom: 18, lineHeight: 20 },
  primaryBtn: { backgroundColor: "#4FD1C5", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  primaryText: { fontSize: 16, fontWeight: "700", color: "#071A24" },
});
