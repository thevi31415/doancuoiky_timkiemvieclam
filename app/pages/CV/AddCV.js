import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { app } from "../../../firebaseConfig";
import { getFirestore, addDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Picker } from "@react-native-picker/picker";
import { useUser } from "@clerk/clerk-expo";
import DateTimePicker from "@react-native-community/datetimepicker";
import TitleInput from "../../components/CV/TitleInput";
import LoadingOverlay from "../../components/LoadingOverlay";
export default function AddCV() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const db = getFirestore(app);
  const { user } = useUser();
  const [focusedInput, setFocusedInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedInput, setSelectedInput] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onSubmitMethod = async (value) => {
    try {
      setLoading(true);
      if (image === null) {
        ToastAndroid.show(
          "Vui lòng chọn ảnh đại diện!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoading(false); // Set loading to false before return
        return;
      }
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, "avatarCV/" + Date.now() + ".jpg");
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);

      console.log("Download URL:", downloadUrl);

      value.Avatar = downloadUrl;
      value.DateBirth = dateOfBirth;
      value.IDUser = user?.id;
      value.ID = generateRandomId(8);
      value.Status = 1;
      const docRef = await addDoc(collection(db, "CV"), value);
      navigation.goBack();
      if (docRef.id) {
        setLoading(false);
        console.log("Document Added");
        ToastAndroid.show(
          "Tạo CV thành công !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding document: ", error);
      Alert.alert("Error !!!", "Failed to add post, please try again.");
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
      setDateOfBirth(formatDate(currentDate));
      toggleDatepicker();
    }
  };

  useEffect(() => {
    console.log("Ngày sinh đã được thiết lập mới:", dateOfBirth);
    console.log("ShowPicker: " + showPicker);
  }, [dateOfBirth, showPicker]);
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
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20 }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Add CV</Text>
      </View>

      <KeyboardAvoidingView>
        <ScrollView
          style={{
            margin: 0,
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 60,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              NameCV: "",
              Avatar: "",
              DateBirth: "",
              Email: "",
              Experience: "",
              Gender: "",
              ID: "",
              IDUser: "",
              Interest: "",
              Introduction: "",
              Location: "",
              Name: "",
              Website: "",
              Phone: "",
              Experience: "",
              Interest: "",
              Skills: "",
            }}
            onSubmit={(value) => onSubmitMethod(value)}
            validate={(values) => {
              // const errors = {};
              // if (!values.title) {
              //   console.log("Title not Present");
              //   ToastAndroid.show("Title Must be There", ToastAndroid.SHORT);
              //   errors.name = "Title Must be there";
              // }
              // return errors;
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
            }) => (
              <View>
                <View style={{ alignItems: "center", margin: 30 }}>
                  <TouchableOpacity onPress={pickImage}>
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 150, height: 150, borderRadius: 100 }}
                      />
                    ) : (
                      <Image
                        style={{ width: 150, height: 150, borderRadius: 100 }}
                        source={require("../assets/not_avatar.jpg")}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      margin: 10,
                      backgroundColor: "#f1f2f4",
                      padding: 12,
                      borderRadius: 15,
                    }}
                    onPress={pickImage}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#333334",
                      }}
                    >
                      Chọn Avatar
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                  <TitleInput text={"Tên CV"} />
                  <TextInput
                    style={[
                      styles.input,
                      selectedInput === "NameCV" && styles.selectedInput,
                    ]}
                    placeholder="Nhập tên CV"
                    value={values?.NameCV}
                    onChangeText={handleChange("NameCV")}
                    placeholderTextColor="#c9cdd6"
                    onFocus={() => setSelectedInput("NameCV")}
                    onBlur={() => setSelectedInput(null)}
                    caretColor="blue"
                  />
                  <TitleInput text={"Họ tên"} />
                  <TextInput
                    style={[
                      styles.input,
                      selectedInput === "Name" && styles.selectedInput,
                    ]}
                    placeholder="Nhập họ tên"
                    value={values?.Name}
                    onChangeText={handleChange("Name")}
                    placeholderTextColor="#c9cdd6"
                    onFocus={() => setSelectedInput("Name")}
                    onBlur={() => setSelectedInput(null)}
                    caretColor="blue"
                  />
                  <TitleInput text={"Số điện thoại"} />
                  <TextInput
                    style={[
                      styles.input,
                      selectedInput === "Phone" && styles.selectedInput,
                    ]}
                    placeholder="Nhập số điện thoại"
                    value={values?.Phone}
                    keyboardType="numeric"
                    onChangeText={handleChange("Phone")}
                    placeholderTextColor="#c9cdd6"
                    onFocus={() => setSelectedInput("Phone")}
                    onBlur={() => setSelectedInput(null)}
                  />
                  <TitleInput text={"Email"} />
                  <TextInput
                    style={[
                      styles.input,
                      selectedInput === "Email" && styles.selectedInput,
                    ]}
                    placeholder="Nhập Email"
                    value={values?.Email}
                    onChangeText={handleChange("Email")}
                    placeholderTextColor="#c9cdd6"
                    onFocus={() => setSelectedInput("Email")}
                    onBlur={() => setSelectedInput(null)}
                  />
                  <TitleInput text={"Giới tính"} />
                  <View
                    style={[
                      {
                        borderColor: "#c9cdd5",
                        borderWidth: 2,
                        borderRadius: 10,
                      },
                      selectedInput === "Gender" && styles.selectedInput,
                    ]}
                  >
                    <Picker
                      selectedValue={values?.Gender}
                      onValueChange={(itemValue) =>
                        handleChange("Gender")(itemValue)
                      }
                      placeholderTextColor="#c9cdd6"
                      onFocus={() => setSelectedInput("Gender")} // Đặt selectedInput khi Picker được chọn
                      onBlur={() => setSelectedInput(null)} // Đặt selectedInput khi Picker mất focus
                    >
                      <Picker.Item label="Nam" value="Nam" />
                      <Picker.Item label="Nữ" value="Nữ" />
                    </Picker>
                  </View>

                  <TitleInput text={"Ngày sinh"} />
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
                      value={dateOfBirth}
                      editable={false}
                    />
                  </Pressable>
                  <TitleInput text={"Địa chỉ"} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập địa chỉ"
                    value={values?.Location}
                    onChangeText={handleChange("Location")}
                  />
                  <TitleInput text={"Kinh nghiệm"} />
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input2}
                      keyboardType="numeric"
                      placeholder="Số năm kinh nghiệm"
                      value={values?.Experience}
                      onChangeText={handleChange("Experience")}
                    />
                    <Text style={styles.unitText}>Năm</Text>
                  </View>
                  <TitleInput text={"Website"} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập link website"
                    value={values?.Website}
                    onChangeText={handleChange("Website")}
                  />
                  <TitleInput text={"Định hướng nghề nghiệp"} />
                  <TextInput
                    style={[styles.input, { textAlignVertical: "top" }]}
                    placeholder="Định hướng nghề nghiệp"
                    value={values?.Introduction}
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={handleChange("Introduction")}
                  />
                  <TitleInput text={"Sở thích"} />
                  <TextInput
                    style={[styles.input, { textAlignVertical: "top" }]}
                    placeholder="Sở thích"
                    value={values?.Interest}
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={handleChange("Interest")}
                  />
                  <TitleInput text={"Kĩ năng"} />
                  <TextInput
                    style={[styles.input, { textAlignVertical: "top" }]}
                    placeholder="Kĩ năng"
                    value={values?.Skills}
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={handleChange("Skills")}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  styles={{
                    backgroundColor: loading ? "#ccc" : "#007BFF",
                    marginBottom: 40,
                  }}
                  disabled={loading}
                  className="p-4 bg-blue-500 rounded-full mt-2 mb-10"
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white text-center text-[16px]">
                      SAVE
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingOverlay loading={loading} />
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#c9cdd5",
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 15,
    // textAlignVertical: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#c9cdd5",
    marginTop: 10,
    marginBottom: 5,
  },
  input2: {
    flex: 1,
    padding: 10,
    fontSize: 15,
  },
  unitText: {
    marginRight: 10,
    fontSize: 17,
  },
  selectedInput: {
    borderColor: "#1558d5",
  },
});
