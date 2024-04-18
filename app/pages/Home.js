import { View, Text, ScrollView } from "react-native";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Sliders";
import { app } from "../../firebaseConfig";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import TopCompany from "../components/HomeScreen/TopCompany";
import LastJob from "../components/HomeScreen/LastJob";

export default function Home() {
  const db = getFirestore(app);
  useEffect(() => {
    getUsers();
    getTopCompanies();
  }, []);
  const [userList, setUserList] = useState([]);
  const [topCompanyList, setTopCompanyList] = useState([]);
  const getUsers = async () => {
    setUserList([]);
    const querySnapshot = await getDocs(collection(db, "User"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserList((userList) => [...userList, doc.data()]);
    });
  };
  const getTopCompanies = async () => {
    setTopCompanyList([]);
    const querySnapshot = await getDocs(collection(db, "Company"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setTopCompanyList((topCompanyList) => [...topCompanyList, doc.data()]);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Slider />
        <TopCompany topCompanyList={topCompanyList} />
        <LastJob />
      </ScrollView>
    </View>
  );
}
