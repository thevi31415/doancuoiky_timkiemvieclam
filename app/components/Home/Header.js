import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import {
  setDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({ linkAvatar, nameUser }) {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const { user } = useUser();
  const [userAccount, setUserAccount] = useState([]);
  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userAccount");
      if (jsonValue !== null) {
        setUserAccount(JSON.parse(jsonValue));
      }
      console.log("Role header");
    } catch (e) {
      console.error("Error fetching user account data: ", e);
    }
    try {
      console.log(user.id);
      const q = query(collection(db, "User"), where("ID", "==", user.id));

      const userSnapshot = await getDocs(q);
      const userAccount = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserAccount(userAccount);
      console.log(userAccount[0].name);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <View>
      <ImageBackground
        source={require("../../pages/assets/BG_header.jpg")}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 0.18,
            // backgroundColor: "#2c67f2",

            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <View className="flex flex-row items-center gap-2">
              <Image
                source={{ uri: user?.imageUrl }}
                className="rounded-full w-12 h-12"
              />
              <View>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Xin chào {""}
                  {userAccount[0]?.role === "Admin"
                    ? "nhà tuyển dụng"
                    : "ứng viên"}
                  {""} ! 👋
                </Text>
                <Text className="text-[16px] font-bold color-white">
                  {userAccount[0]?.name}
                </Text>
              </View>
            </View>

            <Ionicons name="notifications-outline" size={24} color="#FFF" />
          </View>

          <View
            style={{
              backgroundColor: "#FFF",
              padding: 12,
              borderRadius: 13,
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
              bottom: -40,
              width: 350,
              alignSelf: "center",
              borderWidth: 1.5,
              borderColor: "#2c67f2",
            }}
            // onPress={()=>navigation.push("search-detail", {})}
          >
            <TouchableOpacity
              onPress={() => navigation.push("search-detail", {})}
            >
              <Ionicons name="search" size={24} color="#2c67f2" />
            </TouchableOpacity>
            <TextInput
              placeholder="Search job, company, etc.."
              placeholderTextColor={"#8b8b8b"}
              onFocus={() => navigation.push("search-detail", {})}
              style={{
                marginLeft: 8,
                flex: 1,
                fontSize: 16,
              }}
            />
            <TouchableOpacity>
              <Ionicons name="filter" size={24} color="#2c67f2" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
