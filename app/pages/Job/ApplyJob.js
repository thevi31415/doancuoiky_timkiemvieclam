import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

export default function ApplyJob({ company, user }) {
  const { params } = useRoute();
  const [job, setJob] = useState([]);

  useEffect(() => {
    params && setJob(params.job);
    // console.log("Apple" + checkNav);
    console.log(params.job);
  }, [params]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Apply Job</Text>
    </View>
  );
}
