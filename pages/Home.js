import { useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { auth, fire } from "../firebase/config";
import { Query, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Button, Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
// imagem toca-aqui
import TocaAqui from "../assets/toca-aqui.png";
// status bar
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "react-native";


export default function Home({ navigation}) {
  // pegar usuario logado
  
  // const navigation = useNavigation();
  const user = auth.currentUser;





  // console.log(user.email);
  // console.log(user.displayName);
  // console.log(user.uid);

  const [infoDoacoes, setInfoDoacoes] = useState([])
  const [qtdDoacao, setQtdDoacao] = useState(0)
  
  const dadosDoacao = async () => {
    const docRef = await query(collection(fire, "Donations"), where("UID", "==", user.uid));
    const docSnap = await getDocs(docRef);
    setInfoDoacoes(docSnap.docs.map((doc) => doc.data()));
    setQtdDoacao(docSnap.docs.length)
    

  }



  


  useEffect(() => {
    navigation.addListener('focus', () => {
      dadosDoacao();
      console.log("fala baixo neague");
      
    })
  }, [navigation])


  const name =
    user.displayName.split(" ")[0] + " " + user.displayName.split(" ")[1];
  return (
    <View style={styles.container}>
      <StatusBar style="black" translucent={true} />
      {/* retornar telefone do usuario */}
      <View style={styles.userContainer}>
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 50, height: 50, borderRadius: 25, borderColor: "#ccc", borderWidth: 1.5 }}
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
          <Image source={TocaAqui} style={{ width: 50, height: 50 }} />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardText}>Todas as Doações</Text>
            <Text style={styles.cardText1}>{qtdDoacao}</Text>
          </View>
        </View>
        <View style={styles.cardBottom}>
          {/* total do ano */}
          <View style={styles.cardTextBoxBottom}>
            <Text style={styles.cardTextBottom}>Total do ano</Text>
            <Text style={styles.cardTextBottom1}>100 itens</Text>
          </View>
          <View style={styles.cardTextBoxBottom}>
            {/* ultima doação */}
            <Text style={styles.cardTextBottom}>Ultima doação</Text>
            <Text style={styles.cardTextBottom1}>Asa Norte</Text>
          </View>

          <View style={styles.cardTextBoxBottom1}>
            <Text style={styles.cardTextBottom}>Doando desde</Text>
            <Text style={styles.cardTextBottom1}>2021</Text>
          </View>
        </View>
      </View>
      <Text style={styles.line}></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Map")}
      >
        <Ionicons
          style={styles.iconBottom}
          name="heart-half-outline"
          size={20}
          color="#1a73e8"
        />
        <View style={styles.conteinerText}>
          <Text style={styles.buttonText}>Doe agasalhos</Text>
          <Text style={styles.buttonText1}>Ajude quem precisa!</Text>
        </View>
        <Ionicons
          style={{
            // pocicionar no fim hotizontal
            position: "absolute",
            right: 0,
            // espaço a direita
            marginRight: 10,
          }}
          name="chevron-forward-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>

      <Text style={styles.line}></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DonationApp")}
      >
        <Ionicons
          style={styles.iconBottom}
          name="card-outline"
          size={20}
          color="#1a73e8"
        />
        <View style={styles.conteinerText}>
          <Text style={styles.buttonText}>Ajude o Snuggle</Text>
          <Text style={styles.buttonText1}>Uma doação pode mudar vidas!</Text>
        </View>
        <Ionicons
          style={{
            // pocicionar no fim hotizontal
            position: "absolute",
            right: 0,
            // espaço a direita
            marginRight: 10,
          }}
          name="chevron-forward-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>

      <Text style={styles.line}></Text>
      <View style={styles.social}>
        {/* icone do istagram */}
        <Ionicons
          style={styles.iconBottom}
          name="logo-instagram"
          size={24}
          color="black"
          // redirecionar para o instagram
          onPress={() => {
            Linking.openURL("https://www.instagram.com/");
          }}
        />
        {/* icone do tw */}
        <Ionicons
          style={styles.iconBottom}
          name="logo-twitter"
          size={24}
          color="black"

          // redirecionar para o twitter
          onPress={() => {
            Linking.openURL("https://twitter.com/");
          }}
        />
        {/* icone do face */}
        <Ionicons
          style={styles.iconBottom}
          name="logo-facebook"
          size={24}
          color="black"
          // redirecionar para o facebook
          onPress={() => {
            Linking.openURL("https://www.facebook.com/");
          }}
        />
      </View>
      {/* botao para deslogar */}
      <Button
        style={styles.buttonSair}
        mode="contained"
        onPress={() => {
          signOut(auth);
          AsyncStorage.removeItem("user");
          navigation.navigate("Login");
        }}
      >
        Sair
      </Button>
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
    marginTop: 30,
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
    // negrito
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonText1: {
    // negrito
    fontWeight: "bold",
    fontSize: 12,
    // cor do texto cinza nao tao claro
    color: "#A8A7A7",
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
  buttonSair: {
    marginTop: 50,
    // cor do fundo
    backgroundColor: "#1a73e8",
    // tamanho do texto
    fontSize: 20,
    width: "80%",
    // alinhar no centro
    alignSelf: "center",

    // alinhar no centro
    alignItems: "center",
    // cor do texto
    color: "#fff",
    // fazer card
    borderRadius: 50,
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    // espaço entre eles
    // padding left e right
    paddingHorizontal: 16,
    height: 48,
    // espaço entre eles
  },
  conteinerText: {
    // espaço a esquerda
    marginLeft: 10,
  },
  cardText1: {
    // tamanho do texto
    // cor do texto cinza nao tao claro
    color: "#A8A7A7",
  },
  cardTextBottom1: {
    // tamanho do texto
    // cor do texto cinza nao tao claro
    color: "#A8A7A7",
  },
});
