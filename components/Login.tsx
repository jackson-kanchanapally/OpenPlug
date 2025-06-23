import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { auth } from "@/firebase";
import { Ionicons } from "@expo/vector-icons";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { colors } from "@/src/constants/colors";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
export default function Login() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "582241536958-daqrl3narrkvjmvqru5pa6fndn58cn1g.apps.googleusercontent.com",
    redirectUri,
  });
  useEffect(() => {
    if (response?.type === "success" && response.authentication?.idToken) {
      // const { id_token } = response.authentication || {};
      // if (id_token) {
      // const credential = GoogleAuthProvider.credential(id_token);
      const credential = GoogleAuthProvider.credential(
        response.authentication.idToken
      );
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Firebase login successful:", userCredential.user);
        })
        .catch((error) => {
          console.error("Firebase login error:", error);
          Alert.alert("Firebase Auth Error", error.message);
        });
      // }
    }
  }, [response]);

  return (
    <View style={[styles.container, { backgroundColor: colors.lightGrey }]}>
      <View style={[styles.header, { backgroundColor: colors.emeraldGreen }]}>
        <Text
          style={[
            styles.title,
            {
              color: colors.white,
            },
          ]}
        >
          Welcome to OpenPlug
        </Text>
      </View>

      <View
        style={[
          styles.formContainer,
          { backgroundColor: colors.white, shadowColor: colors.black },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.googleButton,
            { backgroundColor: colors.emeraldGreen },
          ]}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Ionicons name="logo-google" size={20} color={colors.white} />
          <Text
            style={[
              styles.googleButtonText,
              {
                color: colors.white,
              },
            ]}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    height: "80%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formContainer: {
    marginTop: -30,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
