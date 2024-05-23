import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotFoundCV from "./NotFoundCV";
import AddCV from "./AddCV";
import ManagementCV from "./ManagementCV";
import CVDetail from "./CVDetail";
const Stack = createStackNavigator();

export default function ManagementCVStackNav({ listCV }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="management-cv"
        component={ManagementCV}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-cv"
        component={AddCV}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail-cv"
        component={CVDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
