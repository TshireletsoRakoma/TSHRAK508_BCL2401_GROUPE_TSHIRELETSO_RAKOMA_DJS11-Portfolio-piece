import React, { useState } from 'react';

const MovieSeasonSelector = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState('');

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
    // Handle any logic when season selection changes
  };

  return (
    <div className="season-selector">
      <label htmlFor="seasonSelect">Select Season:</label>
      <select
        id="seasonSelect"
        value={selectedSeason}
        onChange={handleSeasonChange}
      >
        <option value="">Select...</option>
        {seasons.map((season) => (
          <option key={season.id} value={season.id}>
            Season {season.number}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieSeasonSelector;
