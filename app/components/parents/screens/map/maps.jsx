import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function maps() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.1688543, // Example: New Delhi
          longitude: 73.0249120,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 19.1688543, longitude: 73.0249120 }}
          title="You are here"
          description="This is your location"
        />
      </MapView>
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
