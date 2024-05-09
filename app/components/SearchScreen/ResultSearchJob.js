import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import JobItem from "../HomeScreen/JobItem";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ResultSearchJob({ itemList }) {
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
          Jobs
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
            Tìm thấy {itemList.length} công việc tại
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
                      {item?.NameJob}
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
                        {item?.NameCompany}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 7,
                      }}
                    >
                      <AntDesign name="staro" size={20} color="#8f8f8f" />

                      <Text
                        style={{
                          color: "gray",
                          fontSize: 13,
                          marginLeft: 4,
                        }}
                      >
                        {item?.Experience} Kinh nghiệm
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",

                        marginTop: 4,
                      }}
                    >
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color="#8f8f8f"
                      />

                      <Text
                        numberOfLines={4}
                        style={{
                          color: "gray",
                          fontSize: 13,
                          marginLeft: 4,
                        }}
                      >
                        {item?.LocationJob}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                        marginLeft: 3,
                      }}
                    >
                      <AntDesign
                        name="clockcircleo"
                        size={16}
                        color="#8f8f8f"
                      />
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 13,
                          marginLeft: 4,
                        }}
                      >
                        {item?.DateCreated}
                      </Text>
                    </View>
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
