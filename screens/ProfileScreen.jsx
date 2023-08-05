import {
  Text,
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
import { getRecipes, getEvents } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, ref } from "firebase/storage";
import { recipeImagesRef } from "../firebaseConfig";
import { formatDate } from "../utils/formatDate";

const ProfileScreen = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = [];
        const recipesRes = await getRecipes(user._id);
        const recipeImagePaths = recipesRes.recipes.map((recipe) => {
          return recipe.recipe_image;
        });
        const imageRefs = recipeImagePaths.map((path) =>
          ref(recipeImagesRef, path)
        );
        const imageURLs = await Promise.all(
          imageRefs.map((ref) => getDownloadURL(ref))
        );
        const newRecipes = recipesRes.recipes.map((recipe, i) => {
          const newRecipe = { ...recipe };
          newRecipe.recipe_image = imageURLs[i];
          return newRecipe;
        });
        data.push({ title: "My Recipes", data: newRecipes });
        const eventsRes = await getEvents(user._id);
        data.push({ title: "Hosting Events", data: eventsRes.events });
        setProfileData(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user._id) {
      fetchProfileData();
    }
  }, [user, setProfileData]);

  const handlePress = (item) => {
    if (item.recipe_name) navigation.navigate("Recipe Screen", { item });
    if (item.event_name) navigation.navigate("Event Screen", { item });
  };

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={
          <>
            <View style={styles.profileCard}>
              <Text style={styles.largeProfileText}>{user.user_name}</Text>
              <Text style={styles.text}>
                {user.first_name} {user.last_name}
              </Text>
              <Text style={styles.text}>{user.about_me}</Text>
            </View>
          </>
        }
        sections={profileData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={
              item.recipe_name ? styles.recipeListItem : styles.eventListItem
            }
          >
            {item.recipe_name && (
              <>
                <Image
                  source={{ uri: item.recipe_image }}
                  style={styles.recipeImage}
                />
                <Text style={styles.listItemName}>{item.recipe_name}</Text>
              </>
            )}
            {item.event_name && (
              <>
                <Text style={styles.eventDate}>
                  {formatDate(item.event_date)}, {item.event_city}
                </Text>
                <Text style={styles.listItemName}>{item.event_name}</Text>
                {item.spaces_free === 1 && (
                  <Text style={styles.eventPortions}>
                    {item.spaces_free} portion left.
                  </Text>
                )}
                {item.spaces_free > 1 && (
                  <Text style={styles.eventPortions}>
                    {item.spaces_free} portions left.
                  </Text>
                )}
              </>
            )}
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionText}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  profileCard: {
    alignItems: "start",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#5daa80",
    padding: 20,
  },

  largeProfileText: {
    fontSize: 25,
    fontFamily: "Jost_600SemiBold",
    color: "white",
  },

  sectionText: {
    fontSize: 20,
    fontFamily: "Jost_600SemiBold",
    color: "black",
    padding: 20,
  },

  text: {
    fontSize: 18,
    fontFamily: "Jost_400Regular",
    color: "white",
  },

  recipeImage: {
    width: "20%",
    resizeMode: "cover",
    borderRadius: 10,
    aspectRatio: 1,
  },

  eventListItem: {
    alignItems: "start",
    width: "100%",
    paddingHorizontal: 20,
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

  eventDate: {
    fontSize: 18,
    fontFamily: "Jost_600SemiBold",
  },

  eventPortions: {
    fontSize: 18,
    fontFamily: "Jost_400Regular",
  },
});

export default ProfileScreen;
