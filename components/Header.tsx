import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
};

export default function Header({
  title,
  subtitle,
  onBack,
  showBack = false,
}: HeaderProps) {
  const navigation = useNavigation();
  const handleBack = () => {
    if (onBack) onBack();
    else if (navigation && navigation.canGoBack()) navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={Colors.light.text}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 36,
    padding: 4,
    zIndex: 2,
  },
  backText: {
    fontSize: 28,
    color: Colors.light.text,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 4,
  },
});
