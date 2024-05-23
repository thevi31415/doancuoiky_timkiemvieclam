import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Notification from "./pages/Notifications/Notification";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Companies from "./pages/Company/Companies";
import Account from "./pages/Account/Account";
import HomeScreenStackNav from "./pages/Home/HomeScreenStackNav";
import CV from "./pages/CV/CV";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JobAndCompany from "./pages/JobAndCompany";
import AccountScreenStackNav from "./pages/Account/AccountScreenStackNav";
import { Badge } from "react-native-elements";
import ManageJob from "./pages/ManageJob/ManageJob";
import ManageCompany from "./pages/ManageCompany/ManageCompany";
import ManageJobStackNav from "./pages/ManageJob/ManageJobStackNav";
import ManagementCVStackNav from "./pages/CV/ManagementCVStackNav";
import NotificationStackNav from "./pages/Notifications/NotificationStackNav";

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
          IDCa: generateRandomId(7),
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
  const generateRandomId = (length) => {
    const characters = "0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return randomId;
  };
  const renderCustomBadge = () => (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 1,
        backgroundColor: "blue",
        position: "absolute",
        top: -5,
        right: -5,
      }}
    />
  );
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#015aff",
          tabBarInactiveTintColor: "#d2d7dd",
          tabBarStyle: { height: 55 }, // Tăng độ cao lên 60
          tabBarLabelStyle: { marginBottom: 0 }, //
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
            // Add custom badge for "Trang chủ"
          }}
        />

        {role === "Admin" ? (
          <Tab.Screen
            name="Tuyển dụng"
            component={ManageJobStackNav}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="people" size={size} color={color} />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="Hồ sơ"
            component={ManagementCVStackNav}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="clipboard" size={size} color={color} />
              ),
            }}
          />
        )}
        {role === "Admin" ? (
          <Tab.Screen
            name="Công ty"
            component={ManageCompany}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="business" size={size} color={color} />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="Thông Báo"
            component={NotificationStackNav}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View style={{ position: "relative" }}>
                  <Ionicons name="notifications" size={size} color={color} />
                  {/* Thêm badge ở đây */}
                  <Badge
                    status="error"
                    containerStyle={{
                      position: "absolute",
                      top: -0,
                      right: -0,
                    }}
                  />
                </View>
              ),
            }}
          />
        )}

        <Tab.Screen
          name="Tài Khoản"
          component={AccountScreenStackNav}
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
