import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/User";
import { navStyles } from "../styles/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Jost_400Regular } from "@expo-google-fonts/jost";

const UpperNav = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const onAddEventPress = () => {
    navigation.navigate("Add Event");
  };
  const onProfilePress = () => {
    navigation.navigate("Profile");
  };
  const handleSignUpPress = () => {
    navigation.navigate("SignUpScreen");
  };

  if (user) {
    return (
      <View style={navStyles.upperNavContainer}>
        {user && (
          <TouchableOpacity onPress={onProfilePress} activeOpacity={0.5}>
            <AntDesign
              name="user"
              size={35}
              color="black"
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        )}
        {!user && (
          <TouchableOpacity onPress={handleSignUpPress} activeOpacity={0.5}>
            <AntDesign
              name="login"
              size={35}
              color="black"
              style={styles.profileIcon}
            />
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

export default UpperNav;
