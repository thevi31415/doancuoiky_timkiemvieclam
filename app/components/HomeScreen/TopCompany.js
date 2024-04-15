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
        }}
      >
        Top công ty hàng đầu
      </Text>
      <View style={{ height: 200 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 16,
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../pages/assets/facebook_logo.png")}
                />
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Facebook
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                    }}
                  >
                    California, USA
                  </Text>
                </View>
              </View>
              <Ionicons name="bookmark-outline" size={24} color="#000" />
            </View>

            <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "600" }}>
              UI Designer
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>
              Senior • Remote • Fulltime
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#3F6CDF",
                  padding: 12,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                  }}
                >
                  Apply Now
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                $100K/year
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 16,
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../pages/assets/pinterest_logo.png")}
                />
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Pinterest
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                    }}
                  >
                    California, USA
                  </Text>
                </View>
              </View>
              <Ionicons name="bookmark-outline" size={24} color="#000" />
            </View>

            <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "600" }}>
              UI Designer
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>
              Senior • Remote • Fulltime
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#3F6CDF",
                  padding: 12,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                  }}
                >
                  Apply Now
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                $80K/year
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
