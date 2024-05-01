import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home";
import Search from "./Search";
import CompaniesDetail from "./CompanyDetail";

export default function HomeScreenStackNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="company-detail"
        component={CompaniesDetail}
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Detail",
        }}
      />
      <Stack.Screen
        name="search-detail"
        component={Search}
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
