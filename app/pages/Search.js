import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { app } from "../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export default function Search() {
  const db = getFirestore(app);
  const [searchText, setSearchText] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    if (searchText.length >= 2) {
      // Kiểm tra độ dài của TextInput
      fetchData();
    } else {
      setFilteredCompanies([]); // Đặt danh sách công ty đã lọc về rỗng nếu TextInput có độ dài ít hơn 2
    }
  }, [searchText]);

  const fetchData = async () => {
    try {
      const companySnapshot = await getDocs(collection(db, "Company"));
      const companies = companySnapshot.docs.map((doc) => doc.data());
      const filtered = companies.filter((company) =>
        company.Name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View className="bg-white" style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="bg-white">
        <View className="bg-white">
          <View
            onPress={fetchData}
            style={{
              backgroundColor: "#FFF",
              padding: 12,
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
              bottom: -10,
              width: 350,
              alignSelf: "center",
              borderWidth: 1.5,
              borderColor: "#2c67f2",
              backgroundColor: "#F4F6F5",
            }}
          >
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="#2c67f2" />
            </TouchableOpacity>
            <TextInput
              placeholder="Search job, company, etc.."
              placeholderTextColor={"#171716"}
              style={{
                marginLeft: 8,
                flex: 1,
                backgroundColor: "#F4F6F5",
              }}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity>
              <Ionicons name="filter" size={24} color="#2c67f2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text
        className="m-3 mt-5"
        style={{ color: "#2c67f2", fontWeight: "bold", fontSize: 15 }}
      >
        Gợi ý tìm kiếm
      </Text>
      {searchText.length >= 2 && ( // Hiển thị FlatList nếu độ dài của TextInput lớn hơn hoặc bằng 2
        <FlatList
          data={filteredCompanies}
          className=" bg-white  border-spacing-x-32 rounded-t "
          style={{ paddingLeft: 10, paddingRight: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 15,
                marginBottom: 15,
                borderBottomWidth: 1,
                flexDirection: "row",
                borderBottomColor: "#F5F6F6",
              }}
            >
              <Ionicons name="search" size={20} color="#808080" />

              <Text style={{ marginLeft: 10, fontSize: 16 }}>{item.Name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.ID}
        />
      )}
    </View>
  );
}
