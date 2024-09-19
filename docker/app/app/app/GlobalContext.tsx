import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  userIdglobal: string | null;
  setUserIdglobal: (id: string | null) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userIdglobal, setUserIdglobal] = useState<string | null>(null);
  
    return (
      <GlobalContext.Provider value={{ userIdglobal, setUserIdglobal }}>
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
  