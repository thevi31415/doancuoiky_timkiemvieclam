import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Checkbox } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

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
import { useUser } from "@clerk/clerk-expo";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";

export default function ManageJob() {
  const navigation = useNavigation();

  const db = getFirestore(app);

  const [checked, setChecked] = React.useState(false);
  const [listJob, setListJob] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const fetchDataListJob = async () => {
    console.log("IDuser: " + user?.id);
    setLoading(true);
    try {
      const q = query(collection(db, "Jobs"), where("IDUser", "==", user?.id));

      const jobSnapshot = await getDocs(q);
      const job = jobSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListJob(job);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDataListJob();
  }, [user]);
  useFocusEffect(
    React.useCallback(() => {
      fetchDataListJob();
    }, [user])
  );
  const handleCheckboxPress = async (id, status) => {
    try {
      await updateDoc(doc(db, "Jobs", id), {
        Status: !status, // Toggle status
      });
      fetchDataListJob(); // Update the job list after updating the status
      // Hiển thị Toast tương ứng
      if (status) {
        ToastAndroid.show(
          "Đã dừng tuyển công việc này !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } else {
        ToastAndroid.show(
          "Đã bắt đầu tuyển công việc này !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Quản lý tuyển dụng
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Text style={{ fontSize: 17 }}>Bạn đã tạo </Text>
          <Text style={{ fontSize: 17, color: "#0255f0", fontWeight: "bold" }}>
            {listJob.length}
          </Text>
          <Text style={{ fontSize: 17 }}> công việc</Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={listJob}
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
              onPress={() =>
                navigation.push("manege-job-detail", {
                  job: item,
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
                    source={{ uri: item.Logo }}
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
                      {item?.NameJob}
                    </Text>
                    <Text
                      style={{
                        color: "#3b3b3b",
                        marginTop: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {item?.NameCompany}
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
                    <Text style={{ color: "#8f8f8f", marginTop: 2 }}>
                      3 cv ứng tuyển
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Checkbox
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
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.ID}
        />
      </View>
      <LoadingOverlay loading={loading} />
    </>
  );
}
