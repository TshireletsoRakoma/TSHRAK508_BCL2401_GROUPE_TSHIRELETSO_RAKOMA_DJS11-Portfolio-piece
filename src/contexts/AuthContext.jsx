import React, { createContext, useContext, useState } from 'react';

// Creating the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide authentication context to its children
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to manage the authenticated user

  // Function to handle user login
  const login = (username, password) => {
    console.log(`Attempting login with username: ${username} and password: ${password}`); // Logging login attempt
    if (username === 'Tshire' && password === '1234') { // Check if the username and password are correct
      console.log('Login successful'); // Logging successful login
      setUser({ username }); // Setting the user state to the logged-in user
      return true; // Returning true for successful login
    }
    console.log('Login failed'); // Logging failed login
    return false; // Returning false for failed login
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null); // Clearing the user state
  };

  // Providing the user, login, and logout functions to the AuthContext
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Rendering the children components */}
    </AuthContext.Provider>
  );
};
