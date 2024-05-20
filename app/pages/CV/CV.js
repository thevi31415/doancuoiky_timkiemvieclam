import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import AntDesign from "@expo/vector-icons/AntDesign";
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
import CVDetail from "./CVDetail";
import NotFoundCV from "./NotFoundCV";
import NotFoundCVStackNav from "./NotFoundCVStackNav";
import ManagementCV from "./ManagementCV";
export default function CV() {
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
      {listCV.length > 0 ? (
        <ManagementCV listCV={listCV} />
      ) : (
        <NotFoundCVStackNav />
      )}
    </>
    // <>{listCV.length > 0 ? <CVDetail CV={CV} /> : <NotFoundCVStackNav />}</>
  );
}
