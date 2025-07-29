import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  BtnText: string;
  TxtStyle?: StyleProp<TextStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
};
const Button: React.FC<ButtonProps> = ({
  BtnText,
  TxtStyle,
  btnStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={btnStyle || styles.Button} onPress={onPress}>
      <Text style={TxtStyle || styles.buttonText}>{BtnText}</Text>
    </TouchableOpacity>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  Button: {
    backgroundColor: Colors.light.emeraldGreen,
    paddingVertical: height * 0.018,
    borderRadius: width * 0.02,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.07,
    margin: 5,
  },
  buttonText: {
    color: Colors.light.white,
    fontSize: width * 0.04,
    fontWeight: "600",
  },
});

export default Button;
