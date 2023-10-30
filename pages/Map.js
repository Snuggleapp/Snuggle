import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [circleRadius, setCircleRadius] = useState(0);
  const [isMapCentered, setIsMapCentered] = useState(true);
  const [searchText, setSearchText] = useState("");
  const mapRef = useRef(null);
  const [errorText, setErrorText] = useState(""); // Estado para armazenar a mensagem de erro
  const [showRouteButton, setShowRouteButton] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null); // Estado para rastrear o marcador selecionado
  const navigation = useNavigation();

  // fazer marcações espalhadas por Brasília
  const markers = [
    {
      latitude: -15.766602346678141,
      longitude: -47.89356275192733,
      title: "Asa Sul",
      description: "Asa Sul",
    },
    {
      latitude: -15.783194,
      longitude: -47.899845,
      title: "Asa Norte",
      description: "Asa Norte",
    },
    {
      latitude: -15.790976,
      longitude: -47.882423,
      title: "Lago Sul",
      description: "Lago Sul",
    },
    {
      latitude: -15.803076,
      longitude: -47.882423,
      title: "Lago Norte",
      description: "Lago Norte",
    },
    // Adicione mais marcadores aqui
  ];

  const openGoogleMapsRoute = (marker) => {
    if (!location || !location.coords) {
      console.error("Localização não disponível.");
      return;
    }

    const origin = `${location.coords.latitude},${location.coords.longitude}`;
    const destination = `${marker.latitude},${marker.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

    Linking.openURL(url)
      .then(() => {
        // Defina o estado para ocultar o botão de rota
        setShowRouteButton(false);
      })
      .catch((err) => console.error("Erro ao abrir o Google Maps: ", err));
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permissão de localização negada");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          setLocation(location);
          setCircleRadius(1000); // Defina o raio do círculo em metros (1000 metros neste exemplo)
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            });
          }
        } else {
          console.error("Falha ao obter a localização.");
        }
      } catch (error) {
        console.error("Erro ao obter a localização: ", error);
      }
    };

    getLocation();
  }, []);

  const checkMapCenter = (region) => {
    const { latitude, longitude } = location.coords;
    const { latitude: mapLatitude, longitude: mapLongitude } = region;
    const latDiff = Math.abs(latitude - mapLatitude);
    const lonDiff = Math.abs(longitude - mapLongitude);

    if (latDiff < 0.001 && lonDiff < 0.001) {
      setIsMapCentered(true);
    } else {
      setIsMapCentered(false);
    }
  };
  const customMapStyle = [
    // retirar todas as marcações do mapa
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    // tirar marcação de metro
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  const searchLocation = async () => {
    try {
      const result = await Location.geocodeAsync(searchText);
      if (result.length > 0) {
        const { latitude, longitude } = result[0];
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        }
      } else {
        setErrorText("Local não encontrado"); // Define a mensagem de erro

        // Limpa a mensagem de erro após 2 segundos
        setTimeout(() => {
          setErrorText("");
        }, 2000);
      }
    } catch (error) {
      console.error("Erro na busca de localização: ", error);
    }
  };
  const hideRouteButton = () => {
    setShowRouteButton(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={hideRouteButton} // Oculta o botão de rota quando o mapa é pressionado
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        style={styles.map}
        ref={mapRef}
        zoomControlEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
        onRegionChangeComplete={checkMapCenter}
        initialRegion={
          location && {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }
        }
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            onPress={() => {
              setSelectedMarker(marker);
              setShowRouteButton(true);
            }}
          >
            <Icon name="gift" size={24} color="red" />
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onSubmitEditing={searchLocation}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          placeholder="Search location..."
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchLocation}>
          <Icon name="search" size={16} color="#aaa" />
        </TouchableOpacity>
      </View>

      {!isMapCentered && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            if (mapRef.current) {
              mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              });
            }
          }}
        >
          <View style={styles.button}>
            <Icon name="crosshairs" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}
      {showRouteButton && (
        <TouchableOpacity
          style={styles.buttonContaineRoute}
          onPress={() => openGoogleMapsRoute(selectedMarker)}
        >
          <View style={styles.button}>
            <Icon name="location-arrow" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}
      {showRouteButton && (
        <TouchableOpacity
          style={styles.buttonContaineDonation}
          onPress={() =>
            // ir para a tela de doação
            navigation.navigate("DonationApp")
          }
        >
          <View style={styles.buttonDonation}>
            {/* icone de gift */}
            <Ionicons
              style={styles.iconBottom}
              name="gift"
              size={24}
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}

      {errorText !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginBottom: -30,
  },
  buttonContainer: {
    position: "absolute",
    // posicionar na direita
    right: 16,
    marginTop: 700,
  },
  buttonContaineRoute: {
    position: "absolute",
    marginTop: 650,
    // posicionar na direita
    right: 16,
  },
  buttonContaineDonation: {
    position: "absolute",
    marginTop: 600,
    // posicionar na direita
    right: 16,
  },
  buttonDonation: {
    backgroundColor: "#FF9500",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#2B85E6",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    position: "absolute",
    top: 16,
    left: 40,
    backgroundColor: "white",
    width: "80%",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingLeft: 20,
    paddingRight: 12,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
  },
  searchButton: {
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    position: "absolute",
    top: 16,
    width: "100%",
    backgroundColor: "red",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "white",
  },
});
