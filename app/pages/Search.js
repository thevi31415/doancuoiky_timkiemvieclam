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
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { app } from "../../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import ItemHint from "../components/SearchScreen/ItemHint";
import { useNavigation } from "@react-navigation/native";
import TopCompany from "../components/HomeScreen/TopCompany";
import CompaniesItem from "../components/HomeScreen/CompanyItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ResultSearchCompanies from "../components/SearchScreen/ResultSearchCompanies";
import ResultSearchCompaniesStackNav from "../components/SearchScreen/ResultSearchCompaniesStackNav";

export default function Search() {
  const Tab = createMaterialTopTabNavigator();

  const db = getFirestore(app);
  const [searchText, setSearchText] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showHints, setShowHints] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultJob, setSearchResultJob] = useState([]);

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
  const fetchSearchResultJobByName = async (nameText) => {
    try {
      setSearchText(nameText);
      const jobSnapshot = await getDocs(collection(db, "Jobs"));
      const jobs = jobSnapshot.docs.map((doc) => doc.data());
      const searchTextWithoutAccents = removeAccents(nameText.toLowerCase());
      const searchResultJob = jobs.filter((job) =>
        removeAccents(job.Name.toLowerCase()).includes(searchTextWithoutAccents)
      );
      setSearchResultJob(searchResultJob);
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
    fetchSearchResultJobByName(searchText);
  };
  const navigation = useNavigation();
  return (
    <View className="bg-white" style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={32} color="#2c67f2" />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#F4F6F5",
            padding: 5,
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1.5,
            borderColor: "#2c67f2",
            width: 300,
            marginLeft: 8,
          }}
        >
          <TouchableOpacity onPress={handleSearchIconPress}>
            <Ionicons name="search" size={24} color="#2c67f2" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search job, company, etc.."
            placeholderTextColor={"#171716"}
            style={{ marginLeft: 8, flex: 1, backgroundColor: "#F4F6F5" }}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity>
            <Ionicons name="filter" size={24} color="#2c67f2" />
          </TouchableOpacity>
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
          <Tab.Navigator style={{ flex: 1 }}>
            <Tab.Screen name="All" component={ResultSearchCompaniesStackNav} />

            <Tab.Screen name="Job">
              {() => (
                <ResultSearchCompaniesStackNav itemList={searchResultJob} />
              )}
            </Tab.Screen>
            <Tab.Screen name="Companies">
              {() => <ResultSearchCompaniesStackNav itemList={searchResult} />}
            </Tab.Screen>
          </Tab.Navigator>
        </>
      )}
    </View>
  );
}
