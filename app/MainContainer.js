import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notification from "./pages/Notification";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Companies from "./pages/Companies";
import Account from "./pages/Account";
import HomeScreenStackNav from "./pages/HomeScreenStackNav";
import CV from "./pages/CV";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JobAndCompany from "./pages/JobAndCompany";
const Tab = createBottomTabNavigator();
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("userAccount", jsonValue);
  } catch (e) {}
};
removeValue = async () => {
  try {
    await AsyncStorage.removeItem("userAccount");
  } catch (e) {}
};
export default function MainComponent() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [userAccount, setUserAccount] = useState([]);
  const [role, setRole] = useState("User");
  const fetchData = async () => {
    try {
      const userSnapshot = await getDocs(collection(db, "User"));
      const users = userSnapshot.docs.map((doc) => doc.data());
      const targetUser = users.find((users) => users.ID == user?.id);
      if (targetUser) {
        console.log(targetUser);
        console.log("Tìm thấy nhân user header");
        setUserAccount(targetUser);
        removeValue();
        setRole(targetUser.role);
        storeData(targetUser);
      } else {
        const userNew = {
          ID: user?.id,
          SDT: "0949Y845xxx",
          imageUrl: user?.imageUrl,
          role: "User",
          name: user?.fullName,
          email: user?.primaryEmailAddress?.toString(),
        };
        console.log("User name header3" + user.primaryEmailAddress);

        const docRef = await addDoc(collection(db, "User"), userNew);
        if (docRef.id) {
          console.log("Document Added");
        }
        removeValue();
        storeData(targetUser);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ Firebase:", error);
    }
    console.log("Nav role: " + role);
  };
  useEffect(() => {
    fetchData();
  }, [role]);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#2c67f2",
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Trang chủ"
          component={HomeScreenStackNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />

        {role === "Admin" ? (
          <Tab.Screen
            name="Quản lý"
            component={JobAndCompany}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="Hồ sơ"
            component={CV}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="clipboard" size={size} color={color} />
              ),
            }}
          />
        )}
        <Tab.Screen
          name="Thông Báo"
          component={Notification}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Tài Khoản"
          component={Account}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
