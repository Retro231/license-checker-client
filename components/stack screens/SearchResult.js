import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import ResultCard from "../ResultCard";
import HeaderNavigate from "../HeaderNavigate";

const SearchResult = () => {
  const route = useRoute();
  const { result } = route.params;
  return (
    <View style={styles.container}>
      <HeaderNavigate />
      <View style={styles.news_area}>
        <Text style={styles.title}>Company Detalis: </Text>
        {result !== null && result.company_name && (
          <>
            <ResultCard result={result} />
          </>
        )}
      </View>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  news_area: {
    flex: 7,
    margin: 10,
  },
  title: {
    color: "#039EBD",
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 13,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },

  image: {
    width: 100,
    height: 70,
    borderRadius: 10,
  },
});
