import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import APIManager from "@/APIManager";
import ProfileActionSheet from "@/components/ProfileActionSheet";
import { colors } from "@/src/constants/colors";
import { router } from "expo-router";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [chargers, setChargers] = useState<
    { latitude: number; longitude: number; ownerName?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const actionSheetRef = useRef<ActionSheet>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const handleMarkerPress = (charger: ChargerDoc) => {
    setSelectedUser(charger);
    actionSheetRef.current?.show();
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await APIManager.getChargers();
        const markers = data.map((item: any) => ({
          latitude:
            typeof item.latitude === "string"
              ? parseFloat(item.latitude)
              : item.latitude,
          longitude:
            typeof item.longitude === "string"
              ? parseFloat(item.longitude)
              : item.longitude,
          ownerName: item.ownerName || "Charger",
          address: item.Address || "",
          chargerType: item.chargerType || "",
        }));

        setChargers(markers);
      } catch (error) {
        console.error("Failed to load chargers from backend:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      await AsyncStorage.setItem(
        "userLocation",
        JSON.stringify(currentLocation)
      );
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const chargerStations = await AsyncStorage.getItem("chargerFormData");
  //       if (chargerStations) {
  //         const parsed = JSON.parse(chargerStations);
  //         const chargerArray = Array.isArray(parsed) ? parsed : [parsed];

  //         const markers = chargerArray.map((item) => {
  //           const latitude =
  //             typeof item.latitude === "string"
  //               ? parseFloat(item.latitude)
  //               : item.location?.latitude ?? 0;

  //           const longitude =
  //             typeof item.longitude === "string"
  //               ? parseFloat(item.longitude)
  //               : item.location?.longitude ?? 0;

  //           return {
  //             latitude,
  //             longitude,
  //             ownerName: item.ownerName || "Charger",
  //           };
  //         });

  //         setChargers(markers);
  //       }
  //     } catch (error) {
  //       console.error("Error loading charger data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  const latitude = location?.coords?.latitude || 17.385;
  const longitude = location?.coords?.longitude || 78.4867;

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.emeraldGreen}
            style={styles.container}
          />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {chargers.map((charger, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: charger.latitude,
                  longitude: charger.longitude,
                }}
                title={charger.ownerName || "Charger"}
                onPress={() => handleMarkerPress(charger)}
              >
                <View style={styles.markerIcon}>
                  <FontAwesome5
                    name="charging-station"
                    size={28}
                    color={colors.emeraldGreen}
                  />
                </View>
              </Marker>
            ))}
          </MapView>
        )}
        <ProfileActionSheet
          ref={actionSheetRef}
          user={selectedUser}
          onConnect={() => {
            actionSheetRef.current?.hide();
            router.push({
              pathname: "/chargerInfo",
              params: {
                charger: JSON.stringify(selectedUser),
              },
            });
          }}
          onClose={() => {
            actionSheetRef.current?.hide();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  markerIcon: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 20, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  mapContainer: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 80 : 40,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.88,
  },
});
