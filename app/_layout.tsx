import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
    // <View style={{ flex: 1, backgroundColor: "red" }} />;
  }
  const EmeraldTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <ThemeProvider value={EmeraldTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            title: "Login",
            animation: "none",
          }}
        />
        <Stack.Screen
          name="basicDetails"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="role"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="userDetails"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="providerDetails"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="onboardingSummary"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
