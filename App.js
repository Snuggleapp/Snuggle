import React from "react";
import AppNavigator from "./Navigation";

import { LogBox } from "react-native";
import { useEffect} from "react";
// status bar
import { StatusBar } from "expo-status-bar";

export default function App() {

 

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

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
