import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [localEvents, setLocalEvents] = useState("initialValue")
  const [user, setUser] = useState({});

  const [userPosition, setUserPosition] = useState({lat:null,lon:null});

   
  return (
    <UserContext.Provider value={{ user, setUser, userPosition, setUserPosition, localEvents, setLocalEvents }}>
      {children}
    </UserContext.Provider>
  );
};
