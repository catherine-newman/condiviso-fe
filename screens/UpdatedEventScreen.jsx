import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';

const UpdatedEventScreen = ({ route}) => {
    const navigation = useNavigation();
    const [item, setItem] = useState();
    useEffect(() => {
        setItem(route.params.updatedEvent.updatedEvent);
    }, [])
   
    const handleReturnEventPress = () => {
        navigation.navigate("Event Screen", {item})
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Updated Event Details:</Text>
            </View>
            <View style={styles.allUpdatedDetailsContainer}>
                {route.params.newEventName ? (
                <View style={styles.updatedDetailsContainer}> 
                    <Text style={styles.updatedDetails}>
                    <Text style={styles.label}>Edited Event Name: </Text>{route.params.newEventName}
                    </Text>
                    </View>
                ) : null}
                {route.params.newEventDescription ? (
                <View style={styles.updatedDetailsContainer}> 
                    <Text style={styles.updatedDetails}>
                        <Text style={styles.label}>Edited Event Description: </Text>{route.params.newEventDescription}
                    </Text>
                    </View>
                ) : null}
                {route.params.newEventDuration ? (
                <View style={styles.updatedDetailsContainer}> 
                    <Text style={styles.updatedDetails}>
                        <Text style={styles.label}>Edited Event Duration in Hours: </Text>{route.params.newEventDuration}
                    </Text>
                    </View>
                ) : null}
                {route.params.newEventDate ? (
                <View style={styles.updatedDetailsContainer}> 
                        <Text style={styles.updatedDetails}>
                            <Text style={styles.label}>Edited Event Date: </Text>{new Date(route.params.newEventDate).toLocaleDateString()}
                        </Text>
                    </View>
                ) : null}
            </View>
              <TouchableOpacity style={styles.returnToEventContainer} onPress={handleReturnEventPress}>
                <Text style={styles.returnToEventText}>Return to Event</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5daa80",
        alignItems: "center",
    },
    headerText: {
        marginTop: '8%',
        marginBottom: '10%',
        color: 'white',
        fontSize: 25,
        fontFamily: "Jost_600SemiBold",
    },
    headerContainer: {
        alignItems: 'center',
    },
    allUpdatedDetailsContainer: {
        backgroundColor: 'white',
        padding: '3%',
        borderRadius: '15%'
    },
    updatedDetailsContainer: {
        alignItems: "start",
        width: '80%',
        marginBottom: '5%',
    },
    updatedDetails: {
        color: 'black',
        fontSize: 18,
        fontFamily: "Jost_400Regular",
    },
    label: {
        color: '#5daa80',
        fontSize: 18,
        fontFamily: "Jost_600SemiBold",
    },
    returnToEventContainer: {
        margin: '8%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1C046",
        borderRadius: 10,
        paddingHorizontal: 15,
        width: 160,
        alignSelf: "center", 
      },
      returnToEventText: {
        textAlign: "center", 
        fontSize: 20,
        fontFamily: "Jost_400Regular",
        letterSpacing: 0.5,
      },
});



export default UpdatedEventScreen




// import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';


// const UpdatedEventScreen = ({ route}) => {
//     // console.log(route.params.updatedEvent);
//     // console.log(new Date(route.params.newEventDate).toLocaleDateString());

//     return (
//         <View style={styles.container}>
//             <View style={styles.headerContainer}>
//                 <Text style={styles.headerText}>Updated Event Details:</Text>
//             </View>
//             {route.params.newEventName ? (
//                <View style={styles.updatedDetailsContainer}> 
//                 <Text style={styles.updatedDetails}>
//                     Edited Event Name: {route.params.newEventName}
//                 </Text>
//                 </View>
//             ) : null}
//             {route.params.newEventDescription ? (
//                <View style={styles.updatedDetailsContainer}> 
//                 <Text style={styles.updatedDetails}>
//                     Edited Event Description: {route.params.newEventDescription}
//                 </Text>
//                 </View>
//             ) : null}
//             {route.params.newEventDuration ? (
//                <View style={styles.updatedDetailsContainer}> 
//                 <Text style={styles.updatedDetails}>
//                     Edited Event Duration in Hours: {route.params.newEventDuration}
//                 </Text>
//                 </View>
//             ) : null}
//             {route.params.newEventDate ? (
//                <View style={styles.updatedDetailsContainer}> 
//                     <Text style={styles.updatedDetails}>
//                         Edited Event Date: {new Date(route.params.newEventDate).toLocaleDateString()}
//                     </Text>
//                 </View>
//             ) : null}
//               <TouchableOpacity style={styles.returnToEventContainer} >
//                 <Text style={styles.returnToEventText}>Return to Event</Text>
//             </TouchableOpacity>
//         </View>

//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#5daa80",
        
//         alignItems: "center",
//     },
//     headerText: {
//         marginTop: '8%',
//         marginBottom: '10%',
//         color: 'white',
//         fontSize: 25,
//         fontFamily: "Jost_600SemiBold",
//     },
//     headerContainer: {
//         alignItems: 'center',
//     },
//     updatedDetailsContainer: {
//         alignItems: "center",
//         width: '90%',
//         margin: '5%',
//     },
//     updatedDetails: {
//         color: 'white',
//         fontSize: 16,
//         fontFamily: "Jost_400Regular",
//     },
//     returnToEventContainer: {
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#F1C046",
//         borderRadius: 10,
//         // paddingVertical: 10,
//         paddingHorizontal: 15,
//         width: 160,
//         alignSelf: "center", 
//       },
//       returnToEventText: {
//         textAlign: "center", 
//         fontSize: 20,
//         fontFamily: "Jost_400Regular",
//         letterSpacing: 0.5,
//       },
// });



// export default UpdatedEventScreen

//Pasta Feast
// Amazing Pasta Feast


// Hey, all! Come hang out at my place for a Pasta Feast. We're dishing up spaghetti Carbonara - a family recipe passed down from Nonna. Let's savor the creamy goodness and share stories while indulging in this classic Italian comfort.

// Hey, everyone! Come hang out at my place for a Pasta Feast. We're dishing up spaghetti Carbonara - a family recipe passed down from Nonna. Let's savor the creamy goodness and share stories while indulging in this classic Italian comfort.

// 3
//5

// 01/08
// 12/08