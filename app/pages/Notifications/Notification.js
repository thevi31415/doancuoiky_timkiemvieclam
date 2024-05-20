// import { View, Text } from "react-native";
// import React from "react";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "../BottomSheet";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function Notification() {
  const [status, setStatus] = React.useState(false);
  const [listNotifications, setListNotifications] = useState([]);

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
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20 }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
        </TouchableOpacity> */}
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Thông báo</Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#e9f3ff",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#0559f7",
              marginRight: 10,
            }}
          />
          <View style={{ marginRight: 10 }}>
            <Image
              source={require("../assets/Logo_HCMUTE.jpg")}
              style={{ width: 55, height: 55, borderRadius: 100 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Công ty FPT đã ứng tuyển bạn
            </Text>
            <Text style={{ fontSize: 13, marginBottom: 5 }}>
              Vui lòng đến địa chỉ:Tòa nhà FPT, số 10 Phố Phạm Văn Bạch, Phuờng
              Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, để phỏng vấn nhé ! -
              Trân trọng
            </Text>
            <Text style={{ fontSize: 14, color: "#888" }}>20/05/2024</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "white",
              marginRight: 10,
            }}
          />
          <View style={{ marginRight: 10 }}>
            <Image
              source={require("../assets/Logo_HCMUTE.jpg")}
              style={{ width: 55, height: 55, borderRadius: 100 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Công ty FPT đã ứng tuyển bạn
            </Text>
            <Text style={{ fontSize: 13, marginBottom: 5 }}>
              Vui lòng đến địa chỉ:Tòa nhà FPT, số 10 Phố Phạm Văn Bạch, Phuờng
              Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, để phỏng vấn nhé ! -
              Trân trọng
            </Text>
            <Text style={{ fontSize: 14, color: "#888" }}>20/05/2024</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#e9f3ff",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#0559f7",
              marginRight: 10,
            }}
          />
          <View style={{ marginRight: 10 }}>
            <Image
              source={require("../assets/Logo_HCMUTE.jpg")}
              style={{ width: 55, height: 55, borderRadius: 100 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Công ty FPT đã ứng tuyển bạn
            </Text>
            <Text style={{ fontSize: 13, marginBottom: 5 }}>
              Vui lòng đến địa chỉ:Tòa nhà FPT, số 10 Phố Phạm Văn Bạch, Phuờng
              Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, để phỏng vấn nhé ! -
              Trân trọng
            </Text>
            <Text style={{ fontSize: 14, color: "#888" }}>20/05/2024</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#e9f3ff",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#0559f7",
              marginRight: 10,
            }}
          />
          <View style={{ marginRight: 10 }}>
            <Image
              source={require("../assets/Logo_HCMUTE.jpg")}
              style={{ width: 55, height: 55, borderRadius: 100 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Công ty FPT đã ứng tuyển bạn
            </Text>
            <Text style={{ fontSize: 13, marginBottom: 5 }}>
              Vui lòng đến địa chỉ:Tòa nhà FPT, số 10 Phố Phạm Văn Bạch, Phuờng
              Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, để phỏng vấn nhé ! -
              Trân trọng
            </Text>
            <Text style={{ fontSize: 14, color: "#888" }}>20/05/2024</Text>
          </View>
        </TouchableOpacity>
      </View>
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
