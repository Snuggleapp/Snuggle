import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
// papper
import { Button, DataTable } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { doc, setDoc, Timestamp} from "firebase/firestore";
import uuid from "react-native-uuid"
import { fire } from "../firebase/config";



export default function DonationConfirm() {
  // Pega data da rota
  const route = useRoute();
  const { data } = route.params;
  const { photoUri } = route.params;
  const { base64Data } = route.params;

  const adicionarDoacao = async(item) => {
      await setDoc(doc(fire, "Donations", uuid.v4()), {
        UID: item.idusuario,
        idLocalizacao: item.idlocal,
        tamanho: getTamanho(item.tamanhos),
        tipo: item.tipo,
        quantidade: item.quantidade,
        createdAt: Timestamp.fromDate(new Date()),

      })
  };

// console.log(data);
// console.log(photoUri);
// console.log(base64Data);
const navigation = useNavigation();

return (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome5 name="chevron-left" size={15} color="white" />
      </TouchableOpacity>
    </View>
    {/* mostra a imagem */}
    <Image source={{ uri: photoUri }} style={styles.image} />
    {data.map((item, index) => (
      // tabela
      <DataTable key={index}>
        <DataTable.Header>
          <DataTable.Title>Itens</DataTable.Title>
          <DataTable.Title>Tamanho</DataTable.Title>
          <DataTable.Title numeric>Quantidade</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>{item.tipo}</DataTable.Cell>
          <DataTable.Cell>{getTamanho(item.tamanhos)}</DataTable.Cell>
          <DataTable.Cell numeric>{item.quantidade}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    ))}

    {/* botão de confirmar e ir para agradecimentos */}
    <Button
      style={styles.button}
      mode="contained"
      onPress={() => {
        navigation.navigate("Agradecimento");
        data.map((item) => (
        adicionarDoacao(item)
        ));
      }}
    >
      Confirmar
    </Button>

  </View>
);
}

const getTamanho = (tamanhos) => {
  return Object.keys(tamanhos)
    .filter((tamanho) => tamanhos[tamanho])
    .join(", ");
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    // margem top
    marginTop: 50,
    width: 200,
    height: 300,
    borderRadius: 30,
    marginBottom: 20,
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    // tirar borda arredondada
    borderRadius: 0,
    // cor do fundo
    backgroundColor: "#1a73e8",
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
  header: {
    // trazer para frente
    zIndex: 1,
    position: "absolute",
    // cor do fundo
    backgroundColor: "#1a73e8",
    top: 50,
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
