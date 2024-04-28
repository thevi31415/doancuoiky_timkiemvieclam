import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";

import { app } from "../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import ItemHint from "../components/SearchScreen/ItemHint";
import { useNavigation } from "@react-navigation/native";
import TopCompany from "../components/HomeScreen/TopCompany";
import CompaniesItem from "../components/HomeScreen/CompanyItem";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Search() {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const [searchText, setSearchText] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showHints, setShowHints] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [init, setInit] = useState(true);
  useEffect(() => {
    if (init) {
      fetchDataHint();
      setShowHints(true);
      setInit(false);
      console.log("Init: " + init);
    }
  }, [init]);

  useEffect(() => {
    if (searchText.length >= 2) {
      fetchDataHint();
    } else {
      setFilteredCompanies([]);
    }
  }, [searchText]);

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");
  };
  const fetchDataHint = async () => {
    try {
      const companySnapshot = await getDocs(collection(db, "Company"));
      const companies = companySnapshot.docs.map((doc) => doc.data());
      const searchTextWithoutAccents = removeAccents(searchText.toLowerCase());
      const filtered = companies.filter((company) =>
        removeAccents(company.Name.toLowerCase()).includes(
          searchTextWithoutAccents
        )
      );
      setFilteredCompanies(filtered);
      setShowHints(true);
      setShowSearchResult(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("Init - hint: " + init);

    console.log("Fetch Hint" + showHints + "-" + showSearchResult);
  };

  const fetchSearchResultByName = async (nameText) => {
    try {
      setSearchText(nameText);
      const companySnapshot = await getDocs(collection(db, "Company"));
      const companies = companySnapshot.docs.map((doc) => doc.data());
      const searchTextWithoutAccents = removeAccents(nameText.toLowerCase());
      const searchResult = companies.filter((company) =>
        removeAccents(company.Name.toLowerCase()).includes(
          searchTextWithoutAccents
        )
      );
      setSearchResult(searchResult);
      setShowHints(false);
      setShowSearchResult(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("Result: " + init);

    console.log("Fetch Results" + showHints + "-" + showSearchResult);
  };
  const changeSearchTextValue = () => {};

  const handleHintPress = (hint) => {
    fetchSearchResultByName(hint.Name);
    console.log("Hint presss:" + showHints + "-" + showSearchResult);
  };
  const handleSearchIconPress = () => {
    fetchSearchResultByName(searchText);
  };

  return (
    <View className="bg-white" style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="bg-white">
        <View className="bg-white">
          <View
            style={{
              backgroundColor: "#FFF",
              padding: 12,
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
              bottom: -10,
              width: 350,
              alignSelf: "center",
              borderWidth: 1.5,
              borderColor: "#2c67f2",
              backgroundColor: "#F4F6F5",
            }}
          >
            <TouchableOpacity onPress={handleSearchIconPress}>
              <Ionicons name="search" size={24} color="#2c67f2" />
            </TouchableOpacity>
            <TextInput
              placeholder="Search job, company, etc.."
              placeholderTextColor={"#171716"}
              style={{
                marginLeft: 8,
                flex: 1,
                backgroundColor: "#F4F6F5",
              }}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity>
              <Ionicons name="filter" size={24} color="#2c67f2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showHints && (
        <>
          <Text
            className="m-3 mt-5"
            style={{ color: "#2c67f2", fontWeight: "bold", fontSize: 15 }}
          >
            Gợi ý tìm kiếmx
          </Text>
          <FlatList
            data={filteredCompanies}
            className=" bg-white  border-spacing-x-32 rounded-t "
            style={{ paddingLeft: 10, paddingRight: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleHintPress(item)}>
                <ItemHint itemHint={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.ID}
          />
        </>
      )}
      {showSearchResult && (
        <>
          {/* <ScrollView
            style={{ flex: 1, marginTop: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text
                className="m-3 mt-5"
                style={{ color: "#2c67f2", fontWeight: "bold", fontSize: 15 }}
              >
                Kết quả tìm kiếm "{searchText}"
              </Text>
              <FlatList
                data={searchResult}
                className=" bg-white  border-spacing-x-32 rounded-t "
                style={{ paddingLeft: 10, paddingRight: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleHintPress(item)}>
                    <CompaniesItem item={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.ID}
              />
            </View>
          </ScrollView> */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#ffff",
                marginVertical: 10,
              }}
            >
              <Text
                className="m-3 mt-5"
                style={{ color: "#2c67f2", fontWeight: "bold", fontSize: 15 }}
              >
                Kết quả tìm kiếm "{searchText}"
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={searchResult}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleHintPress(item)}
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      borderBottomColor: "#F5F6F6",
                    }}
                  >
                    {/* <CompaniesItem item={item} /> */}
                    <View
                      style={[
                        {
                          marginVertical: 16,
                          marginHorizontal: 25,
                          flexDirection: "row",
                          alignItems: "center",
                        },
                      ]}
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
                            color: "black",
                            fontWeight: "bold",
                            width: 230,
                          }}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {item?.Name}
                        </Text>
                        <TouchableOpacity onPress={() => {}}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "lightgray",
                              fontWeight: "bold",
                              marginTop: 3,
                            }}
                          >
                            {item?.Name}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "gray",
                            marginTop: 3,
                          }}
                        >
                          {item?.Location}
                        </Text>
                        {item.hasSchoolAlumni ? (
                          <View style={Styles.flexCenter}>
                            <Image
                              source={Images.LOGOS.UNIVERSITY}
                              style={{
                                height: 25,
                                width: 25,
                                marginVertical: 5,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 13,
                                color: "gray",
                                marginLeft: 10,
                              }}
                            >
                              {item.alumniCount} School Alumni
                            </Text>
                          </View>
                        ) : null}

                        <Text style={{ fontSize: 13, color: "gray" }}>
                          {item.daysAgo}
                          {item.daysAgo > 1 ? " days " : " day "}
                          Ago
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="bookmark-outline"
                          size={28}
                          color={"gray"}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.ID}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
