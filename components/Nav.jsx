import {useContext } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../contexts/User";
import { navStyles } from '../styles/styles';


const Nav = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); 

  const handleHomePress = () => {
    navigation.navigate('Home')
   
  };

  const handleCalendarPress = () => {
    navigation.navigate('Calendar')
 
  };

  const handleInboxPress = () => {
    navigation.navigate('Group Chat');
  };
  const handleSignUpPress = () => {
    navigation.navigate('SignUpScreen')
  }

  return (
    <View style={navStyles.lowerNavContainer}>

      <TouchableOpacity>
        <Button title="Home" onPress={handleHomePress}/>
      </TouchableOpacity>

      <TouchableOpacity>
        <Button title="Calendar" onPress={handleCalendarPress}/>
      </TouchableOpacity>

      <TouchableOpacity>
        <Button title={user?"Inbox":"Sign Up"} onPress={user?handleInboxPress:handleSignUpPress}/>
      </TouchableOpacity>
    </View>
  );
};


export default Nav;

