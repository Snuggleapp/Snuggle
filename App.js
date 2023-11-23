import React from "react";
import AppNavigator from "./Navigation";
import { LogBox } from "react-native";
import { useEffect} from "react";
// status bar
import { StatusBar } from "expo-status-bar";
import { useFonts, Inter_900Black,Inter_400Regular,Inter_500Medium,Inter_700Bold } from "@expo-google-fonts/inter";

export default function App() {
  
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <>
      <StatusBar   
        style="light"
        translucent={true}
      />      
      <AppNavigator />
    </>
  );
}
