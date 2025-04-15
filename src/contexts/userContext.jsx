// context/UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const DataProvider = ({ children }) => {
  const [searchParms, setSearchParms] = useState({});
  return (
    <UserContext.Provider value={{ searchParms, setSearchParms }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for cleaner access
export const useData = () => useContext(UserContext);
