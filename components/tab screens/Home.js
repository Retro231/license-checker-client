import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import Header from "../Header";
import { homeOptions } from "../../assets/api/homeOptions";
import { companyHouseSearch } from "../../helper/companyHouseSearch";
import { getSearchResult } from "../../helper/getSearchResult";
import Loading from "./../utils/Loading";
import { useSelector } from "react-redux";
const Home = () => {
  const navigation = useNavigation();
  const [typedText, setTypedText] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notfound, setNotfound] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const searchInputRef = useRef();

  const { activeOrg, newAddedOrg, removedOrg } = useSelector(
    (state) => state.app
  );
  const handleFocus = () => {
    setIsFocused(true);
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
      }
      setTypedText("");
    }
  };

  const handleSearchBtnPress = () => {
    handleSubmit();
    searchInputRef.current.blur();
  };

  const handleSelection = async (item) => {
    setLoading(true);
    const result = await companyHouseSearch(item);
    navigation.navigate("SearchResult", { result });
    setLoading(false);
    setSuggestions();
  };

  const handleOptionPress = (caption) => {
    navigation.navigate("HomeOption", { caption });
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* search start */}
      <View
        style={{
          backgroundColor: "white",
          marginVertical: 36,
          position: "relative",
          width: "100%",
          zIndex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TextInput
            style={{
              height: 40,
              width: "65%",
              paddingLeft: 10,
              borderColor: "#039EBD",
              borderWidth: 1,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
            }}
            ref={searchInputRef}
            value={typedText}
            onChangeText={handleTextChange}
            onFocus={handleFocus}
            placeholder="Search"
            keyboardType="web-search"
            enterKeyHint="search"
            onSubmitEditing={handleSubmit}
          />

          <TouchableOpacity
            style={{
              width: "15%",
              height: 40,
              backgroundColor: "#039EBD",
              justifyContent: "center",
              alignItems: "center",
              borderTopEndRadius: 30,
              borderBottomEndRadius: 30,
              borderWidth: 0,
            }}
            onPress={handleSearchBtnPress}
          >
            <Icons name="search" size={26} />
          </TouchableOpacity>
        </View>
        {!loading && notfound && (
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={{ textAlign: "center" }}>
              No result found. Try something else.
            </Text>
          </View>
        )}
        <View
          style={{
            position: "absolute",
            top: 41,
            width: "100%",
            display: `${suggestions || loading ? "flex" : "none"}`,
            justifyContent: "center",
          }}
        >
          {loading && (
            <View
              style={{
                padding: 10,
              }}
            >
              <Loading />
            </View>
          )}
          {suggestions && !loading && (
            <View
              style={{
                height: 300,
                marginHorizontal: 30,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "#039EBD",
                backgroundColor: "#cfe7ff",
              }}
            >
              {suggestions?.length !== 0 && (
                <>
                  <FlatList
                    data={suggestions}
                    renderItem={({ item, index }) => (
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
                    )}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </View>
      {/* search end */}

      {/* home options */}
      {/* {isFocused && ( */}
      <View style={{ position: "relative", zIndex: 0 }}>
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
                  {item.caption === "active" && activeOrg?.totalItem}
                  {item.caption === "new" && newAddedOrg?.totalItem}
                  {item.caption === "remove" && removedOrg?.totalItem}
                </Text>
                <Icons name={item.valueIndicatorUp} size={24} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* )} */}
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
