import { Text, View, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

const RecipeScreen = () => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.recipe_image }} style={styles.image} />
      <Text style={styles.largeText}>{item.recipe_name}</Text>
      <Text style={styles.boldText}>Ingredients:</Text>
      <Text style={styles.text}>{item.recipe_ingredients}</Text>
      <Text style={styles.boldText}>Directions:</Text>
      <Text style={styles.text}>{item.recipe_content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "start",
    justifyContent: "center",
    gap: 10,
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "start",
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },

  largeText: {
    fontSize: 20,
    fontFamily: "Jost_600SemiBold",
  },

  text: {
    fontSize: 15,
    fontFamily: "Jost_400Regular",
  },

  boldText: {
    fontSize: 15,
    fontFamily: "Jost_600SemiBold",
  },
});

export default RecipeScreen;
