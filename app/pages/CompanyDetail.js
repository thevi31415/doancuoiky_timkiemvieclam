import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-shadow-cards";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function CompaniesDetail() {
  const { params } = useRoute();
  const [company, setCompany] = useState([]);
  useEffect(() => {
    console.log(params);
    params && setCompany(params.company);
  }, [params]);
  const { width, height } = Dimensions.get("window");
  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
          }}
        >
          <Card
            style={{
              borderRadius: 10,
              width: "full",
            }}
          >
            <View>
              <Image
                source={{ uri: company.Background }}
                className="h-[200px] w-full"
                style={{
                  width: 420,
                  resizeMode: "cover",
                }}
              />
              <View style={{ padding: 10, elevation: 5 }}>
                <Image
                  source={{ uri: company.Logo }}
                  className="h-[100px] w-[100px] "
                  style={{
                    elevation: 5,
                    position: "absolute",
                    borderRadius: 20,
                    alignSelf: "center",
                    padding: 10,
                    bottom: -35,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 24,
                }}
              >
                {company?.Name}
              </Text>

              <Text
                style={{
                  fontStyle: "italic",
                  textAlign: "center",
                  fontWeight: "300",
                  fontSize: 16,
                }}
              >
                "{company?.Slogan}"
              </Text>
              <View
                style={{ margin: 10, padding: 5, marginBottom: 20 }}
                className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
              >
                <Text> {company?.Field} </Text>
              </View>
            </View>
          </Card>
          <View
            style={{
              width: "full",
              marginTop: 15,
              borderTopWidth: 1,
              borderTopColor: "#e1e1e2",
            }}
          >
            <View style={{ margin: 15 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#2c67f2" }}
              >
                Thông tin
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <AntDesign name="earth" size={24} color="#8f8f8f" />

                <Text
                  style={{
                    color: "#3996f5",
                    fontSize: 15,
                    fontWeight: "bold",
                    marginLeft: 8,
                  }}
                  onPress={() => Linking.openURL(company?.Website)}
                >
                  {company?.Website}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <AntDesign name="team" size={24} color="#8f8f8f" />
                <Text
                  style={{
                    color: "#333333",
                    fontSize: 15,

                    marginLeft: 8,
                  }}
                >
                  {company?.Employee}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <AntDesign name="enviromento" size={24} color="#8f8f8f" />
                <Text
                  style={{
                    color: "#333333",
                    fontSize: 15,

                    marginLeft: 8,
                  }}
                >
                  {company?.Location}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <AntDesign name="mail" size={24} color="#8f8f8f" />
                <Text
                  style={{
                    color: "#333333",
                    fontSize: 15,

                    marginLeft: 8,
                  }}
                >
                  {company?.Email}
                </Text>
              </View>
            </View>
            <View style={{ margin: 15 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#2c67f2" }}
              >
                Giới thiệu
              </Text>
              <Text
                style={{
                  color: "#333333",
                  fontSize: 15,
                  marginTop: 15,
                }}
              >
                {company?.Introduction}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
