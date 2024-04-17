import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
export default function TopCompany() {
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
        Top công ty hàng đầu
      </Text>
      <View style={{ height: 200 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#2c67f2",
              width: 300,
              marginRight: 16,
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
                  source={require("../../pages/assets/logo.png")}
                  style={{ width: 50, height: 50 }}
                />
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "600",
                      color: "#222F3F",
                    }}
                  >
                    Facebook
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                  >
                    California, USA
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
                  1000 Employee
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
                <Text style={{ fontSize: 12, fontWeight: "400" }}>0 Jobs</Text>
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
                <Text className=" text-blue-800">Công nghệ</Text>
              </TouchableOpacity>
              {/* <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Công nghệ
              </Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#2c67f2",
              width: 300,
              marginRight: 16,
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
                  source={require("../../pages/assets/logo.png")}
                  style={{ width: 50, height: 50 }}
                />
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "600",
                      color: "#222F3F",
                    }}
                  >
                    Facebook
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                  >
                    California, USA
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
                  1000 Employee
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
                <Text style={{ fontSize: 12, fontWeight: "400" }}>0 Jobs</Text>
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
                <Text className=" text-blue-800">Công nghệ</Text>
              </TouchableOpacity>
              {/* <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Công nghệ
              </Text> */}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
