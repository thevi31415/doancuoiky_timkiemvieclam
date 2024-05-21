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
import { useNavigation } from "@react-navigation/native";

export default function JobItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fafbff",
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderLeftWidth: 1,
        width: "100%",
        borderColor: "#a4c1f7",
      }}
      onPress={() =>
        navigation.push("job-detail-stack", {
          job: item,
        })
      }
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
            source={{ uri: item?.Logo }}
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
            {item?.NameCompany}
          </Text>
        </View>

        <Ionicons name="bookmark-outline" size={24} color="#a4c1f7" />
      </View>
      <Text
        style={{
          marginTop: 7,
          fontWeight: "bold",
          fontSize: 23,
          color: "#2c67f2",
        }}
      >
        {item?.NameJob}
      </Text>
      <View style={{ marginTop: 7 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="location-outline" size={24} color="#a4c1f7" />
          <Text
            style={{
              color: "#3F3F3F",
              fontSize: 15,
              marginLeft: 8,
            }}
          >
            {item?.LocationJob}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <AntDesign name="staro" size={24} color="#a4c1f7" />

          <Text
            style={{
              color: "#3F3F3F",
              fontSize: 15,
              marginLeft: 8,
            }}
          >
            {item?.Experience} Kinh nghiệm
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <MaterialIcons name="attach-money" size={24} color="#a4c1f7" />
          <Text
            style={{
              color: "#3F3F3F",
              fontSize: 15,
              marginLeft: 8,
            }}
          >
            {item?.Salary} USD
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
              style={{ marginTop: 7, padding: 5 }}
              className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              <Text>{item?.TypeJob}</Text>
            </View>
          </View>
          <Text style={{ marginTop: 10 }}>{item?.DateCreated}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
