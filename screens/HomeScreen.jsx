import React from 'react';
import { View, Text, Button } from 'react-native';


const HomeScreen = ({Navigation}) => {
    const handleImageDisplayPress = () => {
        Navigation.navigate('ImageDisplay')
    }
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="ImageDisplay" onPress={handleImageDisplayPress}/>
        </View>
    )
}

export default HomeScreen;