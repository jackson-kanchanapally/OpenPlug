import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

type InputWithIconProps = TextInputProps & {
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  placeholder: string;
};

const InputField: React.FC<InputWithIconProps> = ({
  iconName,
  iconSize = 20,
  iconColor = Colors.light.darkGray,
  style,
  placeholder,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      {iconName && (
        <Ionicons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input || style}
        placeholderTextColor="#999"
        placeholder={placeholder}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.light.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.light.white,
    marginVertical: 6,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.black,
  },
});

export default InputField;
