import Button from "@/components/custom/Button";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

const OnboardingSummaryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { role, userDetails, providerDetails } = route.params;

  const handleSubmit = async () => {
    const payload = {
      role,
      userDetails: userDetails || null,
      providerDetails: providerDetails || null,
    };
    console.log("Payload to submit:", payload);
    try {
      const response = await fetch("https://your-api-url.com/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log("Server Response:", data);
      Alert.alert("Success", "Onboarding data submitted successfully!");

      // Navigate to Home or Dashboard screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit data");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Details</Text>
      <Text style={styles.label}>Role: {role}</Text>

      {userDetails && (
        <>
          <Text style={styles.label}>Vehicle Model: {userDetails.model}</Text>
          <Text style={styles.label}>Plug Type: {userDetails.plugType}</Text>
        </>
      )}

      {providerDetails && (
        <>
          <Text style={styles.label}>
            Charger Type: {providerDetails.speedType}
          </Text>
          <Text style={styles.label}>
            Location: {providerDetails.location?.latitude?.toFixed(4)},{" "}
            {providerDetails.location?.longitude?.toFixed(4)}
          </Text>
        </>
      )}

      <Button BtnText="Submit" onPress={handleSubmit} />
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
  label: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 10,
  },
});

export default OnboardingSummaryScreen;
