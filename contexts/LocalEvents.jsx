import React, { createContext, useState } from 'react';
import { getEvents } from "../utils/api"
export const LocalEventsContext = createContext();

export const LocalEventsContextProvider = ({ children }) => {
  const [localEvents, setLocalEvents] = useState(null);
    getEvents().then((responseData) => {
        setLocalEvents(responseData.events);
    })

  return (
    <LocalEventsContext.Provider value={{ localEvents, setLocalEvents }}>
      {children}
    </LocalEventsContext.Provider>
  );
};
