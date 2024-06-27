import React, { useState } from 'react'; // Importing React and useState hook

const MovieSeasonSelector = ({ seasons }) => { // Defining a functional component MovieSeasonSelector that accepts a prop 'seasons'
  const [selectedSeason, setSelectedSeason] = useState(''); // State to store the selected season, initialized as an empty string

  const handleSeasonChange = (event) => { // Function to handle changes in season selection
    setSelectedSeason(event.target.value); // Update the selectedSeason state with the selected value
    // Handle any logic when season selection changes
  };

  return (
    <div className="season-selector"> {/* Container for season selector */}
      <label htmlFor="seasonSelect">Select Season:</label> {/* Label for the select dropdown */}
      <select
        id="seasonSelect" // Setting the id for the select element
        value={selectedSeason} // Binding the value of the select element to the selectedSeason state
        onChange={handleSeasonChange} // Event handler for when the selected option changes
      >
        <option value="">Select...</option> {/* Default option with no value */}
        {seasons.map((season) => ( // Mapping over the seasons prop to create options
          <option key={season.id} value={season.id}> {/* Key is set to season.id for each option and value is also set to season.id */}
            Season {season.number} {/* Displaying the season number */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieSeasonSelector; // Exporting the MovieSeasonSelector component as the default export
