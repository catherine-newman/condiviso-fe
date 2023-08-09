import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const EventConfirmationScreen = ({ navigation, route }) => {
  const { eventName, eventDate } = route.params;

  const handleBackToEvent = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      
        <Text style={styles.confirmationText}>Confirmed! </Text>
        <Text style={styles.eventName}>You are attending: </Text>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.eventDate}>{eventDate}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToEvent}
        >
          <Text style={styles.buttonText}>Back to Event</Text>
        </TouchableOpacity>
      

      <View style={styles.bottomImageContainer}>
        <Image
          source={require("../assets/images/food-festival.png")}
          style={styles.bottomImage}
          resizeMode="cover"
        />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C0DFC0",
  },
 
  confirmationText: {
    fontSize: 24,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#065906",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  bottomImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 8
  },
  bottomImage: {

    height: 200,
   
  },
});

export default EventConfirmationScreen;
