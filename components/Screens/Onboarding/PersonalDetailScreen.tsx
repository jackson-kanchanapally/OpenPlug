import Header from "@/components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
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

const PersonalDetailScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const role = params?.role || "user";
  const userType = getUserType(role);

  const [userName, setUserName] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const handleNext = () => {
    navigation.navigate("role");
  };

  return (
    <>
      <Header showBack />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <InputField
            placeholder="Your Name"
            value={userName}
            onChangeText={setUserName}
          />
          <InputField
            placeholder="Plug Type"
            value={mobileNo}
            onChangeText={setMobileNo}
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

export default PersonalDetailScreen;
