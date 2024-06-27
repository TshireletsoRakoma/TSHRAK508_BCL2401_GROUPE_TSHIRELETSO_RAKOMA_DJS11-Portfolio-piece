import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavouriteContext';
import './Header.css';

const Yourfav = () => {
  const { favorites, removeFavorite } = useFavorites();

  const favoriteEpisodes = Object.values(favorites);

  if (favoriteEpisodes.length === 0) {
    return <div style={{ color: 'black' }}>Currently, there are no favorite episodes!</div>; // Setting inline style for text color
  }

  return (
    <div className="favorites-container">
      <h1>Your Favorite Episodes</h1>
      <ul className="favorites-list">
        {favoriteEpisodes.map((episode) => (
          <li key={episode.id} className="favorite-item">
            <div className="podcast-image">
              <img src={episode.image} alt={episode.title} />
            </div>
            <div className="podcast-details">
              <h3>{episode.title}</h3>
              <p>
                Show: <Link to={`/show/${episode.showId}`}>{episode.showTitle}</Link>
              </p>
              <p>Season: {episode.seasonNumber}</p>
              <button onClick={() => removeFavorite(episode.id)}>Remove from Favorites</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Yourfav;
