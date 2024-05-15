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
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import TitleInput from "../../components/CV/TitleInput";

export default function AddCV() {
  return (
    <>
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
            }}
            onSubmit={(value) => onSubmitMethod(value)}
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
                  <TitleInput text={"Họ tên"} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập họ tên"
                    value={values?.Name}
                    onChangeText={handleChange("Name")}
                  />
                  <TitleInput text={"Số điện thoại"} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập số điện thoại"
                    value={values?.Phone}
                    onChangeText={handleChange("Phone")}
                  />
                  <TitleInput text={"Email"} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập Email"
                    value={values?.Email}
                    onChangeText={handleChange("Email")}
                  />
                  <TitleInput text={"Giới tính"} />
                  <View
                    style={{
                      borderColor: "#c9cdd5",
                      borderWidth: 2,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      selectedValue={values?.Gender}
                      onValueChange={(itemValue) =>
                        handleChange("Gender")(itemValue)
                      }
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
                    value={values?.Website}
                    onChangeText={handleChange("Location")}
                  />
                  <TitleInput text={"Kinh nghiệm"} />
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input2}
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
                    style={styles.input}
                    placeholder="Descrjihhption"
                    value={values?.Introduction}
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={handleChange("Introduction")}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  styles={{
                    backgroundColor: loading ? "#ccc" : "#007BFF",
                  }}
                  disabled={loading}
                  className="p-4 bg-blue-500 rounded-full mt-2 mb-10"
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white text-center text-[16px]">
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
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
});
