import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import Loading from "../utils/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const NewsViewer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { uri } = route.params;
  const shouldStartLoadWithRequest = (event) => {
    // You can add logic here to control which URLs are allowed to load.
    // For example, only allow the initial URL to load and block others.
    return event.url === uri;
  };

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 1,
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
        </View>
      </SafeAreaView>
      <WebView
        source={{ uri }}
        scrollEnabled={true} // Allow scrolling
        onShouldStartLoadWithRequest={shouldStartLoadWithRequest}
        maximumZoomScale={1} // Set maximum zoom level
        minimumZoomScale={1} // Set minimum zoom level
        startInLoadingState={true}
        renderLoading={() => (
          <View style={{ flex: 1 }}>
            <Loading />
          </View>
        )}
      />
    </>
  );
};

export default NewsViewer;

const styles = StyleSheet.create({});
