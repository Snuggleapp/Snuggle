// faça uma tela simples com o fundo azul
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function DonationApp() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [inputWidth, setInputWidth] = useState(100); // Largura inicial

  //   largura inicial do input
  const formatCurrency = (input) => {
    // Remove non-numeric characters
    const numericValue = input.replace(/[^0-9]/g, "");

    // Format the numeric value with currency symbols and separators
    if (numericValue) {
      const floatValue = parseFloat(numericValue) / 100;
      const formattedValue = `R$ ${floatValue
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      return formattedValue;
    }

    return "";
  };

  const handleChangeText = (input) => {
    const formattedValue = formatCurrency(input);
    setText(formattedValue);
    setInputWidth(Math.max(100, formattedValue.length * 10)); // Ajuste o multiplicador conforme necessário
  };

  return (
    <View style={styles.container}>
      {/* icone de seta para esquerda */}
      <Ionicons
        onPress={() => navigation.navigate("Home")}
        style={styles.icon}
        name="chevron-back-outline"
        size={24}
        color="black"
      />
      <Text style={styles.text}>Nos ajude a manter o Snuggle!</Text>
      <View style={styles.line}></View>
      <View style={styles.box}>
        <Text style={styles.textInput}>Valor da doação</Text>
        {/* imput text */}
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="R$ 0,00"
          width={inputWidth}
          onChangeText={handleChangeText}
          value={text}
        />
      </View>
      {/* botão de prosseguir */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Prosseguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  icon: {
    marginTop: 40,
    marginLeft: 16,
  },

  text: {
    marginTop: 40,
    marginLeft: 16,
    fontSize: 24,
    fontWeight: "bold",
  },

  line: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  box: {
    marginTop: 16,
    marginLeft: 16,
    // deixar tudo na mesma linha
    flexDirection: "row",
    // space-between
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },

  textInput: {
    fontSize: 16,
    color: "#ccc",
    fontWeight: "bold",
    // alinhar no centro
    textAlignVertical: "center",
  },

  input: {
    // alinhar texto a direita
    marginLeft: 20,
    fontSize: 20,
    padding: 10,
    paddingLeft: 20,
    fontWeight: "bold",
    // fazer card
    backgroundColor: "#fff",
    borderRadius: 50,
    // fazer sombra
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 5,
  },

  button: {
    marginTop: 500,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "#5ac8fa",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
