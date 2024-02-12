import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileInfoCard from "./ProfileInfoCard";

// assets
const emailIcon = require("../assets/icons/email/email_icon.png");
const companyIcon = require("../assets/icons/company/company_icon.png");
const locationIcon = require("../assets/icons/location/location_icon.png");
const licenseIcon = require("../assets/icons/license/license_icon.png");
const visaExpiryIcon = require("../assets/icons/visaExpiry/visaExpiry_icon.png");

const ProfileDetalis = ({ user }) => {
  const data = [
    {
      id: 1,
      icon: emailIcon,
      title: "Email",
      value: user?.email ? user.email : "Not found",
    },
    {
      id: 2,
      icon: companyIcon,
      title: "Company",
      value: user?.company ? user.company : "Not found",
    },
    {
      id: 3,
      icon: locationIcon,
      title: "Location",
      value: user?.address ? user.address : "Not found",
    },
    {
      id: 4,
      icon: licenseIcon,
      title: "License Tier",
      value: user?.license_tier ? user.license_tier : "Not found",
    },
    {
      id: 5,
      icon: licenseIcon,
      title: "Status",
      value: user?.status ? user.status : "Not found",
    },
    {
      id: 6,
      icon: visaExpiryIcon,
      title: "Visa Expiry",
      value: user?.visaExpiry ? user.visaExpiry : "Not found",
    },
  ];
  return (
    <View style={{ paddingHorizontal: 24 }}>
      {data.map((item) => (
        <ProfileInfoCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
    </View>
  );
};

export default ProfileDetalis;
