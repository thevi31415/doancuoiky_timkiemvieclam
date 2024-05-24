import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
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
import { Checkbox } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import { useNavigation } from "@react-navigation/native";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
export default function AcceptCvApply({ job }) {
  const Stack = createStackNavigator();
  const { params } = useRoute();
  const db = getFirestore(app);
  const { user } = useUser();
  const [listAllCV, setListAllCV] = useState([]);
  const navigation = useNavigation();
  const getAllCV = async () => {
    try {
      console.log("IDJob: " + job.ID);
      const q = query(
        collection(db, "ApplyJob"),
        where("IDJob", "==", job.ID),
        where("Status", "==", 1)
      );
      const getAllCVSnapshot = await getDocs(q);
      const allCV = getAllCVSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setListAllCV(allCV);
      console.log(listAllCV.length);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    console.log("Công ty đang theo dõi: " + listCompanyFollowed.length);
    setLoading(false);
  };
  useEffect(() => {
    getAllCV();
    console.log("Job All CV");
    console.log(job);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getAllCV();
    }, [])
  );
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
          Hồ sơ đã duyệt: {job.CV}
        </Text>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listAllCV}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                margin: 0,
                padding: 10,
                borderRadius: 0,
                borderBottomColor: "#ebebec",
                borderBottomWidth: 1,
              }}
              // onPress={() =>
              //   navigation.push("manege-job-detail", {
              //     job: item,
              //   })
              // }
              onPress={() =>
                navigation.push("detail-cv-apply", {
                  job: item,
                  job2: job,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.Avatar }}
                    style={{
                      width: 55,
                      height: 55,
                      marginRight: 15,
                      borderRadius: 100,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#015aff",
                      }}
                    >
                      {item?.Name}
                    </Text>
                    <Text
                      style={{
                        color: "#3b3b3b",
                        marginTop: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {item?.DateApply}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#d6e4ff",
                        borderRadius: 5,
                        alignSelf: "flex-start",
                        padding: 5,
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "#0056b3",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        #{item?.ID}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  {/* <Checkbox
                    status={item.Status ? "checked" : "unchecked"} // Set status based on item.Status
                    color={item.Status ? "#025afe" : "#333333"} // Change color based on item.Status
                    onPress={() => handleCheckboxPress(item?.id, item.Status)} // Handle checkbox press
                  />
                  <Text
                    style={{
                      marginTop: 2,
                      color: item.Status ? "#025afe" : "#333333",
                    }}
                  >
                    {item.Status ? "Đang tuyển" : "Dừng tuyển"}
                  </Text> */}
                  <View
                    style={{
                      backgroundColor: item.Status ? "#4BD964" : "gray",
                      padding: 5,
                      borderRadius: 5,
                      width: 80,
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                      {item.Status ? "Đã duyệt" : "Chờ duyệt"}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
