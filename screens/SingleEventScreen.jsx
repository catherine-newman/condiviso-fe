import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { formatDate } from "../utils/formatDate";
import { useState, useEffect, useContext } from "react";
import { getRecipe } from "../utils/api";
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
  console.log(item);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(true);
  const [portionIcons, setPortionsIcons] = useState([]);
  const [portions, setPortions] = useState(1);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipe(item.recipes[0]);
        const recipeImageRef = ref(recipeImagesRef, res.recipe.recipe_image);
        const recipeImageURL = await getDownloadURL(recipeImageRef);
        newRecipe = { ...res.recipe };
        newRecipe.recipe_image = recipeImageURL;
        console.log(newRecipe);
        setRecipe(newRecipe);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    setIsLoading(true);
    fetchRecipe();
  }, [item, setRecipe]);

  useEffect(() => {
    if (user._id === item.user_id) setIsAttending(true);
    const findUser = item.attendees.find((attendee) => {
      return attendee.user_id === user._id;
    });
    if (findUser !== undefined) setIsAttending(true);
    setIsAttending(false);
  }, [user, item]);

  useEffect(() => {
    const renderIcons = () => {
      return Array.from({ length: item.max_attendees }, (_, index) => (
        <View
          style={
            item.attendees[index].first_name
              ? styles.portionTaken
              : styles.portionFree
          }
        >
          <View>
            <MaterialCommunityIcons
              key={index}
              name="food-takeout-box"
              size={30}
              color={"white"}
            />
          </View>
          <Text style={styles.text}>
            {" "}
            {item.attendees[index].first_name || ""}
          </Text>
        </View>
      ));
    };
    setPortionsIcons(renderIcons);
  }, [item]);

  const handleRecipePress = (item) => {
    navigation.navigate("Recipe Screen", { item });
  };

  const handleUserPress = (item) => {
    navigation.navigate("Profile", { item });
  };

  const handleMinusPress = () => {
    if (portions > 1) {
      const newPortions = portions - 1;
      setPortions(newPortions);
    }
  };

  const handlePlusPress = () => {
    if (portions < item.spaces_free) {
      const newPortions = portions + 1;
      setPortions(newPortions);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.eventInfo}>
          <Text style={styles.largeText}>{item.event_name}</Text>
          <Text style={styles.boldText}>
            <AntDesign name="calendar" size={18} color="white" />{" "}
            {formatDate(item.event_date)}
          </Text>
          <Text style={styles.boldText}>
            <Entypo name="location-pin" size={18} color="white" />{" "}
            {item.event_city}
          </Text>

          <Text style={styles.largeText}>{item.user_name} is hosting!</Text>
          <TouchableOpacity
            onPress={() => handleUserPress(item.user_id)}
            style={styles.viewProfile}
          >
            <Text style={styles.buttonText}>Check profile</Text>
          </TouchableOpacity>
        </View>
        {!isLoading && (
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
            latitude: item.coordinate_fuzzy.coordinates[1],
            latitudeDelta: 0.005,
            longitude: item.coordinate_fuzzy.coordinates[0],
            longitudeDelta: 0.005,
          }}
        >
          {!isAttending && (
            <Marker
              key={item._id}
              coordinate={{
                latitude: item.coordinate_fuzzy.coordinates[1],
                longitude: item.coordinate_fuzzy.coordinates[0],
              }}
            />
          )}
          {isAttending && (
            <Marker
              key={item._id}
              coordinate={{
                latitude: item.coordinate.coordinates[1],
                longitude: item.coordinate.coordinates[0],
              }}
            />
          )}
        </MapView>
        <Text style={styles.mapText}>
          For privacy, events you aren't attending have locations fuzzied up to
          200m
        </Text>
        <View>
          <Text style={styles.sectionText}>Portions</Text>
          <View style={styles.portionIcons}>{portionIcons}</View>
        </View>
        <View style={styles.reservationContainer}>
          {isAttending && (
            <>
              <Text style={styles.generalText}>
                {item.spaces_free > 0 && "Sorry, this event is full :("}
                {item.spaces_free === 0 && "Reserve your portion!"}
              </Text>
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
                <TouchableOpacity style={styles.attendButton}>
                  <Text style={styles.buttonTextWhite}>Attend!</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {!isAttending && (
            <>
              <Text style={styles.generalText}>
                You're going to this event!
              </Text>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.buttonTextWhite}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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

  portionIcons: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
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
    alignItems: "center",
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
});

export default SingleEventScreen;
