import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import JobApply from "./JobApply";
import JobDetailStackNav from "./JobDetailStackNav";
export default function JobApplyStackNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="job-apply-2"
        component={JobApply}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="job-detail"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => <JobDetailStackNav {...props} checkNav={true} />}
      </Stack.Screen>
      {/* <Stack.Screen
        name="job-detail"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => <JobDetail {...props} checkNav={true} />}
      </Stack.Screen>

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
      /> */}
    </Stack.Navigator>
  );
}
