//react-native
import { StyleSheet, Text, View } from "react-native";
// redux
import { store } from "./store/store";
import { Provider } from "react-redux";
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
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreens = () => {
  return (
    <>
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
        <Tab.Screen name="Discussion" component={Discussion} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
};

const StackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabScreens" component={TabScreens} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="NewsViewer" component={NewsViewer} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
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
