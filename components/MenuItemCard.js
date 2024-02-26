import { StyleSheet, Text, View, BackHandler, Alert } from "react-native";
import React from "react";
import Icons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MenuItemCard = ({ title, icon, status }) => {
  const navigation = useNavigation();
  const exitApp = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };

  const redirectToGmail = (receiverEmail) => {
    const gmailURL = `mailto:${receiverEmail}`;

    Linking.canOpenURL(gmailURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(gmailURL);
        } else {
          // Fallback to web URL
          Linking.openURL(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${receiverEmail}`
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  const redirectToPlayStore = () => {
    const URL = `https://play.google.com/store/apps/details?id=com.retrosoftltd.ukworkpermitinfo`;

    Linking.canOpenURL(URL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(URL);
        } else {
          // Fallback to web URL
          Linking.openURL(
            `https://play.google.com/store/apps/details?id=com.retrosoftltd.ukworkpermitinfo`
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const handlePress = () => {
    switch (status) {
      case "email":
        redirectToGmail("retrosoft.mob@gmail.com");
        break;
      case "exit":
        exitApp();
        break;
      case "about":
        navigation.navigate("About");
        break;
      case "privacy":
        navigation.navigate("PrivacyPolicy");
        break;
      case "rate":
        redirectToPlayStore();
        break;

      default:
        break;
    }
  };
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.verticalDivider}></View>
      <Icons name={icon} size={24} color={"#039EBD"} />
    </View>
  );
};

export default MenuItemCard;

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
