import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function QuizScreen() {
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const correct = "Gelbe Tonne";

  const submit = () => {
    if (!picked) return;
    setSubmitted(true);
  };

  const isCorrect = picked === correct;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini-Quiz</Text>
      <Text style={styles.question}>
        Wohin gehört eine leere Handcreme Verpackung?
      </Text>

      {["Restmüll", "Papier", "Gelbe Tonne", "Biomüll"].map((opt) => (
        <Pressable
          key={opt}
          style={[
            styles.option,
            picked === opt && styles.optionSelected,
          ]}
          onPress={() => !submitted && setPicked(opt)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </Pressable>
      ))}

      <Pressable style={styles.primaryBtn} onPress={submit}>
        <Text style={styles.primaryText}>Antwort prüfen</Text>
      </Pressable>

      {submitted && (
        <View style={styles.feedback}>
          <Text style={styles.feedbackTitle}>
            {isCorrect ? "✅ Richtig!" : "❌ Leider falsch."}
          </Text>
          <Text style={styles.feedbackText}>
            Erklärung: Verpackungen aus Kunststoff gehören in die Gelbe Tonne.
          </Text>

          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push("/done")}
          >
            <Text style={styles.secondaryText}>Weiter</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#071A24" },
  title: { fontSize: 34, fontWeight: "800", color: "#4FD1C5", marginBottom: 12, marginTop: 20 },
  question: { color: "#D7EEF0", fontSize: 16, marginBottom: 16 },
  option: { backgroundColor: "#0B2A3A", padding: 14, borderRadius: 12, marginBottom: 10 },
  optionSelected: { borderWidth: 1, borderColor: "#4FD1C5" },
  optionText: { color: "#D7EEF0", fontWeight: "600" },
  primaryBtn: { backgroundColor: "#4FD1C5", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  primaryText: { fontSize: 16, fontWeight: "700", color: "#071A24" },
  feedback: { marginTop: 18, backgroundColor: "#0B2A3A", borderRadius: 16, padding: 14 },
  feedbackTitle: { color: "#D7EEF0", fontWeight: "800", marginBottom: 8 },
  feedbackText: { color: "#D7EEF0", marginBottom: 12 },
  secondaryBtn: { borderWidth: 1, borderColor: "#4FD1C5", paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  secondaryText: { color: "#4FD1C5", fontWeight: "700" },
});
