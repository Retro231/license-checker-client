import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
const HeaderNavigate = () => {
  const navigation = useNavigation();
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
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderColor: "#039EBD",
              borderRadius: 35,
            }}
            onPress={() => navigation.goBack(null)}
          >
            <Icons name="arrow-back" color={"#039EBD"} size={18} />
            <Text style={{ color: "#039EBD", fontWeight: "bold" }}>
              Go Back
            </Text>
          </TouchableOpacity>
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

export default HeaderNavigate;

const styles = StyleSheet.create({});
