import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, PanResponder } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import { getDownloadURL, ref } from "firebase/storage";
import { recipeImagesRef } from "../firebaseConfig";
  import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
  


  const IntroScreen1 = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const storageRef = ref(recipeImagesRef, "tiramisu.jpeg"); 
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
            <Text style={styles.headerText}>Welcome to Condiviso</Text>
            <Text style={styles.regularText}>Savor the sweet experience of something shared </Text>
            <Image source={{ uri: imageUrl }} style={styles.intro1Image}/>
            <View style={styles.navElemsContainer}>
              <TouchableOpacity style={styles.skipButton}>
                  <Text onPress={onSkipIntroPress}>Skip intro</Text>
              </TouchableOpacity>
              <View style={styles.circlesContainer}>
                  <FontAwesome style={styles.circles} name="circle" size={15} color="black"/>
                  <TouchableOpacity>
                     <Entypo onPress={onPart2Press} style={styles.circles} name="circle" size={14} color="black" />
                  </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={onPart2Press}> 
                  <View>
                    <Text style={styles.arrowText}>Intro (part 2)</Text>
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
      },
      intro1Image: {
        width: "69.5%",
        resizeMode: "cover",
        borderRadius: 10,
        aspectRatio: 1,
        marginLeft: "14%",
        marginTop: "7%",
        marginBottom: "9.75%",
      },
      navElemsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', 
        backgroundColor: "white",
      },
    circlesContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row", 
        justifyContent: "center",
        alignItems: "end", 
      },
      circles: {
        padding: 3,
        marginHorizontal: 2, 
      },
      headerText: {
        fontFamily: "Jost_600SemiBold",
        fontSize: 34,
        color: "white",
        marginLeft: "4%",
        marginTop: "7%",
      },
      regularText: {
        fontSize: 16,
        marginLeft: '7%',
        marginTop: "8%",
       fontFamily: "Jost_400Regular",
       color: "white",
      },
      antDesign: {
        paddingLeft: "15%"
      },
      arrowText: {
        fontSize: 16,
        fontFamily: "Jost_400Regular",
        color: "black",
      },
      skipButton: {
        marginBottom: '7.5%',
        fontFamily: "Jost_400Regular",
        fontSize: 16,
      }
  });
  

  export default IntroScreen1;