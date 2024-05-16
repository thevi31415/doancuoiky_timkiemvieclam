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
            backgroundColor: "#E2F6FD",
            margin: 5,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#015aff" }}>
            [Bạn đã được tuyển] Công ty FPT đã ứng tuyển bạn
          </Text>
          <Text style={{ color: "#333333", marginTop: 5, marginBottom: 5 }}>
            Vui lòng đến địa chỉ:Tòa nhà FPT, số 10 Phố Phạm Văn Bạch, Phuờng
            Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, để phỏng vấn nhé ! -
            Trân trọng
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="clockcircle" size={15} color="#8f8f8f" />
            <Text style={{ color: "#8f8f8f", marginLeft: 5 }}>12/2/2024 </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#EEEFF5",
            margin: 5,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#015aff" }}>
            [Bạn đã được tuyển] Công ty SamSung Việt Nam đã ứng tuyển bạn
          </Text>
          <Text style={{ color: "#333333", marginTop: 5, marginBottom: 5 }}>
            Vui lòng đến tòa PVI Tower, số 1 Phan Văn Bạch, Cầu Giấy, Hà Nội để
            phỏng vấn nhé. - Trân trọng !
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="clockcircle" size={15} color="#8f8f8f" />
            <Text style={{ color: "#8f8f8f", marginLeft: 5 }}>12/2/2024 </Text>
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
