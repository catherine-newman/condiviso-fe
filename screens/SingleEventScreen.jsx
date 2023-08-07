import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { formatDate } from "../utils/formatDate";
import { useState, useEffect, useContext } from "react";
import { getRecipe, patchAttendees } from "../utils/api";
import { getDownloadURL, ref } from "firebase/storage";
import { recipeImagesRef } from "../firebaseConfig";
import MapView, { Marker } from "react-native-maps";
import { UserContext } from "../contexts/User";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SingleEventScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [eventData, setEventData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [isRecipeLoading, setIsRecipeLoading] = useState(true);
  const [isAttendingLoading, setIsAttendingLoading] = useState(true);
  const [isEventLoading, setIsEventLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(null);
  const [attendClicked, setAttendClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [portionIcons, setPortionsIcons] = useState([]);
  const [portions, setPortions] = useState(1);

  useEffect(() => {
    setEventData(JSON.parse(JSON.stringify(item)));
    setIsEventLoading(false);
  }, [route.params]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipe(eventData.recipes[0]);
        const recipeImageRef = ref(recipeImagesRef, res.recipe.recipe_image);
        const recipeImageURL = await getDownloadURL(recipeImageRef);
        newRecipe = { ...res.recipe };
        newRecipe.recipe_image = recipeImageURL;
        setRecipe(newRecipe);
        setIsRecipeLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (!isEventLoading) {
      setIsRecipeLoading(true);
      fetchRecipe();
    }
  }, [setRecipe, eventData]);

  useEffect(() => {
    if (!isEventLoading) {
      const findUser = eventData.attendees.find((attendee) => {
        return attendee.user_id === user._id;
      });
      if (findUser !== undefined) {
        setIsAttending(true);
        setIsAttendingLoading(false);
      } else if (user._id === eventData.user_id) {
        setIsAttending(true);
        setIsAttendingLoading(false);
      } else {
        setIsAttending(false);
        setIsAttendingLoading(false);
      }
    }
  }, [eventData]);

  useEffect(() => {
    const renderIcons = () => {
      return Array.from({ length: eventData.max_attendees }, (_, index) => (
        <View
          key={index}
          style={
            eventData.attendees[index] !== undefined
              ? styles.portionTaken
              : styles.portionFree
          }
        >
          <View>
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={30}
              color={"white"}
            />
          </View>
          <Text style={styles.text}>
            {" "}
            {eventData.attendees[index] !== undefined && isAttending
              ? eventData.attendees[index].first_name
              : ""}
          </Text>
        </View>
      ));
    };
    if (!isEventLoading) {
      setPortionsIcons(renderIcons);
    }
  }, [eventData, isAttending, item]);

  useEffect(() => {
    const addAttending = async () => {
      const attendeePortions = Array(portions).fill({
        first_name: user.first_name,
        user_id: user._id,
      });
      const previousAttendees = JSON.parse(JSON.stringify(eventData.attendees));
      const newAttendees = attendeePortions.concat(previousAttendees);
      const patchBody = {
        event_name: eventData.event_name,
        event_date: eventData.event_date,
        event_duration: eventData.event_duration,
        attendees: newAttendees,
        max_attendees: eventData.max_attendees,
      };
      try {
        const res = await patchAttendees(eventData._id, patchBody);
        setEventData(res.updatedEvent);
        setIsAttending(true);
        setAttendClicked(false);
      } catch (err) {
        setAttendClicked(false);
        console.log(err);
      }
    };
    if (attendClicked) {
      addAttending();
    }
  }, [attendClicked]);

  useEffect(() => {
    const removeAttending = async () => {
      const newAttendees = eventData.attendees.filter((attendee) => {
        return attendee.user_id !== user._id;
      });
      const patchBody = {
        event_name: eventData.event_name,
        event_date: eventData.event_date,
        event_duration: eventData.event_duration,
        attendees: newAttendees,
        max_attendees: eventData.max_attendees,
      };
      try {
        const res = await patchAttendees(eventData._id, patchBody);
        setEventData(res.updatedEvent);
        setIsAttending(false);
        setCancelClicked(false);
      } catch (err) {
        setCancelClicked(false);
        console.log(err);
      }
    };
    if (cancelClicked) {
      removeAttending();
    }
  }, [cancelClicked]);

  const handleRecipePress = (item) => {
    navigation.navigate("Recipe Screen", { item });
  };

  const handleUserPress = () => {
    const item = eventData.user_id;
    navigation.navigate("Profile", { item });
  };

  const handleMinusPress = () => {
    if (portions > 1) {
      const newPortions = portions - 1;
      setPortions(newPortions);
    }
  };

  const handlePlusPress = () => {
    if (portions < eventData.spaces_free) {
      const newPortions = portions + 1;
      setPortions(newPortions);
    }
  };

  const handleAttendPress = () => {
    setIsAttending(true);
    setAttendClicked(true);
  };

  const handleCancelPress = () => {
    setIsAttending(false);
    setCancelClicked(true);
  };

  if (isEventLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.eventInfo}>
          <Text style={styles.largeText}>{eventData.event_name}</Text>
          <Text style={styles.boldText}>
            <AntDesign name="calendar" size={18} color="white" />{" "}
            {formatDate(eventData.event_date)}
          </Text>
          <Text style={styles.boldText}>
            <Entypo name="location-pin" size={18} color="white" />{" "}
            {eventData.event_city}
          </Text>
          <Text style={styles.text}>{eventData.event_description}</Text>

          <Text style={styles.largeText}>
            {eventData.user_name} is hosting!
          </Text>
          <TouchableOpacity
            onPress={handleUserPress}
            style={styles.viewProfile}
          >
            <Text style={styles.buttonText}>Check profile</Text>
          </TouchableOpacity>
        </View>
        {!isRecipeLoading && (
          <>
            <Text style={styles.sectionText}>On the menu</Text>
            <TouchableOpacity
              style={styles.recipeListItem}
              onPress={() => handleRecipePress(recipe)}
            >
              <Image
                source={{ uri: recipe.recipe_image }}
                style={styles.recipeImage}
              />
              <Text style={styles.listItemName}>{recipe.recipe_name}</Text>
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.sectionText}>Location</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: eventData.coordinate_fuzzy.coordinates[1],
            latitudeDelta: 0.005,
            longitude: eventData.coordinate_fuzzy.coordinates[0],
            longitudeDelta: 0.005,
          }}
        >
          {!isAttending && (
            <Marker
              key={eventData._id}
              coordinate={{
                latitude: eventData.coordinate_fuzzy.coordinates[1],
                longitude: eventData.coordinate_fuzzy.coordinates[0],
              }}
            />
          )}
          {isAttending && (
            <Marker
              key={eventData._id}
              coordinate={{
                latitude: eventData.coordinate.coordinates[1],
                longitude: eventData.coordinate.coordinates[0],
              }}
            />
          )}
        </MapView>
        <Text style={styles.mapText}>
          For privacy, events you aren't attending have locations fuzzied up to
          200m
        </Text>
        {isAttending && (
          <>
            <Text style={styles.sectionText}>Address</Text>
            <Text style={styles.addressText}>
              {eventData.event_location}
              {"\n"}
              {eventData.postcode}
            </Text>
          </>
        )}
        {!isAttendingLoading && (
          <>
            <View>
              <Text style={styles.sectionText}>Portions</Text>
              <View style={styles.portionIcons}>{portionIcons}</View>
            </View>
            <View style={styles.reservationContainer}>
              {!isAttending && (
                <>
                  <Text style={styles.generalText}>
                    {eventData.spaces_free === 0 &&
                      "Sorry, this event is full :("}
                    {eventData.spaces_free > 0 && "Reserve your portion!"}
                  </Text>
                  {eventData.spaces_free > 0 && (
                    <>
                      <Text style={styles.boldTextBlack}>Portions:</Text>
                      <View style={styles.reservation}>
                        <TouchableOpacity
                          style={styles.portionButtonLeft}
                          onPress={handleMinusPress}
                        >
                          <AntDesign name="minus" size={15} color="black" />
                        </TouchableOpacity>
                        <View style={styles.portionMiddleText}>
                          <Text>{portions}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.portionButtonRight}
                          onPress={handlePlusPress}
                        >
                          <AntDesign name="plus" size={15} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.attendButton}
                          onPress={handleAttendPress}
                        >
                          <Text style={styles.buttonTextWhite}>Attend</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </>
              )}
              {isAttending && (
                <>
                  <Text style={styles.generalText}>
                    You're going to this event!
                  </Text>
                  {eventData.user_id !== user._id && (
                    <View style={styles.cancelContainer}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancelPress}
                      >
                        <Text style={styles.buttonTextWhite}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "start",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "start",
    width: "100%",
    paddingBottom: 40,
  },

  eventInfo: {
    alignItems: "center",
    width: "100%",
    padding: 20,
    gap: 10,
    backgroundColor: "#5daa80",
  },

  largeText: {
    fontSize: 25,
    fontFamily: "Jost_600SemiBold",
    color: "white",
  },

  text: {
    fontSize: 15,
    fontFamily: "Jost_400Regular",
    color: "white",
  },

  buttonText: {
    fontSize: 20,
    fontFamily: "Jost_400Regular",
    letterSpacing: 0.5,
  },

  buttonTextWhite: {
    fontSize: 20,
    fontFamily: "Jost_400Regular",
    letterSpacing: 0.5,
    color: "white",
  },

  boldText: {
    fontSize: 18,
    fontFamily: "Jost_600SemiBold",
    color: "white",
  },

  boldTextBlack: {
    fontSize: 18,
    fontFamily: "Jost_600SemiBold",
    color: "black",
  },

  recipeImage: {
    width: "20%",
    resizeMode: "cover",
    borderRadius: 10,
    aspectRatio: 1,
  },

  recipeListItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: "100%",
    paddingHorizontal: 20,
  },

  listItemName: {
    fontSize: 20,
    fontFamily: "Jost_400Regular",
    color: "black",
    width: "75%",
  },

  sectionText: {
    fontSize: 20,
    fontFamily: "Jost_600SemiBold",
    color: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  map: {
    width: "100%",
    height: 150,
  },

  viewProfile: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1C046",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 160,
  },

  mapText: {
    fontSize: 15,
    fontFamily: "Jost_400Regular",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 5,
  },

  addressText: {
    fontSize: 18,
    fontFamily: "Jost_400Regular",
    paddingHorizontal: 20,
    paddingTop: 5,
  },

  portionIcons: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  portionTaken: {
    backgroundColor: "#7f7c7a",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    margin: 3,
  },

  portionFree: {
    backgroundColor: "#5daa80",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    margin: 3,
  },

  generalText: {
    fontSize: 20,
    fontFamily: "Jost_400Regular",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  reservationContainer: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  reservation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  portionButtonLeft: {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderStyle: "solid",
    borderColor: "#eaeaea",
    borderWidth: 1,
    borderRightWidth: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  portionButtonRight: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderStyle: "solid",
    borderColor: "#eaeaea",
    borderWidth: 1,
    borderLeftWidth: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  portionMiddleText: {
    borderStyle: "solid",
    borderColor: "#eaeaea",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  attendButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4783C",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 20,
    flex: 1,
  },

  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fc3a3a",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },

  cancelContainer: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleEventScreen;
