import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function CompaniesItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fafbff",
        borderRadius: 10,
        borderWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#a4c1f7",
        width: 300,
        padding: 16,
        marginRight: 16,
        shadowColor: "#000",
        shadowRadius: 4,
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }}
      onPress={() =>
        navigation.push("company-detail", {
          company: item,
        })
      }
      elevation={5}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 3,
            borderRadius: 16,
            backgroundColor: "#eef5ff",
            width: "96%",
          }}
        >
          <Image
            source={{ uri: item?.Logo }}
            style={{ width: 45, height: 45, borderRadius: 5, margin: 3 }}
          />
          <View style={{ marginLeft: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#333333",
              }}
            >
              {item?.Name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              {item?.Location}
            </Text>
          </View>
        </View>
        <Ionicons name="bookmark-outline" size={24} color="#a4c1f7" />
      </View>

      {/* <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "600" }}>
  UI Designer
</Text> */}
      <View
        style={{
          marginTop: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="people-outline"
            size={20}
            color="#a4c1f7"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 12, fontWeight: "400" }}>
            {item?.Employee} Employee
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="bag-remove-outline"
            size={20}
            color="#a4c1f7"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 12, fontWeight: "400" }}>
            {item?.Job} Jobs
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity className="bg-blue-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          <Text className=" text-blue-800">{item?.Field}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
