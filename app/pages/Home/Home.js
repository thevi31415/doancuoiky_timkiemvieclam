import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Sliders";
import TopCompany from "../../components/Home/TopCompany";
import LastJob from "../../components/Home/LastJob";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import TypeJob from "../../components/Home/TypeJob";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HintSearch from "../../components/Home/HintSearch";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function Home() {
  const db = getFirestore(app);

  const [topCompanyList, setTopCompanyList] = useState([]);
  const [lastJobList, setLastJobList] = useState([]);

  const fetchData = async () => {
    const companySnapshot = await getDocs(collection(db, "Company"));
    const companies = companySnapshot.docs.map((doc) => doc.data());
    setTopCompanyList(companies);

    const lastJobSnapshot = await getDocs(collection(db, "Jobs"));
    const job = lastJobSnapshot.docs.map((doc) => doc.data());
    setLastJobList(job);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f4f9" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "white", marginBottom: 15 }}>
          <Header />
          <HintSearch />
          <View
            style={{
              backgroundColor: "#f2f6ff",
              margin: 10,
              padding: 13,
              borderRadius: 10,
              paddingHorizontal: 28,

              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              {/* <FontAwesome
                name="building"
                size={30}
                color="#015aff"
                style={{ marginBottom: 10 }}
              /> */}
              <AntDesign
                name="clockcircle"
                size={30}
                color="#015aff"
                style={{ marginBottom: 10 }}
              />
              <Text style={{ color: "#48494d", fontWeight: "600" }}>
                100 Fulltime
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              {/* <FontAwesome
                name="search"
                size={30}
               
                style={{ marginBottom: 10 }}
              /> */}
              <FontAwesome6
                name="clock-rotate-left"
                size={30}
                color="#015aff"
                style={{ marginBottom: 10 }}
              />
              <Text style={{ color: "#48494d", fontWeight: "600" }}>
                30 Freelance
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="clock-alert"
                size={33}
                color="#015aff"
                style={{ marginBottom: 10 }}
              />
              <Text style={{ color: "#48494d", fontWeight: "600" }}>
                320 Part-time
              </Text>
            </View>
          </View>

          <Slider />
        </View>

        <View style={{ backgroundColor: "white", marginBottom: 15 }}>
          <TopCompany topCompanyList={topCompanyList} />
        </View>
        <View style={{ backgroundColor: "white" }}>
          <LastJob lastJobsList={lastJobList} />
        </View>
      </ScrollView>
    </View>
  );
}
