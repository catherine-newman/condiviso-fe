
import { StyleSheet } from "react-native";
import { UserContextProvider } from "./contexts/User";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import GroupChatScreen from "./screens/GroupChatScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LowerNav from "./components/LowerNav";
import UpperNav from "./components/UpperNav";
import AddEventScreen from "./screens/AddEventScreen";
import ProfileScreen from "./screens/ProfileScreen";
import IntroScreen1 from "./screens/IntroScreen1";
import IntroScreen2 from "./screens/IntroScreen2";
import EventConfirmationScreen from "./screens/ConfirmationScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import RecipeScreen from "./screens/RecipeScreen";
import SingleEventScreen from "./screens/SingleEventScreen";
import UpdatedEventScreen from "./screens/UpdatedEventScreen";
import EditEventScreen from "./screens/EditEventScreen";

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserContextProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <UpperNav />
              <Stack.Navigator
                initialRouteName="Intro1"
                screenOptions={({ route }) => ({
                  headerShown: false,
                  animationEnabled: false,
                })}
              >
                <Stack.Screen name="Intro1" component={IntroScreen1} />
                <Stack.Screen name="Intro2" component={IntroScreen2} />
                <Stack.Screen name="Add Event" component={AddEventScreen} />
                <Stack.Screen name="Event Confirmation" component={EventConfirmationScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Calendar" component={CalendarScreen} />
                <Stack.Screen name="Group Chat" component={GroupChatScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="Recipe Screen" component={RecipeScreen} />
                <Stack.Screen
                  name="Event Screen"
                  component={SingleEventScreen}
                />
                <Stack.Screen name="Edit Event" component = {EditEventScreen} /> 
                <Stack.Screen name="Updated Event" component = {UpdatedEventScreen} />
              </Stack.Navigator>
              <LowerNav />
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </UserContextProvider>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
