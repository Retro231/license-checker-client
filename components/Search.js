import {
  BackHandler,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Icons from "@expo/vector-icons/MaterialIcons";

const Search = ({
  handleTextChange,
  typedText,
  handleFocus,
  handleBlur,
  handleSubmit,
}) => {
  const textInputRef = useRef(null);
  useEffect(() => {
    const handleBackButton = () => {
      // Unfocus or blur the TextInput using the ref when the back button is pressed
      if (textInputRef.current) {
        textInputRef.current.blur();
      }
      return true; // Return true to prevent default back button behavior
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
        // Here, you can handle hiding the keyboard without blurring the input
        // You may also want to perform some actions when the keyboard hides, if necessary
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        justifyContent: "center",
        borderRadius: 30,
        borderColor: "#039EBD",
      }}
    >
      <TextInput
        ref={textInputRef}
        style={{
          height: 40,
          width: "65%",
          padding: 10,
        }}
        value={typedText}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search"
        keyboardType="web-search"
        enterKeyHint="search"
        onSubmitEditing={handleSubmit}
      />

      <TouchableOpacity
        style={{
          width: "15%",
          height: 40,
          backgroundColor: "#039EBD",
          justifyContent: "center",
          alignItems: "center",
          borderTopEndRadius: 30,
          borderBottomEndRadius: 30,
          borderWidth: 0,
        }}
        onPress={handleSubmit}
      >
        <Icons name="search" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
