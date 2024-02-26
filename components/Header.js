import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const { user } = useSelector((state) => state.app);
  const navigation = useNavigation();

  // console.log(user);
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
        <Image
          style={{
            width: 100,
            height: 70,
          }}
          source={require("../assets/icon.png")}
          resizeMode="center"
        />
        <TouchableOpacity
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              marginLeft: 10,
            }}
            source={require("../assets/images/profile.png")}
          />
          {!user ? (
            <Text
              style={{
                marginTop: -5,
                color: "#039EBD",
                textAlign: "center",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              Add Profile
            </Text>
          ) : (
            <Text style={{ marginTop: -5, color: "green" }}>
              <Icons name="circle" color={"green"} /> {user.status}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
