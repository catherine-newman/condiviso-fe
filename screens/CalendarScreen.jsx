import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { useCallback, useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { UserContext } from "../contexts/User";
import { getEvents } from "../utils/api";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function CalendarScreen() {
  const { userPosition } = useContext(UserContext);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});
  const [hideFullEvents, setHideFullEvents] = useState(false);

  useEffect(() => {
    getEvents(null, null, null, userPosition.lon, userPosition.lat, null, null, hideFullEvents)
      .then((data) => {
        if (data && data.events) {
          const sectionData = [];
          const markedDatesData = {};
          data.events.forEach((event) => {
            const eventDate = new Date(event.event_date);
            const formattedDate = eventDate.toISOString().substring(0, 10);
            const eventDescription = event.event_description
              .substring(0, 50)
              .concat("...");
            const data = {
              event_name: event.event_name,
              event_city: event.event_city,
              event_description: eventDescription,
              eventInfo: event
            };
            if (sectionData.length === 0) {
              sectionData.push({ title: formattedDate, data: [data] });
              markedDatesData[formattedDate] = { marked: true };
            } else {
              let match = false;
              sectionData.forEach((item) => {
                if (formattedDate === item.title) {
                  item.data.push(data);
                  match = true;
                }
              });
              if (match === false) {
                sectionData.push({ title: formattedDate, data: [data] });
                markedDatesData[formattedDate] = { marked: true };
              }
            }
          });
          sectionData.sort((a, b) => new Date(a.title) - new Date(b.title));
          setCalendarEvents(sectionData);
          setMarkedDates(markedDatesData);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [hideFullEvents]);

  const toggleHideFullEvents = () => {
    setHideFullEvents(!hideFullEvents);
  };

  const Checkbox = ({ label, checked, onChange }) => {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
        {checked ? (
          <View style={[styles.checkbox, styles.checkedBox]} />
        ) : (
          <View style={styles.checkbox} />
        )}
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = useCallback(({ item }) => {
    const navigation = useNavigation();
    const navigateToEventScreen = (item) => {
      navigation.navigate("Event Screen", { item })
    }
    return (
      <>
      <TouchableOpacity
      onPress={() => navigateToEventScreen(item.eventInfo)}>
       <View style={styles.eventCard}>
      <Text style={styles.eventName}>{item.event_name}</Text>
      <Text style={styles.eventCity}>{item.event_city}</Text>
      <Text style={styles.eventDescription}>{item.event_description}</Text>
    </View>
    </TouchableOpacity>
      </>
    );
  }, []);
  return (
    <View style={styles.container}>
      <Checkbox label="Hide full events" checked={hideFullEvents} onChange={toggleHideFullEvents} />
      <CalendarProvider date={new Date()} showTodayButton>
        <ExpandableCalendar
          initialPosition={ExpandableCalendar.positions.OPEN}
          firstDay={1}
          animateScroll
          markedDates={markedDates}
          theme={customTheme}
        
        />
        {isLoading && <Text >Loading...</Text>}
        {!isLoading && (
          <AgendaList sections={calendarEvents} renderItem={renderItem} />
        )}
      </CalendarProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  eventName: {
    fontFamily: "Jost_400Regular",
    fontSize: 25,
    color: "#ffffff",
  },
  eventCity: {
    fontFamily: "Jost_400Regular",
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 8, 
  },
  eventDescription: {
    fontFamily: "Jost_400Regular",
    fontSize: 16,
    color: "#ffffff",
    paddingLeft: 16, 
  },
  eventCard: {
    padding: 16, 
    backgroundColor: "#5daa80", 
    borderRadius: 8,
    marginBottom: 8, 
    marginTop: 8,
    marginRight: 8,

    marginLeft:8
  },
  loading: {
    backgroundColor: "#5daa80",
    color: "white",
    fontSize: 16
 
    
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#5daa80",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: "#F1C046",
    borderColor: "white",
  },
  label: {
    fontSize: 18,
    color: "white",
    fontFamily: "Jost_400Regular"
  },
  todayButton: {
    backgroundColor: "white",
    color: "green"
  }
});

const customTheme = {
  backgroundColor: "white", 
  calendarBackground: "white", 
  textSectionTitleColor: "#217074", 
  selectedDayBackgroundColor: "#065906",
  selectedDayTextColor: "#ffffff", 
  todayTextColor: "#002A00",
  dayTextColor: "#004400", 
  textDisabledColor: "#E7EAEF", 
  dotColor: "#217074",
  selectedDotColor: "white",
  arrowColor: "#002A00", 
  monthTextColor: "#002A00",
};



