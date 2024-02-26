import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { menuItemsInfo } from "../../assets/api/menuItemsInfo";
import MenuItemCard from "../MenuItemCard";

const Menu = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Menu: </Text>
        <View style={{ margin: 5 }}>
          {menuItemsInfo.map((item, index) => (
            <MenuItemCard
              key={index}
              title={item?.title}
              icon={item?.icon}
              status={item?.status}
            />
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
            All the content inside the app are free to re produce and available
            under the Open Government Licence v3.0.
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
