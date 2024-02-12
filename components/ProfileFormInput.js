import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const ProfileFormInput = ({
  title,
  require,
  value,
  handleInputChange,
  placeholder,
  keyboardType,
  handleFocus,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <View style={{ marginVertical: 2 }}>
      <Text
        style={{
          marginBottom: 5,
          marginLeft: 10,
          fontWeight: "600",
          color: "#676767",
        }}
      >
        {title}:{" "}
        <Text style={{ color: "red" }}>{require ? "* require" : ""}</Text>
      </Text>
      <TextInput
        style={{
          height: 40,
          padding: 10,
          borderWidth: 1,
          borderColor: "#039EBD",
          borderRadius: 15,
        }}
        onChangeText={handleInputChange}
        value={value}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        enterKeyHint={title === "Company" ? "search" : "enter"}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

export default ProfileFormInput;

const styles = StyleSheet.create({});
