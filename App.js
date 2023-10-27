import React from "react";
import AppNavigator from "./Navigation";

import { LogBox } from "react-native";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <>
      <StatusBar hidden />
      <AppNavigator />
    </>
  );
}
