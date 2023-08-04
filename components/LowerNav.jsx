import { useContext, useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/User";
import { navStyles } from "../styles/styles";
import { AntDesign } from "@expo/vector-icons";

const LowerNav = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const [currentScreen, setCurrentScreen] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentRoute = navigation.getCurrentRoute();
      const screenName = currentRoute.name;
      setCurrentScreen(screenName);
    });

    return unsubscribe;
  }, [navigation]);

  const handleHomePress = () => {
    navigation.navigate("Home");
  };

  const handleCalendarPress = () => {
    navigation.navigate("Calendar");
  };

  const handleInboxPress = () => {
    navigation.navigate("Group Chat");
  };

  return (
    <View style={navStyles.lowerNavContainer}>
      <TouchableOpacity
        onPress={handleHomePress}
        activeOpacity={currentScreen === "Home" ? 1 : 0.5}
      >
        <AntDesign
          name="home"
          size={30}
          color={currentScreen === "Home" ? "#5daa80" : "black"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCalendarPress}
        activeOpacity={currentScreen === "Calendar" ? 1 : 0.5}
      >
        <AntDesign
          name="calendar"
          size={30}
          color={currentScreen === "Calendar" ? "#5daa80" : "black"}
        />
      </TouchableOpacity>
      {user && (
        <TouchableOpacity
          onPress={handleInboxPress}
          activeOpacity={currentScreen === "Group Chat" ? 1 : 0.5}
        >
          <AntDesign
            name="inbox"
            size={30}
            color={currentScreen === "Group Chat" ? "#5daa80" : "black"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LowerNav;
