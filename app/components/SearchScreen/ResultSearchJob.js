import { View, Text } from "react-native";
import React from "react";

export default function ResultSearchJob({ itemList }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{itemList.length}</Text>
    </View>
  );
}
