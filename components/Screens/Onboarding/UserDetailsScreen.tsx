import Header from "@/components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import Button from "../../custom/Button";
import InputField from "../../custom/InputField";

const getUserType = (role: string) => {
  switch (role) {
    case "user":
      return "Charger User";
    case "provider":
      return "Charger Provider";
    default:
      return "Charger User and Provider";
  }
};

const UserDetailsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const role = params?.role || "user";
  const userType = getUserType(role);

  const [model, setModel] = useState("");
  const [plugType, setPlugType] = useState("");

  const handleNext = () => {
    navigation.navigate("onboardingSummary", {
      role,
      userDetails: { model, plugType },
    });
  };

  return (
    <>
      <Header showBack title="Vehicle Info" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Signing up for {userType}</Text>

          <InputField
            placeholder="Car/Bike Model"
            value={model}
            onChangeText={setModel}
            iconName="car-outline"
          />
          <InputField
            placeholder="Plug Type"
            value={plugType}
            onChangeText={setPlugType}
            iconName="flash-outline"
          />
          <View style={styles.buttonContainer}>
            <Button BtnText="Next" onPress={handleNext} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    color: Colors.light.text,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default UserDetailsScreen;
