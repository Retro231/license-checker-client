import { Button, FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ProfileFormInput from "./ProfileFormInput";

const ProfileMakingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [visaExpiry, setVisaExpiry] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Very basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const hanldeSave = () => {
    if (validateForm()) {
      // Do something with the form data
      console.log("Form submitted successfully", {
        name,
        email,
        address,
        company,
        visaExpiry,
      });
    } else {
      console.log("Form has errors. Please check.");
    }
  };
  return (
    <FlatList
      data={[1]}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <View style={{ paddingHorizontal: 24 }}>
          {/* --------- input ----------- */}
          <ProfileFormInput
            title={"Name"}
            require={"optional"}
            value={name}
            handleInputChange={setName}
            placeholder={"Enter your name"}
            keyboardType={""}
          />
          {errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}
          {/* --------- input ----------- */}

          {/* --------- input ----------- */}
          <ProfileFormInput
            title={"Email"}
            require={"require"}
            value={email}
            handleInputChange={setEmail}
            placeholder={"example@mail.com"}
          />
          {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
          {/* --------- input ----------- */}

          {/* --------- input ----------- */}
          <ProfileFormInput
            title={"Company"}
            require={"require"}
            value={company}
            handleInputChange={setCompany}
            placeholder={""}
          />
          {errors.company && (
            <Text style={{ color: "red" }}>{errors.company}</Text>
          )}
          {/* --------- input ----------- */}

          {/* --------- input ----------- */}
          <ProfileFormInput
            title={"Address"}
            require={"require"}
            value={address}
            handleInputChange={setAddress}
            placeholder={""}
          />
          {errors.address && (
            <Text style={{ color: "red" }}>{errors.address}</Text>
          )}
          {/* --------- input ----------- */}

          {/* --------- input ----------- */}
          <ProfileFormInput
            title={"Visa Expiry"}
            require={"require"}
            value={visaExpiry}
            handleInputChange={setVisaExpiry}
            placeholder={"example@mail.com"}
          />
          {errors.visaExpiry && (
            <Text style={{ color: "red" }}>{errors.visaExpiry}</Text>
          )}
          {/* --------- input ----------- */}

          {/* submit button start */}
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                marginTop: 10,
                width: "45%",
              }}
            >
              <Button title="Save" color={"#039EBD"} onPress={hanldeSave} />
            </View>
          </View>
          {/* submit button end */}
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ProfileMakingForm;

const styles = StyleSheet.create({});
