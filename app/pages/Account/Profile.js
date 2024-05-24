import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
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
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
export default function Profile() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const db = getFirestore(app);
  const [textName, setTextName] = useState("");
  const [isFocusedName, setIsFocusedName] = useState(false);
  const clearText = () => {
    setTextName("");
  };
  const [textPhone, setTextPhone] = useState("");
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);
  const clearPhone = () => {
    setTextPhone("");
  };
  const saveProfile = async (id) => {
    try {
      await updateDoc(doc(db, "User", id), {
        name: textName, // Toggle status
        phone: textPhone,
      });
      ToastAndroid.show(
        "Lưu thông tin thành công !",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error updating status:", error);
      ToastAndroid.show(
        "Lỗi. Không thể lưu thông tin",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };
  const [textEmail, setTextEmail] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const clearEmail = () => {
    setTextEmail("");
  };
  useEffect(() => {
    // params && setJob(params.job);
    // console.log("DetailJob" + checkNav);
    // console.log(jobs);
    console.log(params.user);
    setTextName(params.user.name);
    setTextPhone(params.user.phone);
    setTextEmail(params.user.email);
  }, [params]);
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
          style={{ position: "absolute", left: 20 }}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Edit Information
        </Text>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ margin: 10 }}>
          <Text
            style={{
              color: "#333333",
              fontSize: 20,
              fontWeight: "500",
              marginHorizontal: 10,
            }}
          >
            Họ và tên
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: isFocusedName ? "blue" : "#ccc",
              borderWidth: 1,
              borderRadius: 10,
              margin: 10,
              paddingLeft: 10,
              paddingRight: 10,
              padding: 10,
              paddingHorizontal: 20,
              height: 45,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: "100%",
                color: "#000",
                fontSize: 16,
              }}
              value={textName}
              onChangeText={setTextName}
              placeholder="Enter text"
              placeholderTextColor="#999"
              cursorColor="blue"
              onFocus={() => setIsFocusedName(true)}
              onBlur={() => setIsFocusedName(false)}
            />
            {textName?.length > 0 && (
              <TouchableOpacity onPress={clearText} style={{ marginLeft: 10 }}>
                <Icon name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <Text
            style={{
              color: "#333333",
              fontSize: 20,
              fontWeight: "500",
              marginHorizontal: 10,
            }}
          >
            Số điện thoại
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: isFocusedPhone ? "blue" : "#ccc",
              borderWidth: 1,
              borderRadius: 10,
              margin: 10,
              paddingLeft: 10,
              paddingRight: 10,
              padding: 10,
              paddingHorizontal: 20,
              height: 45,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: "100%",
                color: "#000",
                fontSize: 16,
              }}
              value={textPhone}
              onChangeText={setTextPhone}
              placeholder="Enter text"
              placeholderTextColor="#999"
              selectionColor="blue"
              onFocus={() => setIsFocusedPhone(true)}
              onBlur={() => setIsFocusedPhone(false)}
              keyboardType="numeric"
            />
            {textPhone?.length > 0 && (
              <TouchableOpacity onPress={clearPhone} style={{ marginLeft: 10 }}>
                <Icon name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <Text
            style={{
              color: "#333333",
              fontSize: 20,
              fontWeight: "500",
              marginHorizontal: 10,
            }}
          >
            Email
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 10,
              margin: 10,
              paddingLeft: 10,
              paddingRight: 10,
              padding: 10,
              paddingHorizontal: 20,
              height: 45,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: "100%",
                color: "#999",
                fontSize: 16,
              }}
              value={textEmail}
              editable={false} // Tạo Email không thể sửa đổi
            />
          </View>
        </View>
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
          onPress={() => saveProfile(params.user?.id)}
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
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
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
