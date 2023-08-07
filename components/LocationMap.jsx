import React, {useContext, useEffect, useState} from "react";
import { View, StyleSheet, Text  } from "react-native";
import MapView, {  Marker } from "react-native-maps";
import { UserContext } from "../contexts/User";
import {getEvents} from "../utils/api";

// let locationEvent = [
//   {
//     title: "First",
//     location: {"latitude": 53.480759, "latitudeDelta": 0.005, "longitude": 2.242631, "longitudeDelta": 0.008},
//     description: "First Marker"
// },
// {
//   title: "Second",
//   location: {"latitude": 53.35196584826061, "latitudeDelta": 0.005, "longitude": 2.214005736329931, "longitudeDelta": 0.008},
//   description: "Second Marker"
// },
// ]

const LocationMap = () => {
  const { localEvents, setLocalEvents} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  getEvents().then((data) => {
    setLocalEvents(data.events);
    setIsLoading(false);
  })
}, [])
if(isLoading) return <Text>Loading... </Text>


  const showLocation = () => {
    return localEvents.map((event, index) => {
      return (
        <Marker
        key={event._id}
        coordinate={{"latitude": event.coordinate_fuzzy.coordinates[1], "longitude": event.coordinate_fuzzy.coordinates[0]}}
        title={event.event_name}
        description={event.event_description}
       
        />
      )
    })
  }

  return (
    <View style={styles.container}>

<MapView
style={styles.map}
initialRegion={
  {
    latitude:53.4808,
    latitudeDelta: 14.563453559494604,
    longitude: 2.2426,
    longitudeDelta: 12.052001999999986,
  }
}
>
{showLocation()}


</MapView >
    </View>
)
}
export default LocationMap;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "75%",
  },
  mapOverlay: {
    position: "absolute",
    bottom: 5,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 5,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: "center"

  }
});