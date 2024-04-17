import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainContainer from "./app/MainContainer";
import Login from "./app/pages/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_cHJlcGFyZWQtaHVza3ktMi5jbGVyay5hY2NvdW50cy5kZXYk">
      <View className="flex-1  bg-white">
        <StatusBar style="auto" />
        <SignedIn>
          <MainContainer />
        </SignedIn>
        <SignedOut>
          {/* <Login /> */}
          <MainContainer />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
