import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { Text, View, Image, TouchableOpacity } from "react-native";
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md">
        <Text className="text-[30px] font-bold">Tim kiem viec lam !</Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Vui long dang nhap !
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="p-4 bg-blue-500 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[18px]">
            Login with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
