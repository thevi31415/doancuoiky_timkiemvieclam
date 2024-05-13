// import { View, Text } from "react-native";
// import React from "react";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "./BottomSheet";
export default function Notification() {
  const [status, setStatus] = React.useState(false);
  const [listNotifications, setListNotifications] = useState([]);
  const CTA = ({ title }) => (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        borderRadius: 50,
        borderColor: "blue",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        alignSelf: "flex-start",
        width: "auto",
      }}
    >
      <Text style={{ fontSize: 16, color: "blue" }}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
      }}
    >
      {/* <FlatList showsVerticalScrollIndicator={false} data={listNotifications} /> */}
      <View
        style={[
          styles.flexCenter,
          {
            justifyContent: "space-evenly",
            marginVertical: 10,
            margin: 20,
          },
        ]}
      >
        <Image
          source={require("../pages/assets/Logo_HCMUTE.jpg")}
          style={{ height: 50, width: 50, marginRight: 20 }}
        />
        <View>
          <Text
            style={{
              width: 240,
              fontSize: 16,
              color: "black",
              paddingRight: 5,
            }}
          >
            Bhạdkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggf
          </Text>

          <CTA title="View Job" />
        </View>
        <View>
          <Text style={{ fontSize: 13, marginBottom: 5 }}>
            JHFDJGHFJGHFHJGHGH
          </Text>
          {/* <TouchableOpacity onPress={() => {}}>
            <Ic
              name="ellipsis-vertical"
              size={22}
              color={"black"}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    paddingBottom: 0,
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});
