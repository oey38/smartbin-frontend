import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
//Ergebnis nach dem Scan wird hier angezeigt 
export default function ResultScreen() {
  const router = useRouter();

  // Hier kommen die Werte an, die wir in ScanScreen beim  router.push mitgegeben haben 
  const params = useLocalSearchParams();
  //Haupt-Ergebnis vom Backend
  const bin = params.bin as string; //z.B. Tonne
  const item = params.item as string; //z.B. Joghurtbecher
  const why = params.why as string; // Erklärung
  const cuteFact = params.cute_fact as string; // kleine Info
  const motivation = params.motivation as string; // motivierender Satz

  const steps = params.steps ? JSON.parse(params.steps as string) : [];
  const alternatives = params.alternatives ? JSON.parse(params.alternatives as string) : [];
  // wie sicher die Erkennung war 
  const confidence = params.confidence ? Number(params.confidence) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ergebnis</Text>

{/* Karte mit allen Infos, für die Übersichtlichkeit */}
      <View style={styles.card}>
        // Wichtige Info zuerst
        <Text style={styles.binLabel}>Richtige Entsorgung</Text>
        <Text style={styles.binValue}>{bin}</Text>
        // Details: was wurde erkannt und warum?
        <Text style={styles.text}>Objekt: {item}</Text>
        <Text style={styles.text}>Warum: {why}</Text>

        {steps.length > 0 && (
          <>
            <Text style={styles.binLabel}>So geht’s:</Text>
            {steps.map((s: string, i: number) => (
              <Text key={i} style={styles.text}>• {s}</Text>
            ))}
          </>
        )}
      {/* Lerninfo und Motivation */}
        <Text style={[styles.text, { marginTop: 10 }]}>💡 {cuteFact}</Text>
        <Text style={[styles.text, { marginTop: 10, fontWeight: "700" }]}>
          {motivation}
        </Text>
      {/* Wenn die Erkennung unsicher größer als 0.5 bedeutet unischer */}
        {confidence !== null && confidence <= 0.5 && alternatives.length > 0 && (
          <>
            <Text style={styles.binLabel}>Mögliche Alternativen:</Text>
            {alternatives.map((a: any, i: number) => (
              <Text key={i} style={styles.text}>
                • {a.bin}: {a.reason}
              </Text>
            ))}
          </>
        )}
      </View>
    {/* Mini-Quiz starten */}
      <Pressable style={styles.primaryBtn} onPress={() => router.push("/quiz")}>
        <Text style={styles.primaryText}>Mini-Quiz starten</Text>
      </Pressable>
    </View>
  );
}
//Styles: klare Kontraste
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#071A24" },
  title: { fontSize: 34, fontWeight: "800", color: "#4FD1C5", marginBottom: 16 },
  card: { backgroundColor: "#0B2A3A", borderRadius: 16, padding: 18 },
  binLabel: { color: "#D7EEF0", opacity: 0.8, marginTop: 10 },
  binValue: { fontSize: 22, fontWeight: "800", color: "#4FD1C5" },
  text: { color: "#D7EEF0", lineHeight: 20 },
  primaryBtn: { backgroundColor: "#4FD1C5", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 20 },
  primaryText: { fontSize: 16, fontWeight: "700", color: "#071A24" },
});

