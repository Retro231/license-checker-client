import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icons from "@expo/vector-icons/MaterialIcons";
import Clipboard from "@react-native-clipboard/clipboard";
const ResultCard = ({ result }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(
      `Company: ${
        result?.company_name ? result.company_name : "Not found"
      };\nAddress: ${
        result?.address ? result.address : "Not found"
      };\nLicense Tiar: ${
        result?.license_tier ? result.license_tier : "Not found"
      };\nStatus: ${result?.status ? result.status : "Not found"}`
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={handleCopy}>
      <View
        style={{
          position: "relative",
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

        <View style={styles.divider}></View>
        <Text style={styles.TextWrapper}>Address:</Text>
        <Text style={styles.text}>
          {result?.address ? result.address : "Not found"}
        </Text>
        <View style={styles.divider}></View>

        <Text style={styles.TextWrapper}>License_tier:</Text>
        <Text style={styles.text}>
          {result?.license_tier ? result.license_tier : "Not found"}
        </Text>
        <View style={styles.divider}></View>

        <Text style={styles.TextWrapper}>Status:</Text>
        <Text
          style={[
            styles.text,
            {
              color: `${result?.status ? "green" : "red"}`,
              fontWeight: "bold",
            },
          ]}
        >
          {result?.status ? result.status : "Not found"}
        </Text>
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
  divider: {
    borderWidth: 0.3,
    borderColor: "#d4d4d4",
  },
});
