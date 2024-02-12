import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeOptionCard = ({ data, status }) => {
  const orgName = data["Organisation Name"]
    .split('"')
    .join("")
    .replace(/[\r\n"]+/g, "");
  const town = data["Town/City"]
    .split('"')
    .join("")
    .replace(/[\r\n"]+/g, "");
  const country = data["County"]
    .split('"')
    .join("")
    .replace(/[\r\n"]+/g, "");
  const typeRating = data["Type & Rating"]
    .split('"')
    .join("")
    .replace(/[\r\n"]+/g, "");
  const route = data["Route"]
    .split('"')
    .join("")
    .replace(/[\r\n"]+/g, "");

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.leftItems}>
          <Text style={styles.title}>Company</Text>
          <Text style={styles.titleValue}>{orgName}</Text>
        </View>
        <View style={styles.leftItems}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.titleValue}>
            {town}
            {country ? "," + country : ""}
          </Text>
        </View>
        <View style={styles.leftItems}>
          <Text style={styles.title}>License Tiar</Text>
          <Text style={styles.titleValue}>
            {typeRating}
            {route ? "," + route : ""}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.title}>Status</Text>
        {status === "active" && (
          <Text style={[styles.titleValue, { color: "green" }]}>Active</Text>
        )}
        {status === "removed" && (
          <Text style={[styles.titleValue, { color: "red" }]}>Removed</Text>
        )}
      </View>
    </View>
  );
};

export default HomeOptionCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 3,
    backgroundColor: "#ddf3f8",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
  },
  left: {
    gap: 3,
    width: "80%",
  },
  leftItems: {
    gap: -2,
  },
  right: {
    alignItems: "center",
    width: "20%",
  },
  title: {
    fontWeight: "700",
    color: "#737e81",
  },
  titleValue: {
    fontWeight: "bold",
    color: "black",
  },
});
