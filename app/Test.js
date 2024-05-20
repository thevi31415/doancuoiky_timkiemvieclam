import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function ManageJobDetail() {
  const [job, setJob] = useState([]);
  const { params } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    params && setJob(params.job);
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Mã công việc: {job.ID}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#cacdd4",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <Text style={{ margin: 10, fontSize: 17, fontWeight: "bold" }}>
          Thông tin công việc
        </Text>
        <Image
          source={{ uri: job.Logo }}
          style={{
            width: 80,
            height: 80,
            marginRight: 15,
            borderRadius: 100,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: "bold",
              color: "#125fe8",
            }}
          >
            Tên công việc
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: "bold" }}>
              {job?.NameJob}
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="#a6a6a6" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: "bold",
              color: "#125fe8",
            }}
          >
            Vị trí
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: "normal" }}>
              {job?.LocationJob}
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="#a6a6a6" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
