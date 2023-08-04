import { StyleSheet, SafeAreaView } from "react-native";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <UpperNav />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                animationEnabled: false,
              }}
            >
              <Stack.Screen name="Add Event" component={AddEventScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Calendar" component={CalendarScreen} />
              <Stack.Screen name="Group Chat" component={GroupChatScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </Stack.Navigator>
            <LowerNav />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
