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
export default function TopCompany({ topCompanyList }) {
  return (
    <View style={{ flex: 0.82, padding: 16 }}>
      <Text
        style={{
          marginVertical: 0,
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 16,
          color: "#2c67f2",
        }}
      >
        Top công ty hàng đầu
      </Text>
      <View
        style={{
          height: 200,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={topCompanyList}
            numColumns={10}
            style={{ margin: 10 }}
            renderItem={({ item, index }) => <CompaniesItem item={item} />}
          />
        </ScrollView>
      </View>
    </View>
  );
}
