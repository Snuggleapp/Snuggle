import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput, List, DataTable, Modal, Button, Portal, PaperProvider, RadioButton } from "react-native-paper";
import { auth } from "../firebase/config";

export default function Donation() {

  const route = useRoute();
  const { id } = route.params;
  const user = auth.currentUser;
  const iduser = user.uid;

  const [quantidadeRoupas, setQuantidadeRoupas] = useState(0);
  const [tipoRoupa, setTipoRoupa] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const [tamanhos, setTamanhos] = useState({
      P: false,
      M: false,
      G: false,
      GG: false,
    });


  const toggleTamanho = (size) => {
    setTamanhos((prevTamanhos) => ({
      P: size === "P" ? !prevTamanhos.P : false,
      M: size === "M" ? !prevTamanhos.M : false,
      G: size === "G" ? !prevTamanhos.G : false,
      GG: size === "GG" ? !prevTamanhos.GG : false,
    }));
  };

  const handleQuantityChange = (delta) => {
    setQuantidadeRoupas((prevQuantidade) =>
      Math.max(0, prevQuantidade + delta)
    );
  };

  const adicionarDoacao = () => {
    if (!tipoRoupa || !quantidadeRoupas || !Object.values(tamanhos).some(Boolean)) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newData = [
      ...data,
      {
        tipo: tipoRoupa,
        quantidade: quantidadeRoupas,
        tamanhos,
        idlocal: id,
        idusuario: iduser,
      },
    ];
    setData(newData);

    setTipoRoupa("");
    setQuantidadeRoupas(0);
    setTamanhos({ P: false, M: false, G: false, GG: false });
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

 const navigation = useNavigation();


  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Ionicons
            style={styles.icon}
            name="chevron-back-outline"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.textHeader}>Cadastre um produto</Text>
        </View>
        <Text style={styles.text}>Dados da doação</Text>

        <Portal>
          <Modal
            visible={open}
            onDismiss={() => {
              setOpen(false);
            }}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              Tipo de roupa
            </Text>
            <Text
              style={{
                // faça uma linha horizontal
                borderTopColor: "gray",
                borderTopWidth: 1,
                width: "100%",
              }}
            ></Text>

            <RadioButton.Group
              onValueChange={(value) => setTipoRoupa(value)}
              value={tipoRoupa}
            >
              <TouchableOpacity
              
                  // selecionar o tipo de roupa e fechar o modal
                onPress={() => {
                  setTipoRoupa("Camiseta");
                  setOpen(false);
                }}

                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  // alinhar no fim
                  justifyContent: "flex-end",
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <RadioButton color="#1a73e8" value="Camiseta" />
                <Text>Camiseta</Text>
              </TouchableOpacity>
              <TouchableOpacity

                onPress={() => {
                  setTipoRoupa("Calça");
                  setOpen(false);
                }}

                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  // alinhar no fim
                  justifyContent: "flex-end",
                  marginTop: 10,
                  // espaço igual entre os itens
                  justifyContent: "space-between",
                }}
                // inverter a ordem dos itens
              >
                <RadioButton color="#1a73e8" value="Calça" />
                <Text>Calça</Text>
              </TouchableOpacity>
              {/* casaco */}
              <TouchableOpacity

                onPress={() => {
                  setTipoRoupa("Casaco");
                  setOpen(false);
                }}

                
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  // alinhar no fim
                  justifyContent: "flex-end",
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <RadioButton color="#1a73e8" value="Casaco" />
                <Text>Casaco</Text>
              </TouchableOpacity>
            </RadioButton.Group>
          </Modal>
        </Portal>

        <Button
          textColor="black"
          style={{
            borderRadius: 0,
            // espaço em cima
            marginTop: 20,
          }}
          labelStyle={{ fontSize: 16, fontWeight: "bold" }}
          contentStyle={{
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
            gap: 10,
          }}
          onPress={() => setOpen(true)}
          icon={"chevron-down"}
        >
          {tipoRoupa ? tipoRoupa : "Selecione o tipo de roupa"}
        </Button>

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
                shadowColor: "#000",
                shadowOffset: {
                  height: 2,
                  width: 0,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
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
            ]}
          >
            <Text style={styles.tamanho}>GG</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.textTamanho}>Quantidade de roupas</Text>

        <View style={styles.containerQuantidade}>
          <Ionicons
            style={styles.icon}
            name="remove"
            size={24}
            color="black"
            onPress={() => handleQuantityChange(-1)}
          />

          <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            width: 50,
            textAlign: "center",
            textAlignVertical: "center",
            // cor do fundo cinza claro
            backgroundColor: "#f2f2f2",
            height: 30,
            borderRadius: 50,
            // sombra
            shadowColor: "#000",
            shadowOffset: {
              height: 2,
              width: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
          }}
          
          >{quantidadeRoupas}</Text>

          <Ionicons
            style={styles.icon}
            name="add"
            size={24}
            color="black"
            onPress={() => handleQuantityChange(1)}
          />
        </View>

        <Text onPress={adicionarDoacao} style={styles.buttonAdd}>
          {" "}
          Adicionar{" "}
        </Text>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tipo</DataTable.Title>
            <DataTable.Title numeric>Tamanho</DataTable.Title>
            <DataTable.Title numeric>Quantidade</DataTable.Title>
            <DataTable.Title numeric>Excluir</DataTable.Title>
          </DataTable.Header>

          {data
            .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
            .map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.tipo}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {Object.entries(item.tamanhos)
                    .filter(([, value]) => value)
                    .map(([size]) => size)
                    .join(", ")}
                </DataTable.Cell>
                <DataTable.Cell numeric>{item.quantidade}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Ionicons
                    style={styles.iconDelete}
                    name="trash"
                    size={20}
                    onPress={() => {
                      const newData = [...data];
                      newData.splice(index, 1);
                      setData(newData);
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>

        <DataTable.Pagination
          page={page}
          numberOfPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${page + 1} de ${totalPages}`}
        />
        {/* botao para ir para DonationFoto levando os dados armazenados */}
        <TouchableOpacity
          style={styles.button}
          // so deixar ir para a proxima tela se tiver pelo menos um item na lista
          onPress={() => {
            if (data.length > 0) {
              navigation.navigate("DonationFoto", { data });
            } else {
              alert("Por favor, adicione pelo menos um item.");
            }
          }}
        >
          <Text style={styles.buttonText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
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
    marginTop: 20,
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
    width: "90%",
    alignSelf: "center",
    color: "red",
    // epaçamento em cima
    marginTop: 20,
  },
  buttonAdd: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#1a73e8",
    color: "#fff",
    padding: 8,
    borderRadius: 50,
    width: 150,
    textAlign: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconDelete: {
    width: 30,
    height: 30,
    backgroundColor: "red",
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

  buttonText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",


  },
  button: {
    position: "absolute",
    // posicionamento em baixo
    bottom: 0,
    alignSelf: "center",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a73e8",
  },
  


  

});
