import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Sliders";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Slider />
    </View>
  );
}
