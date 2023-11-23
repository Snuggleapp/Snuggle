// faça uma tela com fundo preto
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
// icone
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Agradecimento() {

  const navigation = useNavigation();
  // navegação para home
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Home1");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* icone de confirmação */}
      <Ionicons
        style={styles.icon}
        name="checkmark"
        size={30}
        color="white"
        // negrito
        fontWeight="bold"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Obrigado pela </Text>
        <Text style={styles.text}>doação!</Text>
      </View>

      {/* botao para voltar para home */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home1")}
      >
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignar no centro
    alignItems: "center",
    // cor do fundo
    backgroundColor: "#fff",
    // tamanho da metade da tela
    flex: 1,

    // centralizar
    justifyContent: "center",
  },
  text: {
    color: "#000000",
    fontSize: 28,
    textAlign: "center",
    // espaço embaixo
  },
  textContainer: {
    // espaço embaixo
    marginBottom: 50,
  },

  icon: {
    color: "#fff",
    backgroundColor: "#4CD964",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 50,
    width: 50,
    height: 50,

    // sombra
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // espaço embaixo
    marginBottom: 16,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5AC8FA",
    borderRadius: 50,
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // fazer sombra
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 5,
    // tamanho
    height: 48,
    width: 300,
    // centralizar texto
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFF",
    fontSize: 16,
    // negrito
    fontWeight: "bold",
  },
});
