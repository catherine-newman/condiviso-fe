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
            <Text style={styles.regularText}>It's a gathering
              where you either host people from your local
              community, or simply attend and get to know
              the folks nearby. "Condiviso" is the Italian word 
                    for "shared", and we hope by sharing 
                    this app with the world, less food 
                    will be wasted and more precious memories
                    will be made.
            </Text>
            <Image source={{ uri: imageUrl }} style={styles.intro2Image}/>
            <View style={styles.navElemsContainer}>
              <TouchableOpacity onPress={onPart1Press}> 
                  <Text style={styles.arrowText}>Intro (part 1)</Text>
                  <AntDesign
                      name="arrowleft"
                      size={30}
                      color="black"
                  />
              </TouchableOpacity>
              <View style={styles.circlesContainer}>
                <TouchableOpacity>
                    <Entypo onPress={onPart1Press} style={styles.circles} name="circle" size={14} color="black" />
                </TouchableOpacity>    
                <FontAwesome style={styles.circles} name="circle" size={15} color="black" />
              </View>
              <TouchableOpacity style={styles.mainSiteButton}>
                 <Text style={styles.mainSite} onPress={onMainSitePress}>Go to main site</Text>
              </TouchableOpacity>
            </View> 
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#5daa80",
      flex: 1,
    },
    intro2Image: {
      width: "40%",
      resizeMode: "cover",
      borderRadius: 10,
      aspectRatio: 1,
      marginLeft: "27%",
      marginTop: "5%",
      marginBottom: "10%",
      },
      navElemsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', 
        backgroundColor: "white",
      },
    circlesContainer: {
        paddingHorizontal: 20,
        flexDirection: "row", 
        justifyContent: "center",
        alignItems: "end", 
        marginBottom: 20,
        marginRight: 5,
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
        fontFamily: "Jost_400Regular",
        color: "black",
      },
      mainSite: {
       fontFamily: "Jost_400Regular",
       fontSize: 16,
       color: "black",
      },
      mainSiteButton: {
        marginBottom: '8%',
      }
  });
  


  
  export default IntroScreen2;