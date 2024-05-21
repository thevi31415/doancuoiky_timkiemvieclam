import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useRoute } from "@react-navigation/native";

import JobDetail from "../Job/JobDetail";
import ApplyJob from "./ApplyJob";

export default function JobDetailStackNav({ checkNav }) {
  const Stack = createStackNavigator();
  const [job, setJob] = useState(null);
  const { params } = useRoute();

  useEffect(() => {
    params && setJob(params.job);
    console.log("DetailJob: " + checkNav);
    console.log(params.job);
  }, [params]);
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="job-detail"
        component={JobDetail}
        options={{
          headerShown: false,
        }}
      /> */}
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
        {(props) => (
          <JobDetail {...props} checkNav={checkNav} jobs={params.job} />
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
      <Stack.Screen
        name="apply-job"
        options={{
          headerStyle: {
            backgroundColor: "#2c67f2",
          },
          headerTintColor: "#fff",
          headerTitle: "Search",
          headerShown: false,
        }}
      >
        {(props) => <ApplyJob {...props} checkNav={checkNav} />}
      </Stack.Screen>
      {/* <Stack.Screen
        name="apply-job"
        component={ApplyJob}
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
