import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Card } from "react-native-shadow-cards";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import AntDesign from "@expo/vector-icons/AntDesign";
export default function CV() {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 40,
          padding: 13,
          backgroundColor: "white",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginRight: 130,
            }}
          >
            CV
          </Text>
          <TouchableOpacity>
            <FontAwesome6 name="edit" size={25} color="#2c67f2" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          style={{
            width: "full",
            marginBottom: 10,
          }}
        >
          <View style={{ backgroundColor: "white", marginBottom: 10 }}>
            <Image
              source={require(".././pages/assets/BG_CV.jpg")}
              style={{ width: "100%", height: 100 }}
            />
            <Image
              source={require(".././pages/assets/profile_avatar_2.jpg")}
              style={{
                height: 120,
                width: 120,
                borderRadius: 100,
                borderColor: "white",
                borderWidth: 2,

                bottom: 50,
                left: 15,
              }}
            />

            <View style={{ marginTop: -45, paddingHorizontal: 10 }}>
              <Text
                style={{ fontSize: 25, color: "black", fontWeight: "bold" }}
              >
                Nguyễn Dương Thế Vĩ
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <AntDesign name="calendar" size={20} color="#8f8f8f" />
              <Text
                style={{
                  fontSize: 15,
                  color: "#333333",

                  marginLeft: 8,
                }}
              >
                12/10/2003
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <AntDesign name="user" size={20} color="#8f8f8f" />
              <Text
                style={{
                  fontSize: 15,
                  color: "#333333",

                  marginLeft: 8,
                }}
              >
                Nam
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <AntDesign name="phone" size={20} color="#8f8f8f" />
              <Text
                style={{
                  fontSize: 15,
                  color: "#333333",

                  marginLeft: 8,
                }}
              >
                08937886435
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <AntDesign name="mail" size={20} color="#8f8f8f" />
              <Text
                style={{
                  fontSize: 15,
                  color: "#333333",

                  marginLeft: 8,
                }}
              >
                nguyenduongthevi@gmail.com
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <AntDesign name="enviromento" size={20} color="#8f8f8f" />
              <Text
                style={{
                  fontSize: 15,
                  color: "#333333",

                  marginLeft: 8,
                }}
              >
                Phú Hưng, Phú Tân, An Giang
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              <AntDesign name="earth" size={20} color="#8f8f8f" />
              <Text
                style={{
                  fontSize: 15,
                  color: "#333333",

                  marginLeft: 8,
                }}
              >
                https://nguyenduongtheviblog.vercel.app/
              </Text>
            </View>
          </View>
        </Card>
        <Card style={{ width: "full", marginBottom: 10 }}>
          <View
            style={{ backgroundColor: "white", marginBottom: 10, padding: 10 }}
          >
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 19,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Mục tiêu nghề nghiệp
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  textAlign: "justify",
                  marginRight: 8,
                }}
                numberOfLines={4}
                ellipsizeMode="tail"
              >
                Mong muốn trở thành một lập trình viên. Ngoài ra tôi còn mong
                muốn được làm trong một môi trường hòa đồng, phúc lợi tốt.
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 19,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Kỹ năng
              </Text>
              <View
                style={{
                  flexDirection: "row", // Sắp xếp các banner theo hàng ngang
                  flexWrap: "wrap", // Cho phép tự động xuống dòng nếu không đủ không gian
                  margin: 5,
                  marginBottom: 20,
                }}
              >
                {/* Banner 1 */}
                <View
                  style={{
                    padding: 5,
                    width: "auto", // Sử dụng width: 'auto' để tự động co dãn độ rộng với nội dung
                    alignSelf: "flex-start", // Chỉnh style để co dãn vừa với nội dung text

                    borderRadius: 5,
                    marginRight: 5,
                    marginBottom: 10,
                  }}
                  className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                >
                  <Text>React Native</Text>
                </View>

                {/* Banner 2 */}
                <View
                  style={{
                    padding: 5,
                    width: "auto",
                    alignSelf: "flex-start",

                    borderRadius: 5,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                  className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                >
                  <Text>ASP.NET</Text>
                </View>

                {/* Banner 3 */}
                <View
                  style={{
                    padding: 5,
                    width: "auto",
                    alignSelf: "flex-start",

                    borderRadius: 5,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                  className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                >
                  <Text>NextJS</Text>
                </View>

                {/* Banner 4 */}
                <View
                  style={{
                    padding: 5,
                    width: "auto",
                    alignSelf: "flex-start",

                    borderRadius: 5,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                  className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                >
                  <Text>Latex</Text>
                </View>

                {/* Banner 5 */}
                <View
                  style={{
                    padding: 5,
                    width: "auto",
                    alignSelf: "flex-start",
                    borderRadius: 5,
                    marginBottom: 10,
                  }}
                  className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                >
                  <Text>TailwindCSS</Text>
                </View>
              </View>
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 19,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Sở thích
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  textAlign: "justify",
                  marginRight: 8,
                }}
                numberOfLines={4}
                ellipsizeMode="tail"
              >
                Đi ngủ.
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 19,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Học vấn
              </Text>
              <View style={[styles.flexCenter, { paddingBottom: 10 }]}>
                <Image
                  source={require(".././pages/assets/Logo_HCMUTE.jpg")}
                  style={{ height: 50, width: 50, marginHorizontal: 16 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 19,
                      color: "black",
                      fontWeight: "bold",
                      width: 250,
                    }}
                  >
                    Đại Học Sư Phạm Kỹ Thuật TP HCM
                  </Text>
                  <Text style={{ color: "black" }}>
                    Chuyên Ngành Công Nghệ Thông Tin
                  </Text>
                  <Text>2021 - 2028</Text>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 19,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Chứng chỉ
              </Text>
              <View
                style={[
                  styles.flexCenter,
                  {
                    borderBottomColor: "lightgray",
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                  },
                ]}
              >
                <Image
                  source={require(".././pages/assets/Logo_HCMUTE.jpg")}
                  style={{ height: 50, width: 50, marginRight: 10 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 19,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    TOEIC
                  </Text>
                  <View style={styles.flexCenter}>
                    <Text style={{ fontSize: 16 }}>Issued - 23/2/2024</Text>
                    <Ionicons name="dot-single" size={16} color="gray" />
                    <Text>Expires</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </>
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
