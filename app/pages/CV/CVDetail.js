import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-shadow-cards";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window"); // Lấy chiều cao của màn hình
export default function CVDetail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    console.log("CV:");
    console.log(params.cv);
  }, [params]);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          padding: 13,
          backgroundColor: "white",
          borderBottomColor: "#e6e7e8",
          borderBottomWidth: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20 }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Detail CV</Text>
      </View>

      <ScrollView>
        <View
          style={{
            margin: 7,
            backgroundColor: "white",
            borderRadius: 8,
            marginBottom: 0,
            height: "100%",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              height: height - 150,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 0.4, // Chiều rộng cột đầu tiên nhỏ hơn cột thứ hai
                backgroundColor: "#335384",
                padding: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                // Canh giữa nội dung theo chiều dọc
              }}
            >
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Image
                  source={{ uri: params.cv?.Avatar }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  Liên lạc
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Entypo name="calendar" size={15} color="white" />
                  <Text style={{ fontSize: 12, color: "white", marginLeft: 5 }}>
                    {params.cv?.DateBirth}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <FontAwesome name="user" size={17} color="white" />
                  <Text style={{ fontSize: 12, color: "white", marginLeft: 5 }}>
                    {params.cv?.Gender}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Entypo name="phone" size={15} color="white" />
                  <Text style={{ fontSize: 12, color: "white", marginLeft: 5 }}>
                    {params.cv?.Phone}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Entypo name="mail" size={15} color="white" />
                  <Text style={{ fontSize: 12, color: "white", marginLeft: 5 }}>
                    {params.cv?.Email}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Entypo name="location-pin" size={15} color="white" />
                  <Text style={{ fontSize: 12, color: "white", marginLeft: 5 }}>
                    {params.cv?.Location}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Entypo name="network" size={15} color="white" />
                  <Text style={{ fontSize: 12, color: "white", marginLeft: 5 }}>
                    {params.cv?.Website}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0.6, // Chiều rộng cột thứ hai lớn hơn cột đầu tiên
                backgroundColor: "white",
                padding: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                // Canh giữa nội dung theo chiều dọc
              }}
            >
              <Text
                style={{ fontSize: 23, color: "#335384", fontWeight: "bold" }}
              >
                {params.cv?.Name}
              </Text>
              <Text>Mã ứng viên: {params.job?.IDCa}</Text>

              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#98D0E8",
                  }}
                >
                  Mục tiêu nghề nghiệp
                </Text>
                <Text>{params.cv?.Introduction}</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#98D0E8",
                  }}
                >
                  Sở thích
                </Text>
                <Text>{params.cv?.Interest}</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#98D0E8",
                  }}
                >
                  Kĩ năng
                </Text>
                <Text>{params.cv?.Skills}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    paddingBottom: 0,
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});
