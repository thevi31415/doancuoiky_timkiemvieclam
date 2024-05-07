import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import JobItem from "./JobItem";

export default function LastJob({ lastJobsList }) {
  return (
    <View style={{ flex: 0.82, padding: 16 }}>
      <Text
        style={{
          marginVertical: 0,
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 20,
          color: "#2c67f2",
        }}
      >
        Công việc mới nhất
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={lastJobsList}
          numColumns={10}
          renderItem={({ item, index }) => <JobItem job={item} />}
        />
      </ScrollView>
    </View>
  );
}
