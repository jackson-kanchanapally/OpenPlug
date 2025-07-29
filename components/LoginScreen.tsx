import React from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "./custom/Button";
import InputField from "./custom/InputField";
const { width, height } = Dimensions.get("window");
const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/loginBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.logoText}>OpenPlug</Text>

        <InputField placeholder="Email address" iconName="mail-outline" />
        <InputField
          placeholder="Password"
          iconName="lock-closed-outline"
          secureTextEntry
        />

        <Button BtnText="SIGN IN" onPress={() => console.log("Signed In")} />

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <Text style={styles.socialIcon}>f</Text>
          <Text style={styles.socialIcon}>t</Text>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    height: "100%",
    paddingTop: Platform.OS === "ios" ? height * 0.15 : height * 0.2,
    // marginTop: 250,
  },
  logoText: {
    fontSize: width * 0.18,
    fontWeight: "semibold",
    color: "#FFFFFF",
    marginBottom: height * 0.1,
  },
  forgotText: {
    color: "#FFFFFF",
    marginTop: height * 0.02,
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 24,
    gap: 20,
  },
  socialIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});

export default WelcomeScreen;
