import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";

export default function JobItem({ job }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 2,
        borderLeftWidth: 8,
        width: "100%",
        borderColor: "#2c67f2",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 2,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: job?.Logo }}
            style={{ width: 30, height: 30 }}
          />

          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 13,
            }}
          >
            {job?.NameCompany}
          </Text>
        </View>

        <Ionicons name="bookmark-outline" size={24} color="#000" />
      </View>
      <Text
        style={{
          marginTop: 7,
          fontWeight: "bold",
          fontSize: 23,
          color: "#2c67f2",
        }}
      >
        {job?.NameJob}
      </Text>
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="location-outline" size={24} color="#8f8f8f" />
          <Text
            style={{
              color: "#3F3F3F",
              fontSize: 15,
              marginLeft: 8,
            }}
          >
            {job?.LocationJob}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <AntDesign name="staro" size={24} color="#8f8f8f" />

          <Text
            style={{
              color: "#3F3F3F",
              fontSize: 15,
              marginLeft: 8,
            }}
          >
            {job?.Experience} Kinh nghiệm
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <MaterialIcons name="attach-money" size={24} color="#8f8f8f" />
          <Text
            style={{
              color: "#3F3F3F",
              fontSize: 15,
              marginLeft: 8,
            }}
          >
            {job?.Salary} USD
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{ marginTop: 10, padding: 5 }}
              className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              <Text>{job?.TypeJob}</Text>
            </View>
          </View>
          <Text style={{ marginTop: 10 }}>{job?.DateCreated}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
