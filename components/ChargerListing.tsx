import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import Form from "../components/Form";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import APIManager from "@/APIManager";

const ChargerListing = () => {
  const params = useLocalSearchParams();
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 17.4239,
    longitude: 78.4738,
  });

  const fields = [
    {
      name: "ownerName",
      label: "Owner Name",
      placeholder: "Enter owner's name",
    },
    {
      name: "chargerType",
      label: "Charger Type",
      placeholder: "e.g., Level 2, DC Fast",
    },
    {
      name: "companyName",
      label: "Charger Company Name",
      placeholder: "Enter company name of your charger",
    },
    {
      name: "costPerUnit",
      label: "Cost per Unit",
      placeholder: "Enter cost per kWh",
    },
    {
      name: "Address",
      label: "Address",
      placeholder: "Enter charger location",
    },
  ];

  const [formValues, setFormValues] = useState({
    ownerName: "",
    chargerType: "",
    companyName: "",
    costPerUnit: "",
    Address: "",
  });

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (params.latitude && params.longitude) {
      setLocation({
        latitude: Number(params.latitude),
        longitude: Number(params.longitude),
      });
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!location.latitude || !location.longitude) {
      Alert.alert("Error", "Please select a location from the map");
      return;
    }

    const { latitude, longitude } = location;

    const newEntry = {
      ...formValues,
      latitude: latitude,
      longitude: longitude,
    };
    try {
      await APIManager.addCharger(newEntry);
      Alert.alert("Success", "Charger listing submitted successfully!");
      setFormValues({
        ownerName: "",
        chargerType: "",
        companyName: "",
        costPerUnit: "",
        Address: "",
      });
      setLocation({ latitude: 0, longitude: 0 });
    } catch (error: any) {
      Alert.alert(
        "Error",
        "Failed to connect to the server. Please check if the server is running and try again."
      );
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    setLocation({ latitude, longitude });
    setFormValues((prev) => ({
      ...prev,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>List Your Charger</Text>
        <Text style={styles.subtitle}>Fill in the details below</Text>
      </View>

      <View style={styles.formContainer}>
        <Form
          fields={fields}
          values={formValues}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => setIsMapVisible(true)}
        >
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.locationButtonText}>Select Location on Map</Text>
        </TouchableOpacity>

        {location.latitude && location.longitude ? (
          <View style={styles.locationInfo}>
            <Text style={styles.locationInfoText}>Selected Location:</Text>
            <Text style={styles.locationInfoText}>
              Lat: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationInfoText}>
              Lng: {location.longitude.toFixed(6)}
            </Text>
          </View>
        ) : null}
      </View>

      <Modal visible={isMapVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <MapView
            style={styles.modalMap}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            showsMyLocationButton
            onPress={handleMapPress}
          >
            <Marker
              coordinate={selectedLocation}
              draggable
              onDragEnd={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setSelectedLocation({ latitude, longitude });
                setLocation({ latitude, longitude });
                setFormValues((prev) => ({
                  ...prev,
                  latitude: latitude.toString(),
                  longitude: longitude.toString(),
                }));
              }}
            />
          </MapView>

          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setIsMapVisible(false)}
          >
            <Text style={styles.closeModalButtonText}>Close Map</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#4CAF50",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#fff", opacity: 0.9 },
  formContainer: {
    backgroundColor: "#fff",
    marginTop: -30,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  locationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  locationInfo: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  locationInfoText: { fontSize: 14, color: "#333", marginBottom: 5 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalMap: { flex: 1, width: "100%" },
  closeModalButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  closeModalButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default ChargerListing;
