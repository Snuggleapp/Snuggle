// Importe as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth"; // Importe a função getReactNativePersistence
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhBiEh55AG_vOYyIgrfMpNCOn7JqwlNGQ",
  authDomain: "snuggledoacao.firebaseapp.com",
  databaseURL: "https://snuggledoacao-default-rtdb.firebaseio.com/",
  projectId: "snuggledoacao",
  storageBucket: "snuggledoacao.appspot.com",
  messagingSenderId: "1012033055362",
  appId: "1:1012033055362:web:fe7bda95588d9cde58e29b",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage), // Defina o tipo de persistência para 'local'
});

export { auth, db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
