import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Notification from "./pages/Notification";
import Account from "./pages/Account";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Companies"
            component={Companies}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="business" size={size} color={color} />
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Notification"
            component={Notification}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="notifications" size={size} color={color} />
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="  Account"
            component={Account}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
