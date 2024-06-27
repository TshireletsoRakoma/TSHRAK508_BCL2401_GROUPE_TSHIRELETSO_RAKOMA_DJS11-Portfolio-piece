// src/components/Yourfav.jsx

import React from 'react'; // Importing React
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for navigation
import { useFavorites } from '../contexts/FavouriteContext'; // Importing useFavorites from FavouriteContext
import './Header.css'; // Importing CSS for styling

const Yourfav = () => {
  const { favorites, removeFavorite } = useFavorites(); // Destructuring favorites and removeFavorite from useFavorites

  // Convert favorites object to an array of values
  const favoriteEpisodes = Object.values(favorites); // Converting the favorites object into an array of favorite episodes

  // Check if there are no favorite episodes
  if (favoriteEpisodes.length === 0) {
    return <div>No favorite episodes yet!</div>; // If there are no favorite episodes, display a message
  }

  return (
    <div className="favorites-container">
      <h1>Your Favorite Episodes</h1> {/* Title for the favorites list */}
      <ul className="favorites-list">
        {favoriteEpisodes.map((episode) => ( // Mapping over the array of favorite episodes
          <li key={episode.id} className="favorite-item">
            <div className="podcast-image">
              <img src={episode.image} alt={episode.title} /> {/* Display episode image */}
            </div>
            <div className="podcast-details">
              <h3>{episode.title}</h3> {/* Display episode title */}
              <p>
                Show: <Link to={`/show/${episode.showId}`}>{episode.showTitle}</Link> {/* Link to the show's page */}
              </p>
              <p>Season: {episode.seasonNumber}</p> {/* Display season number */}
              <button onClick={() => removeFavorite(episode.id)}>Remove from Favorites</button> {/* Button to remove episode from favorites */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Yourfav; // Exporting the Yourfav component as the default export
