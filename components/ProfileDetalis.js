import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileInfoCard from "./ProfileInfoCard";

// assets
const emailIcon = require("../assets/icons/email/email_icon.png");
const companyIcon = require("../assets/icons/company/company_icon.png");
const locationIcon = require("../assets/icons/location/location_icon.png");
const licenseIcon = require("../assets/icons/license/license_icon.png");

const data = [
  {
    id: 1,
    icon: emailIcon,
    title: "Email",
    value: "nazshakib01@gmail.com ",
  },
  {
    id: 2,
    icon: companyIcon,
    title: "Company",
    value: "KM catering Limited",
  },
  {
    id: 3,
    icon: locationIcon,
    title: "Location",
    value: "Shefford, Beds, England, SG17 5DG",
  },
  {
    id: 4,
    icon: licenseIcon,
    title: "License Tier",
    value: "Worker(A rating), Skilled Worker",
  },
  {
    id: 5,
    icon: licenseIcon,
    title: "Status",
    value: "Active",
  },
];
const ProfileDetalis = () => {
  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 24 }}
      renderItem={({ item }) => (
        <>
          <ProfileInfoCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        </>
      )}
    />
  );
};

export default ProfileDetalis;

const styles = StyleSheet.create({});
