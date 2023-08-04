import { View, Text, Button, StyleSheet } from 'react-native';
import LocationMap from '../components/LocationMap';


const HomeScreen = () => {

    return (
        
          <LocationMap />
      
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