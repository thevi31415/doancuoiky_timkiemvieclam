import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

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

export default function JobSaved() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [listCompanyFollowed, setListCompanyFollowed] = useState([]);
  const [listInfoCompany, setListInfoCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);

  const fetchDataListCompanyFollowed = async () => {
    setLoading(true);
    console.log("IDuser: " + user?.id);
    try {
      const q = query(
        collection(db, "BookmarkJob"),
        where("IDUser", "==", user?.id)
      );

      const companyFollowedSnapshot = await getDocs(q);
      const companyFollowed = companyFollowedSnapshot.docs.map((doc) =>
        doc.data()
      );
      setListCompanyFollowed(companyFollowed);
    } catch (error) {
      console.error("Error fetching data following:", error);
    }
    console.log("Công ty đang theo dõi: " + listCompanyFollowed.length);
    setLoading(false);
  };
  useEffect(() => {
    fetchDataListCompanyFollowed();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchDataListCompanyFollowed();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchCompanyInfo = async () => {
    try {
      const companyIDs = listCompanyFollowed.map((company) => company.IDJob);

      if (companyIDs.length === 0) {
        console.log("Không có công ty nào để lấy thông tin");
        return;
      }
      const q = query(collection(db, "Jobs"), where("ID", "in", companyIDs));

      const companySnapshot = await getDocs(q);
      const companyData = companySnapshot.docs.map((doc) => doc.data());
      setListInfoCompany(companyData);
      console.log("Thông tin các công ty:", companyData);
    } catch (error) {
      console.error("Error fetching company info:", error);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, [listCompanyFollowed]);

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
          <Ionicons name="arrow-back-outline" size={30} color="#2c67f2" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Việc làm đã lưu
        </Text>
      </View>
      <View
        style={{
          margin: 2,
          backgroundColor: "white",
          width: "100%",
          height: "100%",
        }}
      >
        {listCompanyFollowed.length > 0 ? (
          <View>
            <View
              style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={{ fontSize: 17, color: "#015aff", fontWeight: "bold" }}
              >
                {listCompanyFollowed.length}
              </Text>
              <Text style={{ fontSize: 17, color: "#80888e", marginLeft: 5 }}>
                việc làm
              </Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listInfoCompany}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("job-detail", {
                      job: item,
                    })
                  }
                  style={{
                    marginLeft: 5,
                    marginRight: 5,
                    borderWidth: 1,
                    marginBottom: 10,

                    borderColor: "#6b9bf5",
                    borderBottomColor: "#F5F6F6",
                    borderRadius: 10,
                    backgroundColor: "#fafbff",
                  }}
                >
                  <View
                    style={{
                      marginVertical: 16,
                      marginHorizontal: 25,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item?.Logo }}
                      style={{
                        height: 50,
                        width: 50,
                        marginRight: 16,
                        borderRadius: 10,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#2c67f2",
                          fontWeight: "bold",
                          width: 230,
                        }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item?.NameJob}
                      </Text>
                      <TouchableOpacity onPress={() => {}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#333333",
                            fontWeight: "bold",
                            marginTop: 3,
                          }}
                        >
                          {item?.NameCompany}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 7,
                        }}
                      >
                        <AntDesign name="staro" size={20} color="#6b9bf5" />

                        <Text
                          style={{
                            color: "gray",
                            fontSize: 13,
                            marginLeft: 4,
                          }}
                        >
                          {item?.Experience} Kinh nghiệm
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",

                          marginTop: 4,
                        }}
                      >
                        <Ionicons
                          name="location-outline"
                          size={20}
                          color="#6b9bf5"
                        />

                        <Text
                          numberOfLines={4}
                          style={{
                            color: "gray",
                            fontSize: 13,
                            marginLeft: 4,
                          }}
                        >
                          {item?.LocationJob.substring(0, 25) + "..."}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 4,
                          marginLeft: 3,
                        }}
                      >
                        <AntDesign
                          name="clockcircleo"
                          size={16}
                          color="#6b9bf5"
                        />
                        <Text
                          style={{
                            color: "gray",
                            fontSize: 13,
                            marginLeft: 4,
                          }}
                        >
                          {item?.DateCreated}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                      <Ionicons
                        name="bookmark-outline"
                        size={25}
                        color={"#6b9bf5"}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.ID}
            />
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{
                height: 250,
                width: 250,
              }}
              source={require("../assets/not_found_account.jpg")}
            />
            <Text
              style={{
                margin: 10,
                fontSize: 18,
                color: "#9c9c9c",
                fontWeight: "bold",
              }}
            >
              Bạn chưa lưu việc làm nào
            </Text>
          </View>
        )}
      </View>

      <LoadingOverlay loading={loading} />
    </>
  );
}
