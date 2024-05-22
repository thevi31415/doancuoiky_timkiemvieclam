import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
  ScrollView,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  Divider,
} from "react-native-paper";
const candidate = {
  name: "Nguyễn Văn A",
  phone: "0123456789",
  email: "nguyenvana@example.com",
  address: "123 Đường ABC, Quận 1, TP. HCM",
  avatar: "https://via.placeholder.com/150",
  bio: "Một chuyên gia phần mềm với hơn 5 năm kinh nghiệm trong phát triển ứng dụng di động.",
};
export default function DetailCVApply() {
  const db = getFirestore(app);

  const { params } = useRoute();
  const navigation = useNavigation();
  const [cv, setCV] = useState([]);
  const getCV = async () => {
    try {
      const q = query(collection(db, "CV"), where("ID", "==", params.job.IDCv));
      const getCVSnapshot = await getDocs(q);
      const CV = getCVSnapshot.docs.map((doc) => doc.data());
      console.log("CV");
      console.log(CV);
      setCV(CV);
      console.log("CV_FINALE");
      console.log(cv[0]);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    console.log("Công ty đang theo dõi: " + listCompanyFollowed.length);
    setLoading(false);
  };
  useEffect(() => {
    console.log("CVD");
    console.log(params.job);
    getCV();
  }, [params]);
  const handleRecruit = () => {
    alert("Ứng viên đã được tuyển!");
  };

  return (
    <View>
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
          style={{ position: "absolute", left: 20 }} // Icon ở bên trái
        >
          <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          CV ứng viên {params.job.ID}
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}></View>
      <ScrollView>
        <Text>Hello</Text>
      </ScrollView>
    </View>
  );
}
const InfoRow = ({ icon, text }) => (
  <Text
    style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}
  >
    <Icon name={icon} size={20} style={{ marginRight: 10 }} />
    {text}
  </Text>
);
