import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

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
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

import Icon from "react-native-vector-icons/Ionicons";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function AddCompany() {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);

  const [imageAvatar, setImageAvatar] = useState(null);
  const [imageBackground, setImageBackground] = useState(null);
  const { user } = useUser();

  const [textName, setTextName] = useState("");
  const [isFocusedName, setIsFocusedName] = useState(false);
  const clearText = () => {
    setTextName("");
  };

  const [textSlogan, setTextSlogan] = useState("");
  const [isFocusedSlogan, setIsFocusedSlogan] = useState(false);
  const clearSlogan = () => {
    setTextSlogan("");
  };
  const [textLocation, setTextLocation] = useState("");
  const [isFocusedLocation, setIsFocusedLocation] = useState(false);
  const clearLocation = () => {
    setTextSlogan("");
  };

  const [textPhone, setTextPhone] = useState("");
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);
  const clearPhone = () => {
    setTextPhone("");
  };

  const [textEmail, setTextEmail] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const clearEmail = () => {
    setTextEmail("");
  };

  const [textWebsite, setTextWebsite] = useState("");
  const [isFocusedWebsite, setIsFocusedWebsite] = useState(false);
  const clearWebsite = () => {
    setTextWebsite("");
  };

  const [textEmployee, setTextEmployee] = useState("");
  const [isFocusedEmployee, setIsFocusedEmployee] = useState(false);
  const clearEmployee = () => {
    setTextEmployee("");
  };

  const [textIntroduction, setTextIntroduction] = useState("");
  const [isFocusedIntroduction, setIsFocusedIntroduction] = useState(false);
  const clearIntroduction = () => {
    setTextIntroduction("");
  };

  const [selectedField, setSelectedField] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const clearSelection = () => {
    setSelectedField("");
  };

  const fields = [
    "Công nghệ thông tin",
    "Tài chính",
    "Y tế và Dược phẩm",
    "Giáo dục",
    "Bất động sản",
    "Thương mại điện tử",
    "Sản xuất",
    "Năng lượng",
    "Du lịch và Khách sạn",
    "Truyền thông và Giải trí",
    "Nông nghiệp",
    "Vận tải và Logistics",
    "Bán lẻ",
    "Dịch vụ tư vấn",
    "Dịch vụ khách hàng",
  ];
  const onSubmitMethod = async (value) => {
    console.log("Submit");
    if (
      !imageAvatar ||
      !imageBackground ||
      !textName ||
      !textSlogan ||
      !textWebsite ||
      !textLocation ||
      !selectedField ||
      !textEmail ||
      !user?.id ||
      !textEmployee ||
      !textIntroduction
    ) {
      ToastAndroid.show(
        "Vui lòng nhập đầy đủ thông tin",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    setLoading(true);

    try {
      const resp = await fetch(imageAvatar);
      const blob = await resp.blob();
      const storageRef = ref(storage, "avatarCV/" + Date.now() + ".jpg");
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);

      console.log("Download URL:", downloadUrl);

      const resp2 = await fetch(imageBackground);
      const blob2 = await resp2.blob();
      const storageRef2 = ref(storage, "avatarCV/" + Date.now() + ".jpg");
      await uploadBytes(storageRef2, blob2);
      const downloadUrl2 = await getDownloadURL(storageRef2);

      console.log("Download URL2:", downloadUrl2);

      const company = {
        ID: generateRandomId(8),
        Logo: downloadUrl,
        Background: downloadUrl2,
        Name: textName,
        Slogan: textSlogan,
        Website: textWebsite,
        Location: textLocation,
        Job: 0,
        Field: selectedField,
        Email: textEmail,
        IDUser: user?.id,
        Employee: textEmployee,
        Introduction: textIntroduction,
      };

      const docRef = await addDoc(collection(db, "Company"), company);
      navigation.goBack();
      ToastAndroid.show(
        "Thêm công ty thành công!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      console.error("Error adding company:", error);
      ToastAndroid.show(
        "Đã xảy ra lỗi khi thêm công ty.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setLoading(false);
  };
  const pickImageAvatar = async () => {
    console.log("Pick Avatar");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageAvatar(result.assets[0].uri);
    }
  };
  const pickImageBackground = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageBackground(result.assets[0].uri);
    }
  };
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Add Company</Text>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView style={{ marginBottom: 80 }}>
          <View
            style={{
              borderRadius: 20,
              width: "full",
              marginBottom: 30,
            }}
          >
            <View>
              <TouchableOpacity onPress={pickImageBackground}>
                {imageBackground ? (
                  <Image
                    source={{ uri: imageBackground }}
                    className="h-[150px] w-full"
                    style={{
                      width: 420,
                      resizeMode: "cover",
                    }}
                  />
                ) : (
                  <Image
                    source={require("../assets/bg_gray.jpg")}
                    className="h-[150px] w-full"
                    style={{
                      width: 420,
                      resizeMode: "cover",
                    }}
                  />
                )}
              </TouchableOpacity>

              <View style={{ padding: 10, elevation: 5 }}>
                <TouchableOpacity onPress={pickImageAvatar}>
                  {imageAvatar ? (
                    <Image
                      source={{ uri: imageAvatar }}
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
                  ) : (
                    <Image
                      source={require("../assets/not_found_image.jpg")}
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
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Tên công ty
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
                placeholder="Nhập tên công"
                placeholderTextColor="#999"
                cursorColor="blue"
                onFocus={() => setIsFocusedName(true)}
                onBlur={() => setIsFocusedName(false)}
              />
              {textName?.length > 0 && (
                <TouchableOpacity
                  onPress={clearText}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Slogan
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedSlogan ? "blue" : "#ccc",
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
                value={textSlogan}
                onChangeText={setTextSlogan}
                placeholder="Nhập Slogan"
                placeholderTextColor="#999"
                selectionColor="blue"
                onFocus={() => setIsFocusedSlogan(true)}
                onBlur={() => setIsFocusedSlogan(false)}
              />
              {textSlogan?.length > 0 && (
                <TouchableOpacity
                  onPress={clearSlogan}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ margin: 5 }}>
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
                borderColor: isFocusedEmail ? "blue" : "#ccc",
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
                value={textEmail}
                onChangeText={setTextEmail}
                placeholder="Nhập Email"
                placeholderTextColor="#999"
                cursorColor="blue"
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
              />
              {textEmail?.length > 0 && (
                <TouchableOpacity
                  onPress={clearEmail}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Website
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedWebsite ? "blue" : "#ccc",
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
                value={textWebsite}
                onChangeText={setTextWebsite}
                placeholder="Nhập Website"
                placeholderTextColor="#999"
                cursorColor="blue"
                onFocus={() => setIsFocusedWebsite(true)}
                onBlur={() => setIsFocusedWebsite(false)}
              />
              {textWebsite?.length > 0 && (
                <TouchableOpacity
                  onPress={clearWebsite}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Số lượng nhân viên
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedEmployee ? "blue" : "#ccc",
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
                keyboardType="numeric"
                value={textEmployee}
                onChangeText={setTextEmployee}
                placeholder="Nhập số lượng nhân viên"
                placeholderTextColor="#999"
                cursorColor="blue"
                onFocus={() => setIsFocusedEmployee(true)}
                onBlur={() => setIsFocusedEmployee(false)}
              />
              {textEmployee?.length > 0 && (
                <TouchableOpacity
                  onPress={clearEmployee}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Lĩnh vực
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocused ? "blue" : "#ccc",
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
              <Picker
                selectedValue={selectedField}
                style={{ flex: 1, color: "#000" }}
                onValueChange={(itemValue) => setSelectedField(itemValue)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              >
                <Picker.Item label="Chọn lĩnh vực" value="" />
                {fields.map((field, index) => (
                  <Picker.Item key={index} label={field} value={field} />
                ))}
              </Picker>
              {selectedField?.length > 0 && (
                <TouchableOpacity
                  onPress={clearSelection}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Địa chỉ
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedLocation ? "blue" : "#ccc",
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                paddingLeft: 10,
                paddingRight: 10,
                padding: 10,
                paddingHorizontal: 20,
                height: 80,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  height: "100%",
                  color: "#000",
                  fontSize: 16,
                  textAlignVertical: "top",
                }}
                value={textLocation}
                multiline
                onChangeText={setTextLocation}
                placeholder="Nhập địa chỉ"
                placeholderTextColor="#999"
                selectionColor="blue"
                onFocus={() => setIsFocusedLocation(true)}
                onBlur={() => setIsFocusedLocation(false)}
              />
              {textLocation?.length > 0 && (
                <TouchableOpacity
                  onPress={clearLocation}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Giới thiệu
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedIntroduction ? "blue" : "#ccc",
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                paddingLeft: 10,
                paddingRight: 10,
                padding: 10,
                paddingHorizontal: 20,
                height: 200,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  height: "100%",
                  color: "#000",
                  fontSize: 16,
                  textAlignVertical: "top",
                }}
                value={textIntroduction}
                multiline
                onChangeText={setTextIntroduction}
                placeholder="Nhập giới thiệu công ty"
                placeholderTextColor="#999"
                selectionColor="blue"
                onFocus={() => setIsFocusedIntroduction(true)}
                onBlur={() => setIsFocusedIntroduction(false)}
              />
              {textIntroduction?.length > 0 && (
                <TouchableOpacity
                  onPress={clearIntroduction}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
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
          onPress={onSubmitMethod}
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
