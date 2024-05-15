import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { LogBox } from "react-native";
import MainComponent from "./app/MainContainer";
import Login from "./app/pages/Login/Login";

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_cHJlcGFyZWQtaHVza3ktMi5jbGVyay5hY2NvdW50cy5kZXYk">
      <View className="flex-1  bg-white">
        <StatusBar style="auto" />
        <SignedIn>
          <MainComponent />
        </SignedIn>
        <SignedOut>
          {/* <Text>DX</Text> */}
          <Login />
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
