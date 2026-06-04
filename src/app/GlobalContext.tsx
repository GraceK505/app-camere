"use client";
import { createContext, useContext, useState } from "react";

interface GlobalContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const loadingContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMenu = () => setIsMenuOpen(true);
  const hideMenu = () => setIsMenuOpen(false);

    return (
        <loadingContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
          {children}
        </loadingContext.Provider>
      );
};

export function useLoading() {
  const context = useContext(loadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
