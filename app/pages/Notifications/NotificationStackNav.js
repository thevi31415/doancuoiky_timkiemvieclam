import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "./Notification";
import JobDetail from "../Job/JobDetail";
import DetailNotification from "./DetailNotification";

export default function NotificationStackNav() {
  const Stack = createStackNavigator();
  const { params } = useRoute();

  // useEffect(() => {
  //   console.log(params.job);
  // }, [params]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail-notification"
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
          <DetailNotification
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
