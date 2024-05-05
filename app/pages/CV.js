import { View, Text, StyleSheet, Image, Button } from "react-native";
import React from "react";
import { Card } from "react-native-shadow-cards";
export default function CV() {
  return (
    <View style={styles.container}>
      <Card style={{ padding: 10, margin: 10 }}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </Card>
      <Card style={{ padding: 10, margin: 10 }}>
        <Button
          onPress={() => {}}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </Card>
      <Card style={{ padding: 10, margin: 10, height: 50 }}></Card>
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
  shadow: {
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 150,
  },

  image: {
    width: 320,
    height: 320,
  },
});
