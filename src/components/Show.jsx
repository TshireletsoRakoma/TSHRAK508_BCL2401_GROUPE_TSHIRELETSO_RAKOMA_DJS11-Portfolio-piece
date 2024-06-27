import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import { Link, useParams } from 'react-router-dom'; // Importing Link and useParams from react-router-dom for navigation and URL parameters
import { fetchShow } from '../services/PodcastService.js'; // Importing the fetchShow function from PodcastService
import AudioPlayer from './AudioPlayer'; // Importing the AudioPlayer component
import './Show.css'; // Importing CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Importing solid heart icon
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Importing regular heart icon

const Show = () => {
  const { showId } = useParams(); // Extracting the showId from the URL parameters
  const [show, setShow] = useState(null); // State to store the show data, initialized as null
  const [loading, setLoading] = useState(true); // State to manage loading state, initialized as true
  const [selectedSeason, setSelectedSeason] = useState(null); // State to store the selected season, initialized as null
  const [openDropdown, setOpenDropdown] = useState(null); // State to manage open dropdown for seasons, initialized as null
  const [playingEpisode, setPlayingEpisode] = useState(null); // State to store the currently playing episode, initialized as null
  const [favorites, setFavorites] = useState({}); // State to manage favorite episodes, initialized as an empty object

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShow(showId); // Fetch show data using the showId
        setShow(data); // Set the fetched data to the show state
        setLoading(false); // Set loading state to false
      } catch (error) {
        console.error(`Error fetching show with ID ${showId}:`, error); // Log error if fetching fails
        setLoading(false); // Set loading state to false
        // Handle error state
      }
    };

    fetchData(); // Call the fetchData function
  }, [showId]); // Dependency array for useEffect, re-runs when showId changes

  const handleSeasonSelect = (seasonNumber) => {
    setSelectedSeason(seasonNumber); // Set the selected season number
    setOpenDropdown(openDropdown === seasonNumber ? null : seasonNumber); // Toggle the dropdown for the selected season
    setPlayingEpisode(null); // Reset playing episode when selecting a new season
  };

  const playEpisode = (episodeId) => {
    setPlayingEpisode(episodeId); // Set the playing episode to the selected episodeId
  };

  const pauseEpisode = () => {
    setPlayingEpisode(null); // Pause the episode by setting playingEpisode to null
  };

  const toggleFavorite = (episodeId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites, // Copy previous favorites
      [episodeId]: !prevFavorites[episodeId], // Toggle the favorite status of the selected episode
    }));
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message if data is being fetched
  }

  if (!show) {
    return <div>Show not found</div>; // Display message if no show data is found
  }

  return (
    <div className="show-container">
      <Link to="/" className="back-button">
        Back to Home {/* Link to navigate back to the home page */}
      </Link>
      <div className="show-header">
        <h1 className="show-title">{show.title}</h1> {/* Display the show title */}
        <img src={show.image} alt={show.title} className="show-image" /> {/* Display the show image */}
        <p className="show-description">{show.description}</p> {/* Display the show description */}
      </div>

      <div className="season-selector">
        <h2 className="seasons-title">Select a Season</h2> {/* Title for season selector */}
        <ul className="seasons-list">
          {show.seasons.map((season) => ( // Map over seasons to create list items for each season
            <li key={season.number} className="season-item">
              <button onClick={() => handleSeasonSelect(season.number)} className="season-button">
                Season {season.number} {/* Button to select the season */}
              </button>
              {openDropdown === season.number && ( // Conditional rendering of the dropdown content if the season is selected
                <div className="dropdown-content">
                  <ul className="episodes-list">
                    {season.episodes.map((episode) => ( // Map over episodes to create list items for each episode
                      <li key={episode.id} className="episode-item">
                        <div className="episode-details">
                          <h3 className="episode-title">{episode.title}</h3> {/* Display episode title */}
                          <p className="episode-duration">Duration: {episode.duration}</p> {/* Display episode duration */}
                          <div className="favorite-icon" onClick={() => toggleFavorite(episode.id)}> {/* Toggle favorite status */}
                            <FontAwesomeIcon
                              icon={favorites[episode.id] ? solidHeart : regularHeart} // Conditional icon based on favorite status
                              className={favorites[episode.id] ? 'heart-solid' : 'heart-regular'} // Conditional class based on favorite status
                            />
                          </div>
                          <AudioPlayer
                            key={episode.id} // Unique key for AudioPlayer
                            src={episode.audioSrc} // Source of the audio
                            isPlaying={playingEpisode === episode.id} // Check if the episode is currently playing
                            onPlay={() => playEpisode(episode.id)} // Play episode handler
                            onPause={pauseEpisode} // Pause episode handler
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {selectedSeason && ( // Conditional rendering of episodes container if a season is selected
        <div className="episodes-container">
          <h2 className="episodes-title">Episodes of Season {selectedSeason}</h2> {/* Title for the episodes container */}
          <ul className="episodes-list">
            {show.seasons
              .find((season) => season.number === selectedSeason) // Find the selected season
              .episodes.map((episode) => ( // Map over episodes of the selected season
                <li key={episode.id} className="episode-item">
                  <div className="episode-details">
                    <h3 className="episode-title">{episode.title}</h3> {/* Display episode title */}
                    <p className="episode-duration">Duration: {episode.duration}</p> {/* Display episode duration */}
                    <div className="favorite-icon" onClick={() => toggleFavorite(episode.id)}> {/* Toggle favorite status */}
                      <FontAwesomeIcon
                        icon={favorites[episode.id] ? solidHeart : regularHeart} // Conditional icon based on favorite status
                        className={favorites[episode.id] ? 'heart-solid' : 'heart-regular'} // Conditional class based on favorite status
                      />
                    </div>
                    <AudioPlayer
                      key={episode.id} // Unique key for AudioPlayer
                      src={episode.audioSrc} // Source of the audio
                      isPlaying={playingEpisode === episode.id} // Check if the episode is currently playing
                      onPlay={() => playEpisode(episode.id)} // Play episode handler
                      onPause={pauseEpisode} // Pause episode handler
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Show; // Exporting the Show component as the default export
