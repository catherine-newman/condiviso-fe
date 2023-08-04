import { View, Text, Button, StyleSheet } from 'react-native';
import ImageDisplay from '../components/ImageDisplay'

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <ImageDisplay />
        </View>
    )
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

  
export default HomeScreen;