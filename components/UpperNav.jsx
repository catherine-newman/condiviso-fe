import { View, Text, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/User";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const UpperNav = () => {
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

  const onAddEventPress = () => {
    navigation.navigate("Add Event");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (currentScreen === "Intro1" || currentScreen === "Intro2" || currentScreen === "Event Confirmation") return null;

  if (user) {
    return (
      <View
        style={
          currentScreen === "Home"
            ? styles.upperNavContainerHome
            : styles.upperNavContainer
        }
      >
        {currentScreen !== "Home" && (
          <TouchableOpacity onPress={handleGoBack} activeOpacity={0.8}>
            <View style={styles.back}>
              <AntDesign
                name="arrowleft"
                size={25}
                color="black"
                style={styles.addEventIcon}
              />
              <Text style={styles.text}>Back</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onAddEventPress} activeOpacity={0.8}>
          <View style={styles.addEvent}>
            <Text style={styles.text}>Add event</Text>
            <AntDesign
              name="pluscircle"
              size={25}
              color="black"
              style={styles.addEventIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  upperNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },

  upperNavContainerHome: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },

  addEvent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F1C046",
    marginRight: 15,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  back: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginLeft: 15,
  },

  text: {
    fontSize: 20,
    fontFamily: "Jost_400Regular",
    letterSpacing: 0.5,
  },
});

export default UpperNav;
