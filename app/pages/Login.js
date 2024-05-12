import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
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
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/bg_login.jpg")}
        style={styles.background}
      >
        <Image
          source={require("./assets/logo_final.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>JobVP</Text>
        <Text style={styles.subtitle}>Find Jobs Anytime, Anywhere!</Text>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            onPress={onPress}
            className="p-4 bg-blue-500  mt-20"
            style={styles.btn}
          >
            <Text className="text-white text-center text-[18px]">
              Login with Google
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>
          &copy; 2024 JobVP. All rights reserved
        </Text>
      </ImageBackground>
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
    width: 150,
    height: 150,
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
    borderRadius: 25,
    overflow: "hidden",
  },
  copyright: {
    marginTop: 150,
  },
});
