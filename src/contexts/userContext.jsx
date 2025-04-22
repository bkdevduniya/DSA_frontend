// context/UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for cleaner access
export const useData = () => useContext(UserContext);
