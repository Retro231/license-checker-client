import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icons from "@expo/vector-icons/MaterialIcons";
import Clipboard from "@react-native-clipboard/clipboard";

const ProfileInfoCard = ({ icon, title, value }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    Clipboard.setString(`${title}: ${value}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <TouchableOpacity activeOpacity={1} onLongPress={handleCopy}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{value}</Text>
          <View style={styles.copyToast}>
            <TouchableOpacity onPress={handleCopy}>
              <Text style={styles.copyToastText}>
                <Icons name="content-copy" color={"#039EBD"} size={14} />
                {`${isCopied ? " Copied" : ""}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.verticalDivider}></View>
        <Image source={icon} style={styles.image} />
      </View>
    </TouchableOpacity>
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
  copyToast: {
    position: "absolute",
    width: 70,
    height: 30,
    // backgroundColor: "black",
    top: 0,
    right: 0,
  },
  copyToastText: {
    color: "#039EBD",
    textAlign: "right",
    fontWeight: "bold",
  },
});
