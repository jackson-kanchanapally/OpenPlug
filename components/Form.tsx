import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormField from "./FormField";
import { colors } from "@/src/constants/colors";

type Field = {
  name: string;
  label: string;
  placeholder: string;
};

type Props = {
  fields: Field[];
  values: { [key: string]: string };
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
};

const Form: React.FC<Props> = ({ fields, values, onChange, onSubmit }) => {
  return (
    <View>
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          value={values[field.name]}
          onChangeText={(text: string) => onChange(field.name, text)}
          placeholder={field.placeholder}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.emeraldGreen,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Form;
