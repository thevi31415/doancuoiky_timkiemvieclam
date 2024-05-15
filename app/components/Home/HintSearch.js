// import { View, Text } from "react-native";
// import React from "react";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export default function HintSearch() {
  const db = getFirestore(app);
  const [hintSearchCompany, setHintSearchCompany] = useState([]);
  const [hintSearchJob, setHintSearchJob] = useState([]);
  const fetchData = async () => {
    const companySnapshot = await getDocs(collection(db, "Company"));
    const companies = companySnapshot.docs.map((doc) => doc.data());
    setHintSearchCompany(companies);

    const lastJobSnapshot = await getDocs(collection(db, "Jobs"));
    const job = lastJobSnapshot.docs.map((doc) => doc.data());
    setHintSearchJob(job);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const data = [
    { id: 1, name: "Công nghệ 1" },
    { id: 2, name: "Công nghệ 2" },
    { id: 3, name: "Công nghệ 3" },
    { id: 3, name: "Công nghệ 3" },
    { id: 3, name: "Công nghệ 3" },
    // Thêm các mục khác nếu cần
  ];
  return (
    <View style={{ marginTop: 35 }}>
      <FlatList
        data={hintSearchCompany}
        horizontal // Hiển thị danh sách theo chiều ngang
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
        contentContainerStyle={{ paddingHorizontal: 4 }}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              paddingVertical: 5,
              backgroundColor: "#DBEAFE",
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 4,
            }}
          >
            <FontAwesome6
              name="arrow-trend-up"
              style={{ marginRight: 5 }}
              size={16}
              color="#2c67f2"
            />
            <Text style={{ color: "#1E3A8A", fontSize: 13 }}>{item.Name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.ID.toString()}
        pagingEnabled // Cho phép phần tử cuộn theo từng trang
        snapToAlignment={"start"} // Đảm bảo phần tử cuộn sát vào viền bên trái
      />
    </View>
  );
}
