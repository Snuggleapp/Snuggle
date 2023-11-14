import * as Location from "expo-location";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

export default function Map() {
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
  ];

  const markers = [
    {
      coordinate: {
        latitude: -15.766597639874032,
        longitude: -47.89359676825209,
      },
      title: "Uniceub",
      description: "Centro de Doação",
    },
    {
      coordinate: {
        latitude: -15.7801,
        longitude: -47.9292,
      },
      title: "Hospital",
      description: "Hospital Central",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search for an address"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleConfirm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleConfirm}>
          <FontAwesome name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a73e8" />
        </View>
      )}
      {notFound && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Location not found</Text>
        </View>
      )}
      <MapView
        ref={mapViewRef}
        customMapStyle={mapStyle}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onPanDrag={handlePanDrag}
        onPress={handleMapPress}
        showsCompass={false} // Esconde a bússola
        showsTraffic={false} // Esconde o tráfego
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => {
              setShowMarkerButtons(true);
              setMapIsMoving(true);
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
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="gift" size={24} color="white" />
          </TouchableOpacity>
        )}
        {mapIsMoving && (
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="map" size={24} color="white" />
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
    height: "100%",
    zIndex: -1,
  },
  searchContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: "90%",
    height: 45,
    top: 50,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    elevation: 10,
    zIndex: 1,
    opacity: 0.9,
    alignItems: "center",
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
  marker: {},
});
