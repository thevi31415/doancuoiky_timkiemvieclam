import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ManageCompany from "../ManageCompany/ManageCompany";
import ManageJobDetail from "./ManageJobDetail";
import ManageJob from "./ManageJob";

export default function ManageJobStackNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="manage-job"
        component={ManageJob}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="manege-job-detail"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => <ManageJobDetail {...props} checkNav={true} />}
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
      </Stack.Screen> */}
    </Stack.Navigator>
  );
}
