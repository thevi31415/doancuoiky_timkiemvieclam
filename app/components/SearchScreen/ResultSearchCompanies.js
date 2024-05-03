import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ResultSearchCompanies({ itemList, filterLocation }) {
  const navigation = useNavigation();
  console.log("Search companies: " + filterLocation);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#ffff" }}>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 15,
            marginRight: 15,
            fontSize: 16,
            color: "#333333",
            fontWeight: "bold",
          }}
        >
          Companies
        </Text>

        {itemList.length > 0 ? (
          <Text
            style={{
              marginBottom: 10,
              marginLeft: 15,
              marginRight: 15,
              fontSize: 15,
              color: "#4e4e4e",
            }}
          >
            Tìm thấy {itemList.length} công ty tại {filterLocation}
          </Text>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                marginBottom: 10,
                marginLeft: 15,
                marginRight: 15,
                fontSize: 15,
                color: "#4e4e4e",
              }}
            >
              Hiện tại chúng tôi không tìm thấy kết quả nào phù hợp với yêu cầu
              của bạn. Vui lòng thử lại với các keyword khác.
            </Text>
            <Image
              style={{ width: 250, height: 250 }}
              source={require("../../../assets/not_found.jpg")}
            />
          </View>
        )}

        {itemList.length > 0 && (
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
                    <Ionicons
                      name="bookmark-outline"
                      size={28}
                      color={"gray"}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.ID}
          />
        )}
      </View>
    </View>
  );
}
