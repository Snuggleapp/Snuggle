import * as Location from "expo-location";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ActivityIndicator,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
// status bar
import { StatusBar } from "expo-status-bar";
import { Chip } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default function Map() {
  // navegação
  const navigation = useNavigation();

  const [status, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const mapViewRef = useRef(null);
  const searchInputRef = useRef(null);
  const [showMarkerButtons, setShowMarkerButtons] = useState(false);
  const [mapIsMoving, setMapIsMoving] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const openGoogleMaps = () => {
    if (region && (selectedMarker || markers.length > 0)) {
      const destination = selectedMarker
        ? selectedMarker.coordinate
        : markers[0].coordinate;

      const url = `https://www.google.com/maps/dir/?api=1&origin=${location.coords.latitude},${location.coords.longitude}&destination=${destination.latitude},${destination.longitude}`;

      Linking.openURL(url);
    }
  };

  const handlePanDrag = () => {
    setShowMarkerButtons(false);
    setMapIsMoving(false);
  };

  const handleMapPress = () => {
    setShowMarkerButtons(false);
    setMapIsMoving(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation);
      setRegion({
        latitude: initialLocation.coords.latitude,
        longitude: initialLocation.coords.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });

      const locationListener = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (newLocation) => {
          setLocation(newLocation);
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });
        }
      );

      return () => {
        if (locationListener) {
          locationListener.remove();
        }
      };
    })();
  }, []);

  const goToUserLocation = () => {
    if (mapViewRef.current && location) {
      mapViewRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const result = await Location.geocodeAsync(searchText);
      if (result.length > 0) {
        const firstResult = result[0];
        const newRegion = {
          latitude: firstResult.latitude,
          longitude: firstResult.longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        };
        setRegion(newRegion);

        if (mapViewRef.current) {
          mapViewRef.current.animateToRegion(newRegion);
        }
      } else {
        setNotFound(true);
        setTimeout(() => {
          setNotFound(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error searching for the location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    handleSearch();
    setSearchText("");
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const mapStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    // botao do google maps hidenn
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    //
  ];

  const markers = [
    {
      coordinate: {
        latitude: -15.766597639874032,
        longitude: -47.89359676825209,
      },
      title: "Uniceub",
      description: "Centro de Doação",
      id: "1",
    },
    {
      coordinate: {
        latitude: -15.7801,
        longitude: -47.9292,
      },
      title: "Hospital",
      description: "Hospital Central",
      id: "2",
    },

    {
      // -15.79328042283634, -47.88130073198738
      coordinate: {
        latitude: -15.79328042283634,
        longitude: -47.88130073198738,
      },
      title: "Conjunto nacional",
      description: "Centro de Doação",
      id: "3",
    },
  ];

  const acharPosto = async () => {
    let minDistance = null;
    let nearestMarker = null;
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i];
      const distance = Math.sqrt(
        Math.pow(region?.latitude - marker.coordinate.latitude, 2) +
          Math.pow(region?.longitude - marker.coordinate.longitude, 2)
      );
      if (minDistance === null || distance < minDistance) {
        minDistance = distance;
        nearestMarker = marker;
      }
    }
    return nearestMarker;
  };

  // função para ir para a o marcador mais proximo
  const goToNearestMarker = async () => {
    const nearestMarker = await acharPosto();
    setSelectedMarker(nearestMarker);
    if (nearestMarker) {
      mapViewRef.current.animateToRegion({
        latitude: nearestMarker.coordinate.latitude,
        longitude: nearestMarker.coordinate.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
      markerRef.current.showCallout();
    }
  };

  const markerRef = useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.searchContainer}>
        <View style={styles.chipstyle}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Pesquise um endereço"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleConfirm}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleConfirm}>
            <FontAwesome name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 16,
          }}
        >
          <Chip
            elevated={true}
            icon={() => (
              <FontAwesome name="map-marker" color={"#1a73e8"} size={16} />
            )}
            textStyle={{ fontFamily: "Inter_500Medium" }}
            style={{
              marginTop: 10,
              backgroundColor: "white",
              // sombra
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            }}
            onPress={() => {
              setMapIsMoving(true);
              goToNearestMarker();
            }}
          >
            {/* icone */}
            Posto mais próximo
          </Chip>
          {mapIsMoving && (
            <Chip
              icon={() => (
                <FontAwesome5 name="route" color={"#1a73e8"} size={16} />
              )}
              style={{
                marginTop: 10,
                backgroundColor: "white",
                // sombra
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
              }}
              // abrir posto mais proximo
              onPress={openGoogleMaps}
            >
              Traçar rota
            </Chip>
          )}
        </ScrollView>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a73e8" />
        </View>
      )}
      {notFound && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Não localizado</Text>
        </View>
      )}
      <MapView
        ref={mapViewRef}
        customMapStyle={mapStyle}
        style={styles.map}
        region={region}
        onPanDrag={handlePanDrag}
        onPress={handleMapPress}
        showsMyLocationButton={false}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            ref={(el) => {
              if (selectedMarker?.id === marker.id) {
                markerRef.current = el;
              }
            }}
            onPress={() => {
              setShowMarkerButtons(true);
              setMapIsMoving(true);
              setSelectedMarker(marker);
            }}
          >
            <FontAwesome name="gift" size={30} color="#1a73e8" />
          </Marker>
        ))}
      </MapView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonLocation}
          onPress={goToUserLocation}
        >
          <FontAwesome name="location-arrow" size={24} color="white" />
        </TouchableOpacity>
        {mapIsMoving && (
          <TouchableOpacity
            style={styles.buttonGift}
            onPress={() => {
              navigation.navigate("Donation", { id: selectedMarker.id });
            }}
          >
            <FontAwesome name="gift" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    width: "100%",
    height: "108%",
    zIndex: -1,
  },
  searchContainer: {
    position: "absolute",

    width: "90%",
    top: 50,
    flexDirection: "column",

    alignItems: "center",
  },
  chipstyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    backgroundColor: "white",
    elevation: 10,
    paddingHorizontal: 20,
    zIndex: 1,
    opacity: 0.9,
    borderRadius: 40,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  searchButton: {
    width: 35,
    height: 35,
    backgroundColor: "#1a73e8",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    opacity: 0.9,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 120,
    right: 15,
    alignItems: "center",
    elevation: 10,
    zIndex: 1,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#1a73e8",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 10,
  },
  buttonLocation: {
    width: 50,
    height: 50,
    backgroundColor: "#1a73e8",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 10,
  },
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundContainer: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    width: "100%",
    alignItems: "center",
  },
  notFoundText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonGift: {
    width: 50,
    height: 50,
    backgroundColor: "#FF9500",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 10,
  },
  // style do callout
  callout: {
    width: 200,
  },
});
