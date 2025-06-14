import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormField from "./FormField";

const Form = ({ fields, values, onChange, onSubmit }) => {
  return (
    <View>
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          value={values[field.name]}
          onChangeText={(text) => onChange(field.name, text)}
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
    backgroundColor: "#4CAF50",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Form;
