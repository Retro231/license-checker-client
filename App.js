//react-native
import { StatusBar, StyleSheet, Text, View } from "react-native";
// redux
import { store } from "./store/store";
import { Provider, useDispatch } from "react-redux";
// screens
import Home from "./components/tab screens/Home";
import NewsFeed from "./components/tab screens/NewsFeed";
import Profile from "./components/tab screens/Profile";
import Discussion from "./components/tab screens/Discussion";
import { SafeAreaProvider } from "react-native-safe-area-context";
//navigations
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

//assets
import Icons from "@expo/vector-icons/MaterialIcons";
import SearchResult from "./components/stack screens/SearchResult";
import NewsViewer from "./components/stack screens/NewsViewer";
import HomeOption from "./components/stack screens/HomeOption";
import { useEffect, useState } from "react";
import Loading from "./components/utils/Loading";
import { getHomeOptionsData } from "./helper/getHomeOptionsData";
import {
  setActiveOrg,
  setNewAddedOrg,
  setRemovedOrg,
  setUser,
} from "./slices/appSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// onesignal
import { LogLevel, OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";
import Menu from "./components/tab screens/Menu";
import About from "./components/stack screens/About";
import PrivacyPolicy from "./components/stack screens/PrivacyPolicy";

const TabScreens = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      // check homeoptions
      const activeOrg = await getHomeOptionsData("active", 1);
      const newAddedOrg = await getHomeOptionsData("newAdded", 1);
      const removedOrg = await getHomeOptionsData("removed", 1);
      dispatch(setActiveOrg(activeOrg));
      dispatch(setNewAddedOrg(newAddedOrg));
      dispatch(setRemovedOrg(removedOrg));

      /** check user info exist or not in local storage */
      const jsonValue = await AsyncStorage.getItem("user-info");
      dispatch(setUser(JSON.parse(jsonValue)));

      setLoading(false);

      return;
    };
    getData();
  }, []);

  return (
    <>
      {!loading ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "NewsFeed") {
                iconName = "web";
              } else if (route.name === "Discussion") {
                iconName = "chat";
              } else if (route.name === "Profile") {
                iconName = "account-circle";
              } else if (route.name === "Menu") {
                iconName = "menu";
              }
              // You can return any component that you like here!
              return <Icons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#B9F3FF",
            tabBarInactiveTintColor: "#fff",
            tabBarStyle: {
              backgroundColor: "#039EBD",
              borderTopEndRadius: 20,
              borderTopLeftRadius: 20,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="NewsFeed" component={NewsFeed} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Discussion" component={Discussion} />
          <Tab.Screen name="Menu" component={Menu} />
        </Tab.Navigator>
      ) : (
        <View
          style={{ flex: 7, justifyContent: "center", alignItems: "center" }}
        >
          <Loading />
        </View>
      )}
    </>
  );
};

const StackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabScreens" component={TabScreens} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="NewsViewer" component={NewsViewer} />
      <Stack.Screen name="HomeOption" component={HomeOption} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default function App() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

  // Also need enable notifications to complete OneSignal setup
  OneSignal.Notifications.requestPermission(true);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#039EBD"} />
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <StackScreens />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
