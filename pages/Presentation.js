import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
// usar async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Presentation() {
  // se for a segunda vez que o usuario entra, ir para home
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <ion-icon name="heart-half-outline"></ion-icon> */}
      <Text
        onPress={async() => {
          await AsyncStorage.setItem("button", "true");
          navigation.navigate("Login")
        }}
        style={styles.buttonIcon}
      >
        <Ionicons
          name="heart-half-outline"
          size={20}
          color="white"
          style={styles.icon}
        />
      </Text>
      <Text style={styles.texticon}>Snuggler</Text>

      <Image
        source={require("../assets/clothing.png")}
        style={styles.clothing}
      />
      <View style={styles.div}>
        <Text style={styles.title}>Faça a diferença!</Text>
        <Text style={styles.subtitle}>
          Ajude aqueles que precisam doando suas roupas para instituições de
          caridade locais. Junte-se à comunidade Snuggler e cause um impacto
          positivo na vida de outras pessoas.
        </Text>
      </View>
      <Text
        style={styles.button}
        onPress={
          // salvar se o usuario ja clicou no botao
          async () => {
            try {
              await AsyncStorage.setItem("button", "true");
            } catch (error) {
              console.log(error);
            }
            navigation.navigate("Login");
          }
        }
      >
        Comece a doar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // cor de fundo
    alignItems: "center", // alinhar no centro
    justifyContent: "center", // alinhar no centro
  },
  buttonIcon: {
    backgroundColor: "#5ac8fa",
    padding: 10,
    borderRadius: 50,
    width: 50,
    textAlign: "center",
    // sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    position: "absolute",
    top: 30,
    left: 40,
  },
  icon: {
    color: "#fff",
  },
  texticon: {
    color: "black",
    fontSize: 16,
    position: "absolute",
    top: 40,
    left: 100,
  },
  logo: {
    width: 50,
    height: 50,
  },
  clothing: {
    width: 326,
    height: 326,
    marginBottom: 100,
    marginTop: 100,
  },
  div: {
    justifyContent: "center",
    width: "80%",
    // espaço em cima e
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
  },

  button: {
    backgroundColor: "#5ac8fa",
    padding: 10,
    borderRadius: 50,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    width: "90%",
    textAlign: "center",
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
});
