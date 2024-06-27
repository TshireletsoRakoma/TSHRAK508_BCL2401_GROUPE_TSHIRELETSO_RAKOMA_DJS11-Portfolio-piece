import React from 'react'; // Importing React library
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation
import { useFavorites } from '../contexts/FavouriteContext'; // Importing useFavorites hook from FavouriteContext
import './YourFav.css'; // Importing CSS file for styling

const Yourfav = () => {
  const { favorites, removeFavorite } = useFavorites(); // Destructuring favorites and removeFavorite from useFavorites hook

  const favoriteEpisodes = Object.values(favorites); // Converting the favorites object into an array of favorite episodes

  if (favoriteEpisodes.length === 0) { // Checking if there are no favorite episodes
    return <div className="empty-favorites">Currently, there are no favorite episodes!</div>; // Display message when there are no favorite episodes
  }

  // Function to handle removing a favorite episode
  const handleRemoveFavorite = (episodeId) => {
    removeFavorite(episodeId); // Calling removeFavorite function from context to remove the episode
  };

  return (
    <div className="favorites-container"> {/* Container for the list of favorite episodes */}
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
              <button onClick={() => handleRemoveFavorite(episode.id)}>Remove from Favorites</button> {/* Button to remove episode from favorites */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Yourfav; // Exporting the Yourfav component as the default export
