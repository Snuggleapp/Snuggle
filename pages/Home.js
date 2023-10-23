import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snuggle</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1B1B1B",
  },
  subtitle: {
    fontSize: 16,
    color: "#1B1B1B",
  },
});
