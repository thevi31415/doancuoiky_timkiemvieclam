import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account() {
  const [userAccount, setUserAccount] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userAccount");
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setUserAccount(parsedValue);
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Account Details</Text>
      {userAccount && (
        <View>
          <Text>Name: {userAccount.name}</Text>
          <Text>Email: {userAccount.email}</Text>
          {/* Display other properties of userAccount */}
        </View>
      )}
    </View>
  );
}
