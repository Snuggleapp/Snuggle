import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [circleRadius, setCircleRadius] = useState(0);
  const [isMapCentered, setIsMapCentered] = useState(true);
  const [searchText, setSearchText] = useState("");
  const mapRef = useRef(null);
  const [errorText, setErrorText] = useState(""); // Estado para armazenar a mensagem de erro

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permissão de localização negada");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        onRegionChangeComplete={checkMapCenter}
        showsUserLocation={true}
        showsMyLocationButton={false}
        initialRegion={
          location && {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }
        }
        toolbarEnabled={false}
      >
        {location && (
          <>
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Minha Localização"
            />
          </>
        )}
      </MapView>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar local"
        onSubmitEditing={searchLocation}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={searchLocation}>
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>
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
            <Icon name="location-arrow" size={24} color="white" />
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
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 30,
    width: 40,
    height: 40,
    marginBottom: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    position: "absolute",
    top: 16,
    left: 16,
    width: "70%",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
  },
  searchButton: {
    position: "absolute",
    top: 16,
    right: 16,
    marginBottom: 16,
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "white",
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
