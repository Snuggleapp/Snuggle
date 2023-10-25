import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Presentation from "./pages/Presentation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

// Importe o contexto de autenticação
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// navegacao de login

function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("button").then((value) => {
      console.log("valor do button: ", value);
      if (value === "true") {
        setInitialRoute("Login");
      } else {
        setInitialRoute("Presentation");
      }
    });
  }, []);

  if (initialRoute === null) {
    return null; // Ou algum componente de carregamento
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="Presentation"
          component={Presentation}
          options={{ title: "Presentation", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator({ route }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home1"
        component={Home}
        options={{ title: "Home1", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
