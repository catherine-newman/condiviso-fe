import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import LocationMap from '../components/LocationMap';
import { LocalEventsContext } from '../contexts/LocalEvents'


const HomeScreen = ({localEvents, localEventsIsLoading}) => {

    return (
        
          <LocationMap localEvents={localEvents} localEventsIsLoading={localEventsIsLoading}/>
      
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