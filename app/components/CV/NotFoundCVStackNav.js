import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotFoundCV from "./NotFoundCV";
import AddCV from "../../pages/AddCV";
const Stack = createStackNavigator();

export default function NotFoundCVStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="not-found_cv"
        component={NotFoundCV}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="add-cv"
        component={AddCV}
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
