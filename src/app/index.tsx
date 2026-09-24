import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gotham Store</Text>

      <Text style={styles.subtitle}>
        Welcome to the Cave Master Bruce 🦇
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
});