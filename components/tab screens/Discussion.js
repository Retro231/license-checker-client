import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Discussion = () => {
  const [activeDiscussion, setActiveDiscussion] = useState(true);
  const [activeJobs, setActiveJobs] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const handleDiscussion = () => {
    setActiveDiscussion(true);
    setActiveJobs(false);
  };
  const handleJobs = () => {
    setActiveJobs(true);
    setActiveDiscussion(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 0,
        }}
      >
        <TouchableOpacity
          onPress={handleDiscussion}
          style={{
            width: "50%",
            backgroundColor: `${activeDiscussion ? "#039EBD" : "white"}`,
            paddingVertical: 10,
            borderColor: "#80d1e8",
            borderWidth: 1,
            borderRightWidth: 0,
            borderLeftWidth: 0,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: `${activeDiscussion ? "white" : "#039EBD"}`,
            }}
          >
            Discussion
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleJobs}
          style={{
            width: "50%",
            backgroundColor: "white",
            paddingVertical: 10,
            borderColor: "#80d1e8",
            borderWidth: 1,
            borderRightWidth: 0,
            backgroundColor: `${activeJobs ? "#039EBD" : "white"}`,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: `${activeJobs ? "white" : "#039EBD"}`,
            }}
          >
            Jobs
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/underConstruction.jpg")}
          style={{
            width: screenWidth,
            height: 100,
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            color: "blue",
            fontSize: 10,
            textDecorationLine: "underline",
          }}
          onPress={() =>
            Linking.openURL(
              "https://www.freepik.com/free-vector/construction-yellow-black-stripes-background_24496437.htm#fromView=search&page=1&position=21&uuid=18c7252b-9da2-4305-b643-828b5cc05907"
            )
          }
        >
          Image by starline on Freepik
        </Text>
      </View>
      {/* main page */}
    </SafeAreaView>
  );
};

export default Discussion;

const styles = StyleSheet.create({});
