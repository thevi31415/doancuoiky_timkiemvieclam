import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Sliders";
import TopCompany from "../components/HomeScreen/TopCompany";
import LastJob from "../components/HomeScreen/LastJob";
import { app } from "../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import TypeJob from "../components/HomeScreen/TypeJob";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <TypeJob />
        <Slider />
        <TopCompany topCompanyList={topCompanyList} />
        <LastJob lastJobsList={lastJobList} />
      </ScrollView>
    </View>
  );
}
