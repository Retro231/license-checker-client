import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import HeaderNavigate from "../HeaderNavigate";
import { useRoute } from "@react-navigation/native";
import Loading from "../utils/Loading";

const NewsViewer = () => {
  const route = useRoute();
  const { uri } = route.params;
  const shouldStartLoadWithRequest = (event) => {
    // You can add logic here to control which URLs are allowed to load.
    // For example, only allow the initial URL to load and block others.
    return event.url === uri;
  };

  return (
    <>
      <HeaderNavigate />
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
