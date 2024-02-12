import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Pagination = ({ pageIndex, totalPages, handlePrev, handleNext }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "#f1f1f1",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 15,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>
        Page - {pageIndex}/{totalPages}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => handlePrev()}>
          <Text style={{ fontWeight: "bold" }}>Prev</Text>
        </TouchableOpacity>
        <View
          style={{
            width: 2,
            height: "100%",
            backgroundColor: "#e0e0e0",
            marginHorizontal: 8,
          }}
        ></View>
        <TouchableOpacity onPress={() => handleNext()}>
          <Text style={{ fontWeight: "bold" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({});
