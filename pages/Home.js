import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { ref, set } from 'firebase/database'
import { Button, Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
// imagem toca-aqui
import TocaAqui from "../assets/toca-aqui.png";

export default function Home() {
  // pegar usuario logado
  useRoute();
  const navigation = useNavigation();
  const user = auth.currentUser;
  // insere o usuario no banco se ele for novo
const updateData = () => {
    set(ref(db, 'Users/' + user.uid),{
        email: user.email,
        nome: user.displayName,
    });
}

  const name =
    user.displayName.split(" ")[0] + " " + user.displayName.split(" ")[1];
  return (
    <View style={styles.container}>
      {/* retornar telefone do usuario */}
      <View style={styles.userContainer}>
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View style={styles.userInfo}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bem vindo </Text>
            <Text style={styles.userText}>{name}</Text>
            {/* mostrar o nome */}
          </View>
          <Text style={styles.welcomeText1}>Ola snuggler </Text>
          {/* mostrar o telefone */}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardTop}>
          {/* icone de acenação */}
          <Image source={TocaAqui} style={{ width: 50, height: 50 }} />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardText}>Doações do mês</Text>
            {/* doações do mes 10 */}
            <Text style={styles.cardText}>10</Text>
          </View>
        </View>
        <View style={styles.cardBottom}>
          {/* total do ano */}
          <View style={styles.cardTextBoxBottom}>
            <Text style={styles.cardTextBottom}>Total do ano</Text>
            <Text style={styles.cardTextBottom}>100 itens</Text>
          </View>
          <View style={styles.cardTextBoxBottom}>
            {/* ultima doação */}
            <Text style={styles.cardTextBottom}>Ultima doação</Text>
            <Text style={styles.cardTextBottom}>Asa Norte</Text>
          </View>

          <View style={styles.cardTextBoxBottom1}>
            <Text style={styles.cardTextBottom}>Doando desde</Text>
            <Text style={styles.cardTextBottom}>2021</Text>
          </View>
        </View>
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.buttonCard}>
        {/* icone */}
        <Ionicons
          style={styles.iconBottom}
          name="heart-half-outline"
          size={20}
          color="black"
        />
        <View style={styles.buttonCardText}>
          <Text style={styles.buttonText}>Doe agasalhos</Text>
          <Text style={styles.buttonText}>Ajude quem precisa!</Text>
        </View>
        {/* icone de seta para direita*/}
        <Ionicons
          onPress={() => navigation.navigate("UpdateData")}
          style={styles.icon}
          name="chevron-forward-outline"
          size={24}
          color="black"
        />
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.buttonCard}>
        {/* icone */}
        <Ionicons
          style={styles.iconBottom}
          // icone de cartao
          name="card-outline"
          size={20}
          color="black"
        />
        <View style={styles.buttonCardText1}>
          <Text style={styles.buttonText}>Ajude o Snuggle</Text>
          <Text style={styles.buttonText}>Uma doação pode mudar vidas!</Text>
        </View>
        {/* icone de seta para direita*/}
        <Ionicons
          onPress={() => navigation.navigate("DonationApp")}
          style={styles.icon}
          name="chevron-forward-outline"
          size={24}
          color="black"
        />
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.social}>
        {/* icone do istagram */}
        <Ionicons
          style={styles.iconBottom}
          name="logo-instagram"
          size={24}
          color="black"
        />
        {/* icone do tw */}
        <Ionicons
          style={styles.iconBottom}
          name="logo-twitter"
          size={24}
          color="black"
        />
        {/* icone do face */}
        <Ionicons
          style={styles.iconBottom}
          name="logo-facebook"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // cor do fundo branca
    backgroundColor: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    padding: 10,
  },
  userInfo: {
    marginLeft: 16,
  },
  welcomeContainer: {
    flexDirection: "row",
  },
  welcomeText: {
    fontSize: 20,
  },
  welcomeText1: {
    fontSize: 16,
    // cor do texto cinza nao tao claro
    color: "#A8A7A7",
  },
  userText: {
    fontSize: 20,
    // padding
  },

  card: {
    padding: 30,
    borderRadius: 8,
    backgroundColor: "#fff",
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

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    // epaço entre eles
    justifyContent: "space-between",
    // espaço embaixo
    marginBottom: 30,
  },

  cardTextBox: {
    marginLeft: 16,
    // alinhar no centro
    alignItems: "center",
  },

  cardBottom: {
    flexDirection: "row",
    // espaço entre eles
    justifyContent: "space-between",
    marginTop: 16,
  },
  icon: {
    // espaço a esquerda
    marginLeft: 16,
  },
  cardTextBoxBottom: {
    alignItems: "center",
    // borada a direita
    borderRightWidth: 0.5,
    paddingRight: 8,
    // cor da borda cinza claro
    borderColor: "#ccc",
  },
  cardTextBoxBottom1: {
    alignItems: "center",
    // borada a direita
    // cor da borda cinza claro
    borderColor: "#ccc",
    // espaço a direita
  },
  // fazer uma linha
  line: {
    marginTop: 16,
    // cor da linha cinza claro
    backgroundColor: "#ccc",
    height: 0.5,
    // espaço em cima e embaixo
    marginVertical: 16,
    width: "95%",
    alignSelf: "center",
  },
  buttonCard: {
    flexDirection: "row",
    alignItems: "center",
    // espaço entre eles
    justifyContent: "space-between",

    // padding left e right
    paddingHorizontal: 16,
  },
  iconBottom: {
    // espaço a esquerda
    marginLeft: 10,
    // cor do fundo
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    // fazer card
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
  buttonCardText: {
    // ir para esquerda
    marginRight: 100,
    // tamanho do texto
  },
  buttonText: {
    fontSize: 12,
  },
  buttonCardText1: {
    // ir para esquerda
    marginRight: 40,
    // tamanho do texto
  },
  social: {
    flexDirection: "row",
    alignItems: "center",
    // padding left e right
    paddingHorizontal: 16,
    // centro
    justifyContent: "center",
    // espaço em cima
    marginTop: 20,
  },
  button: {
    backgroundColor: 'red',
  },
});
