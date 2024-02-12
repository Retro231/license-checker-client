import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import Header from "../Header";
import Search from "../Search";
import { homeOptions } from "../../assets/api/homeOptions";
import { companyHouseSearch } from "../../helper/companyHouseSearch";
import { getSearchResult } from "../../helper/getSearchResult";
import Loading from "./../utils/Loading";
import { useSelector } from "react-redux";
const Home = () => {
  const navigation = useNavigation();
  const [typedText, setTypedText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notfound, setNotfound] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { activeOrg, newAddedOrg, removedOrg } = useSelector(
    (state) => state.app
  );
  console.log(activeOrg.totalItem);
  const handleFocus = () => {
    console.log("focus");
    setIsFocused(true);
  };
  const handleBlur = () => {
    console.log("blur");
    setIsFocused(false);
  };

  const handleTextChange = (text) => {
    setTypedText(text);
  };

  const handleSubmit = async () => {
    if (typedText !== "") {
      setLoading(true);
      const result = await getSearchResult(typedText);
      setLoading(false);

      if (result === null) {
        setNotfound(true);
        setTimeout(() => {
          setNotfound(false);
        }, 2000);
      }

      if (typedText !== "" && result?.relatedResult === null) {
        navigation.navigate("SearchResult", { result });
      }
      if (typedText !== "" && result?.relatedResult !== null) {
        setSuggestions(result?.relatedResult);
        console.log(result?.relatedResult);
      }
      setTypedText("");
    }
  };

  const handleSelection = async (item) => {
    setLoading(true);
    const result = await companyHouseSearch(item);
    navigation.navigate("SearchResult", { result });
    setLoading(false);
    setSuggestions([]);
  };

  const handleOptionPress = (caption) => {
    navigation.navigate("HomeOption", { caption });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View
        style={{
          flex: isFocused ? 3 : 1,
          width: "100%",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Search
          handleTextChange={handleTextChange}
          typedText={typedText}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
        />
        {isFocused && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 45,
            }}
          >
            <View
              style={{
                width: "65%",
                backgroundColor: "#DDF3F8",
              }}
            >
              {!loading && notfound && (
                <View style={{ padding: 10 }}>
                  <Text style={{ textAlign: "center" }}>
                    No result found. Try something else.
                  </Text>
                </View>
              )}
              {loading && (
                <View style={{ padding: 10 }}>
                  <Loading />
                </View>
              )}
              {suggestions?.length !== 0 && (
                <>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                  >
                    {suggestions?.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          margin: 5,
                          borderBottomWidth: 1,
                          borderBottomColor: "#039EBD",
                          padding: 10,
                        }}
                        onPress={() => handleSelection(item)}
                      >
                        <Text style={{ textAlign: "center" }}>
                          {item["Organisation Name"]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        )}
      </View>
      {!isFocused && (
        <View style={{ flex: 4 }}>
          <FlatList
            data={homeOptions}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={[
                  item.style,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    paddingHorizontal: 18,
                    paddingVertical: 36,
                    borderRadius: 16,
                    margin: 7,
                  },
                ]}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Icons
                    name={item.icon}
                    size={24}
                    style={{ color: item.color }}
                  />
                  <TouchableOpacity
                    onPress={() => handleOptionPress(item.caption)}
                  >
                    <Text style={[styles.text, { fontWeight: 600 }]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Text style={[styles.text]}>
                    {item.caption === "active" && activeOrg.totalItem}
                    {item.caption === "new" && newAddedOrg.totalItem}
                    {item.caption === "remove" && removedOrg.totalItem}
                  </Text>
                  <Icons name={item.valueIndicatorUp} size={24} />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});
