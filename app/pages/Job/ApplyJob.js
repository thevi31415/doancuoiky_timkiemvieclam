import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { Checkbox } from "react-native-paper";

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
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function ApplyJob({ checkNav }) {
  const navigation = useNavigation();

  const db = getFirestore(app);
  const { params } = useRoute();
  const [job, setJob] = useState([]);
  const [listCV, setListCV] = useState([]);
  const { user } = useUser();
  const [checked, setChecked] = React.useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const generateRandomId = (length) => {
    const characters = "0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return randomId;
  };
  const handleCheckboxPress = (id) => {
    if (selectedId === id) {
      setSelectedId(null); // Uncheck if the same item is selected
      console.log(null);
    } else {
      setSelectedId(id);
      console.log(id);
    }
  };

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
  useEffect(() => {
    params && setJob(params.job);
    fetchDataCV();
    console.log(listCV);
    // console.log("Apple" + checkNav);
    // console.log(params.job);
  }, [params]);
  const applyJob = async () => {
    if (selectedId == null) {
      alert("Vui lòng chọn một CV để ứng tuyển !");
    } else {
      setLoading(true); // Start loading process
      console.log("Apply");

      try {
        const docRef = await addDoc(collection(db, "ApplyJob"), {
          ID: generateRandomId(8),
          IDJob: params.job?.ID,
          IDUser: user?.id,
          IDCv: selectedId,
        });

        setLoading(false); // End loading process

        alert(
          "Bạn đã ứng tuyển thành công !. Nhà tuyển dụng sẽ xem được hồ sơ của bạn !"
        );
        navigation.goBack();
        // Uncomment this line if you want to navigate after applying
        // navigation.push("apply-job", { job: jobs });
      } catch (error) {
        console.error("Error applying for job: ", error);
        setIsLoading(false);
        setLoading(false); // End loading process
        alert("Đã xảy ra lỗi khi ứng tuyển. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <>
      <ScrollView>
        {checkNav && (
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
              style={{ position: "absolute", left: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Apply to</Text>
          </View>
        )}
        <View
          style={{
            marginTop: 20,
            backgroundColor: "white",
            padding: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#015aff" }}>
            {params.job.NameJob}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            {params.job.NameCompany}
          </Text>
          <View>
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
                {params.job?.Experience} năm
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
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
                {params.job?.TypeJob}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
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
                {params.job?.LocationJob}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <MaterialIcons name="attach-money" size={24} color="#8f8f8f" />
              <Text
                style={{
                  color: "#333333",
                  fontSize: 15,

                  marginLeft: 8,
                }}
              >
                {params.job?.Salary} USD
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "white",
            padding: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Chọn một CV của bạn
          </Text>
          {listCV.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listCV}
              style={{ marginBottom: 0 }}
              renderItem={({ item }) => (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#a4c0f5",
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={{ uri: item.Avatar }}
                        style={{
                          width: 60,
                          height: 60,
                          marginRight: 15,
                          borderRadius: 100,
                          borderWidth: 2,
                          borderColor: "blue",
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#015aff",
                          }}
                        >
                          {item?.NameCV}
                        </Text>
                        <Text
                          style={{
                            color: "#3b3b3b",
                            fontSize: 15,
                            marginTop: 5,
                            fontWeight: "bold",
                          }}
                        >
                          {item?.DateBirth}
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#d6e4ff",
                            borderRadius: 5,
                            alignSelf: "flex-start",
                            padding: 4,
                            marginTop: 3,
                          }}
                        >
                          <Text
                            style={{
                              color: "#0056b3",
                              fontSize: 12,
                              fontWeight: "bold",
                            }}
                          >
                            #{item?.ID}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Checkbox
                      status={selectedId === item.ID ? "checked" : "unchecked"}
                      disabled={false}
                      color={selectedId === item.ID ? "#025afe" : "#333333"}
                      onPress={() => handleCheckboxPress(item.ID)}
                    />
                  </View>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center", // Center items horizontally
                width: "100%",
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../assets/not_found_cv_2.jpg")}
              />

              <Text style={{ marginTop: 15, fontSize: 15, color: "#666666" }}>
                Không có CV nào. Vui lòng tạo một CV !
              </Text>
            </View>
          )}
        </View>
        {/* <View
          style={{
            marginTop: 20,
            backgroundColor: "white",
            padding: 10,
            marginBottom: 70,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}> Thông tin</Text>
          <View>
            <Text>Họ tên</Text>
            <TextInput
              style={{
                fontSize: 17,
                borderWidth: 2,
                borderColor: "#b8b8b8",
                borderRadius: 10,
                color: "#454545",
                paddingHorizontal: 15,
                padding: 5,
              }}
            />
          </View>
        </View> */}
      </ScrollView>
      <View style={styles.container}>
        {/* <TouchableOpacity
          style={{
            backgroundColor: "#015aff",
            padding: 10,
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={applyJob}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "normal" }}>
            CONFIRM APPLY
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            backgroundColor: listCV.length <= 0 ? "#e4e3e8" : "#015aff", // Change background color based on condition
            padding: 10,
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            opacity: listCV.length <= 0 ? 0.5 : 1, // Disable button by reducing opacity
          }}
          onPress={listCV.length <= 0 ? null : applyJob} // Disable onPress event when listCv.length <= 0
          disabled={listCV.length <= 0} // Alternative way to disable button
        >
          <Text
            style={{
              color: listCV.length <= 0 ? "#666666" : "#ffffff",
              fontSize: 20,
              fontWeight: "normal",
            }}
          >
            CONFIRM APPLY
          </Text>
        </TouchableOpacity>
      </View>
      <LoadingOverlay loading={loading} />
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
