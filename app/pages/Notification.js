// import { View, Text } from "react-native";
// import React from "react";
import React, { useRef } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import BottomSheet from "./BottomSheet";
export default function Notification() {
  const [status, setStatus] = React.useState(false);

  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
      }}
    >
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={Notifications}
        renderItem={ShowNotifications}
        ListFooterComponent={() => <ShowAllFooter />}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#40A2E3",
  },
});
