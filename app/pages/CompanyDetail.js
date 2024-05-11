import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Button,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-shadow-cards";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../firebaseConfig";
import { getFirestore } from "firebase/firestore";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
export default function CompaniesDetail({ checkNav }) {
  const db = getFirestore(app);
  const { user } = useUser();

  const navigation = useNavigation();
  const [checkFollowed, setCheckFollowed] = useState(false);
  const { params } = useRoute();
  const [company, setCompany] = useState([]);
  const [IDFollow, setIDFollow] = useState(null);

  useEffect(() => {
    console.log(params);
    params && setCompany(params.company);
  }, [params]);
  useEffect(() => {
    fetchDataFollow();
  }, [company, checkFollowed]);
  const fetchDataFollow = async () => {
    try {
      const followCompanySnapshot = await getDocs(
        collection(db, "FollowCompany")
      );
      const follow = followCompanySnapshot.docs.filter((doc) => {
        const data = doc.data();
        return data.IDCompany == company?.ID && data.IDUser == user?.id;
      });
      const IDFollowArray = follow.map((doc) => doc.id);
      if (IDFollowArray.length > 0) {
        console.log("ID Floww", IDFollowArray[0]);
        setIDFollow(IDFollowArray[0]); // In ra phần tử ID đầu tiên

        setCheckFollowed(true);
      } else {
        setCheckFollowed(false);
      }
    } catch (error) {
      console.error("Error fetching data follwing:", error);
    }
  };
  const followCompany = async () => {
    console.log("Follw" + checkFollowed);
    if (checkFollowed == true) {
      try {
        const reference = doc(db, "FollowCompany", IDFollow);
        await deleteDoc(reference);
        console.log("Bookmark deleted successfully.");
        setCheckFollowed(false);

        ToastAndroid.show(
          "Bỏ theo dõi thành công !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } catch (error) {
        alert("Error deleting bookmark:", error);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "FollowCompany"), {
          ID: generateRandomId(8),
          IDCompany: company?.ID,
          IDUser: user?.id,
        });
        setCheckFollowed(true);
        console.log("Book Mark");
        ToastAndroid.show(
          "Theo dõi công ty thành công !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } catch (error) {
        console.error("Error while saving data:", error); // In ra console lỗi nếu có
      }
    }
  };
  const generateRandomId = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return randomId;
  };
  return (
    <>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          padding: 15,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20 }} // Icon ở bên trái
        >
          <Ionicons name="arrow-back-outline" size={32} color="#2c67f2" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Detail Company</Text>
      </View> */}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Detail Company
          </Text>
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
              <TouchableOpacity
                onPress={followCompany}
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                  borderColor: "#2c67f2",
                  borderWidth: 1,
                }}
              >
                <AntDesign name="bells" size={24} color="#2c67f2" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#2c67f2",
                    marginLeft: 6,
                  }}
                >
                  {checkFollowed ? "FOLLOWED" : "FOLLOW"}
                </Text>
              </TouchableOpacity>
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
