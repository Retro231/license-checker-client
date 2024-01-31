import {
  FlatList,
  Image,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import ProfileMakingForm from "../ProfileMakingForm";
import ProfileDetalis from "../ProfileDetalis";

const Profile = () => {
  const [reged, setReged] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 3,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          backgroundColor: "#039EBD",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!reged ? (
          <>
            <Image
              style={{
                width: 120,
                height: 120,
              }}
              source={require("../../assets/images/set_profile_image.png")}
            />
            <Text
              style={{
                marginTop: 10,
                color: "#FFff",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Make your profile
            </Text>
          </>
        ) : (
          <>
            <Image
              style={{
                width: 120,
                height: 120,
              }}
              source={require("../../assets/images/profile.png")}
            />
            <Text
              style={{
                marginTop: -10,
                color: "#FFff",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Md.Nazmus Shakib
            </Text>

            <Text
              style={{
                marginTop: 10,
                color: "#00FF57",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              <Icons name="circle" color={"#00FF57"} /> Active
            </Text>
          </>
        )}
      </View>
      <View style={{ flex: 6 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <Text style={styles.title}>Detalis: </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              padding: 4,
              paddingHorizontal: 8,
              borderRadius: 15,
              borderColor: "#039EBD",
              backgroundColor: "rgba(3, 158, 189, 0.12)",
            }}
          >
            <Icons name="sync" size={22} color={"#039EBD"} />
            <Text style={{ color: "#039EBD" }}>Refresh</Text>
          </View>
        </View>
        {reged ? <ProfileDetalis /> : <ProfileMakingForm />}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title: {
    color: "#039EBD",
    fontSize: 20,
    fontWeight: "bold",
  },
});
