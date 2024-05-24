import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ManageCompany from "./ManageCompany";
import CompaniesDetail from "../Company/CompanyDetail";
import AddCompany from "./AddCompany";

export default function ManageCompanyStackNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="manage-company"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => <ManageCompany {...props} />}
      </Stack.Screen>
      <Stack.Screen
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
        name="add-company"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => <AddCompany {...props} />}
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
