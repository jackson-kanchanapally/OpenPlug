import { Colors } from "@/constants/Colors";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "expo-image";
import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ROLE_OPTIONS = [
  {
    key: "user",
    label: "Charger User",
    icon: <Ionicons name="car-sport-outline" size={24} color="#094C43" />,
  },
  {
    key: "provider",
    label: "Charger Provider",
    icon: (
      <MaterialCommunityIcons name="ev-station" size={24} color="#094C43" />
    ),
  },
  {
    key: "both",
    label: "Both",
    icon: <FontAwesome5 name="infinity" size={22} color="#094C43" />,
  },
];

const RoleScreen = () => {
  const navigation = useNavigation();

  const handleRoleSelection = (role: string) => {
    console.log("Selected Role:", role);
    if (role === "user") {
      navigation.navigate("userDetails", { role });
    } else if (role === "provider") {
      navigation.navigate("providerDetails", { role });
    }
    //  else {
    //   navigation.navigate("UserAndProvider", { role });
    // }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/loginBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>OpenPlug</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.subtitle}>Choose your role</Text>
          {ROLE_OPTIONS.map(({ key, label, icon }) => (
            <TouchableOpacity
              key={key}
              style={styles.roleButton}
              onPress={() => handleRoleSelection(key)}
            >
              <View style={styles.icon}>{icon}</View>
              <Text style={styles.roleText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? height * 0.15 : height * 0.2,
  },
  logoContainer: {
    marginBottom: height * 0.05,
  },
  logoText: {
    fontSize: width * 0.18,
    fontWeight: "600",
    color: Colors.light.white,
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  inputContainer: {
    width: "100%",
  },
  subtitle: {
    fontSize: 20,
    color: Colors.light.white,
    fontWeight: "400",
    marginBottom: 32,
    textAlign: "center",
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.white,
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    marginBottom: 20,
    elevation: 4,
  },
  icon: {
    marginRight: 12,
  },
  roleText: {
    fontSize: 18,
    color: "#094C43",
    fontWeight: "600",
  },
});

export default RoleScreen;
