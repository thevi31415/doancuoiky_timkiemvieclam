import { View, Text } from "react-native";
import React from "react";

export default function JobSaved() {
  console.log("Công ty đang theo dõi");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Việc làm đã lưu</Text>
    </View>
  );
}
