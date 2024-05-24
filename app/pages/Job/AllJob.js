import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Button,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-shadow-cards";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import JobItem from "../../components/Home/JobItem";

export default function AllJob() {
  const navigation = useNavigation();
  const [listJob, setListJob] = useState([]);
  const db = getFirestore(app);
  const fetchDataListJob = async () => {
    try {
      console.log("Fetch");
      const q = query(collection(db, "Jobs"));

      const jobSnapshot = await getDocs(q);
      const jobs = jobSnapshot.docs.map((doc) => doc.data());
      setListJob(jobs);
    } catch (error) {
      console.error("Error fetching data job:", error);
    }
  };
  useEffect(() => {
    fetchDataListJob();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchDataListJob();
    }, [])
  );
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          padding: 13,
          backgroundColor: "white",
          borderBottomColor: "#e6e7e8",
          borderBottomWidth: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20 }} // Icon ở bên trái
        >
          <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>All Job</Text>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          data={listJob}
          // numColumns={10}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ margin: 10, marginHorizontal: 15, marginBottom: 100 }}
          renderItem={({ item, index }) => <JobItem item={item} />}
        />
      </View>
    </>
  );
}
