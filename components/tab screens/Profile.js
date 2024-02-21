import {
  FlatList,
  Image,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import ProfileMakingForm from "../ProfileMakingForm";
import ProfileDetalis from "../ProfileDetalis";
import { setUser } from "../../slices/appSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../utils/Loading";
import { getCurrentDate } from "../../helper/getCurrentDate";
import ProfileActionBtn from "../utils/ProfileActionBtn";

const Profile = () => {
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  // console.log(user);
  const [loading, setLoading] = useState(false);

  const calculateRemainingDays = (startDate, endDate = "01-01-2001") => {
    // Extract day, month, and year from the date strings
    const [startDay, startMonth, startYear] = startDate.split("-").map(Number);
    const [endDay, endMonth, endYear] = endDate.split("-").map(Number);

    const start = new Date(startYear, startMonth - 1, startDay); // Month is zero-based
    const end = new Date(endYear, endMonth - 1, endDay); // Month is zero-based

    const timeDifference = end - start;

    const millisecondsInYear = 365 * 24 * 60 * 60 * 1000;
    const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    const remainingYears = Math.floor(timeDifference / millisecondsInYear);
    const remainingMonths = Math.floor(
      (timeDifference % millisecondsInYear) / millisecondsInMonth
    );
    const remainingDays = Math.floor(
      (timeDifference % millisecondsInMonth) / millisecondsInDay
    );

    const output = `${remainingYears >= 1 ? remainingYears + " years," : ""}${
      remainingMonths >= 1 ? remainingMonths + " months and" : ""
    } ${remainingDays} days`;

    return output;
  };

  // Example usage
  const startDate = getCurrentDate(); // DD-MM-YYYY
  const endDate = user?.visaExpiry; // DD-MM-YYYY

  const remainingDays = calculateRemainingDays(startDate, endDate);

  /** Function to get Data from async storage(Local storage) */
  const getData = async () => {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem("user-info");
      dispatch(setUser(JSON.parse(jsonValue)));
      setLoading(false);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDelete = async () => {
    await AsyncStorage.clear();
    dispatch(setUser(null));
  };
  const handleRefresh = async () => {
    await getData();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        // showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled
      >
        <View
          style={{
            flex: 3,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            backgroundColor: "#039EBD",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 50,
          }}
        >
          {user === null ? (
            <>
              <Image
                style={{
                  width: 120,
                  height: 120,
                }}
                source={require("../../assets/images/set_profile_image.png")}
              />
              <Text
                style={{
                  marginTop: 10,
                  color: "#FFff",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Make your profile
              </Text>
            </>
          ) : (
            <>
              <Image
                style={{
                  width: 120,
                  height: 120,
                }}
                source={require("../../assets/images/profile.png")}
              />
              <Text
                style={{
                  marginTop: -10,
                  color: "#FFff",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {user?.name}
              </Text>
              {user?.status !== "Not found" ? (
                <Text
                  style={{
                    marginTop: 10,
                    color: "#2ad104",
                    fontSize: 20,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  <Icons name="circle" color={"#2ad104"} /> {user?.status}
                </Text>
              ) : (
                <Text
                  style={{
                    marginTop: 10,
                    color: "#adadad",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  <Icons name="circle" color={"#adadad"} /> Not found
                </Text>
              )}
              {user?.visaExpiry.length !== 0 && (
                <Text
                  style={{
                    marginTop: 1,
                    color: "white",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {` ${
                    remainingDays < 0
                      ? "Visa Expired"
                      : "Remaining: " + remainingDays
                  }`}
                </Text>
              )}
            </>
          )}
        </View>
        <View style={{ flex: 6 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginVertical: 10,
            }}
          >
            {user !== null && (
              <>
                <Text style={styles.title}>Detalis: </Text>
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <ProfileActionBtn
                    status={"refresh"}
                    handlePress={handleRefresh}
                  />
                  <ProfileActionBtn
                    status={"delete"}
                    handlePress={handleDelete}
                  />
                </View>
              </>
            )}
          </View>
          {!loading ? (
            user !== null ? (
              <ProfileDetalis user={user} />
            ) : (
              <ProfileMakingForm />
            )
          ) : (
            <Loading />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title: {
    color: "#039EBD",
    fontSize: 20,
    fontWeight: "bold",
  },
});
