import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import LoadingOverlay from "../../components/LoadingOverlay";
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  useWarmUpBrowser();
  const { loading, setLoading } = useState(false);
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    // setLoading(true);
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
    // setLoading(false);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/bg_login.jpg")}
        style={styles.background}
      >
        <Image
          source={require("../assets/logo_final.png")}
          style={styles.logo}
        />

        <Text style={{ marginTop: 15, fontSize: 20, color: "#222f3e" }}>
          Chào mừng bạn đến với JobVP !
        </Text>
        <Text style={{ marginTop: 10 }}>Find Jobs Anytime, Anywhere!</Text>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              padding: 12,
              backgroundColor: "#015aff", // bg-blue-500
              marginTop: 60, // mt-20
              paddingHorizontal: 30,
              borderRadius: 10,
              alignItems: "center", // center the content
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign name="google" size={24} color="#f1f2f4" />
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  textAlign: "center",
                  marginLeft: 10, // margin between icon and text
                }}
              >
                CONTINUE WITH GOOGLE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>
          &copy; 2024 JobVP. All rights reserved
        </Text>
      </ImageBackground>
      {/* <LoadingOverlay loading={loading} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 30,
  },
  title: {
    marginTop: 20,
    fontSize: 50,
    color: "#018be4",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 17,
  },
  btn: {
    width: 250,
    borderRadius: 16,
    overflow: "hidden",
  },
  copyright: {
    marginTop: 150,
  },
});
