import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  Image,
  Pressable,
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
  increment,
} from "firebase/firestore";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function AddJob() {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const { user } = useUser();
  const [listCompany, setListCompany] = useState([]);
  const [textName, setTextName] = useState("");
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [date, setDate] = useState(new Date());
  const clearText = () => {
    setTextName("");
  };
  const [textSalary, setTextSalary] = useState("");
  const [isFocusedSalary, setIsFocusedSalary] = useState(false);
  const clearSalary = () => {
    setTextSalary("");
  };
  const [textExperience, setTextExperience] = useState("");
  const [isFocusedExperience, setIsFocusedExperience] = useState(false);
  const clearExperience = () => {
    setTextExperience("");
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

  const [textBenefit, setTextBenefit] = useState("");
  const [isFocusedBenefit, setIsFocusedBenefit] = useState(false);
  const clearBenefit = () => {
    setTextBenefit("");
  };
  const [textSkill, setTextSkill] = useState("");
  const [isFocusedSkill, setIsFocusedSkill] = useState(false);
  const clearSkill = () => {
    setTextSkill("");
  };
  const [textIntroduction, setTextIntroduction] = useState("");
  const [isFocusedIntroduction, setIsFocusedIntroduction] = useState(false);
  const clearIntroduction = () => {
    setTextIntroduction("");
  };
  const [textTypeJob, setTextTypeJob] = useState("");
  const [isFocusedTypeJob, setIsFocusedTypeJob] = useState(false);
  const clearTypeJob = () => {
    setTextTypeJob("");
  };
  const [selectedField, setSelectedField] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [textDeadline, setTextDeadline] = useState("");
  const [isFocusedDeadline, setIsFocusedDeadline] = useState(false);
  const clearDeadline = () => {
    setTextDeadline("");
  };
  const toggleDatepicker = () => {
    if (showPicker) {
      setShowPicker(false);
    } else {
      setShowPicker(true);
    }
  };
  const onChange = ({ type }, selectedDate) => {
    console.log("Picker Date:  " + selectedDate);
    if (type === "set") {
      console.log("Setdate");
      const currentDate = selectedDate;
      setTextDeadline(formatDate(currentDate));
      toggleDatepicker();
    }
  };
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  const clearSelection = () => {
    setSelectedField("");
  };
  const fetchDataListCompany = async () => {
    try {
      const q = query(
        collection(db, "Company"),
        where("IDUser", "==", user?.id)
      );

      const companySnapshot = await getDocs(q);
      const company = companySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListCompany(company);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    console.log(listCompany.length);
  };

  const typeJob = ["Fulltime", "Freelance", "Part-time"];
  const onSubmitMethod = async (value) => {
    console.log("Submit");
    // if (
    //   !imageAvatar ||
    //   !imageBackground ||
    //   !textName ||
    //   !textSlogan ||
    //   !textWebsite ||
    //   !textLocation ||
    //   !selectedField ||
    //   !textEmail ||
    //   !user?.id ||
    //   !textEmployee ||
    //   !textIntroduction
    // ) {
    //   ToastAndroid.show(
    //     "Vui lòng nhập đầy đủ thông tin",
    //     ToastAndroid.SHORT,
    //     ToastAndroid.BOTTOM
    //   );
    //   return;
    // }
    setLoading(true);
    const q = query(
      collection(db, "Company"),
      where("ID", "==", selectedField)
    );
    const companySnapshot = await getDocs(q);
    const company = companySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    try {
      const job = {
        Applicants: 0,
        Background: company[0].Background,
        BenefitJob: textBenefit,
        CV: 0,
        IDUser: user?.id,
        CVApprove: 0,
        DateCreated: formatDate(new Date()),
        Deadline: textDeadline,
        DescriptionJob: textIntroduction,
        Experience: textExperience,
        ID: generateRandomId(8),
        IDCompany: company[0].ID,
        LocationJob: textLocation,
        Logo: company[0].Logo,
        NameCompany: company[0].Name,
        NameJob: textName,
        Salary: textSalary,
        SkillJob: textSkill,
        Status: true,
        TypeJob: textTypeJob,
      };
      const docRef = await addDoc(collection(db, "Jobs"), job);
      const docRef2 = doc(db, "Company", company[0].id);

      await updateDoc(docRef2, {
        Job: increment(1),
      });
      navigation.goBack();
      ToastAndroid.show(
        "Thêm công việc thành công!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      console.error("Error adding job:", error);
      ToastAndroid.show(
        "Đã xảy ra lỗi khi thêm công ty.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setLoading(false);
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

  useFocusEffect(
    React.useCallback(() => {
      fetchDataListCompany();
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
          style={{ position: "absolute", left: 20 }}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Add Job {listCompany.length}
        </Text>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView style={{ marginBottom: 80 }}>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Công ty
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
                <Picker.Item label="Chọn công ty" value="" />
                {listCompany.map((company) => (
                  <Picker.Item
                    key={company.id}
                    label={company.Name}
                    value={company.ID}
                  />
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
              Tên công việc
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
                placeholder="Nhập tên công việc"
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
              Loại công việc
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedTypeJob ? "blue" : "#ccc",
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
                selectedValue={textTypeJob}
                style={{ flex: 1, color: "#000" }}
                onValueChange={(itemValue) => setTextTypeJob(itemValue)}
                onFocus={() => setIsFocusedTypeJob(true)}
                onBlur={() => setIsFocusedTypeJob(false)}
              >
                <Picker.Item label="Chọn loại công việc" value="" />
                {typeJob.map((typeJob, index) => (
                  <Picker.Item key={index} label={typeJob} value={typeJob} />
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
              Mức lương (USD)
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedSalary ? "blue" : "#ccc",
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
                value={textSalary}
                onChangeText={setTextSalary}
                placeholder="Nhập mức lương"
                placeholderTextColor="#999"
                selectionColor="blue"
                keyboardType="numeric"
                onFocus={() => setIsFocusedSalary(true)}
                onBlur={() => setIsFocusedSalary(false)}
              />
              {textSalary?.length > 0 && (
                <TouchableOpacity
                  onPress={clearSalary}
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
              Ngày phỏng vấn
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedSalary ? "blue" : "#ccc",
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
              {/* <TextInput
                style={{
                  flex: 1,
                  height: "100%",
                  color: "#000",
                  fontSize: 16,
                }}
                value={textSalary}
                onChangeText={setTextSalary}
                placeholder="Nhập mức lương"
                placeholderTextColor="#999"
                selectionColor="blue"
                keyboardType="numeric"
                onFocus={() => setIsFocusedSalary(true)}
                onBlur={() => setIsFocusedSalary(false)}
              />
              {textSalary?.length > 0 && (
                <TouchableOpacity
                  onPress={clearSalary}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )} */}
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onChange}
                />
              )}
              <Pressable onPress={toggleDatepicker}>
                <TextInput
                  style={styles.input}
                  placeholder="12/10/2003"
                  value={textDeadline}
                  editable={false}
                />
              </Pressable>
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
              Kinh nghiệm (năm)
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedExperience ? "blue" : "#ccc",
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
                value={textExperience}
                onChangeText={setTextExperience}
                placeholder="Nhập kinh nghiệm"
                placeholderTextColor="#999"
                selectionColor="blue"
                keyboardType="numeric"
                onFocus={() => setIsFocusedExperience(true)}
                onBlur={() => setIsFocusedExperience(false)}
              />
              {textExperience?.length > 0 && (
                <TouchableOpacity
                  onPress={clearExperience}
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
              Mô tả công việc
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
                placeholder="Nhập mô tả công việc"
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
          <View style={{ margin: 5 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
              }}
            >
              Quyền lợi
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedBenefit ? "blue" : "#ccc",
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
                value={textBenefit}
                multiline
                onChangeText={setTextBenefit}
                placeholder="Nhập quyền lợi"
                placeholderTextColor="#999"
                selectionColor="blue"
                onFocus={() => setIsFocusedBenefit(true)}
                onBlur={() => setIsFocusedBenefit(false)}
              />
              {textBenefit?.length > 0 && (
                <TouchableOpacity
                  onPress={clearBenefit}
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
              Kĩ năng
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: isFocusedSkill ? "blue" : "#ccc",
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                paddingLeft: 10,
                paddingRight: 10,
                padding: 10,
                paddingHorizontal: 20,
                height: 150,
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
                value={textSkill}
                multiline
                onChangeText={setTextSkill}
                placeholder="Nhập kĩ năng"
                placeholderTextColor="#999"
                selectionColor="blue"
                onFocus={() => setIsFocusedSkill(true)}
                onBlur={() => setIsFocusedSkill(false)}
              />
              {textSkill?.length > 0 && (
                <TouchableOpacity
                  onPress={clearSkill}
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
