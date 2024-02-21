import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Clipboard from "@react-native-clipboard/clipboard";
import Icons from "@expo/vector-icons/MaterialIcons";

const HomeOptionCard = ({ data, status }) => {
  const [isCopied, setIsCopied] = useState(false);
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

  const handleCopy = () => {
    Clipboard.setString(
      `Company: ${orgName};\nAddress: ${town},${country};\nLicense Tiar: ${typeRating},${route},\nStatus: ${status}`
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={handleCopy}>
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
        <View style={styles.copyToast}>
          <TouchableOpacity onPress={handleCopy}>
            <Text style={styles.copyToastText}>
              <Icons name="content-copy" color={"#039EBD"} size={14} />
              {`${isCopied ? " Copied" : ""}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeOptionCard;

const styles = StyleSheet.create({
  container: {
    position: "relative",
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
  copyToast: {
    position: "absolute",
    width: 70,
    height: 30,
    // backgroundColor: "black",
    top: 8,
    right: 16,
  },
  copyToastText: {
    color: "#039EBD",
    textAlign: "right",
    fontWeight: "bold",
  },
  left: {
    gap: 3,
    width: "80%",
  },
  leftItems: {
    gap: -2,
  },
  right: {
    position: "relative",
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
