import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Button,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Picker } from "@react-native-picker/picker";
export default function ManageCompany() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [listCompany, setListCompany] = useState([]);
  const navigation = useNavigation();
  const fetchDataListCompany = async () => {
    try {
      const q = query(
        collection(db, "Company"),
        where("IDUser", "==", user?.id)
      );

      const companySnapshot = await getDocs(q);
      const company = companySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListCompany(company);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    console.log(listCompany.length);
  };
  useEffect(() => {
    fetchDataListCompany();
    console.log("IDuser: " + user?.id);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchDataListCompany();
    }, [])
  );

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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Quản lý công ty
        </Text>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Text style={{ fontSize: 17 }}>Bạn đã tạo </Text>
          <Text style={{ fontSize: 17, color: "#0255f0", fontWeight: "bold" }}>
            {listCompany.length}
          </Text>
          <Text style={{ fontSize: 17 }}> công ty</Text>
          <View
            style={{
              backgroundColor: "#015aff",
              padding: 10,
              margin: 5,
              borderRadius: 16,
              marginLeft: 70,
              alignSelf: "flex-start",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => navigation.push("add-company")}
            >
              <Ionicons name="add-circle" size={24} color="white" />
              <Text style={{ fontSize: 15, color: "#fcffff", marginLeft: 5 }}>
                Tạo công ty
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
        <FlatList
          data={listCompany}
          style={{ marginTop: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "#fafbff",
                borderRadius: 10,
                borderWidth: 1,
                borderLeftWidth: 1,
                borderColor: "#a4c1f7",
                width: 340,
                padding: 16,
                marginBottom: 16,
                marginHorizontal: 6,
                shadowColor: "#000",
                shadowRadius: 4,
                shadowOpacity: 0.1,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
              onPress={() =>
                navigation.push("company-detail", {
                  company: item,
                })
              }
              elevation={5}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 3,
                    borderRadius: 16,
                    backgroundColor: "#eef5ff",
                    width: "96%",
                  }}
                >
                  <Image
                    source={{ uri: item?.Logo }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 5,
                      margin: 3,
                    }}
                  />
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: "#333333",
                      }}
                    >
                      {item?.Name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                      }}
                    >
                      {item?.Location}
                    </Text>
                  </View>
                </View>
                <Ionicons name="bookmark-outline" size={24} color="#a4c1f7" />
              </View>

              {/* <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "600" }}>
  UI Designer
</Text> */}
              <View
                style={{
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    name="people-outline"
                    size={20}
                    color="#a4c1f7"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    {item?.Employee} Employee
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    name="bag-remove-outline"
                    size={20}
                    color="#a4c1f7"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    {item?.Job} Jobs
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 16,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity className="bg-blue-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  <Text className=" text-blue-800">{item?.Field}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}
