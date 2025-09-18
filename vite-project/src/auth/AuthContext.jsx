import { createContext, useContext, useEffect, useState } from "react";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for session on load
  useEffect(() => {
    const sessionId = localStorage.getItem("tmdb_session_id");
    const apiKey = localStorage.getItem("tmdb_api_key");
    if (sessionId && apiKey) {
      setUser({ sessionId, apiKey });
    }
  }, []);

  // Login function (save in localStorage + state)
  const login = (sessionId, apiKey) => {
    localStorage.setItem("tmdb_session_id", sessionId);
    localStorage.setItem("tmdb_api_key", apiKey);
    setUser({ sessionId, apiKey });
  };

  // Logout function (clear storage + state)
  const logout = () => {
    localStorage.removeItem("tmdb_session_id");
    localStorage.removeItem("tmdb_api_key");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth
export const useAuth = () => useContext(AuthContext);
