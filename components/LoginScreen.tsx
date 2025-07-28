import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "./Header";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.topSection}>
        <Image
          source={require("../assets/images/react-logo.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subText}>Sign in to an account</Text>
        <Text style={styles.hintText}>Please enter your phone number</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            placeholder="Phone number"
            keyboardType="number-pad"
            style={styles.phoneInput}
          />
        </View>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C7BE5",
  },
  topSection: {
    flex: 0.4,
    backgroundColor: "#2C7BE5", // Bright blue
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 80,
    height: 80,
    tintColor: "white",
  },
  bottomSection: {
    flex: 0.6,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  subText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  hintText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,

    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: "#F1F5F9",
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: "#111",
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  continueButton: {
    backgroundColor: "#2ECC71", // Green
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
