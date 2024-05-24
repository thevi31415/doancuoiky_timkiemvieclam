import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ManageCompany from "../ManageCompany/ManageCompany";
import ManageJobDetail from "./ManageJobDetail";
import ManageJob from "./ManageJob";
import ManageJobDetailStackNav from "./ManageJobDetailStackNav";
import AllCVApply from "./AllCvApply";
import DetailCVApply from "./DetailCVApply";
import AcceptCvApply from "./AcceptCvApply";

export default function AcceptCVApplyStackNav({ job }) {
  const Stack = createStackNavigator();
  const { params } = useRoute();

  useEffect(() => {
    console.log("AllCVApply");
    console.log(params.job);
  }, [params]);
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="all-cv"
        component={AllCVApply}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="accept-cv"
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
          <AcceptCvApply {...props} checkNav={true} job={params.job} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="detail-cv-apply"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => <DetailCVApply {...props} job={params.job} />}
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
