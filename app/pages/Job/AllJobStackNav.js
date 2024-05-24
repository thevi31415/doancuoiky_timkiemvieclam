import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllJob from "./AllJob";
import JobDetailStackNav from "./JobDetailStackNav";

export default function AllJobStackNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="all-job"
        component={AllJob}
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
