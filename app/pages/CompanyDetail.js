import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
export default function CompaniesDetail() {
  const { params } = useRoute();
  const [company, setCompany] = useState([]);
  useEffect(() => {
    console.log(params);
    params && setCompany(params.company);
  }, [params]);
  return (
    <>
      <ScrollView>
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
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
            <Image
              source={{ uri: company.Logo }}
              className="h-[120px] w-[120px]"
              style={{
                position: "absolute",
                borderRadius: 20,
                alignSelf: "center",
                bottom: -35,
              }}
            />
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
                fontWeight: "300",
                fontSize: 16,
              }}
            >
              {company?.Location}
            </Text>
            <Text
              style={{
                fontStyle: "italic", // để in nghiêng chữ
                textAlign: "center", // để căn giữa
                fontWeight: "300",
                fontSize: 16,
              }}
            >
              "{company?.Slogan}"
            </Text>
          </View>

          <View style={{ padding: 16 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              Về chúng tôi
            </Text>
            <Text
              style={{
                alignItems: "center",
              }}
            >
              {company?.Introduction}
            </Text>
          </View>

          <View style={{ padding: 16 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              Qualifications
            </Text>
            <Text>{`Experience growing and developing a team. \n\nExperience with automation and Security Analysis. \n\nExperience in technical program management.`}</Text>
          </View>

          <View style={{ padding: 16 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              Skills Needed
            </Text>
            <Text>Design Thinking • Problem Solving</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
