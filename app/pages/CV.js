import { View, Text, StyleSheet, Image, Button } from "react-native";
import React from "react";
import { Card } from "react-native-shadow-cards";
export default function CV() {
  return (
    <View style={styles.container}>
      <Text>CV</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
  },
});
