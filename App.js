// App.js
// No web version. Mobile only app.
// Display a map, user location, and points of interest using react-native-maps

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Request location permission and get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

    // Use user's location if available, otherwise fall back to Indiana
  const getInitialRegion = () => {
    if (location) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
    }
    return {
      latitude: 39.7684,
      longitude: -86.1581,
      latitudeDelta: 2.8,
      longitudeDelta: 2.8,
    };
  };

  // Create a dummy POI from 1 mile from user location
  const getDummyPOI = () => {
    if (location) {
      // 1 mile = 0.01 degrees latitude
      const offsetLat = 0.01; // About 1 mile
      return {
        latitude: location.coords.latitude + offsetLat,  //addition=>north
        longitude: location.coords.longitude,
      };
    }
    // Fallback to Indianapolis area if no user location
    return {
      latitude: 39.7684 + 0.01,
      longitude: -86.1581,
    };
  };

  //Display the map, user location, and real and dummy points of interest
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.mapView}
        mapType="standard"
        showsPointsOfInterest={true}
        showsBuildings={true}
        showsTraffic={false}
        showsUserLocation={true}
        followsUserLocation={false}
        loadingEnabled={true}
        region={getInitialRegion()}>

          <Marker
            coordinate={getDummyPOI()}
            title="Tom's Diner ★★★★☆ (4.0/5)"
            description="A popular family-owned breakfast & lunch diner!"
          />
      </MapView>
    </View>
  );
}