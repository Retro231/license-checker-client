import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            width={50}
            height={50}
            source={require("../assets/images/logo.png")}
          />
        </View>
        <View>
          <Image
            style={{
              width: 70,
              height: 70,
            }}
            source={require("../assets/images/profile.png")}
          />
          <Text style={{ marginTop: -10 }}>
            <Icons name="circle" color={"green"} /> Active
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
