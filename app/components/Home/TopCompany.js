import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CompaniesItem from "./CompanyItem";
import { Card } from "react-native-shadow-cards";
import { useNavigation } from "@react-navigation/native";

export default function TopCompany({ topCompanyList }) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 0.82, padding: 16, justifyContent: "center" }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
      >
        <Text
          style={{
            marginVertical: 0,
            fontSize: 18,
            fontWeight: "600",
            color: "black",
            flex: 1,
          }}
        >
          Nhà tuyển dụng hàng đầu
        </Text>
        <TouchableOpacity onPress={() => navigation.push("all-company")}>
          <Text style={{ marginLeft: "auto", color: "#2c67f2" }}>
            View More
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 200,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={topCompanyList}
            numColumns={10}
            style={{ margin: 5 }}
            renderItem={({ item, index }) => <CompaniesItem item={item} />}
          />
        </ScrollView>
      </View>
    </View>
  );
}
