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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { app } from "../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Picker } from "@react-native-picker/picker";
import { useUser } from "@clerk/clerk-expo";
export default function AddCV() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const db = getFirestore(app);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
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
    // console.log(value);
    setLoading(true);
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          value.image = downloadUrl;
          value.userName = user.fullName;
          value.createdAt = Date.now();
          value.userEmail = user.primaryEmailAddress.emailAddress;
          value.userImage = user.imageUrl;
          const docRef = await addDoc(collection(db, "UserPost"), value);
          if (docRef.id) {
            setLoading(false);
            console.log("Document Added");
            Alert.alert("Success !!!", "Post Added Successfully !");
          }
        });
      });
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
            margin: 10,
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 60,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              title: "",
              desc: "",
              category: "",
              address: "",
              price: "",
              image: "",
              userName: "",
              userEmail: "",
              userImage: "",
              createdAt: Date.now(),
            }}
            onSubmit={(value) => onSubmitMethod(value)}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                console.log("Title not Present");
                ToastAndroid.show("Title Must be There", ToastAndroid.SHORT);
                errors.name = "Title Must be there";
              }
              return errors;
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
                <View style={{ alignItems: "center", margin: 10 }}>
                  <TouchableOpacity onPress={pickImage}>
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 170, height: 170, borderRadius: 100 }}
                      />
                    ) : (
                      <Image
                        style={{ width: 170, height: 170, borderRadius: 100 }}
                        source={require("./assets/not_avatar.jpg")}
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#333333",
                        fontWeight: "bold",
                      }}
                    >
                      Họ tên
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#f04439",
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập họ tên"
                    value={values?.title}
                    onChangeText={handleChange("title")}
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#333333",
                        fontWeight: "bold",
                      }}
                    >
                      Ngày sinh
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#f04439",
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      *
                    </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Descrjihhption"
                    value={values?.desc}
                    numberOfLines={5}
                    onChangeText={handleChange("desc")}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={values?.price}
                    keyboardType="number-pad"
                    onChangeText={handleChange("price")}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={values?.address}
                    onChangeText={handleChange("address")}
                  />
                  <Picker
                    selectedValue={values?.category}
                    className="bolder-2"
                    onValueChange={(itemValue) =>
                      setFieldValue("category", itemValue)
                    }
                  >
                    {/* {categoryList.length > 0 &&
                      categoryList?.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item?.name}
                          value={item?.name}
                        />
                      ))} */}
                  </Picker>
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  styles={{
                    backgroundColor: loading ? "#ccc" : "#007BFF",
                  }}
                  disabled={loading}
                  className="p-4 bg-blue-500 rounded-full mt-10"
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white text-center text-[16px]">
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>
                {/* <Button onPress={handleSubmit} className="mt-7" title="submit" /> */}
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#c9cdd5",
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 15,
    textAlignVertical: "center",
  },
});
