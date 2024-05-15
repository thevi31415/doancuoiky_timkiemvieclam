import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Sliders";
import TopCompany from "../../components/Home/TopCompany";
import LastJob from "../../components/Home/LastJob";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import TypeJob from "../../components/Home/TypeJob";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HintSearch from "../../components/Home/HintSearch";

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
        <HintSearch />

        {/* <TypeJob /> */}
        <Slider />
        <TopCompany topCompanyList={topCompanyList} />
        <LastJob lastJobsList={lastJobList} />
      </ScrollView>
    </View>
  );
}