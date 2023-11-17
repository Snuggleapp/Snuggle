import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput, List } from "react-native-paper";

export default function Donation() {
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const [tamanhos, setTamanhos] = useState({
    P: false,
    M: false,
    G: false,
    GG: false,
  });

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const toggleTamanho = (size) => {
    setTamanhos((prevTamanhos) => ({
      P: size === "P" ? !prevTamanhos.P : false, // Alteração para desmarcar os outros tamanhos
      M: size === "M" ? !prevTamanhos.M : false, // Alteração para desmarcar os outros tamanhos
      G: size === "G" ? !prevTamanhos.G : false, // Alteração para desmarcar os outros tamanhos
      GG: size === "GG" ? !prevTamanhos.GG : false, // Alteração para desmarcar os outros tamanhos
    }));
  };

  // faça uma const que recebe a quantidade de roupas
  const [quantidadeRoupas, setQuantidadeRoupas] = useState(0);
  const handleQuantityChange = (delta) => {
    // Atualiza o estado incrementando ou decrementando a quantidade
    setQuantidadeRoupas((prevQuantidade) =>
      Math.max(0, prevQuantidade + delta)
    );
  };

  const [tipoRoupa, setTipoRoupa] = useState("");



  const getPageContent = () => {
    switch (page) {
      case 1:
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Ionicons
                onPress={() => navigation.navigate("Home")}
                style={styles.icon}
                name="chevron-back-outline"
                size={24}
                color="black"
              />
              <Text style={styles.textHeader}>Cadastre um produto</Text>
            </View>
            <Text style={styles.text}>Dados da doação</Text>

            {/* tipo de roupa, deixar escolher entre casaco, camisa, calça */}
            <List.AccordionGroup>
              <List.Accordion 
              // title aparece o tipo de roupa selecionado
              title={tipoRoupa || "Tipo de Roupa"}
               id="1"
              // aparecer aberto
              >
                {/* selecionar */}
                <List.Item
                  title="Camisa"
                  // envia o valor para o tipo de roupa
                  onPress={() => setTipoRoupa("Camisa")}
                />
                <List.Item
                  title="Calça"
                  // envia o valor para o tipo de roupa
                  onPress={() => setTipoRoupa("Calça")}
                />
                <List.Item
                  title="Casaco"
                  // envia o valor para o tipo de roupa
                  onPress={() => setTipoRoupa("Casaco")}
                />
              </List.Accordion>
            </List.AccordionGroup>

            <Text style={styles.textTamanho}>Tamanho da Roupa</Text>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => toggleTamanho("P")}
                style={[
                  styles.checkbox,
                  { backgroundColor: tamanhos.P ? "#1a73e8" : "gray" },
                ]}
              >
                <Text style={styles.tamanho}>P</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleTamanho("M")}
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: tamanhos.M ? "#1a73e8" : "gray",
                    // somrba
                    shadowColor: "#000",
                    shadowOffset: {
                      height: 2,
                      width: 0,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    // cor do toggle
                    color: "red",
                  },
                ]}
              >
                <Text style={styles.tamanho}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleTamanho("G")}
                style={[
                  styles.checkbox,
                  { backgroundColor: tamanhos.G ? "#1a73e8" : "gray" },
                ]}
              >
                <Text style={styles.tamanho}>G</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleTamanho("GG")}
                style={[
                  styles.checkbox,
                  { backgroundColor: tamanhos.GG ? "#1a73e8" : "gray" },
                  // cor da letra
                ]}
              >
                <Text style={styles.tamanho}>GG</Text>
              </TouchableOpacity>
            </View>
            {/* quantidade de roupas */}
            <Text style={styles.textTamanho}>Quantidade de roupas</Text>

            {/* botao com o icone de menos */}
            <View style={styles.containerQuantidade}>
              <Ionicons
                style={styles.icon}
                name="remove-circle-outline"
                size={24}
                color="black"
                // remove 1 da quantidade
                onPress={() => handleQuantityChange(-1)}
              />

              {/* exibe a quantidade */}
              <Text>{quantidadeRoupas}</Text>

              {/* botao com o icone de mais */}
              <Ionicons
                style={styles.icon}
                name="add-circle-outline"
                size={24}
                color="black"
                // adiciona mais 1 na quantidade
                onPress={() => handleQuantityChange(1)}
              />
            </View>

            {/* toda vez que clica no botao de adicionar ele adiciona na */}

            {/* tabela com as roupas adicionadas */}
          </View>
        );
      // ... outras cases
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} />
      {getPageContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 40,
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 16,
    backgroundColor: "#1a73e8",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 50,
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",

  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
    // cor da letra
    color: "red",
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    
  },
  tamanho: {
    color: "white",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textTamanho: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 16,
    
  },
  containerQuantidade: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
    // cor da letra
    color: "red",
  },
});
