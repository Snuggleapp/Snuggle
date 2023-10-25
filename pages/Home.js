import { useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase/config";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  // pegar usuario logado
  useRoute();
  const navigation = useNavigation();
  const user = auth.currentUser;
  const isLoading = false;

  return (
    <View style={styles.container}>
      {/* retornar telefone do usuario */}
      <View style={styles.userContainer}>
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View style={styles.userInfo}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Olá Snuggler </Text>
            <Text style={styles.userText}>{user.displayName}</Text>
            {/* mostrar o nome */}
          </View>
        </View>
      </View>
      {/* fazer botao de sair */}
      <Button
        mode="contained"
        onPress={() => {
          signOut(auth);
          AsyncStorage.removeItem("login");
          navigation.navigate("Login", { isLoading: false });
        }}
      >
        Sair
      </Button>
      {/* printa dados do usuario */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  userInfo: {
    marginLeft: 16,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    color: "#000",
    fontSize: 16,
  },
  userText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "normal",
  },
});
