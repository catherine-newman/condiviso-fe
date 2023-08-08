import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { useCallback, useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { UserContext } from "../contexts/User";
import { getEvents } from "../utils/api";

export default function CalendarScreen() {
  const { userPosition } = useContext(UserContext);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    getEvents(null, null, null, userPosition.lon, userPosition.lat)
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
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <>
       <View style={styles.eventCard}>
      <Text style={styles.eventName}>{item.event_name}</Text>
      <Text style={styles.eventCity}>{item.event_city}</Text>
      <Text style={styles.eventDescription}>{item.event_description}</Text>
    </View>
      </>
    );
  }, []);
  return (
    <View style={styles.container}>
      <CalendarProvider date={new Date()} showTodayButton>
        <ExpandableCalendar
          initialPosition={ExpandableCalendar.positions.OPEN}
          firstDay={1}
          animateScroll
          markedDates={markedDates}
          theme={customTheme}
        
        />
        {isLoading && <Text>Loading...</Text>}
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
    backgroundColor: "#5daa80",
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
    backgroundColor: "#00adf5", 
    borderRadius: 8,
    marginBottom: 16, 
  },
});

const customTheme = {
  backgroundColor: "#f5f6e2", 
  calendarBackground: "#bad5ad", 
  textSectionTitleColor: "#217074", 
  selectedDayBackgroundColor: "#00adf5",
  selectedDayTextColor: "#ffffff", 
  todayTextColor: "#217074",
  dayTextColor: "#2d4150", 
  textDisabledColor: "#E7EAEF", 
  dotColor: "#217074",
  selectedDotColor: "#ffffff",
  arrowColor: "#00adf5", 
  monthTextColor: "#00adf5",
};



