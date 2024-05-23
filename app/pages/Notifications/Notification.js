// import { View, Text } from "react-native";
// import React from "react";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
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
import BottomSheet from "../BottomSheet";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export default function Notification() {
  const navigation = useNavigation();

  const db = getFirestore(app);
  const { user } = useUser();

  const [status, setStatus] = React.useState(false);
  const [listNotifications, setListNotifications] = useState([]);
  const fetchDataListNotifications = async () => {
    console.log("Lay thong báo");
    console.log("IDuser: " + user?.id);

    try {
      const q = query(
        collection(db, "Notification"),
        where("IDUser", "==", user?.id)
      );
      const notificationSnapshot = await getDocs(q);
      const notification = notificationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sắp xếp danh sách theo SentDate
      notification.sort((a, b) => {
        const dateA = parseDate(a.SentDate);
        const dateB = parseDate(b.SentDate);
        return dateB - dateA; // Sắp xếp giảm dần
      });

      console.log("List thong bao");
      console.log(notification);
      setListNotifications(notification);
    } catch (error) {
      console.error("Error fetching data notification:", error);
    }
    console.log(listNotifications.length);
  };
  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchDataListNotifications();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      fetchDataListNotifications();
      return () => {
        // Cleanup if necessary
      };
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Thông báo</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          flex: 1,
        }}
      >
        {listNotifications.length <= 0 ? (
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/not_found_notification.jpg")}
              style={{ width: 340, height: 340 }}
            />
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Bạn chưa có thông báo nào !
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listNotifications}
            renderItem={({ item }) => (
              <View>
                {item?.Viewed === 0 ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      backgroundColor: "#e9f3ff",
                    }}
                    onPress={() =>
                      navigation.push("detail-notification", {
                        notification: item,
                      })
                    }
                  >
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        backgroundColor: "#0559f7",
                        marginRight: 10,
                      }}
                    />
                    <View style={{ marginRight: 10 }}>
                      <Image
                        source={{ uri: item?.Logo }}
                        style={{ width: 55, height: 55, borderRadius: 100 }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 5,
                        }}
                      >
                        {item?.Title}
                      </Text>
                      <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        {item?.Content}
                      </Text>
                      <Text style={{ fontSize: 14, color: "#888" }}>
                        {item?.SentDate}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      backgroundColor: "#ffffff",
                    }}
                    onPress={() =>
                      navigation.push("detail-notification", {
                        notification: item,
                      })
                    }
                  >
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        backgroundColor: "white",
                        marginRight: 10,
                      }}
                    />
                    <View style={{ marginRight: 10 }}>
                      <Image
                        source={{ uri: item?.Logo }}
                        style={{ width: 55, height: 55, borderRadius: 100 }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 5,
                        }}
                      >
                        {item?.Title}
                      </Text>
                      <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        {item?.Content}
                      </Text>
                      <Text style={{ fontSize: 14, color: "#888" }}>
                        {item?.SentDate}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        )}
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
