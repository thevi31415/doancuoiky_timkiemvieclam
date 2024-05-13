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
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("userAccount", jsonValue);
  } catch (e) {}
};
removeValue = async () => {
  try {
    await AsyncStorage.removeItem("userAccount");
  } catch (e) {
    // remove error
  }
};
export default function Header({ linkAvatar, nameUser }) {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const { user } = useUser();
  const [userAccount, setUserAccount] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const userSnapshot = await getDocs(collection(db, "User"));
  //     const users = userSnapshot.docs.map((doc) => doc.data());
  //     const targetUser = users.find((users) => users.ID == user?.id);
  //     if (targetUser) {
  //       console.log(targetUser);
  //       console.log("Tìm thấy nhân user header");
  //       setUserAccount(targetUser);
  //       // removeValue();
  //       // storeData(targetUser);
  //     } else {
  //       const userNew = {
  //         ID: user?.id,
  //         SDT: "0949Y845xxx",
  //         imageUrl: user?.imageUrl,
  //         role: "User",
  //         name: user?.fullName,
  //         email: user?.primaryEmailAddress?.toString(),
  //       };
  //       console.log("User name header3" + user.primaryEmailAddress);

  //       const docRef = await addDoc(collection(db, "User"), userNew);
  //       if (docRef.id) {
  //         console.log("Document Added");
  //         // removeValue();

  //         // storeData(userNew);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi lấy dữ liệu từ Firebase:", error);
  //   }
  //   console.log(
  //     "User: Name: " + userAccount.name + "Email: " + userAccount.email
  //   );
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchData();
  //   }, [])
  // );
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
                <Text className="text-[16px] color-white">Xin chào !</Text>
                <Text className="text-[16px] font-bold color-white">
                  {user?.fullName}
                </Text>
              </View>
            </View>

            <Ionicons name="notifications-outline" size={24} color="#FFF" />
          </View>

          <View
            style={{
              backgroundColor: "#FFF",
              padding: 12,
              borderRadius: 16,
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
              placeholderTextColor={"#171716"}
              onFocus={() => navigation.push("search-detail", {})}
              style={{
                marginLeft: 8,
                flex: 1,
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
