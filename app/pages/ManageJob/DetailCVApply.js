import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  Divider,
} from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import LoadingOverlay from "../../components/LoadingOverlay";
const { height } = Dimensions.get("window");
export default function DetailCVApply() {
  const db = getFirestore(app);

  const { params } = useRoute();
  const navigation = useNavigation();
  const [cv, setCV] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("CVD");
    console.log(params.job);
    console.log(params.job?.id);
    getCV();
  }, [params]);
  const getCV = async () => {
    try {
      console.log("Lay: " + params.job.IDCv);
      const q = query(collection(db, "CV"), where("ID", "==", params.job.IDCv));
      const getCVSnapshot = await getDocs(q);
      const CV = getCVSnapshot.docs.map((doc) => doc.data());
      console.log("CV");
      console.log(CV);
      setCV(CV);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    console.log("Công ty đang theo dõi: " + listCompanyFollowed.length);
  };
  const acceptCV = async (id) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "ApplyJob", id), {
        Status: 1, // Toggle status
      });
      ToastAndroid.show(
        "Duyệt CV thành công !",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
    console.log(id);
    setLoading(false);
  };
  useEffect(() => {
    console.log("CV_FINALE");
    console.log(cv.length);
  }, [cv]);
  useEffect(() => {
    getCV();
  }, []);
  const handleRecruit = () => {
    alert("Ứng viên đã được tuyển!");
  };

  return (
    <>
      <View style={{ flex: 1 }}>
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            CV ứng viên {params.job.ID}
          </Text>
        </View>

        <ScrollView>
          <View
            style={{
              margin: 7,
              backgroundColor: "white",
              borderRadius: 8,
              marginBottom: 0,
              height: "100%",
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                height: height - 150,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flex: 0.4, // Chiều rộng cột đầu tiên nhỏ hơn cột thứ hai
                  backgroundColor: "#335384",
                  padding: 10,
                  borderTopLeftRadius: 10,
                  // Canh giữa nội dung theo chiều dọc
                }}
              >
                <View style={{ alignItems: "center", marginBottom: 10 }}>
                  <Image
                    source={{ uri: cv[0]?.Avatar }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 100,
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    Liên lạc
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Entypo name="calendar" size={15} color="white" />
                    <Text
                      style={{ fontSize: 12, color: "white", marginLeft: 5 }}
                    >
                      {cv[0]?.DateBirth}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <FontAwesome name="user" size={17} color="white" />
                    <Text
                      style={{ fontSize: 12, color: "white", marginLeft: 5 }}
                    >
                      {cv[0]?.Gender}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <Entypo name="phone" size={15} color="white" />
                    <Text
                      style={{ fontSize: 12, color: "white", marginLeft: 5 }}
                    >
                      {cv[0]?.Phone}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <Entypo name="mail" size={15} color="white" />
                    <Text
                      style={{ fontSize: 12, color: "white", marginLeft: 5 }}
                    >
                      {cv[0]?.Email}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <Entypo name="location-pin" size={15} color="white" />
                    <Text
                      style={{ fontSize: 12, color: "white", marginLeft: 5 }}
                    >
                      {cv[0]?.Location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <Entypo name="network" size={15} color="white" />
                    <Text
                      style={{ fontSize: 12, color: "white", marginLeft: 5 }}
                    >
                      {cv[0]?.Website}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 0.6, // Chiều rộng cột thứ hai lớn hơn cột đầu tiên
                  backgroundColor: "white",
                  padding: 10,
                  borderTopRightRadius: 10,
                  // Canh giữa nội dung theo chiều dọc
                }}
              >
                <Text
                  style={{ fontSize: 23, color: "#335384", fontWeight: "bold" }}
                >
                  {cv[0]?.Name}
                </Text>
                <Text>Mã ứng viên: {params.job?.ID}</Text>

                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#98D0E8",
                    }}
                  >
                    Mục tiêu nghề nghiệp
                  </Text>
                  <Text>{cv[0]?.Introduction}</Text>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#98D0E8",
                    }}
                  >
                    Sở thích
                  </Text>
                  <Text>{cv[0]?.Interest}</Text>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#98D0E8",
                    }}
                  >
                    Kĩ năng
                  </Text>
                  <Text>{cv[0]?.Skills}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            backgroundColor: "#015aff", // Change background color based on condition
            padding: 10,
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            opacity: 1, // Disable button by reducing opacity
          }}
          onPress={() => acceptCV(params.job?.id)}
          // onPress={listCV.length <= 0 ? null : applyJob} // Disable onPress event when listCv.length <= 0
          // disabled={listCV.length <= 0} // Alternative way to disable button
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "normal",
            }}
          >
            ACCEPT CV
          </Text>
        </TouchableOpacity>
      </View>
      <LoadingOverlay loading={loading} />
    </>
  );
}
const InfoRow = ({ icon, text }) => (
  <Text
    style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}
  >
    <Icon name={icon} size={20} style={{ marginRight: 10 }} />
    {text}
  </Text>
);
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e2",
  },

  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderColor: "#2c67f2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  applyBtn: {
    flex: 1,
    backgroundColor: "#2c67f2",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    borderRadius: 16,
  },
  disabledBtn: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    borderColor: "#2c67f2",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    borderRadius: 16,
  },
  applyBtnText: {
    fontSize: 18,
    color: "#F3F4F8",
  },
  applyBtnTextFalse: {
    fontSize: 18,
    color: "#2c67f2",
  },
});
