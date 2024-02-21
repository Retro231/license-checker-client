import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { menuItemsInfo } from "../../assets/api/menuItemsInfo";
import MenuItemCard from "../MenuItemCard";

const Menu = () => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Latest News: </Text>
        <View style={{ margin: 5 }}>
          {menuItemsInfo.map((item) => (
            <MenuItemCard title={item?.title} icon={item?.icon} />
          ))}
        </View>
        <View style={styles.menuTextWrapper}>
          <Text
            style={[
              styles.menuText,
              {
                textAlign: "center",
                fontWeight: "bold",
                marginVertical: 10,
                color: "#039EBD",
              },
            ]}
          >
            UK Work Permit Info
          </Text>
          <Text style={styles.menuText}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati.
          </Text>
          <Text style={styles.menuText}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint.
          </Text>
          <Text style={styles.menuText}>
            © by Retrosoft LTD. All Right Reserved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    color: "#039EBD",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  menuTextWrapper: {
    margin: 10,
  },
  menuText: {
    color: "gray",
    fontWeight: "500",
    textAlign: "justify",
  },
});
