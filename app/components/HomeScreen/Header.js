import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();

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
              marginTop: 10,
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

          <TouchableOpacity
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
          >
            <Ionicons name="search" size={24} color="#2c67f2" />
            <TextInput
              placeholder="Search job, company, etc.."
              placeholderTextColor={"#171716"}
              style={{
                marginLeft: 8,
                flex: 1,
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
