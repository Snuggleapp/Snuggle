import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";

export default function Shopping() {
  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={require("../assets/coin.png")} />
      <Text style={styles.card}>
        <Text style={styles.text}>Em breve</Text>
      </Text>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  bg: {
    // ser do tamanho da tela mas nao modificar a imagem
    position: "absolute",
    width: "80%",
    height: "100%",

    resizeMode: "cover",
    // desfocar imagem
    opacity: 0.1,
    // desfoque com cor
    tintColor: "#2B85E6",
  },

  card: {
    // fazer um aviso no meio da tela dizendo que esta em breve
    position: "absolute",
    top: "40%",
    left: "10%",
    width: "80%",
    height: "20%",
    backgroundColor: "#fff",
    borderRadius: 30,
    // sombra
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
    // centralizar
    alignItems: "center",
    justifyContent: "center",
    // alinhar texto no meio
    textAlign: "center",
    textAlignVertical: "center",
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2B85E6",
  },
});
