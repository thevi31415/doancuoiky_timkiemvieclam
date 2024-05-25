import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ManageJobDetail({ job }) {
  const { params } = useRoute();
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);
  // useEffect(() => {
  //   params && setJob(params.job);
  // }, [params]);
  // console.log("ID: " + job.id);
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
              {job?.LocationJob.substring(0, 25) + "..."}
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
            Mô tả
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "normal" }}>
              {job?.DescriptionJob ? job.DescriptionJob.substring(0, 25) : ""}
              ...
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
            Quyền lợi
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "normal" }}>
              {job?.BenefitJob ? job.BenefitJob.substring(0, 25) : ""}
              ...
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
            Kĩ năng
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "normal" }}>
              {job?.SkillJob ? job.SkillJob.substring(0, 25) : ""}
              ...
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
            Kinh nghiệm
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: "normal" }}>
              {job?.Experience} Năm
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
            Mức lương
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: "normal" }}>
              {job?.Salary} USD
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="#a6a6a6" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            paddingHorizontal: 25,
            backgroundColor: "#f2f6ff",
            borderRadius: 10,
            margin: 5,
          }}
          // onPress={() => navigation.push("all-cv-apply"),  {
          // company: item,
          // }}
          onPress={() =>
            navigation.push("all-cv-apply", {
              job: job,
            })
          }
        >
          <FontAwesome name="users" size={30} color="#015aff" />
          <Text style={{ fontSize: 18, fontWeight: "500", marginLeft: 10 }}>
            {job.CV} hồ sơ ứng tuyển
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            paddingHorizontal: 25,
            backgroundColor: "#f2f6ff",
            borderRadius: 10,
            margin: 5,
          }}
          onPress={() =>
            navigation.push("accept-cv-apply", {
              job: job,
            })
          }
        >
          <FontAwesome5 name="user-check" size={28} color="#015aff" />
          <Text style={{ fontSize: 18, fontWeight: "500", marginLeft: 10 }}>
            {job.CVApprove} hồ sơ đã duyệt
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
