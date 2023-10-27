// faça uma tela simples com um botaão de sair
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { auth } from "../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function User() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>User</Text>
      <Button
        onPress={async () => {
          await AsyncStorage.removeItem("login");
          auth.signOut();
          navigation.navigate("Login");
        }}
      >
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
