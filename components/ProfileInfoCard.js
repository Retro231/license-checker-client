import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfileInfoCard = ({ icon, title, value }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{value}</Text>
      </View>
      <View style={styles.verticalDivider}></View>
      <Image source={icon} style={styles.image} />
    </View>
  );
};

export default ProfileInfoCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
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
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#4B4B4B",
  },
  title: {
    fontSize: 12,
    // color: "#666666",
    color: "#039EBD",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  verticalDivider: {
    width: 2,
    height: "100%",
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
});
