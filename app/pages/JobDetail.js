import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-shadow-cards";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function JobDetail({ checkNav }) {
  const navigation = useNavigation();

  const { params } = useRoute();
  const [job, setJob] = useState([]);
  useEffect(() => {
    console.log(params);
    params && setJob(params.job);
  }, [params]);
  const { width, height } = Dimensions.get("window");
  console.log("Check Nav" + checkNav);
  return (
    <>
      {checkNav && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            padding: 13,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: 20 }} // Icon ở bên trái
          >
            <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Detail Job</Text>
        </View>
      )}

      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
          }}
        >
          <Card
            style={{
              borderRadius: 20,
              width: "full",
            }}
          >
            <View>
              <Image
                source={{ uri: job.Background }}
                className="h-[200px] w-full"
                style={{
                  width: 420,
                  resizeMode: "cover",
                }}
              />
              <View style={{ padding: 10, elevation: 5 }}>
                <Image
                  source={{ uri: job.Logo }}
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
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 30,
                  color: "#2c67f2",
                }}
              >
                {job?.NameJob}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "300",
                  fontWeight: "600",

                  fontSize: 20,
                }}
              >
                {job?.NameCompany}
              </Text>

              <View
                style={{ margin: 10, padding: 5, marginBottom: 20 }}
                className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
              >
                <Text> {job?.TypeJob} </Text>
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
                  xxx
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
                  xxx
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
                  xxx
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
                  xxxx
                </Text>
              </View>
            </View>
            <View style={{ margin: 15 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#2c67f2" }}
              >
                xxx
              </Text>
              <Text
                style={{
                  color: "#333333",
                  fontSize: 15,
                  marginTop: 15,
                }}
              >
                xxx
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.likeBtn}>
          <FontAwesome
            resizeMode="contain"
            name="bookmark-o"
            size={24}
            color="#2c67f2"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>Apply for job</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderColor: "#2c67f2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  applyBtn: {
    flex: 1,
    backgroundColor: "#2c67f2",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    borderRadius: 16,
  },
  applyBtnText: {
    fontSize: 16,
    color: "#F3F4F8",
  },
});
