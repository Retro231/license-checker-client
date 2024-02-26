import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const HeaderNavigate = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.app);

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
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
              <Text
                style={{
                  marginTop: -5,
                  textTransform: "capitalize",
                  color: "green",
                }}
              >
                <Icons name="circle" color={"green"} /> {user.status}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderNavigate;

const styles = StyleSheet.create({});
