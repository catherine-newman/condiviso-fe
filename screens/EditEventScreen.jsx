import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';
import {patchEvent} from "../utils/api"
import { Calendar } from 'react-native-calendars';
import { useRoute, useNavigation } from "@react-navigation/native";

const EditEventScreen = ({ route }) => {
    const navigation = useNavigation();
    const [newEventName, setNewEventName] = useState();
    const [newEventDate, setNewEventDate] = useState();
    const [markedDates, setMarkedDates] = useState({});
    const [newEventDescription, setNewEventDescription] = useState();
    const [newEventDuration, setNewEventDuration] = useState();
    const [currentEventInfo, setCurrentEventInfo ] = useState({});
    // const [currentEventId, setCurrentEventId] =  useState();
    const [updatedEvent, setUpdatedEvent ] = useState();
    useEffect(() => {
        setCurrentEventInfo(route.params.eventData)
    }, [])

    // {
//     event_name: 'Salad Party',
//     event_date: '2023-08-24T00:00:00.000Z',
//     event_description: 'Who says salad is boring? No one after my amazing salad parties',
//     event_duration: 3,
//     attendees: [
//         {
//             first_name: "Marchelle",
//             user_id: "64c7abf68c2d17441844e6fd"
//         }
//     ]
// }


    const onChangeEventName = (eventName) => {
        setNewEventName(eventName)
    }
    const onChangeEventDate = (eventDate) => {
        const selectedDate = eventDate.dateString;
        setMarkedDates({ [selectedDate]: { selected: true }})
         const formattedDate = new Date(eventDate.dateString);
        setNewEventDate(formattedDate);
    }
    const onChangeEventDescription = (eventDescription) => {
        setNewEventDescription(eventDescription)
    }
    const onChangeEventDuration = (eventDuration) => {
        // if(typeof eventDuration === 'number') {
            setNewEventDuration(eventDuration);
        // }
    }

    const handleSubmit = () => {
        const patchBody = {};
        if(newEventName) patchBody.event_name = newEventName
        else patchBody.event_name = currentEventInfo.event_name;
        if(newEventDate) patchBody.event_date = newEventDate
        else patchBody.event_date = currentEventInfo.event_date;
        if(newEventDescription) patchBody.event_description = newEventDescription
        else patchBody.event_description = currentEventInfo.event_description;
        if(newEventDuration) patchBody.event_duration = newEventDuration
        else patchBody.event_duration = currentEventInfo.event_duration;
        patchBody.attendees = currentEventInfo.attendees;
        
        patchEvent(currentEventInfo._id, patchBody).then((data) => {
            setUpdatedEvent(data)
        })
      };

      useEffect(() => {
        if(updatedEvent) {
        navigation.navigate("Updated Event", { updatedEvent, newEventName, newEventDate, newEventDescription, newEventDuration});
        }
      }, [updatedEvent])

    //   const onReturnEventPress = () => {
    //     navigation.navigate("Event Screen", { })
    //   }
      return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Edit Event Details</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEventName}
                placeholder="Event Name"
            />
    
            {/* <TextInput
                style={styles.input}
                onChangeText={onChangeEventDate}
                placeholder="Event Date"
            /> */}
    
            <TextInput
                style={styles.input}
                onChangeText={onChangeEventDescription}
                placeholder="Event Description"
                multiline={true}
            />
    
            <TextInput
                style={styles.input}
                onChangeText={onChangeEventDuration}
                placeholder="Event Duration in hours"
                keyboardType="numeric"
            />
            <View style={styles.regularTextContainer}>
                <Text style={styles.regularText}>
                    Choose a new date on the calendar
                </Text>
            </View>
            <Calendar
                onDayPress={onChangeEventDate}
                markedDates={markedDates}
                // markedDates={newEventDate ? { [newEventDate]: { selected: true } } : {}}
            />


            {!newEventName && !newEventDate && !newEventDescription && !newEventDuration ? (
            <TouchableOpacity style={styles.completeFieldPrompt}>
                <Text style={styles.completeFieldPromptText}>Edit the details of your event in the fields above</Text>
            </TouchableOpacity>
            ) : (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            )}
            {/* <TouchableOpacity style={styles.submitButton} onPress={onReturnEventPress}>
                <Text style={styles.submitButtonText}>Return to Event</Text>
            </TouchableOpacity> */}
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5daa80",
        justifyContent: 'space-evenly',
    },
    headerText: {
       color: 'white',
       fontSize: 25,
       fontFamily: "Jost_600SemiBold",
    }, 
    headerContainer: {
        alignItems: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white'
    },
    regularTextContainer: {
        alignItems: 'center',
    },
    regularText: {
        color: 'white',
        fontSize: 16,
        fontFamily: "Jost_400Regular",
    },
    completeFieldPrompt: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
      },
      completeFieldPromptText: {
        color: 'black',
        fontSize: 18,
        fontFamily: "Jost_400Regular",
      },
      submitButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1C046",
        borderRadius: 10,
        // paddingVertical: 10,
        paddingHorizontal: 15,
        width: 160,
        alignSelf: "center", 
      },
      submitButtonText: {
        textAlign: "center", 
        fontSize: 20,
        fontFamily: "Jost_400Regular",
        letterSpacing: 0.5,
      },
  });

export default EditEventScreen


