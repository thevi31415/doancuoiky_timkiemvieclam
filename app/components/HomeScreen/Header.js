import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
export default function Header() {
  const { user } = useUser();

  return (
    <View
      style={{
        flex: 0.18,
        backgroundColor: "#3F6CDF",
        padding: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 32,
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
          position: "absolute",
          bottom: -25,
          width: 350,
          alignSelf: "center",
        }}
      >
        <Ionicons name="search" size={24} color="#171716" />
        <TextInput
          placeholder="Search job, company, etc.."
          placeholderTextColor={"#171716"}
          style={{
            marginLeft: 8,
            flex: 1,
          }}
        />
      </View>
    </View>
  );
}
