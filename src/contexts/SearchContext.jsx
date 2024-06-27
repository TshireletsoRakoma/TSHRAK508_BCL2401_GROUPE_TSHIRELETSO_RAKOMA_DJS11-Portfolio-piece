// Importing necessary modules from React library
import React, { createContext, useState } from 'react';

// Creating a new context named SearchContext
export const SearchContext = createContext();

// Defining SearchProvider component that accepts children as props
export const SearchProvider = ({ children }) => {
  // Initializing state variable searchQuery with empty string using useState hook
  const [searchQuery, setSearchQuery] = useState('');

  // Providing SearchContext with value of searchQuery state and setSearchQuery function to its children
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children} {/* Rendering children components */}
    </SearchContext.Provider>
  );
};
