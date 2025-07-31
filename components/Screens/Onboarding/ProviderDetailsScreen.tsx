import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import Button from "../../custom/Button";
import InputField from "../../custom/InputField";

const { height } = Dimensions.get("window");

const ProviderDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const role = route.params?.role;

  const [location, setLocation] = useState(null);
  const [speedType, setSpeedType] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleNext = () => {
    navigation.navigate("OnboardingSummary", {
      role,
      providerDetails: { location, speedType },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Charger Info</Text>
      <InputField
        placeholder="Charger Speed & Type"
        value={speedType}
        onChangeText={setSpeedType}
        iconName="speedometer-outline"
      />
      <Text style={styles.locationText}>
        {location
          ? `Your Location: ${location.latitude.toFixed(
              4
            )}, ${location.longitude.toFixed(4)}`
          : "Fetching location..."}
      </Text>
      <Button BtnText="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? height * 0.1 : height * 0.08,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    color: Colors.light.text,
    textAlign: "center",
  },
  locationText: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    color: Colors.light.text,
  },
});

export default ProviderDetailsScreen;
