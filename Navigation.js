import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import DonationApp from "./pages/DonationApp";
import Shopping from "./pages/Shopping";
// Presentation
import Presentation from "./pages/Presentation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Importe o contexto de autenticação
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// navegacao de login

function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("button").then((value) => {
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
        <Stack.Screen
          name="DonationApp"
          component={DonationApp}
          options={{ title: "DonationApp", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator({ route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          width: "90%", // Defina a largura desejada, neste caso 90%
          height: 50, // Defina a altura desejada, neste caso 60
          alignSelf: "center", // Alinha o Tab.Navigator no centro horizontalmente
          backgroundColor: "#F3F3F3", // Defina a cor de fundo como desejado
          bottom: 30, // Define o deslocamento superior desejado
          borderRadius: 30,
          position: "absolute",
          alignItems: "center", // Alinhar itens no centro verticalmente
          marginLeft: 20, // Ajuste a margem esquerda
        },
        tabBarItemStyle: {
          justifyContent: "center", // Alinha os itens de cada aba no centro horizontalmente
          alignItems: "center", // Alinha os itens de cada aba no centro verticalmente
        },
      }}
    >
      <Tab.Screen
        name="Home1"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={30}
              // style
              style={{ marginTop: 8 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map"
              color={color}
              size={30}
              style={{
                marginTop: 10,
                backgroundColor: "white",
                borderRadius: 50, // Use um valor alto para criar um círculo
                width: 60, // Ajuste o tamanho do círculo
                height: 60, // Ajuste o tamanho do círculo
                alignItems: "center",
                justifyContent: "center",
                // margem em cima
                marginTop: 10,
                textAlign: "center",
                textAlignVertical: "center",
                // fazer sombra
                shadowColor: "#000",
                shadowOffset: {
                  height: 2,
                  width: 0,
                },
                shadowOpacity: 0.25,
                shadowRadius: 50,
                elevation: 5,
              }}
            />
          ),
        }}
      />
      {/* icon com cesta de compra */}
      <Tab.Screen
        name="Shopping"
        component={Shopping}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              // coin
              name="cart"
              color={color}
              size={30}
              style={{ marginTop: 8 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
