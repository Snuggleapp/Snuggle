// Importe as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth"; // Importe a função getReactNativePersistence
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhBiEh55AG_vOYyIgrfMpNCOn7JqwlNGQ",
  authDomain: "snuggledoacao.firebaseapp.com",
  projectId: "snuggledoacao",
  storageBucket: "snuggledoacao.appspot.com",
  messagingSenderId: "1012033055362",
  appId: "1:1012033055362:web:fe7bda95588d9cde58e29b",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure o armazenamento persistente
// para o aplicativo React Native
// usando o armazenamento AsyncStorage
const persistence = getReactNativePersistence(ReactNativeAsyncStorage);
auth.setPersistence(persistence);

// Exporte o objeto de configuração do Firebase
export { auth };
