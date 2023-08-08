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
        <Text>{item.event_name}</Text>
        <Text>{item.event_city}</Text>
        <Text>{item.event_description}</Text>
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
  },
});
