// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhBiEh55AG_vOYyIgrfMpNCOn7JqwlNGQ",
  authDomain: "snuggledoacao.firebaseapp.com",
  projectId: "snuggledoacao",
  storageBucket: "snuggledoacao.appspot.com",
  messagingSenderId: "1012033055362",
  appId: "1:1012033055362:web:fe7bda95588d9cde58e29b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
