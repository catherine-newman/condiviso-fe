import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../utils/formatDate";
import { UserContext } from "../contexts/User";
import { getCoordinates, getEvents } from "../utils/api";
import * as Location from "expo-location";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, userPosition, setUserPosition } = useContext(UserContext);
  const [selectedEvent, setSelectedEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEventIsLoading, setSelectedEventIsLoading] = useState(true);
  const [mapEvents, setMapEvents] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [hideFullEvents, setHideFullEvents] = useState(false);

  useEffect(() => {
    if (currentRegion) {
      getEvents(null, null, null, currentRegion.longitude, currentRegion.latitude, null, null, hideFullEvents)
      .then((data) => {
        if (data && data.events) {
          setMapEvents(data.events);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      })
    } else if (userPosition.lat !== null && userPosition.lon !== null) {
      getEvents(null, null, null, userPosition.lon, userPosition.lat)
        .then((data) => {
          if (data && data.events) {
            setMapEvents(data.events);

          }
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userPosition, currentRegion, hideFullEvents]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync();
          await setUserPosition({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          });
        }
        if (status === "denied") {
          if (user) {
            const location = await getCoordinates(user.postcode);
            await setUserPosition({ lat: location[1], lon: location[0] });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLocation();
  }, []);

  const showLocation = () => {
    return mapEvents.map((event, index) => {
      return (
        <Marker
          key={event._id}
          coordinate={{
            latitude: event.coordinate_fuzzy.coordinates[1],
            longitude: event.coordinate_fuzzy.coordinates[0],
          }}
          title={event.event_name}
          image={require('../styles/markers/marker6.png')}
          description={event.event_description}
          onPress={() => handleMarkerPress(event)}

        />
      );
    });
  };
  
  const handleMarkerPress = (event) => {
    setSelectedEvent(event);
    setSelectedEventIsLoading(false);
  };

  const handleCardPress = (item) => {
    navigation.navigate("Event Screen", { item });
  };

  const handleRegionChangeComplete = (region) => {
    setCurrentRegion(region);
  }

  const toggleHideFullEvents = () => {
    setHideFullEvents(!hideFullEvents);
  };


  const mapHeight = selectedEventIsLoading ? "80%" : "60%";

  const Checkbox = ({ label, checked, onChange }) => {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
        {checked ? (
          <View style={[styles.checkbox, styles.checkedBox]} />
        ) : (
          <View style={styles.checkbox} />
        )}
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>
  return (
   <View style={styles.container}>
    <Checkbox label="Hide full events" checked={hideFullEvents} onChange={toggleHideFullEvents} />
      <MapView
   style={[styles.map, { height: mapHeight }]}
  initialRegion={
    {
      latitude: userPosition.lat,
      latitudeDelta: 0.005,
      longitude: userPosition.lon,
      longitudeDelta: 0.008,
    }
  }
  onRegionChangeComplete={handleRegionChangeComplete}
  >
  {showLocation()}


    </MapView >
    {!selectedEventIsLoading ? (
        <SectionList 
      sections={[
        {
          title: "",
          data: [selectedEvent ]
        },
      ]}
      keyExtractor={( item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => handleCardPress(item)}
        style={styles.card}
        >          
          <Text style={styles.eventNameText}>{item.event_name}</Text>
          <Text style={styles.cardText}>Hosted by {item.first_name}</Text>
          <Text style={styles.dateText}>{formatDate(item.event_date)}, {item.event_city}</Text>
          <Text style={styles.descriptionText}>{item.event_description}</Text>
        </TouchableOpacity>
      )}
      />
      ) : (
        <View style={styles.selectAnEventPromptContainer}>
        <Text style={styles.selectAnEventPromptText}>Please select an event on the map</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "#5daa80",
  },
    cardText: {
      paddingLeft: 20,
      fontSize: 16,
      fontFamily: "Jost_400Regular",
      color: "white",
  },
  dateText: {
    paddingLeft: 20,
    fontSize: 16,
      fontFamily: "Jost_400Regular",
      color: "white",
      marginBottom: '5%'
  },
  descriptionText: {
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 16,
    fontFamily: "Jost_400Regular",
      backgroundColor: "white",
      color: "black"
  },
  eventNameText: {
    paddingLeft: 20,
    fontSize: 25,
    alignItems: "flex-start",
    justifyContent: "center",
      fontFamily: "Jost_600SemiBold",
      marginVertical: "3%",
      color: "white"
  },
  map: {
    width: "100%",
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
    textAlign: "center",
  },
  selectAnEventPromptContainer: {
    height: "10%",
    backgroundColor: "#5daa80",
    justifyContent: "center",
    alignItems: "center",
  },
   loading: {
    backgroundColor: "#5daa80",
    color: "white",
    fontSize: 16
 
    
  },

  selectAnEventPromptText: {
    color: "white",
    fontFamily: "Jost_400Regular",
    fontSize: 20,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#5daa80",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: "#F1C046",
    borderColor: "white",
  },
  label: {
    fontSize: 18,
    color: "white",
    fontFamily: "Jost_400Regular"
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#5daa80",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: "#F1C046",
    borderColor: "white",
  },
  label: {
    fontSize: 18,
    color: "white",
    fontFamily: "Jost_400Regular"
  },
});
