import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("murling0");
  const [localEvents, setLocalEvents] = useState("initialValue")
  return (
    <UserContext.Provider value={{ user, setUser, localEvents, setLocalEvents }}>
      {children}
    </UserContext.Provider>
  );
};
