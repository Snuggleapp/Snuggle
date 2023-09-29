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
import { makeRedirectUri } from "expo-auth-session";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase/config";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "1012033055362-2bdne41tbh7dvk63fvtmjl3or9n64gur.apps.googleusercontent.com",
    androidClientId:
      "988928131355-u5efn1v2br3e8hdpqd8g6eijdu06uj7c.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri: makeRedirectUri({
      scheme: "com.snuggle.tcc",
    }),
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in", user);
      setUser(user);
    } else {
      console.log("No user is signed in");
    }
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication?.accessToken);
    }
  }, [response, token]);

  useEffect(() => {
    if (token) {
      const credential = GoogleAuthProvider.credential(null, token);
      const user = signInWithCredential(auth, credential);
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Pressable
        onPress={() => {
          promptAsync();
        }}
      >
        <Text>Press me</Text>
      </Pressable>
      <Image
        source={{ uri: user?.photoURL }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{user?.displayName}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
