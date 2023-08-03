import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { UserContextProvider } from './contexts/User'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageDisplay from "./components/ImageDisplay";
import HomeScreen from "./screens/HomeScreen";
export default function App() {
  return (
     <UserContextProvider>
      <View style={styles.container}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ImageDisplay" component={ImageDisplay} />
        </Stack.Navigator>
        </NavigationContainer>
      </View>
     </UserContextProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
