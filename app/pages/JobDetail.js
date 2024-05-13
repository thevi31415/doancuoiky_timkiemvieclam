import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-shadow-cards";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { app } from "../../firebaseConfig";
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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";

export default function JobDetail({ checkNav }) {
  const db = getFirestore(app);
  const navigation = useNavigation();
  const { user } = useUser();
  const { params } = useRoute();
  const [job, setJob] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkApply, setCheckApply] = useState(false);
  const [checkBookmark, setCheckBookmark] = useState(false);
  const [IDBookMark, setIDBookmark] = useState(null);
  const [loading, setLoading] = useState(false);

  const showAlertApply = () => {
    Alert.alert(
      "Thông báo",
      "Bạn đã ứng tuyển và công việc này không thể ứng tuyển nữa nữa"
    );
  };
  const fetchData = async () => {
    setLoading(true); // Bắt đầu quá trình load

    try {
      const applySnapshot = await getDocs(collection(db, "ApplyJob"));
      const filteredApply = applySnapshot.docs.filter((doc) => {
        const data = doc.data();
        return data.IDJob == job?.ID && data.IDUser == user?.id;
      });
      const applyData = filteredApply.map((doc) => doc.data());
      if (applyData.length > 0) {
        setCheckApply(true);
      } else {
        setCheckApply(false);
      }

      console.log("Length:" + applyData.length);
    } catch (error) {
      console.error("Error fetching data applyjob:", error);
    }
    setLoading(false); // Bắt đầu quá trình load
  };

  const fetchDataBookmark = async () => {
    try {
      const bookMarkSnapshot = await getDocs(collection(db, "BookmarkJob"));
      const bookMark = bookMarkSnapshot.docs.filter((doc) => {
        const data = doc.data();
        return data.IDJob == job?.ID && data.IDUser == user?.id;
      });
      const IDBookmarkArray = bookMark.map((doc) => doc.id); // Lưu ID của các tài liệu vào mảng
      if (IDBookmarkArray.length > 0) {
        console.log("ID BookMark:", IDBookmarkArray[0]);
        setIDBookmark(IDBookmarkArray[0]); // In ra phần tử ID đầu tiên
        // Set dữ liệu của tài liệu đầu tiên cho BookmarkJob
        setCheckBookmark(true);
      } else {
        setCheckBookmark(false);
      }
    } catch (error) {
      console.error("Error fetching data bookmark:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataBookmark();
  }, [job, checkApply, checkBookmark]);
  useEffect(() => {
    console.log("Check Apply: " + checkApply);
  }, [checkApply, checkBookmark]);
  useEffect(() => {
    params && setJob(params.job);
  }, [params]);
  const generateRandomId = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return randomId;
  };
  const applyJob = async () => {
    setLoading(true); // Bắt đầu quá trình load

    setIsLoading(true);
    const docRef = await addDoc(collection(db, "ApplyJob"), {
      ID: generateRandomId(8),
      IDJob: job?.ID,
      IDUser: user?.id,
    });
    setIsLoading(false);
    setCheckApply(true);
    setLoading(false); // Bắt đầu quá trình load

    alert(
      "Bạn đã ứng tuyển thành công !. Nhà tuyển dụng sẽ xem được hồ sơ của bạn !"
    );
  };

  const bookMarkJob = async () => {
    setLoading(true); // Bắt đầu quá trình load

    if (checkBookmark == true) {
      console.log("Delete: " + IDBookMark);
      try {
        const reference = doc(db, "BookmarkJob", IDBookMark);
        await deleteDoc(reference);
        console.log("Bookmark deleted successfully.");
        setCheckBookmark(false);
        // alert("Đã bỏ lưu công việc thành công !");
        ToastAndroid.show(
          "Bỏ lưu công việc thành công !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } catch (error) {
        alert("Error deleting bookmark:", error);
      }
    } else {
      const docRef = await addDoc(collection(db, "BookmarkJob"), {
        ID: generateRandomId(8),
        IDJob: job?.ID,
        IDUser: user?.id,
      });
      setCheckBookmark(true);
      console.log("Book Mark");
      ToastAndroid.show(
        "Lưu công việc thành công !",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setLoading(false); // Bắt đầu quá trình load
  };

  return (
    <>
      {checkNav && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            padding: 13,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: 20 }}
          >
            <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Detail Job</Text>
        </View>
      )}

      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
          }}
        >
          <Card
            style={{
              borderRadius: 20,
              width: "full",
            }}
          >
            <View>
              <Image
                source={{ uri: job.Background }}
                className="h-[200px] w-full"
                style={{
                  width: 420,
                  resizeMode: "cover",
                }}
              />
              <View style={{ padding: 10, elevation: 5 }}>
                <Image
                  source={{ uri: job.Logo }}
                  className="h-[100px] w-[100px] "
                  style={{
                    elevation: 5,
                    position: "absolute",
                    borderRadius: 20,
                    alignSelf: "center",
                    padding: 10,
                    bottom: -35,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 30,
                  color: "#2c67f2",
                }}
              >
                {job?.NameJob}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "300",
                  fontWeight: "600",

                  fontSize: 20,
                }}
              >
                {job?.NameCompany}
              </Text>

              <View
                style={{ margin: 10, padding: 5, marginBottom: 20 }}
                className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
              >
                <Text> {job?.TypeJob} </Text>
              </View>
            </View>
          </Card>
          <View
            style={{
              width: "full",
              marginTop: 15,
              borderTopWidth: 1,
              borderTopColor: "#e1e1e2",
            }}
          >
            <View style={{ margin: 15 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#2c67f2" }}
              >
                Thông tin công việc
              </Text>
              <View
                style={{
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor: "#f4f4f6",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="staro" size={24} color="#8f8f8f" />

                  <Text
                    style={{
                      fontSize: 15,
                      color: "#333333",

                      marginLeft: 8,
                    }}
                  >
                    {job?.Experience} năm
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <AntDesign name="team" size={24} color="#8f8f8f" />
                  <Text
                    style={{
                      color: "#333333",
                      fontSize: 15,

                      marginLeft: 8,
                    }}
                  >
                    {job?.TypeJob}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <AntDesign name="enviromento" size={24} color="#8f8f8f" />
                  <Text
                    style={{
                      color: "#333333",
                      fontSize: 15,

                      marginLeft: 8,
                    }}
                  >
                    {job?.LocationJob}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <MaterialIcons
                    name="attach-money"
                    size={24}
                    color="#8f8f8f"
                  />
                  <Text
                    style={{
                      color: "#333333",
                      fontSize: 15,

                      marginLeft: 8,
                    }}
                  >
                    {job?.Salary} VND
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,

                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#2c67f2",
                    marginBottom: 10,
                  }}
                >
                  Mô tả công việc
                </Text>
                <View
                  style={{
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    width: "100",
                    backgroundColor: "#f4f4f6",
                  }}
                >
                  <Text
                    style={{
                      color: "#333333",
                      fontSize: 17,
                      textAlign: "justify",
                    }}
                  >
                    {job.DescriptionJob}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,

                  marginBottom: 100,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#2c67f2",
                    marginBottom: 10,
                  }}
                >
                  Quyền lợi công việc
                </Text>
                <View
                  style={{
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    width: "100",
                    backgroundColor: "#f4f4f6",
                  }}
                >
                  <Text
                    style={{
                      color: "#333333",
                      fontSize: 17,
                      textAlign: "justify",
                    }}
                  >
                    {job.BenefitJob}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.likeBtn}>
          <FontAwesome
            resizeMode="contain"
            name="bookmark-o"
            size={24}
            color="#2c67f2"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyBtn}
          onPress={applyJob}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.applyBtnText}>Apply for job</Text>
          )}
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.likeBtn} onPress={bookMarkJob}>
          <FontAwesome
            resizeMode="contain"
            name={checkBookmark ? "bookmark" : "bookmark-o"}
            size={24}
            color={checkBookmark ? "#2c67f2" : "#2c67f2"} // Màu sắc phụ thuộc vào trạng thái checkApply
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.disabledBtn, checkApply && styles.applyBtn]} // Nếu checkApply là true, áp dụng kiểu disabledBtn
          onPress={checkApply ? showAlertApply : applyJob} // Không cho phép người dùng click nếu checkApply là true
          // disabled={checkApply} // Disable nút nếu checkApply là true
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={[
                styles.applyBtnTextFalse,
                checkApply && styles.applyBtnText,
              ]}
            >
              {checkApply ? "Bạn đã ứng tuyển" : "Ứng tuyển ngay"}
            </Text> // Thay đổi nội dung của nút dựa trên trạng thái checkApply
          )}
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size={70} color="#2c67f2" />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e2",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
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
