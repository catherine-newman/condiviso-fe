import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { recipeImagesRef } from "../firebaseConfig";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { readAsStringAsync } from "expo-file-system";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { UserContext } from "../contexts/User";
import {
  postEvent,
  postRecipe,
  getFuzzyCoordinatesFromCoordinate,
} from "../utils/api";

const AddEventScreen = () => {
  const { user, userPosition } = useContext(UserContext);
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [recipe, setRecipe] = useState({
    user_id: user._id,
    recipe_name: "",
    recipe_ingredients: "",
    recipe_content: "",
    recipe_image: "https://example.com/hardcoded-image.jpg",
  });

  const [event, setEvent] = useState({
    event_name: "",
    first_name: user.first_name,
    last_name: user.last_name,
    user_name: user.user_name,
    user_id: user._id,
    email: user.email,
    event_date: "",
    event_location: user.address,
    postcode: user.postcode,
    latitude: userPosition.lat,
    longitude: userPosition.lon,
    latitude_fuzzy: "",
    longitude_fuzzy: "",
    event_city: "",
    event_description: "",
    event_duration: "",
    max_attendees: "",
    attendees: [],
    recipes: [],
  });

  useEffect(() => {
    getFuzzyCoordinatesFromCoordinate(userPosition.lon, userPosition.lat)
      .then((data) => {
        latitude_fuzzy = data[0];
        longitude_fuzzy = data[1];
        setEvent(() => {
          const newEvent = { ...event };
          newEvent.latitude_fuzzy = latitude_fuzzy;
          newEvent.longitude_fuzzy = longitude_fuzzy;
          return newEvent
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   const inputBoxesValid =
  //     Object.values(recipe).every((item) => item !== "")
  //     Object.values(event).every((item) => item !== null);
  //     console.log("Recipe:", recipe);
  //     console.log("Event:", event);
  //   setIsButtonDisabled(!inputBoxesValid);
  // }, [ event]);

  const handleSubmit = () => {
    postRecipe(
      user._id,
      recipe.recipe_name,
      recipe.recipe_ingredients,
      recipe.recipe_content,
      recipe.recipe_image
    )
      .then((recipeData) => {
        event.recipes.push(recipeData.result.insertedId);
        const newEvent = {
          event_name: event.event_name,
          first_name: user.first_name,
          last_name: user.last_name,
          user_name: user.user_name,
          user_id: user._id,
          email: user.email,
          event_date: event.event_date,
          event_location: user.address,
          postcode: user.postcode,
          latitude: userPosition.lat,
          longitude: userPosition.lon,
          latitude_fuzzy: latitude_fuzzy,
          longitude_fuzzy: longitude_fuzzy,
          event_city: event.event_city,
          event_description: event.event_description,
          event_duration: event.event_duration,
          max_attendees: event.max_attendees,
          attendees: event.attendees,
          recipes: event.recipes,
        };

        return postEvent(newEvent);
      })
      .then((eventData) => {
        console.log(eventData.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDecreaseAttendees = () => {
    const updatedNumOfAttendees = Math.max(numOfGuests - 1, 1);
    setNumOfGuests(updatedNumOfAttendees);
    setEvent({ ...event, max_attendees: updatedNumOfAttendees });
  };

  const handleIncreaseAttendees = () => {
    const updatedNumOfAttendees = numOfGuests + 1;
    setNumOfGuests(updatedNumOfAttendees);
    setEvent({ ...event, max_attendees: updatedNumOfAttendees });
  };

  const requestImagePickerPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the photo library is required!");
    }
  };

  const pickImage = async () => {
    await requestImagePickerPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const handleUpload = async () => {
      try {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", selectedImage, true);
          xhr.send(null);
        });
        const result = await uploadBytes(recipeImagesRef, blob);
        blob.close();
        console.log(result)
    
      } catch(err) {
        console.log(err)
      }
    }
    if (selectedImage && isUploadClicked) {
      console.log("selected image", selectedImage)
      handleUpload();
    }
  }, [selectedImage, isUploadClicked])

  const handleUploadPress = () => {
    setIsUploadClicked(true);
  }
  // const handleUpload = async () => {
  //   if (!selectedImage) return;
  //   setUploading(true);

  //   const imageContent = await readAsStringAsync(selectedImage, {
  //     encoding: "base64",
  //   });
  //   const blob = new Blob([imageContent], { type: "image/jpeg" });
  //   const storageRef = ref(storage, `recipe-images/${Date.now()}`);
  //   const uploadTask = uploadBytesResumable(storageRef, blob);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {},
  //     (error) => {
  //       alert(error);
  //     },
  //     async () => {
  //       const downloadURL = await getDownloadURL(storageRef);
  //       setDownloadURL(downloadURL);
  //       setUploading(false);
  //     }
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.eventHeader}>
          <Text style={styles.header}>create event</Text>
        </View>
        <View style={styles.eventContainer}>
          <View style={styles.event}>
            <TextInput
              style={styles.input}
              maxLength={60}
              placeholder="Event Name"
              value={event.event_name}
              required
              onChangeText={(name) =>
                setEvent({
                  ...event,
                  event_name: name,
                })
              }
            />

            <TextInput
              style={styles.input}
              maxLength={60}
              placeholder="Event date & start time (e.g.1 Aug 12:30)"
              value={event.event_date}
              required
              onChangeText={(date) => setEvent({ ...event, event_date: date })}
            />
            <TextInput
              style={styles.input}
              maxLength={60}
              placeholder="Event City"
              value={event.event_city}
              required
              onChangeText={(City) => setEvent({ ...event, event_city: City })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              maxLength={150}
              placeholder="Event description"
              value={event.event_description}
              required
              onChangeText={(description) =>
                setEvent({ ...event, event_description: description })
              }
              multiline
            />
            <TextInput
              style={styles.input}
              maxLength={5}
              placeholder="Event duration (hours)"
              value={event.event_duration}
              required
              keyboardType="numeric"
              onChangeText={(duration) =>
                setEvent({ ...event, event_duration: duration })
              }
            />
            <View style={styles.counterContainer}>
              <Text style={styles.label}>Max number of guests</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={handleDecreaseAttendees}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{numOfGuests}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={handleIncreaseAttendees}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.recipe}>
            <View style={styles.recipeContainer}>
              <TextInput
                style={styles.inputRecipe}
                maxLength={60}
                placeholder={`Recipe Name`}
                value={recipe.recipe_name}
                required
                onChangeText={(value) => {
                  setRecipe({
                    ...recipe,
                    recipe_name: value,
                  });
                }}
              />

              <TextInput
                style={styles.inputRecipe}
                maxLength={200}
                placeholder={`Recipe Ingredients`}
                value={recipe.recipe_ingredients}
                required
                onChangeText={(value) => {
                  setRecipe({
                    ...recipe,
                    recipe_ingredients: value,
                  });
                }}
                multiline
              />
              <TextInput
                style={styles.inputRecipe}
                maxLength={200}
                placeholder={`Recipe Content`}
                value={recipe.recipe_content}
                required
                onChangeText={(value) => {
                  setRecipe({
                    ...recipe,
                    recipe_content: value,
                  });
                }}
                multiline
              />
              <Button title="Pick an image from gallery" onPress={pickImage} />
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 200, height: 200, marginTop: 20 }}
                />
              )}
              {selectedImage && (
                <Button title="Upload Image" onPress={handleUploadPress} />
              )}
              {uploading && <Text>Uploading...</Text>}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          // disabled={isButtonDisabled}
        >
          <Text style={styles.submitButtonText}>Post Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  eventContainer: {
    borderColor: "#e47a2e",
    // padding:10,
  },
  event: {
    padding: 15,
  },
  eventHeader: {
    alignItems: "start",

    justifyContent: "center",
    padding: 30,
    justifyContent: "start",
    backgroundColor: "#e47a2e",
  },
  header: {
    fontFamily: "Jost_600SemiBold",
    color: "white",
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 18,
    marginTop: 18,
    fontSize: 17,
    fontFamily: "Jost_600SemiBold",
  },
  inputRecipe: {
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 14,
    marginTop: 14,
    fontSize: 17,
    fontFamily: "Jost_600SemiBold",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  counterContainer: {
    marginBottom: 18,
    marginTop: 18,
  },
  label: {
    fontSize: 16,
    fontFamily: "Jost_600SemiBold",
    color: "#333",
    marginBottom: 15,
    marginLeft: 10,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  addButton: {
    // flexDirection: "row",
    // alignItems: 'center',
    // justifyContent: "center",
    gap: 10,
    backgroundColor: "#F1C046",
    marginLeft: 140,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addRecipeButtonText: {
    color: "white",
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
  },
  counterButton: {
    backgroundColor: "#e47a2e",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    color: "white",
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: "#e47a2e",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
    textAlign: "center",
  },

  recipe: {
    borderColor: "#ccc",
    backgroundColor: "#5daa80",
    padding: 10,

    marginBottom: 10,
  },
  recipeContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
});

export default AddEventScreen;
