import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// FontAwesome5
import { FontAwesome5 } from "@expo/vector-icons";
// status bar
import { StatusBar } from "expo-status-bar";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";




export default function DonationFoto() {
  const [type, setType] = useState(CameraType.back);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const route = useRoute();
  const { data } = route.params;
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [base64Data, setBase64Data] = useState(null); // Adicionado estado para armazenar base64
  // loading
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  
  


 async function sendPhoto() {

    navigation.navigate("DonationConfirm", {
      data: data,
      photoUri: photoUri,
      base64Data: base64Data,
    });

  

 }

  React.useEffect(() => {
    requestPermission();
  }, []);




 async function takePicture() {
   if (cameraRef.current) {

     const photo = await cameraRef.current.takePictureAsync({
       base64: true,
     });
     
      setPhotoUri(photo.uri);
      setBase64Data(photo.base64);
      setIsLoading(false);
     

    

   }
 }

  function resetCamera() {
    setPhotoUri(null);
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* fazer botao com icone de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={15} color="white" />
        </TouchableOpacity>
      </View>
      
      {photoUri ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photoUri }} style={styles.photo} />
          {/* botao com icone de editar */}
          <View style={styles.buttonEdit}>
            <TouchableOpacity
              style={styles.buttonIconEdit}
              onPress={resetCamera}
            >
              <FontAwesome5 name="pencil-alt" size={20} color="black" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonContainer1}>
            <TouchableOpacity style={styles.button1} onPress={sendPhoto}>
              <Text style={styles.text}>Próximo passo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera ref={cameraRef} style={styles.camera} type={type} ratio="16:9">
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonFoto}
              onPress={() => {
                takePicture();
                setIsLoading(true);
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonIcon}
              onPress={toggleCameraType}
            >
              <FontAwesome5 name="sync" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {isLoading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonFoto: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 60,
    justifyContent: "center",
    marginHorizontal: 10,
    width: 60,
    marginLeft: 50,
  },
  buttonContainer: {
    // posicionar embaixo
    position: "absolute",
    bottom: 32,
    // centralizar
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    // centralizar
    alignItems: "center",
  },
  buttonIcon: {
    alignItems: "center",
    // opacidade
    backgroundColor: "rgba(255, 255, 255, 0.1)",

    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    marginHorizontal: 10,
    width: 50,
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  photoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "80%",
    height: "60%",
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: "#FFFF",
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#1a73e8",
    borderRadius: 50,
    height: 60,
    justifyContent: "center",
    marginHorizontal: 10,
    width: 150,
    // sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonEdit: {
    //  fundo cinza claro
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 50,
    // sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIconEdit: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    // sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  buttonContainer1: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    // cor do fundo
    backgroundColor: "#1a73e8",
    position: "absolute",
    bottom: 0,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
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
