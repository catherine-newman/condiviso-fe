import { Pressable } from "react-native";
import { View, Image, Text, StyleSheet } from "react-native";
import {useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../contexts/User";
import { navStyles } from '../styles';


const UserNav = () => {
  const navigation = useNavigation()
  const { user } = useContext(UserContext); 

  const onAddEventPress = () => {
navigation.navigate('Add Event')
  }
const onProfilePress = () => {
  navigation.navigate('Profile')

  };
   if (user) {
  return (
    <View style={navStyles.userNavContainer}>
    <Pressable style={styles.pressable} onPress={onAddEventPress} >
      <Text style={navStyles.text}>Add event</Text>
    </Pressable>
     <Pressable style={styles.pressable} onPress={onProfilePress} >
     <Text style={navStyles.text}>Profile</Text>
   </Pressable>
   </View>
  )
  }

}

const styles = StyleSheet.create({
  
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },

  pressable: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'green',
    padding: 5,
      alignItems: 'top',
      justifyContent: 'center',
      marginTop: 50,
    }
  
})

export default UserNav;