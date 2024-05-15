import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function ManagementCV() {
  const db = getFirestore(app);

  const [listCV, setListCV] = useState([]);
  const [CV, setCV] = useState([]);
  const { user } = useUser();

  const fetchDataCV = async () => {
    try {
      const q = query(collection(db, "CV"), where("IDUser", "==", user?.id));

      const cvSnapshot = await getDocs(q);
      const cvData = cvSnapshot.docs.map((doc) => doc.data());
      setListCV(cvData);
      console.log("List cv: " + cvData.length);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    setLoading(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchDataCV();
    }, [])
  );
  useEffect(() => {
    fetchDataCV();
  }, []);

  useEffect(() => {
    if (listCV.length > 0) {
      setCV(listCV[0]);
      console.log("Name CV2: " + listCV[0].IDUser);
    }
  }, [listCV]);
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> Quản lý CV</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Quản lý cv {listCV.length}</Text>
      </View>
    </>
  );
}
