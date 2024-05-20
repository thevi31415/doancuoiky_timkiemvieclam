import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "./Account";
import CompaniesFollowed from "../Company/CompanyFollowed";
import JobSaved from "../Job/JobSaved";
import CompanyFollowedStackNav from "../Company/CompanyFollowedStackNav";
import EditName from "./EditName";

export default function AccountScreenStackNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="company-detail"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => <CompaniesDetail {...props} checkNav={true} />}
      </Stack.Screen>
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
        {(props) => <JobDetail {...props} checkNav={true} />}
      </Stack.Screen> */}

      <Stack.Screen
        name="company-followed"
        component={CompanyFollowedStackNav}
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-name"
        component={EditName}
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="job-saved"
        component={JobSaved}
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
