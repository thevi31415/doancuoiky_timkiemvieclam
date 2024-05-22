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
  console.log("LastJob: " + lastJobsList.length);
  return (
    <View style={{ flex: 0.82, padding: 16 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
      >
        <Text
          style={{
            marginVertical: 0,
            fontSize: 18,
            fontWeight: "600",
            color: "black",
            flex: 1,
          }}
        >
          Việc làm nổi bật
        </Text>
        <Text style={{ marginLeft: "auto", color: "#2c67f2" }}>View More</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={lastJobsList}
          // numColumns={10}
          renderItem={({ item, index }) => <JobItem item={item} />}
        />
      </ScrollView>
    </View>
  );
}
