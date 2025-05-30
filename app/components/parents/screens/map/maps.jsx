import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";

export default function Maps({ selectedId }) {
  const [position, setPosition] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  console.log("wfse", selectedId);

  const getLocation = async () => {
    if (!selectedId) return;

    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        console.error("Missing auth token");
        return;
      }

      const response = await axios.get(
        `${API_URL}/location/get-drivers-location/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const driverLocation = response.data.data[0];
        const lat = parseFloat(driverLocation.latitude);
        const lng = parseFloat(driverLocation.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          setPosition({ lat, lng });
        } else {
          console.error("Invalid coordinates received.");
        }
      } else {
        console.error(response.data.message || "Location not found.");
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    if (!selectedId) return;

    getLocation(); // Fetch immediately
    const id = setInterval(getLocation, 5000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [selectedId]);

  return (
    <View style={styles.container}>
      {position ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: position.lat,
            longitude: position.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker.Animated 
            coordinate={
              new AnimatedRegion({
                latitude: position.lat,
                longitude: position.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              })
            }
          />
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
