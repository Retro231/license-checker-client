import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ResultCard = ({ result }) => {
  // "company_name": "KM CATERING LIMITED",
  // "address": "8 High Street, Shefford, Beds, England, SG17 5DG",
  // "license_tier": "Worker (A rating), Skilled Worker",
  // "status": "active",
  // "relatedResult": null
  console.log("resultCard", result);
  console.log(result.address);
  return (
    <View
      style={{
        padding: 10,
        gap: 5,
        backgroundColor: "#dfebf7",
        borderRadius: 10,
      }}
    >
      <Text style={styles.TextWrapper}>Company Name:</Text>
      <Text style={[styles.text, { textTransform: "none" }]}>
        {result?.company_name ? result.company_name : "Not found"}
      </Text>
      <Text style={styles.TextWrapper}>Address:</Text>
      <Text style={styles.text}>
        {result?.address ? result.address : "Not found"}
      </Text>
      <Text style={styles.TextWrapper}>License_tier:</Text>
      <Text style={styles.text}>
        {result?.license_tier ? result.license_tier : "Not found"}
      </Text>  
      <Text style={styles.TextWrapper}>Status:</Text>
      <Text style={styles.text}>
        {result?.status ? result.status : "Not found"}
      </Text>
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  TextWrapper: {
    fontWeight: "bold",
    fontSize: 15,
  },
  text: {
    fontWeight: "400",
    marginBottom: 10,
    textTransform: "capitalize",
  },
});
