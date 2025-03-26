import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert, Platform } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <View style={styles.container}>
    
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.coords?.latitude || 37.78825,
            longitude: location?.coords?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsTraffic={true}
          showsMyLocationButton={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 80 : 40, // Increased margin for both platforms
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
}); 