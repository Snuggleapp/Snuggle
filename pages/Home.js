import { useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase/config";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Home() {
  // pegar usuario logado
  useRoute();
  const navigation = useNavigation();
  const user = auth.currentUser;

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

      <View style={styles.card}>
        <View style={styles.cardTop}>
          {/* icone de acenação */}
          <Ionicons
            style={styles.icon}
            name="hand-left-outline"
            size={24}
            color="black"
          />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardText}>Doações do mês</Text>
            {/* doações do mes 10 */}
            <Text style={styles.cardText}>10</Text>
          </View>
        </View>
        <View style={styles.cardBottom}>
          {/* total do ano */}
          <View style={styles.cardTextBoxBottom}>
            <Text style={styles.cardTextBottom}>Total do ano</Text>
            <Text style={styles.cardTextBottom}>100 itens</Text>
          </View>
          <View style={styles.cardTextBoxBottom}>
            {/* ultima doação */}
            <Text style={styles.cardTextBottom}>Ultima doação</Text>
            <Text style={styles.cardTextBottom}>Asa Norte</Text>
          </View>

          <View style={styles.cardTextBoxBottom}>
            <Text style={styles.cardTextBottom}>Doando desde</Text>
            <Text style={styles.cardTextBottom}>2021</Text>
          </View>
        </View>
      </View>
      {/* fazer botao de sair */}
      <Button
        mode="contained"
        onPress={() => {
          signOut(auth);
          AsyncStorage.removeItem("login");
          navigation.navigate("Login");
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
    // cor do fundo branca
    backgroundColor: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    padding: 10,
  },
  userInfo: {
    marginLeft: 16,
  },
  welcomeContainer: {
    flexDirection: "row",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userText: {
    fontSize: 16,
    marginLeft: 8,
  },

  card: {
    padding: 30,
    borderRadius: 8,
    backgroundColor: "#fff",
    // sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    // epaço entre eles
    justifyContent: "space-between",
    // espaço embaixo
    marginBottom: 30,
  },

  cardTextBox: {
    marginLeft: 16,
    // alinhar no centro
    alignItems: "center",
  },

  cardBottom: {
    flexDirection: "row",
    // espaço entre eles
    justifyContent: "space-between",
    marginTop: 16,
  },
  icon: {
    // espaço a esquerda
    marginLeft: 16,
  },
});
