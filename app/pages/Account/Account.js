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

import { getFirestore } from "firebase/firestore";
import LoadingOverlay from "../../components/LoadingOverlay";
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
        <ScrollView>
          <View style={styles.profile}>
            <Image
              alt=""
              source={{ uri: user?.imageUrl }}
              style={styles.profileAvatar}
            />

            <Text style={styles.profileName}> {user?.fullName}</Text>

            <Text style={styles.profileEmail}>
              {user?.primaryEmailAddress?.toString()}
            </Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>

                <FeatherIcon color="#fff" name="edit" size={16} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#2B66EF" }]}
                  >
                    <FeatherIcon color="#fff" name="clipboard" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Hồ sơ cá nhân</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
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
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
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
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: "600",
    color: "#2B66EF",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
});
