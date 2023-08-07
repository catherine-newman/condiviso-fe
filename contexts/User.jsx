import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [localEvents, setLocalEvents] = useState("initialValue")
  const [user, setUser] = useState({
    _id: "64c7abf68c2d17441844e6fd",
    first_name: "Marchelle",
    last_name: "Urling",
    email: "murling0@businessinsider.com",
    user_name: "murling0",
    address: "Riga Street, Manchester, United Kingdom",
    postcode: "M4 4GL",
    about_me:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  });

  const [userPosition, setUserPosition] = useState({lat:null,lon:null});
  
   const [localEvents, setLocalEvents] = useState("initialValue")
   
  return (
    <UserContext.Provider value={{ user, setUser, userPosition, setUserPosition, localEvents, setLocalEvents }}>
      {children}
    </UserContext.Provider>
  );
};
