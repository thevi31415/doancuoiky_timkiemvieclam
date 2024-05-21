import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import NotFoundCVStackNav from "./NotFoundCVStackNav";
export default function ManagementCV() {
  const db = getFirestore(app);
  const navigation = useNavigation();

  const [listCV, setListCV] = useState([]);
  const [CV, setCV] = useState([]);
  const { user } = useUser();

  const fetchDataCV = async () => {
    try {
      const q = query(collection(db, "CV"), where("IDUser", "==", user?.id));

      const cvSnapshot = await getDocs(q);
      const cvData = cvSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // const job = jobSnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      setListCV(cvData);
      console.log("List cv: " + cvData.length);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    setLoading(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchDataCV();
    }, [])
  );
  useEffect(() => {
    fetchDataCV();
  }, []);

  useEffect(() => {
    if (listCV.length > 0) {
      setCV(listCV[0]);
      console.log("Name CV2: " + listCV[0].IDUser);
    }
  }, [listCV]);
  const handleDelete = async (id) => {
    console.log(id);

    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa CV này không?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const reference = doc(db, "CV", id);
              await deleteDoc(reference);
              ToastAndroid.show(
                "Xóa CV thành công !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
              fetchDataCV();
            } catch (error) {
              alert("Error deleting CV:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <>
      {listCV.length > 0 ? (
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Quản lý CV</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
            >
              <Text style={{ fontSize: 17 }}>Bạn đã tạo </Text>
              <Text
                style={{ fontSize: 17, color: "#0255f0", fontWeight: "bold" }}
              >
                {listCV.length}
              </Text>
              <Text style={{ fontSize: 17 }}> CV</Text>
              <View
                style={{
                  backgroundColor: "#015aff",
                  padding: 10,
                  margin: 5,
                  borderRadius: 16,
                  marginLeft: 100,
                  alignSelf: "flex-start",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.push("add-cv")}
                >
                  <Ionicons name="add-circle" size={24} color="white" />
                  <Text
                    style={{ fontSize: 15, color: "#fcffff", marginLeft: 5 }}
                  >
                    Tạo CV mới
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={listCV}
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={{ uri: item.Avatar }}
                        style={{
                          width: 60,
                          height: 60,
                          marginRight: 15,
                          borderRadius: 100,
                          borderWidth: 2,
                          borderColor: "blue",
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#015aff",
                          }}
                        >
                          {item?.Name}
                        </Text>
                        <Text
                          style={{
                            color: "#3b3b3b",
                            fontSize: 15,
                            marginTop: 5,
                            fontWeight: "bold",
                          }}
                        >
                          {item?.DateBirth}
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#d6e4ff",
                            borderRadius: 5,
                            alignSelf: "flex-start",
                            padding: 4,
                            marginTop: 3,
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
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Ionicons name="trash-sharp" size={27} color="red" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.ID}
            />
          </View>
        </View>
      ) : (
        <NotFoundCVStackNav />
      )}
    </>
  );
}
