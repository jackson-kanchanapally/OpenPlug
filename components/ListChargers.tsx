import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/src/constants/colors";
import APIManager from "@/APIManager";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

type Charger = {
  id: string;
  latitude: number;
  longitude: number;
  ownerName?: string;
  Address?: string;
  chargerType?: string;
  distance?: number;
};

export default function ListChargers() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState(true);

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationPermission =
          await Location.requestForegroundPermissionsAsync();
        if (locationPermission.status !== "granted") {
          console.warn("Location permission not granted");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });

        const apiChargers = await APIManager.getChargers();

        const updatedChargers = apiChargers.map((charger: Charger) => ({
          ...charger,
          distance: getDistanceFromLatLonInKm(
            latitude,
            longitude,
            Number(charger.latitude),
            Number(charger.longitude)
          ),
        }));

        setChargers(updatedChargers);
      } catch (err) {
        console.error("Error fetching chargers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.emeraldGreen} />
      <View style={styles.header}>
        <Text style={styles.title}>All Chargers</Text>
        <Text style={styles.subtitle}>
          Showing all chargers from your location
        </Text>
      </View>

      <View style={styles.chargersSection}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.emeraldGreen}
            style={styles.loader}
          />
        ) : chargers.length > 0 ? (
          <View style={styles.con}>
            {chargers.map((charger) => (
              <TouchableOpacity key={charger.id} style={styles.chargerCard}>
                <Text style={styles.chargerTitle}>
                  {charger.ownerName ?? "Charger"}
                </Text>
                {charger.Address && (
                  <Text style={styles.chargerAddress}>{charger.Address}</Text>
                )}
                <View style={styles.connectView}>
                  {charger.distance !== undefined && (
                    <Text style={styles.distanceText}>
                      📍 {charger.distance.toFixed(2)} km away
                    </Text>
                  )}
                  <TouchableOpacity
                    style={styles.connectBtn}
                    onPress={() => {
                      router.push({
                        pathname: "/chargerInfo",
                        params: { charger: JSON.stringify(charger) },
                      });
                    }}
                  >
                    <Text style={styles.connectBtnTxt}>Connect</Text>
                    <Feather
                      name="arrow-up-right"
                      size={16}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
            <Text style={styles.thatsAllText}>Thats all you got...</Text>
          </View>
        ) : (
          <Text style={styles.noChargersText}>No chargers found.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  con: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    backgroundColor: colors.emeraldGreen,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  chargersSection: {
    marginTop: -20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chargerCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2,
  },
  chargerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.veryDarkGrey,
    marginBottom: 4,
  },
  chargerAddress: {
    fontSize: 14,
    color: colors.mediumGrey,
    marginBottom: 6,
  },
  distanceText: {
    fontSize: 14,
    color: colors.darkGold,
  },
  noChargersText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    color: colors.mediumGrey,
  },
  thatsAllText: {
    fontSize: 15,
    textAlign: "center",
    padding: 14,
    color: colors.mediumGrey,
  },
  connectView: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    justifyContent: "space-between",
    marginRight: 5,
    marginTop: 10,
  },
  connectBtn: {
    flexDirection: "row",
    backgroundColor: colors.emeraldGreen,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  connectBtnTxt: {
    fontSize: 14,
    color: colors.white,
  },
});
