import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
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
const Tab = createBottomTabNavigator();
export default function MainComponent() {
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
        <Tab.Screen
          name="Hồ sơ"
          component={CV}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="clipboard" size={size} color={color} />
            ),
          }}
        />
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
