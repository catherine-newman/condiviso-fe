import React, { useRef, useState, useEffect  } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    PanResponder, 
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import { getDownloadURL, ref } from "firebase/storage";
  import { recipeImagesRef } from "../firebaseConfig";
  import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
  

  const IntroScreen2 = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const storageRef = ref(recipeImagesRef, "Stuffed_Bell_Peppers.jpeg"); 
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
            if (gestureState.dx > 50) {
              navigation.navigate("Intro1");
            }
          },
        })
      ).current;

    const onPart1Press = () => {
        navigation.navigate("Intro1");
      };
      const onMainSitePress = () =>{
        navigation.navigate("SignUpScreen");
      }
      if(imageLoading) return <Text>Loading...</Text>
    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            
            <Text style={styles.headerText}>What is a condiviso?</Text>
            <Text style={styles.regularText}>It is a gathering
              where you can either host people in your local
              community or simply attend and get to know
              the folks nearby. "Condiviso" is the Italian word 
                    for "shared", and we hope by sharing 
                    this app with the world, less food 
                    will be wasted and more precious memories
                    will be made.
            </Text>
            <Image source={{ uri: imageUrl }} style={styles.intro2Image}/>
            <TouchableOpacity onPress={onPart1Press} style={styles.arrow}> 
                <View>
                  <Text style={styles.arrowText}>Intro (part 1)</Text>
                  <AntDesign
                      name="arrowleft"
                      size={30}
                      color="black"
                  />
                </View>
            </TouchableOpacity>
            <View style={styles.circlesContainer}>
                <Entypo onPress={onPart1Press} style={styles.circles} name="circle" size={23} color="black" />
                <FontAwesome style={styles.circles} name="circle" size={24} color="black" />
            </View>
            <TouchableOpacity style={styles.mainSiteButton}>
              <Text style={styles.mainSite} onPress={onMainSitePress}>Go to main site</Text>
            </TouchableOpacity>
        </View>
    )
  }

  const styles = StyleSheet.create({
    intro2Image: {
      width: "40%",
      resizeMode: "cover",
      borderRadius: 10,
      aspectRatio: 1,
      marginLeft: "25%",
      marginTop: "5%",
      },
    container: {
      backgroundColor: "#5daa80",
    //   flex: 1,
    //   paddingBottom: 20, 
    //   paddingLeft: 20, 
    //   flexDirection: "row", 
    },
    arrow: {
      position: "absolute",
      bottom: "3.5%",
      left: "5%",
      zIndex: 1,
      // left: "10%",
  //   padding: 20,
  //   marginLeft: 20,
  //   justifyContent: "flex-end", 
  //   alignItems: "flex-end", 
  },
    circlesContainer: {
      backgroundColor: "white",
      padding: "12%",
      flexDirection: "row", 
      justifyContent: "center",
      alignItems: "end", 
        // marginBottom: 20,
        // marginLeft: -10.5,
        // flexDirection: "row",
        // alignItems: "flex-end", 
      },
      circles: {
        padding: 3,
        marginHorizontal: 2, 
      },
      headerText: {
        fontFamily: "Jost_600SemiBold",
        fontSize: 35,
        color: "white",
        marginLeft: "6%",
        marginTop: "7%",
      },
      regularText: {
        fontSize: 16,
        marginLeft: '10%',
        marginRight: "6%",
        marginTop: "2%",
       fontFamily: "Jost_400Regular",
       color: "white",
      },
      arrowText: {
        fontSize: 16,
        marginRight: '5%',
        marginLeft: '-5%',
       fontFamily: "Jost_400Regular",
       color: "black",
      },
      mainSite: {
       fontFamily: "Jost_400Regular",
       fontSize: 16,
       color: "black",
      },
      mainSiteButton: {
        position: "absolute",
        bottom: "9%",
        right: "5%",
        zIndex: 2,
      }
  });
  

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       flexDirection: "row", // Use row direction to align arrow at bottom
//     },
//     arrow: { 
//         justifyContent: "flex-end", // Align arrow to the right (end) of the row
//         alignItems: "flex-end", 
//       padding: 20, 
//     },
//     circles: {
//         justifyContent: "flex-end", // Align arrow to the right (end) of the row
//         alignItems: "flex-end", 
//     }
//   });
  
  export default IntroScreen2;