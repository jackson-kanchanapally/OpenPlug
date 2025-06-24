import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";

export const ChargerInfoScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const charger = JSON.parse((params.charger as string) || "{}");

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Charger Info</Text>
        <Text style={styles.headerSubtitle}>
          Details of the selected charger
        </Text>
      </View>

      {/* Profile Section */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(charger.ownerName)}
            </Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.ownerName}>{charger.ownerName}</Text>
            <Text style={styles.email}>{charger.email}</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <InfoRow label="Charger Type" value={charger.chargerType} />
          <InfoRow label="Cost per Unit" value={charger.costPerUnit} />
          <InfoRow label="Address" value={charger.Address} />
          <InfoRow label="Charger Company" value={charger.chargerCompany} />
          <InfoRow label="Latitude" value={String(charger.latitude)} />
          <InfoRow label="Longitude" value={String(charger.longitude)} />
        </View>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || "—"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  header: {
    backgroundColor: colors.emeraldGreen,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 6,
    marginLeft: 40,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginLeft: 40,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginTop: -20,
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary || colors.emeraldGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  profileDetails: {
    marginLeft: 16,
    flex: 1,
  },
  ownerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.veryDarkGrey,
  },
  email: {
    fontSize: 14,
    color: colors.mediumGrey,
    marginTop: 4,
  },
  infoSection: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    width: 140,
    color: colors.veryDarkGrey,
  },
  value: {
    flex: 1,
    color: colors.veryDarkGrey,
  },
});
