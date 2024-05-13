import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function NotFoundCV() {
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>CV</Text>
      </View>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../pages/assets/not_found_cv.jpg")}
            style={{
              height: 280,
              width: 280,
            }}
          />

          <Text style={{ color: "#253a4d", fontSize: 20, fontWeight: "bold" }}>
            Tạo một CV đầu tiên trên JobVP
          </Text>
          <Text
            style={{
              color: "#80888d",
              fontSize: 15,
              marginTop: 20,
              textAlign: "center",
              lineHeight: 28,
            }}
          >
            Hãy tạo ngay một CV trên JobVP để có được ấn tượng sâu sắc đầu tiền
            từ nhà tuyển dụng
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#2c67f2",
              padding: 12,
              marginTop: 10,
              borderRadius: 10,
              flexDirection: "row", // Sắp xếp các phần tử theo hàng ngang
              alignItems: "center", // Căn chỉnh các phần tử theo chiều dọc
              justifyContent: "center", // Căn chỉnh các phần tử theo chiều ngang
            }}
          >
            <Ionicons name="add" size={26} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                marginLeft: 7,
              }}
            >
              Tạo ngay một CV
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
