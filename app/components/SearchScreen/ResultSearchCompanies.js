import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ResultSearchCompanies({ itemList }) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffff",
          marginVertical: 10,
        }}
      >
        {/* <Text
          className="m-3 mt-5"
          style={{ color: "#2c67f2", fontWeight: "bold", fontSize: 15 }}
        >
          Kết quả tìm kiếm "{searchText}"
        </Text> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={itemList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push("company-detail", {
                  company: item,
                })
              }
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#F5F6F6",
              }}
            >
              {/* <CompaniesItem item={item} /> */}
              <View
                style={{
                  marginVertical: 16,
                  marginHorizontal: 25,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item?.Logo }}
                  style={{
                    height: 50,
                    width: 50,
                    marginRight: 16,
                    borderRadius: 10,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 19,
                      color: "#2c67f2",
                      fontWeight: "bold",
                      width: 230,
                    }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item?.Name}
                  </Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "lightgray",
                        fontWeight: "bold",
                        marginTop: 3,
                      }}
                    >
                      {item?.Name}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "gray",
                      marginTop: 3,
                    }}
                  >
                    {item?.Location}
                  </Text>
                  {item.hasSchoolAlumni ? (
                    <View style={Styles.flexCenter}>
                      <Image
                        source={Images.LOGOS.UNIVERSITY}
                        style={{
                          height: 25,
                          width: 25,
                          marginVertical: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 13,
                          color: "gray",
                          marginLeft: 10,
                        }}
                      >
                        {item.alumniCount} School Alumni
                      </Text>
                    </View>
                  ) : null}

                  <Text style={{ fontSize: 13, color: "gray" }}>
                    {item.daysAgo}
                    {item.daysAgo > 1 ? " days " : " day "}
                    Ago
                  </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons name="bookmark-outline" size={28} color={"gray"} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.ID}
        />
      </View>
    </View>
  );
}
