import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
export default function TopCompany({ topCompanyList }) {
  return (
    <View style={{ flex: 0.82, padding: 16 }}>
      <Text
        style={{
          marginVertical: 0,
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 16,
          color: "#2c67f2",
        }}
      >
        Top công ty hàng đầu
      </Text>
      <View style={{ height: 200 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={topCompanyList}
            numColumns={10}
            style={{ margin: 10 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#ffff",

                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderColor: "#2c67f2",
                  width: 300,
                  padding: 10,
                  marginRight: 16,
                  shadowColor: "#000000",
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: {
                    height: 1,
                    width: 0,
                  },
                }}
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
                    }}
                  >
                    <Image
                      source={{ uri: item?.Logo }}
                      style={{ width: 40, height: 40 }}
                    />
                    <View style={{ marginLeft: 8 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#222F3F",
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
                  <Ionicons name="bookmark-outline" size={24} color="#000" />
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
                      color="black"
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
                      color="black"
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
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
}
