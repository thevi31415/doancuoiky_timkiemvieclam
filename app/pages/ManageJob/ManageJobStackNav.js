import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ManageCompany from "../ManageCompany/ManageCompany";
import ManageJobDetail from "./ManageJobDetail";
import ManageJob from "./ManageJob";
import ManageJobDetailStackNav from "./ManageJobDetailStackNav";
import AddJob from "./AddJob";

export default function ManageJobStackNav() {
  const Stack = createStackNavigator();
  const { params } = useRoute();

  // useEffect(() => {
  //   console.log(params.job);
  // }, [params]);
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
        {(props) => (
          <ManageJobDetailStackNav
            {...props}
            checkNav={true}
            // job={params.job}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="add-job"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => (
          <AddJob
            {...props}
            checkNav={true}
            // job={params.job}
          />
        )}
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
