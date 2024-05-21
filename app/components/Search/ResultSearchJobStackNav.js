import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ResultSearchCompanies from "./ResultSearchCompanies";
import CompaniesDetail from "../../pages/Company/CompanyDetail";
import ResultSearchJob from "./ResultSearchJob";
import JobDetail from "../../pages/Job/JobDetail";
import JobDetailStackNav from "../../pages/Job/JobDetailStackNav";

export default function ResultSearchJobStackNav({ itemList, filterLocation }) {
  const Stack = createStackNavigator();
  useEffect(() => {
    console.log("Stact", itemList);
    console.log("Searchxx: ", filterLocation);
  }, [itemList]);
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name="home">
        {(props) => (
          <ResultSearchJob
            {...props}
            itemList={itemList}
            filterLocation={filterLocation}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="job-detail-stack"
        component={JobDetailStackNav}
        options={{
          animationEnabled: true,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
      />
    </Stack.Navigator>
  );
}
