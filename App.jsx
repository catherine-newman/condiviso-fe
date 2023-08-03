import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { UserContextProvider } from './contexts/User'; 
import ImageDisplay from "./components/ImageDisplay";

export default function App() {
  return (
     <UserContextProvider>
      <View style={styles.container}>
        <ImageDisplay />
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
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
