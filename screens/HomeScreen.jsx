import { View, Text } from "react-native";
import ImageDisplay from "../components/ImageDisplay";
import UserNav from "../components/UpperNav";
import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
import { getCoordinates } from "../utils/api";
import * as Location from "expo-location";
import LocationMap from '../components/LocationMap';
import { LocalEventsContext } from '../contexts/LocalEvents'

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
        
          <LocationMap />
      
    );
};

export default HomeScreen;
