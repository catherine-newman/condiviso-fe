import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, PanResponder, Dimensions } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import { getDownloadURL, ref } from "firebase/storage";
import { recipeImagesRef } from "../firebaseConfig";
  import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
  


  const IntroScreen1 = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        const storageRef = ref(recipeImagesRef, "sharing-dessert.png"); 
        getDownloadURL(storageRef)
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            console.error("Error getting image URL:", error);
          })
          .finally(() => {
            setImageLoading(false);
          })
      }, []);


   
    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (evt, gestureState) => {},
          onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx < -50) {
              navigation.navigate("Intro2");
            }
          },
        })
      ).current;
    
    const onPart2Press = () => {
        navigation.navigate("Intro2");
      };
      const onSkipIntroPress = () => {
        navigation.navigate("SignUpScreen")
      }
      if(imageLoading) return <Text>Loading...</Text>
    return (
        <View  style={styles.container} {...panResponder.panHandlers}> 
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome to Condiviso</Text>
          </View>
          <View style={styles.regularTextContainer}>
            <Text style={styles.regularText}>Savour the sweet experience of something shared </Text>
            </View>
            <Image source={{ uri: imageUrl }} style={styles.intro1Image}/>
            <View style={styles.navElemsContainer}>
              <TouchableOpacity style={styles.skipButton}>
                  <Text onPress={onSkipIntroPress} style={styles.skip}>Skip</Text>
              </TouchableOpacity>
              <View style={styles.circlesContainer}>
                  <FontAwesome style={styles.circles} name="circle" size={15} color="black"/>
                  <TouchableOpacity>
                     <Entypo onPress={onPart2Press} style={styles.circles} name="circle" size={14} color="black" />
                  </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={onPart2Press}> 
                  <View>
                    <Text style={styles.arrowText}>Next</Text>
                    <AntDesign
                        name="arrowright"
                        size={30}
                        color="black"
                        style={styles.antDesign}
                    />
                  </View>
              </TouchableOpacity>
            </View> 
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5daa80",
        justifyContent: 'space-between',
        alignItems: "center",
      },
      intro1Image: {
        width: "70%",
        resizeMode: "cover",
        borderRadius: 10,
        aspectRatio: 1,
        marginTop: "7%",
        marginBottom: "9.75%",
      },
      navElemsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'start', 
        backgroundColor: "white",
        height: 80, 
        width: "100%",
        padding: 10,
      },
      navElemsContaineriPhone14ProMax: {
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'start', 
        backgroundColor: "white",
        height: 80, 
        width: "100%",
        padding: 10,
      },
    circlesContainer: {
        flexDirection: "row", 
        justifyContent: "center",
        alignItems: "end", 
      },
      circles: {
        padding: 3,
        marginHorizontal: 2, 
      },
      headerContainer: {
        alignItems: 'center',
      },
      headerText: {
        fontFamily: "Jost_600SemiBold",
        fontSize: 35,
        color: "white",
        marginTop: "7%",
      },
      regularTextContainer: {
        alignItems: 'center',
        width: "90%",
      },
      regularText: {
        fontSize: 16,
        marginTop: "8%",
       fontFamily: "Jost_400Regular",
       color: "white",
      },
      arrowText: {
        fontSize: 16,
        fontFamily: "Jost_400Regular",
        color: "black",
      },
      skipButton: {
      }, 
      skip: {
        fontFamily: "Jost_400Regular",
        fontSize: 16,
        color: "black",
      }
  });
  


  export default IntroScreen1;

