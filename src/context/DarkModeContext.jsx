import { createContext, useContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};