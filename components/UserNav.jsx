import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/User";
import { navStyles } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useFonts, Jost_400Regular } from "@expo-google-fonts/jost";

const UserNav = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  let [fontsLoaded] = useFonts({
    Jost_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const onAddEventPress = () => {
    navigation.navigate("Add Event");
  };
  const onProfilePress = () => {
    navigation.navigate("Profile");
  };

  if (user) {
    return (
      <View style={navStyles.upperNavContainer}>
        <TouchableOpacity onPress={onProfilePress}>
          <Ionicons
            name="person-circle-outline"
            size={45}
            color="black"
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddEventPress}>
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
  addEvent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F1C046",
    marginRight: 20,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  profileIcon: {
    marginLeft: 20,
  },

  text: {
    fontSize: 20,
    fontFamily: "Jost_400Regular",
    letterSpacing: 0.5,
  },
});

export default UserNav;
