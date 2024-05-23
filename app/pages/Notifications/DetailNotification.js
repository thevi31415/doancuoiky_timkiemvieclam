import { View, Text } from "react-native";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import JobDetail from "../Job/JobDetail";
export default function DetailNotification() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [listJob, setListJob] = useState([]);
  const fetchDataJob = async () => {
    try {
      const q = query(
        collection(db, "Jobs"),
        where("ID", "==", params.notification.IDJob)
      );

      const jobSnapshot = await getDocs(q);
      const jobData = jobSnapshot.docs.map((doc) => doc.data());
      setListJob(jobData);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    console.log(params.notification);
    fetchDataJob();
    console.log(listJob[0]);
  }, [params]);
  return (
    <>
      <JobDetail jobs={listJob[0]} checkNav={true} />
    </>
  );
}
