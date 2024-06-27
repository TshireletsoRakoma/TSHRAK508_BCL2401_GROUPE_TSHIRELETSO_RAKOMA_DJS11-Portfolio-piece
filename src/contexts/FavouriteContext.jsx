// Importing necessary libraries and hooks from React
import React, { createContext, useState, useContext } from 'react';

// Creating the FavoritesContext
export const FavoritesContext = createContext();

// FavoritesProvider component to provide favorite episodes context to its children
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({}); // State to manage favorite episodes

  // Function to add an episode to favorites
  const addFavorite = (episode) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites, // Copying previous favorites
      [episode.id]: episode, // Adding the new favorite episode
    }));
  };

  // Function to remove an episode from favorites
  const removeFavorite = (episodeId) => {
    const { [episodeId]: _, ...updatedFavorites } = favorites; // Destructuring to remove the specific episode
    setFavorites(updatedFavorites); // Updating the state with the remaining favorites
  };

  // Function to check if an episode is in favorites
  const isFavorite = (episodeId) => {
    return !!favorites[episodeId]; // Returns true if the episode is in favorites, false otherwise
  };

  // Providing favorites, addFavorite, removeFavorite, and isFavorite functions to the FavoritesContext
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children} {/* Rendering the children components */}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the FavoritesContext
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
