import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/src/constants/colors";

export type Charger = {
  id: string;
  latitude: number;
  longitude: number;
  ownerName?: string;
  Address?: string;
  chargerType?: string;
  distance?: number;
};

type Props = {
  chargers: Charger[];
  headerTitle?: string;
  headerSubtitle?: string;
  loading?: boolean;
};

const ChargerListView: React.FC<Props> = ({
  chargers,
  headerTitle = "All Chargers",
  headerSubtitle = "Showing charger info",
  loading = false,
}) => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.emeraldGreen} />

      <View style={styles.header}>
        <Text style={styles.title}>{headerTitle}</Text>
        <Text style={styles.subtitle}>{headerSubtitle}</Text>
      </View>

      <View style={styles.chargersSection}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : chargers.length > 0 ? (
          chargers.map((charger) => (
            <View key={charger.id} style={styles.chargerCard}>
              <Text style={styles.chargerTitle}>
                🔌 {charger.ownerName ?? "Charger"}
              </Text>
              {charger.Address && (
                <Text style={styles.chargerAddress}>{charger.Address}</Text>
              )}
              {charger.distance !== undefined && (
                <Text style={styles.distanceText}>
                  📍 {charger.distance.toFixed(2)} km away
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noChargersText}>No chargers found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ChargerListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  header: {
    backgroundColor: colors.emeraldGreen,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.white,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 5,
  },
  chargersSection: {
    marginTop: -20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chargerCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    color: colors.mediumGrey,
  },
});
