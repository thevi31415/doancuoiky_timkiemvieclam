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

export default function TopCompany({ topCompanyList }) {
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
          Top công ty hàng đầu
        </Text>
        <Text style={{ marginLeft: "auto", color: "#2c67f2" }}>View More</Text>
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
