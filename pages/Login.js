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
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {

  const [secureTextEntry, setSecureTextEntry] = useState(true);

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
        AsyncStorage.setItem("login", "1");
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
        AsyncStorage.setItem("login", "1");
      } else {
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
        AsyncStorage.setItem("login", "1");
      }
    });
  }, []);

  // controla o estado de loadding
  const [isLoading, setIsLoading] = useState(false);

  // fazer um loading
  if (isLoading) {
    return (
      <View style={styles.load}>
        <Image
          style={styles.loadingImage}
          source={require("../assets/logo.png")}
        />
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#5ac8fa", "#34aadc", "#007aff"]}
        // tipo
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bg}
      ></LinearGradient>

      <Button
        style={{ position: "absolute", top: 0, left: 5 }}
        onPress={() => {
          navigation.navigate("Presentation");
        }}
      >
        <FontAwesome
          name="arrow-left"
          size={16}
          // cor gradiente
          color="#34aadc"
          style={{
            marginTop: 50,
            marginLeft: 20,
            // cor do fundo
            backgroundColor: "#fff",
            width: 40,
            height: 40,
            borderRadius: 50,
            // sombra
            shadowColor: "#000",
            shadowOffset: {
              height: 2,
              width: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 40,
            elevation: 5,
            // alinhar texto no centro
            textAlign: "center",
            textAlignVertical: "center",
          }}
        />
      </Button>

      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <View style={styles.divBaixo}>
        <Text style={styles.subtitle}>Sign in</Text>
        <Text style={styles.subtitle1}>Entre com suas credenciais</Text>
        {/* input */}

        <TextInput
          style={{ width: "80%", marginBottom: 10 }}
          mode="outlined"
          activeOutlineColor="#34aadc"
          textColor="#34aadc"
          dense={true}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#d3d3d3"
          outlineStyle={{
            // borda em cima
            borderTopWidth: 0,
            // borda em baixo
            borderBottomWidth: 1,
            // borda em direita
            borderRightWidth: 0,
            // borda em esquerda
            borderLeftWidth: 0,
            borderRadius: 0,
          }}
          contentStyle={{ backgroundColor: "#fff" }}
        />
        <View style={{ 
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          justifyContent: "center",
        }} >
        <TextInput
          style={{ width: "100%", marginBottom: 10 }}
          mode="outlined"
          activeOutlineColor="#34aadc"
          textColor="#34aadc"
          dense={true}
          placeholder="Digite sua senha"
          placeholderTextColor="#d3d3d3"
          outlineStyle={{
            // borda em cima
            borderTopWidth: 0,
            // borda em baixo
            borderBottomWidth: 1,
            // borda em direita
            borderRightWidth: 0,
            // borda em esquerda
            borderLeftWidth: 0,
            borderRadius: 0,
          }}
          contentStyle={{ backgroundColor: "#fff" }}
          secureTextEntry={secureTextEntry}
          // icon de olho
        />
        <FontAwesome5 name="eye" size={16} color="#34aadc" 
        onPress={() => {
          setSecureTextEntry(!secureTextEntry);
        }}
        style={{
          position: "absolute",
          right: 10,
          
          
         }}

         />
         </View>

        <Button
          style={{
            marginTop: 16,
            width: "70%",
            // sombra
            shadowColor: "#000",
            shadowOffset: {
              height: 2,
              width: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 40,
            elevation: 5,
          }}
          mode="contained"
          buttonColor="#34aadc"
          textColor="#fff"
          onPress={() => {}}
        >
          Entrar
        </Button>

        {/* ou  */}
        <View style={styles.block}>
          <View style={styles.line} />
          <Text style={styles.subtitle2}>Ou login com</Text>
          <View style={styles.line} />
        </View>

        <FlashMessage position="top" />
        <Pressable
          style={styles.button}
          onPress={() => {
            promptAsync();
            setIsLoading(true);
          }}
        >
          <Image source={require("../assets/google.png")} style={styles.icon} />
        </Pressable>
      </View>
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
    marginTop: 16,
    color: "#34aadc",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle1: {
    color: "#34aadc",
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    // cor de fundo
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    // sombra
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 5,
    marginTop: 16,
  },

  icon: {
    height: 24,
    width: 24,
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
  divBaixo: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    // bordas de cima
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // sombra em cima
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 5,
    // padding
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  block: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  line: {
    width: "30%",
    height: 1,
    // cor de fundo cinza claro
    backgroundColor: "#d3d3d3",
    margin: 10,
  },
  subtitle2: {
    color: "#d3d3d3",
    fontSize: 16,
  },
});
