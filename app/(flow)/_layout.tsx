import { Stack } from "expo-router";

export default function FlowLayout() {
  return (
    //Stack wird verwendet, weil die Prozesse Schritt für Schritt geführt werden
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="scan" options={{ title: "Scan" }} />
      <Stack.Screen name="quiz" options={{ title: "Quiz" }} />
      <Stack.Screen name="result" options={{ title: "Ergebnis" }} />
      <Stack.Screen name="done" options={{ title: "Fertig" }} />
    </Stack>
  );
}




