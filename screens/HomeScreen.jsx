import { View, Text, StyleSheet } from "react-native";
import ImageDisplay from "../components/ImageDisplay";
import UserNav from "../components/UpperNav";
import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
import { getCoordinates } from "../utils/api";
import * as Location from "expo-location";

const HomeScreen = () => {
  const { user, userPosition, setUserPosition } = useContext(UserContext);
  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync();
          await setUserPosition({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          });
        }
        if (status === "denied") {
          if (user) {
            const location = await getCoordinates(user.postcode);
            await setUserPosition({ lat: location[1], lon: location[0] });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLocation();
  }, []);
  return (
    <View style={styles.container}>
      <Text>
        Lat: {userPosition.lat} Lon: {userPosition.lon}
      </Text>
      <ImageDisplay />
    </View>
  );
};
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
export default HomeScreen;
