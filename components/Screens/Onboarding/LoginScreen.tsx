import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import Button from "../../custom/Button";
import InputField from "../../custom/InputField";
const { width, height } = Dimensions.get("window");

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const handleSignIn = () => {
    console.log("Signed In");
    navigation.navigate("basicDetails");
  };
  return (
    <ImageBackground
      source={require("../../../assets/images/loginBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.logoText}>OpenPlug</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            style={styles.inputContainer}
          >
            <InputField placeholder="Email address" iconName="mail-outline" />
            <InputField
              placeholder="Password"
              iconName="lock-closed-outline"
              secureTextEntry
            />
            <Button BtnText="SIGN IN" onPress={handleSignIn} />
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.socialContainer}>
              <AntDesign
                name="google"
                size={24}
                color="#094C43"
                style={styles.icon}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
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
  logoText: {
    fontSize: width * 0.18,
    fontWeight: "600",
    color: Colors.light.white,
    textAlign: "center",
    marginBottom: height * 0.12,
  },
  inputContainer: {
    width: "100%",
  },
  forgotText: {
    color: Colors.light.white,
    marginTop: height * 0.02,
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 24,
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    fontSize: 20,
    color: Colors.light.white,
  },
});

export default WelcomeScreen;
