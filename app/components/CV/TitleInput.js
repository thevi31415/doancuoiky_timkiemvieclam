import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TitleInput = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
      <Text style={styles.requiredIndicator}>*</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
  },
  requiredIndicator: {
    fontSize: 18,
    color: "#f04439",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default TitleInput;
