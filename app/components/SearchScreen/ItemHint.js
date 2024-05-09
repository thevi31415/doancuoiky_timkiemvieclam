import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
export default function ItemHint({ itemHint }) {
  return (
    <View
      style={{
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        flexDirection: "row",
        borderBottomColor: "#F5F6F6",
      }}
    >
      <Ionicons name="search" size={20} color="#808080" />

      <Text style={{ marginLeft: 10, fontSize: 16 }}>{itemHint.Name}</Text>
    </View>
  );
}
