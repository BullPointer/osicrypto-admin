import { createContext, useContext, useState } from "react";

type ContextType = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

type ContextProps = {
  children: React.ReactNode;
};

const AppContext = createContext({} as ContextType);

export const AppProvider = ({ children }: ContextProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <AppContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
