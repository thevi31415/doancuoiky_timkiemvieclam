import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
export default function LastJob() {
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
        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
          onPress={() => navigation.navigate("Job")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={require("../../pages/assets/google_logo.png")} />
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Security Engineering Manager
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                  }}
                >
                  Senior • Remote • Fulltime
                </Text>
              </View>
            </View>
            <Ionicons name="bookmark-outline" size={24} color="#000" />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              $180K/year
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              12 Minutes ago
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={require("../../pages/assets/google_logo.png")} />
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Staff Software Engineer
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                  }}
                >
                  Senior • Remote • Fulltime
                </Text>
              </View>
            </View>
            <Ionicons name="bookmark-outline" size={24} color="#000" />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              $200K/year
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              1 Day ago
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={require("../../pages/assets/google_logo.png")} />
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Cloud Customer Engineer, AI/ML
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                  }}
                >
                  Senior • Remote • Fulltime
                </Text>
              </View>
            </View>
            <Ionicons name="bookmark-outline" size={24} color="#000" />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              $150K/year
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              1 Day ago
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
