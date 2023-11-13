import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { requestBackgroundPermissionsAsync } from "expo-location";

export default function Map() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function requestLocationPermission() {
      const { granted } = await requestBackgroundPermissionsAsync();
      if (granted) {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      }
    }
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}

        region={{
          latitude: location.latitude || 0,
          longitude: location.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>
      <Text style={styles.text}>
        {location.latitude || 0}, {location.longitude || 0}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    padding: 10,
  },
});



 



