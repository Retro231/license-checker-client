import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Discussion = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "50%",
            backgroundColor: "white",
            paddingVertical: 10,
            borderColor: "black",
            borderWidth: 1,
            borderRightWidth: 0,
          }}
        >
          <Text style={{ textAlign: "center" }}>Discussion</Text>
        </View>
        <View
          style={{
            width: "50%",
            backgroundColor: "white",
            paddingVertical: 10,
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Jobs</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Discussion;

const styles = StyleSheet.create({});
