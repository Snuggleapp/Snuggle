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
import { useNavigation } from "@react-navigation/native"; // Importe o hook useNavigation

export default function Login() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); // Chame o hook para obter o objeto de navegação
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1012033055362-tko6uu4s6uusp5mh8ljgcsb0ne6bnvj2.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/userinfo.email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          // Verificar se o e-mail contém o domínio desejado
          const user = userCredential.user;
          if (user.email.endsWith("@sempreceub.com")) {
            setUser(user);
            navigation.navigate("Home"); // Navega para a tela Home
          } else {
            showMessage({
              message: "E-mail não permitido",
              description:
                "Desculpe, você não tem permissão para acessar esta aplicação com este e-mail.",
              type: "danger",
            });
            // Faça o que for necessário se o e-mail não for permitido
          }
        })
        .catch((error) => {
          console.error("Erro ao fazer login com o Firebase:", error);
        });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Snuggle</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          promptAsync();
        }}
      >
        <Image source={require("../assets/google.png")} style={styles.icon} />
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </Pressable>
      {user && (
        <View style={styles.user}>
          <Image style={styles.userImage} source={{ uri: user.photoURL }} />
          <Text style={styles.userText}>{user.displayName}</Text>
          <Text style={styles.userText}>Email: {user.email}</Text>
        </View>
      )}
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#000",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    color: "#000",
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
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
  },
  userText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
