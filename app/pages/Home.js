import { View, Text, ScrollView } from "react-native";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Sliders";
import { app } from "../../firebaseConfig";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const db = getFirestore(app);
  useEffect(() => {
    getUsers();
  }, []);
  const [userList, setUserList] = useState([]);
  const getUsers = async () => {
    setUserList([]);
    const querySnapshot = await getDocs(collection(db, "User"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserList((userList) => [...userList, doc.data()]);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Slider />
    </View>
  );
}
