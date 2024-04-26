import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Search() {
  return (
    <View>
      <View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF",
              padding: 12,
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
              bottom: -10,
              width: 350,
              alignSelf: "center",
              borderWidth: 1.5,
              borderColor: "#2c67f2",
            }}
            // onPress={()=>navigation.push("search-detail", {})}
          >
            <TouchableOpacity
              onPress={() => navigation.push("search-detail", {})}
            >
              <Ionicons name="search" size={24} color="#2c67f2" />
            </TouchableOpacity>
            <TextInput
              placeholder="Search job, company, etc.."
              placeholderTextColor={"#171716"}
              style={{
                marginLeft: 8,
                flex: 1,
              }}
            />
            <TouchableOpacity>
              <Ionicons name="filter" size={24} color="#2c67f2" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Tabs items={tabs} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24 / 1.5,
  },
  inner: {
    flexDirection: "row",
  },
  search: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  field: {
    backgroundColor: "#fff",
    paddingLeft: 40 + 8,
    paddingRight: 18,
    paddingVertical: 18,
    borderRadius: 16,
    height: 54,
    flex: 1,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  filter: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
