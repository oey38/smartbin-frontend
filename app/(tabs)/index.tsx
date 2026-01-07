import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
//Homescreen 
export default function HomeScreen() {
  //Router wird hier benutzt, um zur Scan-Seite zu wechseln 
  const router = useRouter(); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartBin</Text>
    {/*} Was macht die App? */}
      <Text style={styles.subtitle}>
        Scanne deinen Müll und entsorge ihn richtig ♻️
      </Text>
    {/* Hauptaktion der Scan-Flow startet */}
      <Pressable 
      style={styles.button}
      onPress={() => router.push ('/scan')}
      >
        <Text style={styles.buttonText}>Müll scannen</Text>
      </Pressable>
    </View>
  );
}
//Styles: sehr einfach, Fokus auf einen Button
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E1A24',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4FD1C5',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#4FD1C5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#0E1A24',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


