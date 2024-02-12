import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icons from "@expo/vector-icons/MaterialIcons";

const ProfileActionBtn = ({ status, handlePress }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 4,
        paddingHorizontal: 6,
        borderRadius: 15,
        borderColor: `${
          status === "delete" || "discard" ? "#F11414" : "#039EBD"
        }`,
        backgroundColor: `${
          status === "delete" || "discard"
            ? "rgba(223, 0, 0, 0.20)"
            : "rgba(3, 158, 189, 0.12)"
        }`,
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {status !== "discard" && (
            <Icons
              name={status === "delete" ? "delete-outline" : "sync"}
              size={14}
              color={status === "delete" || "discard" ? "#F11414" : "#039EBD"}
            />
          )}
          {status === "discard" && (
            <Icons
              name={"cancel"}
              size={14}
              color={status === "delete" || "discard" ? "#F11414" : "#039EBD"}
            />
          )}

          <Text
            style={{
              color: `${
                status === "delete" || "discard" ? "#F11414" : "#039EBD"
              }`,
              fontSize: 10,
              textTransform: "capitalize",
            }}
          >
            {status}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileActionBtn;

const styles = StyleSheet.create({});
