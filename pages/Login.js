import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/config";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

export default function Login() {
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1012033055362-tko6uu4s6uusp5mh8ljgcsb0ne6bnvj2.apps.googleusercontent.com",
    androidClientId:
      "1012033055362-tko6uu4s6uusp5mh8ljgcsb0ne6bnvj2.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/userinfo.email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((userCredential) => {
        navigation.navigate("Home");
        AsyncStorage.setItem("login","1");
      });
    } else {
      setIsLoading(false);
    }
  }, [response]);

  // verificar se o usuario esta logado
  useEffect(() => {
    // printar user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(true);
        // passar rota para home
        navigation.navigate("Home");
        // salvar login
        AsyncStorage.setItem("login","1");
        

      }
      else{
        setIsLoading(false);
      }
    });
  }, []);


  useEffect(() => {
    // printar user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // passar rota para home
        navigation.navigate("Home");
        // salvar login
        AsyncStorage.setItem("login","1");
        

      }
    });
  }, []);

  // controla o estado de loadding
  const [isLoading, setIsLoading] = useState(false);

  // fazer um loading
  if (isLoading) {
    return (
      <View style={styles.load}>
        <Image style={styles.loadingImage} source={require("../assets/logo.png")} />
        
      </View>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.bg} source={require("../assets/bg.png")} />
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Pressable
        style={styles.button}
        onPress={() => {
          promptAsync();
          setIsLoading(true);

        }}
      >
        <Image source={require("../assets/google.png")} style={styles.icon} />
        <Text style={styles.buttonText}
        >Entrar com Google</Text>
      </Pressable>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    // um pouco mais pra baixo
    color: "#5ac8fa",
    fontSize: 30,
    fontWeight: "bold",
    // centralizar
    textAlign: "center",
    // sombra no texto
    textShadowColor: "#2B85E6",
    textShadowOffset: {
      height: 2,
      width: 0,
    },
    textShadowRadius: 1,
  },
  button: {
    // posicionar no final
    position: "absolute",
    bottom: 32,

    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    flexDirection: "row",
    marginBottom: 16,
    // espaçamento entre eles

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
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    fontFamily: "Inter_700Bold",
  },
  icon: {
    height: 24,
    width: 24,
    // espaço a direita
    marginRight: 50,
  },
  user: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
  userImage: {
    borderRadius: 24,
    height: 48,
    width: 48,
    // cor da borda
    borderColor: "black",
    
  },
  userText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  logo: {
    height: 200,
    width: 200,
    // espaço em cima
    marginTop: 150,
    // faça ela ficar girando igual a uma moeda
  },
  bg: {
    height: "100%",
    position: "absolute",
    width: "100%",

    //
  },
  div: {
    marginTop: 120,
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    paddingTop: 32,
    // trasnslucent
    opacity: 0.9,

    // fundo branco
    backgroundColor: "#fff",
    // ate o final
    height: "100%",
    // bordas arredondadas
    borderRadius: 40,
    // sombra
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 5,
    width: "100%",
  },
  load: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",

  },
  loadingImage: {
    width: 200,
    height: 200,
  },
});
