import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the user type
type User = {
  username: string;
  role: 'admin' | 'guest';
} | null;

// Define the context type
type AuthContextType = {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Sample user data (in a real app, this would come from a database)
const USERS = [
  { username: 'admin', password: '123', role: 'admin' as const },
  { username: 'guest123', password: 'guest123', role: 'guest' as const },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing user session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('hotelUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (username: string, password: string): boolean => {
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );
    
    if (user) {
      const userData = { username: user.username, role: user.role };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('hotelUser', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hotelUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};