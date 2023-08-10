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
import { getRecipes, getEvents, getSingleUser } from "../utils/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDownloadURL, ref } from "firebase/storage";
import { recipeImagesRef } from "../firebaseConfig";
import { formatDate } from "../utils/formatDate";

const ProfileScreen = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState([]);
  const navigation = useNavigation();
  const [profileLoading, setProfileLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [profileId, setProfileId] = useState(null);
  const route = useRoute();

  useEffect(() => {
    const getUserData = async (item) => {
      try {
        const res = await getSingleUser(item);
        setUserInfo(res);
      } catch (err) {
        console.log(err);
      }
    };
    setUserLoading(true);
    if (route.params !== undefined) {
      const { item } = route.params;
      setProfileId(item);
      getUserData(item);
      setUserLoading(false);
    } else {
      setProfileId(user._id);
      setUserInfo({
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        about_me: user.about_me,
      });
      setUserLoading(false);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchProfileData = async (id) => {
      try {
        const data = [];
        try {
          const recipesRes = await getRecipes(id);
        
        if (recipesRes) {
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
        }
       } catch(err) {
          console.log(err)
        }
        try {
          const eventsHostingRes = await getEvents(id);
        data.push({ title: "Hosting Events", data: eventsHostingRes.events });
        if (route.params === undefined) {
          const eventsAttendingRes = await getEvents(
            id,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "true"
          );
          data.push({
            title: "Attending Events",
            data: eventsAttendingRes.events,
          });
        }
        } catch(err) {
          console.log(err)
        }
        setProfileData(data);
        setProfileLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (profileId) {
      setProfileLoading(true);
      fetchProfileData(profileId);
    }
  }, [user, setProfileData, profileId]);

  const handlePress = (item) => {
    if (item.recipe_name) navigation.navigate("Recipe Screen", { item });
    if (item.event_name) navigation.navigate("Event Screen", { item });
  };

  if (profileLoading || userLoading)
    return <View style={styles.container}></View>;

  const renderSeparator = () => {
    return (
      <View style={styles.lineContainer}>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={
          <>
            <View style={styles.profileCard}>
              <Text style={styles.largeProfileText}>{userInfo.user_name}</Text>
              <Text style={styles.text}>
                {userInfo.first_name} {userInfo.last_name}
              </Text>
              <Text style={styles.text}>{userInfo.about_me}</Text>
            </View>
          </>
        }
        sections={profileData}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={renderSeparator}
        stickySectionHeadersEnabled={false}
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
                <Text style={styles.recipeItemName}>{item.recipe_name}</Text>
              </>
            )}
            {item.event_name && (
              <>
                <Text style={styles.eventDate}>
                  {formatDate(item.event_date)}, {item.event_city}
                </Text>
                <Text style={styles.eventItemName}>{item.event_name}</Text>
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
    borderRadius: 8,
    marginRight: 8,
    marginLeft: 8,
   
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#5daa80",
    borderRadius: 8,
  margin: 8,
    
  },

  recipeListItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: "#5daa80"
 
  },

  recipeItemName: {
    fontSize: 20,
    fontFamily: "Jost_400Regular",
    color: "black",
    width: "75%",
  },

  eventItemName: {
    color: "white",
    width: "75%",
    fontSize: 20,
    fontFamily: "Jost_400Regular",
  },

  eventDate: {
    fontSize: 15,
    fontFamily: "Jost_600SemiBold",
    color: "white",

  },

  eventPortions: {
    fontSize: 18,
    fontFamily: "Jost_400Regular",
    color: "white",

  },

  lineContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  line: {
    borderBottomWidth: 5,
    borderBottomColor: "#eaeaea",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default ProfileScreen;
