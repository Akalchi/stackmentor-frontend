import { createContext, useState, useEffect } from "react";
import { getCurrentUser, logout } from "../services/authService"; 
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getCurrentUser()); 
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCurrentUser()); 
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);
  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};