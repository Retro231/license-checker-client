import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ProfileFormInput from "./ProfileFormInput";
import Loading from "./utils/Loading";
import { getSearchResult } from "../helper/getSearchResult";
import { companyHouseSearch } from "../helper/companyHouseSearch";
import { setUser } from "../slices/appSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileActionBtn from "./utils/ProfileActionBtn";

const ProfileMakingForm = () => {
  // text inputs state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [visaExpiry, setVisaExpiry] = useState("");
  const [license_tier, setLicense_tier] = useState("");
  const [status, setStatus] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // error state
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyError, setCompanyError] = useState("");
  // others state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notfound, setNotfound] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNameChanges = (text) => {
    setName(text);
    if (!text) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const handleEmailChanges = (text) => {
    setEmail(text);
    if (!text) {
      setEmailError("Email is required");
    } else if (!validateEmail(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleCompanyChanges = (text) => {
    setCompany(text);
    if (!text) {
      setCompanyError("Company is required");
    } else {
      setCompanyError("");
    }
    if (company === "") {
      setAddress("");
      setLicense_tier("");
      setStatus("");
    }
  };

  const handleVisaExpiryChages = (inputDate) => {
    // Regex to match DD-MM-YYYY format
    const regex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;

    if (regex.test(inputDate)) {
      setVisaExpiry(inputDate);
    }
  };

  const handleFocus = () => {
    console.log("focus");
    setIsFocused(true);
  };
  const handleBlur = () => {
    console.log("blur");
    setIsFocused(false);
  };

  const handleDiscard = () => {
    setName("");
    setEmail("");
    setCompany("");
    setAddress("");
    setLicense_tier("");
    setStatus("");
    setVisaExpiry("");
    setSuggestions([]);
  };

  const handleSubmit = async () => {
    if (!name || !email || !company || !validateEmail(email)) {
      return;
    }
    if (company !== "") {
      setLoading(true);
      const result = await getSearchResult(company);
      setLoading(false);

      if (result === null) {
        setCompany("");
        setSuggestions([]);
        setNotfound(true);
        setTimeout(() => {
          setNotfound(false);
        }, 2000);
      }

      if (company !== "" && result?.relatedResult === null) {
        setCompany(result?.company_name);
        setAddress(result?.address);
        setLicense_tier(result?.license_tier);
        setStatus(result?.status ? result.status : "Not found");
      }
      if (company !== "" && result?.relatedResult !== null) {
        setSuggestions(result?.relatedResult);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelection = async (item) => {
    setLoading(true);
    const result = await companyHouseSearch(item);
    setLoading(false);
    setSuggestions([]);
    setCompany(result?.company_name);
    setAddress(result?.address);
    setLicense_tier(result?.license_tier);
    setStatus(result?.status ? result.status : "Not found");
  };
  // function to store user-info to local storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user-info", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const handleSave = async () => {
    console.log("preesed");
    try {
      setSaving(true);
      const jsonValue = {
        name,
        email,
        address,
        company,
        license_tier,
        status,
        visaExpiry,
      };
      await storeData(jsonValue);
      dispatch(setUser(jsonValue));
      console.log("done");

      setSaving(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 24,
        }}
      >
        <ProfileActionBtn status={"discard"} handlePress={handleDiscard} />
      </View>
      <View style={{ paddingHorizontal: 24 }}>
        {/* --------- input ----------- */}
        <ProfileFormInput
          title={"Name"}
          require={"optional"}
          value={name}
          handleInputChange={handleNameChanges}
          placeholder={"Enter your name"}
          keyboardType={"default"}
        />
        {nameError ? (
          <Text style={{ color: "red", marginLeft: 10 }}>{nameError}</Text>
        ) : null}

        {/* --------- input ----------- */}

        {/* --------- input ----------- */}
        <ProfileFormInput
          title={"Email"}
          require={"require"}
          value={email}
          handleInputChange={handleEmailChanges}
          placeholder={"example@mail.com"}
          keyboardType={"email-address"}
        />
        {emailError ? (
          <Text style={{ color: "red", marginLeft: 10 }}>{emailError}</Text>
        ) : null}

        {/* --------- input ----------- */}

        {/* --------- input ----------- */}
        <View style={{ position: "relative" }}>
          <ProfileFormInput
            title={"Company"}
            value={company}
            handleInputChange={handleCompanyChanges}
            placeholder={"Write you company name"}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            keyboardType={"default"}
          />
          {loading && (
            <View style={{ padding: 10 }}>
              <Loading />
            </View>
          )}
          {!loading && notfound && (
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ textAlign: "center" }}>
                No result found. Try something else.
              </Text>
            </View>
          )}
          {suggestions?.length > 0 && company !== "" && !loading && (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "#039EBD",
                backgroundColor: "#cfe7ff",
                height: 300,
              }}
            >
              {suggestions?.length !== 0 && (
                <ScrollView
                  keyboardShouldPersistTaps="always"
                  nestedScrollEnabled
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  {suggestions?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        margin: 5,
                        borderBottomWidth: 1,
                        borderBottomColor: "#039EBD",
                        padding: 10,
                      }}
                      onPress={() => handleSelection(item)}
                    >
                      <Text style={{ textAlign: "center" }}>
                        {item["Organisation Name"]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          )}
        </View>
        {companyError ? (
          <Text style={{ color: "red", marginLeft: 10 }}>{companyError}</Text>
        ) : null}

        {/* --------- input ----------- */}

        {/* --------- input ----------- */}
        {address !== "" && company !== "" && (
          <>
            <ProfileFormInput
              title={"Address"}
              value={address}
              handleInputChange={setAddress}
              placeholder={""}
              keyboardType={"default"}
            />
          </>
        )}

        {/* --------- input ----------- */}

        {/* --------- input ----------- */}
        {address !== "" && company !== "" && (
          <>
            <ProfileFormInput
              title={"License tier"}
              value={license_tier}
              handleInputChange={setLicense_tier}
              placeholder={""}
              keyboardType={"default"}
            />
          </>
        )}
        {/* --------- input ----------- */}

        {/* --------- input ----------- */}
        {address !== "" && company !== "" && (
          <>
            <ProfileFormInput
              title={"Status"}
              value={status}
              handleInputChange={setStatus}
              placeholder={""}
              keyboardType={"default"}
            />
          </>
        )}
        {/* --------- input ----------- */}

        {/* --------- input ----------- */}
        {address !== "" && company !== "" && (
          <>
            <ProfileFormInput
              title={"Visa Expiry"}
              value={visaExpiry}
              handleInputChange={handleVisaExpiryChages}
              placeholder={"Enter date (DD-MM-YYYY)"}
              keyboardType={"numeric"}
            />
          </>
        )}
        {/* --------- input ----------- */}

        {/* submit button start */}
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <View
            style={{
              marginTop: 10,
              width: "45%",
            }}
          >
            <Button
              title={!saving ? "save" : "saving..."}
              color={"#039EBD"}
              disabled={address === "" ? true : false}
              onPress={handleSave}
            />
          </View>
        </View>
        {/* submit button end */}
      </View>
    </>
  );
};

export default ProfileMakingForm;

const styles = StyleSheet.create({});
