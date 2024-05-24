import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home";
import Search from "../Search/Search";
import CompaniesDetail from "../Company/CompanyDetail";
import JobDetail from "../Job/JobDetail";
import JobDetailStackNav from "../Job/JobDetailStackNav";
import AllJobStackNav from "../Job/AllJobStackNav";
import AllCompany from "../Company/AllCompany";

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
        name="job-detail-stack"
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

      <Stack.Screen
        name="all-job"
        component={AllJobStackNav}
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
        name="all-company"
        component={AllCompany}
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
