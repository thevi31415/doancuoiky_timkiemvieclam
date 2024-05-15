import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { app } from "../../../firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getFirestore } from "firebase/firestore";
import LoadingOverlay from "../../components/LoadingOverlay";
import Entypo from "@expo/vector-icons/Entypo";
removeValue = async () => {
  try {
    await AsyncStorage.removeItem("userAccount");
  } catch (e) {}
};
export default function Account() {
  const { isLoaded, signOut } = useAuth();
  const db = getFirestore(app);
  const [userAccount, setUserAccount] = useState(null);
  const [countBookMarkJob, setCountBookMarkJob] = useState(0);
  const [countCompanyFollowed, setCountCompanyFollowed] = useState(0);
  const [countJobApply, setCountJobApply] = useState(0);

  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userId = user?.id?.substring(user?.id?.length - 7);
  const fetchDataBookmark = async () => {
    setLoading(true);

    try {
      const bookMarkSnapshot = await getDocs(collection(db, "BookmarkJob"));
      const bookMark = bookMarkSnapshot.docs.filter((doc) => {
        const data = doc.data();
        return data.IDUser == user?.id;
      });
      const IDBookmarkArray = bookMark.map((doc) => doc.id);
      if (IDBookmarkArray.length > 0) {
        setCountBookMarkJob(IDBookmarkArray.length);
      } else {
        setCountBookMarkJob(0);
      }
    } catch (error) {
      console.error("Error fetching data bookmark:", error);
    }
    try {
      const companyFollowedSnapshot = await getDocs(
        collection(db, "FollowCompany")
      );
      const companyFollowed = companyFollowedSnapshot.docs.filter((doc) => {
        const data = doc.data();
        return data.IDUser == user?.id;
      });
      const IDCompanyFollowed = companyFollowed.map((doc) => doc.id);
      if (IDCompanyFollowed.length > 0) {
        setCountCompanyFollowed(IDCompanyFollowed.length);
      } else {
        setCountCompanyFollowed(0);
      }
    } catch (error) {
      console.error("Error fetching data bookmark:", error);
    }
    try {
      const applyJobSnapshot = await getDocs(collection(db, "ApplyJob"));
      const applyJob = applyJobSnapshot.docs.filter((doc) => {
        const data = doc.data();
        return data.IDUser == user?.id;
      });
      const IDApplyJob = applyJob.map((doc) => doc.id);
      if (IDApplyJob.length > 0) {
        setCountJobApply(IDApplyJob.length);
      } else {
        setCountJobApply(0);
      }
    } catch (error) {
      console.error("Error fetching data bookmark:", error);
    }
    setLoading(false);
    console.log("Viec da luu: " + countBookMarkJob);
  };
  useEffect(() => {
    fetchDataBookmark();
  }, [countBookMarkJob]);
  useFocusEffect(
    React.useCallback(() => {
      fetchDataBookmark();
    }, [])
  );

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userAccount");
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setUserAccount(parsedValue);
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.profile}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                marginTop: 20,
                backgroundColor: "#ffffff",
                borderRadius: 10,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: user?.imageUrl }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    padding: 15,
                    borderWidth: 3, // Thêm đường viền
                    borderColor: "#015aff", // Màu của đường viền
                  }}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#333333",
                  }}
                >
                  {user?.fullName}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#666666",
                  }}
                >
                  {user?.primaryEmailAddress?.toString()}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#666666",
                  }}
                >
                  Mã ứng viên:
                  <Text style={{ fontWeight: "bold" }}> {userId}</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>

            <View style={styles.sectionBody}>
              {/* <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#2B66EF" }]}
                  >
                    <FeatherIcon color="#fff" name="clipboard" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Hồ sơ cá nhân</Text>
                </TouchableOpacity>
              </View> */}

              <TouchableOpacity
                style={{
                  height: 100,
                  borderRadius: 17,
                  backgroundColor: "#f1f2f4",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FeatherIcon color="#000" name="clipboard" size={30} />
                  <Text style={{ marginLeft: 5 }}>Số lượng hồ sơ</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text>0</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quản lý tìm việc</Text>

              <View style={styles.sectionBody}>
                <TouchableOpacity style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: "#2B66EF" }]}
                    >
                      <FeatherIcon color="#fff" name="briefcase" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Việc làm đã ứng tuyển</Text>

                    <View style={styles.rowSpacer} />
                    <Text style={styles.rowValue}>{countJobApply}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: "#2B66EF" }]}
                    >
                      <FeatherIcon color="#fff" name="bookmark" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Việc làm đã lưu</Text>

                    <View style={styles.rowSpacer} />
                    <Text style={styles.rowValue}>{countBookMarkJob}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: "#2B66EF" }]}
                    >
                      <FeatherIcon color="#fff" name="rss" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Công ty đang theo dõi</Text>

                    <View style={styles.rowSpacer} />
                    <Text style={styles.rowValue}>{countCompanyFollowed}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quản lý tìm việc</Text>
              <View style={styles.container2}>
                <View style={styles.row2}>
                  <TouchableOpacity style={styles.rectangle2}>
                    <FontAwesome
                      name="bookmark"
                      size={24}
                      color="#015aff"
                      style={{ marginBottom: 10 }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#333333",
                          fontSize: 15,
                          fontWeight: "bold",
                          alignSelf: "flex-start", // căn chỉnh văn bản ở góc trái
                        }}
                      >
                        Việc làm đã lưu
                      </Text>
                      <Text
                        style={{
                          color: "#015aff",
                          fontSize: 20,
                          fontWeight: "bold",
                          alignSelf: "flex-end", // căn chỉnh số ở góc phải
                        }}
                      >
                        {countBookMarkJob}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rectangle2}>
                    <FontAwesome
                      name="bell"
                      size={24}
                      color="#015aff"
                      style={{ marginBottom: 10 }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#333333",
                          fontSize: 15,
                          fontWeight: "bold",
                          alignSelf: "flex-start", // căn chỉnh văn bản ở góc trái
                        }}
                      >
                        Công ty đang theo dõi
                      </Text>
                      <Text
                        style={{
                          color: "#015aff",
                          fontSize: 20,
                          fontWeight: "bold",
                          alignSelf: "flex-end", // căn chỉnh số ở góc phải
                        }}
                      >
                        {countCompanyFollowed}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.row2}>
                  <TouchableOpacity style={styles.rectangle2}>
                    <FontAwesome
                      name="shopping-bag"
                      size={24}
                      color="#015aff"
                      style={{ marginBottom: 10 }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#333333",
                          fontSize: 15,
                          fontWeight: "bold",
                          alignSelf: "flex-start", // căn chỉnh văn bản ở góc trái
                        }}
                      >
                        Việc làm đã ứng tuyển
                      </Text>
                      <Text
                        style={{
                          color: "#015aff",
                          fontSize: 20,
                          fontWeight: "bold",
                          alignSelf: "flex-end", // căn chỉnh số ở góc phải
                        }}
                      >
                        {countJobApply}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rectangle2}>
                    <FontAwesome
                      name="check-circle"
                      size={24}
                      color="#015aff"
                      style={{ marginBottom: 10 }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#333333",
                          fontSize: 15,
                          fontWeight: "bold",
                          alignSelf: "flex-start", // căn chỉnh văn bản ở góc trái
                        }}
                      >
                        Việc làm đã được tuyển
                      </Text>
                      <Text
                        style={{
                          color: "#015aff",
                          fontSize: 20,
                          fontWeight: "bold",
                          alignSelf: "flex-end", // căn chỉnh số ở góc phải
                        }}
                      >
                        x
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tài khoản</Text>

              <View style={styles.sectionBody}>
                <TouchableOpacity
                  style={[styles.rowWrapper, styles.rowFirst]}
                  onPress={() => {
                    removeValue();
                    signOut();
                  }}
                >
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: "#FF0000" }]}
                    >
                      <FeatherIcon color="#fff" name="log-out" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Đăng xuất</Text>

                    <View style={styles.rowSpacer} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: "#FF0000" }]}
                    >
                      <FeatherIcon color="#fff" name="trash-2" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Xóa tài khoản</Text>

                    <View style={styles.rowSpacer} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <LoadingOverlay loading={loading} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexShrink: 1,
    flexBasis: 0,
  },

  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  /** Profile */
  profile: {
    padding: 0,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B66EF",
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 5,
    fontSize: 17,
    fontWeight: "bold",
    color: "#373737",
  },
  sectionBody: {
    backgroundColor: "#fff",

    borderColor: "#e3e3e3",
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#004bd4",
    marginRight: 4,
  },

  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row2: {
    flexDirection: "row",
    marginBottom: 10,
  },
  rectangle2: {
    width: 165,
    height: 100,
    borderRadius: 17,
    backgroundColor: "#f1f2f4",
    marginHorizontal: 5,
    justifyContent: "center",
    padding: 15,
  },
  text2: {
    color: "white",
  },
});
