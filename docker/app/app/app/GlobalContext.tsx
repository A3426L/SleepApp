import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
  
    return (
      <GlobalContext.Provider value={{ userId, setUserId }}>
        {children}
      </GlobalContext.Provider>
    );
  };

  export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
      throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
  };
  