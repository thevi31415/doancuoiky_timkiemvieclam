import { View, Text } from "react-native";
import React from "react";

export default function JobAppled() {
  console.log("Công ty đang theo dõi");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Việc làm đã ứng tuyển</Text>
    </View>
  );
}
