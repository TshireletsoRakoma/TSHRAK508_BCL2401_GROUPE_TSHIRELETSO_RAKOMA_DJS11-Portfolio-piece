import { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { Link, useParams } from 'react-router-dom'; // Importing Link and useParams from react-router-dom for navigation and URL parameter extraction
import { fetchShow } from '../services/PodcastService.js'; // Importing fetchShow service for fetching show details
import AudioPlayer from './AudioPlayer'; // Importing AudioPlayer component
import './Show.css'; // Importing CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon for rendering icons
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Importing solid heart icon
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Importing regular heart icon

const Show = () => {
  const { showId } = useParams(); // Extracting showId from URL parameters
  const [show, setShow] = useState(null); // State to store show details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [selectedSeason, setSelectedSeason] = useState(null); // State to store selected season number
  const [openDropdown, setOpenDropdown] = useState(null); // State to manage open dropdown menu for season selection
  const [playingEpisode, setPlayingEpisode] = useState(null); // State to store currently playing episode ID
  const [favorites, setFavorites] = useState({}); // State to manage favorite episodes

  useEffect(() => {
    const fetchData = async () => { // Async function to fetch show data
      try {
        const data = await fetchShow(showId); // Fetch show details using showId
        setShow(data); // Set fetched data to show state
        setLoading(false); // Set loading state to false
      } catch (error) {
        console.error(`Error fetching show with ID ${showId}:`, error); // Log error if fetching fails
        setLoading(false); // Set loading state to false
        // Handle error state
      }
    };

    fetchData(); // Call fetchData function
  }, [showId]); // Dependency array to re-run effect when showId changes

  const handleSeasonSelect = (seasonNumber) => { // Function to handle season selection
    setSelectedSeason(seasonNumber); // Set selected season
    setOpenDropdown(openDropdown === seasonNumber ? null : seasonNumber); // Toggle dropdown for selected season
    setPlayingEpisode(null); // Reset playing episode when selecting a new season
  };

  const playEpisode = (episodeId) => { // Function to play episode
    setPlayingEpisode(episodeId); // Set playing episode ID
  };

  const pauseEpisode = () => { // Function to pause episode
    setPlayingEpisode(null); // Reset playing episode ID
  };

  const toggleFavorite = (episodeId) => { // Function to toggle favorite status of an episode
    setFavorites((prevFavorites) => ({
      ...prevFavorites, // Spread previous favorites
      [episodeId]: !prevFavorites[episodeId], // Toggle favorite status for the selected episode
    }));
  };

  if (loading) { // If data is still loading
    return <div>Loading...</div>; // Display loading message
  }

  if (!show) { // If show data is not available
    return <div>Show not found</div>; // Display show not found message
  }

  return (
    <div className="show-container"> {/* Container for the show details */}
      <Link to="/" className="back-button"> {/* Link to go back to home */}
        Back to Home
      </Link>
      <div className="show-header"> {/* Container for show header */}
        <h1 className="show-title">{show.title}</h1> {/* Show title */}
        <img src={show.image} alt={show.title} className="show-image" /> {/* Show image */}
        <p className="show-description">{show.description}</p> {/* Show description */}
      </div>

      <div className="season-selector"> {/* Container for season selector */}
        <h2 className="seasons-title">Select a Season</h2> {/* Title for season selector */}
        <ul className="seasons-list"> {/* List of seasons */}
          {show.seasons.map((season) => ( // Mapping over show seasons
            <li key={season.number} className="season-item"> {/* List item for each season */}
              <button onClick={() => handleSeasonSelect(season.number)} className="season-button"> {/* Button to select season */}
                Season {season.number}
              </button>
              {openDropdown === season.number && ( // If dropdown for this season is open
                <div className="dropdown-content"> {/* Container for dropdown content */}
                  <ul className="episodes-list"> {/* List of episodes */}
                    {season.episodes.map((episode) => ( // Mapping over episodes of the season
                      <li key={episode.id} className="episode-item"> {/* List item for each episode */}
                        <div className="episode-details"> {/* Container for episode details */}
                          <h3 className="episode-title">{episode.title}</h3> {/* Episode title */}
                          <p className="episode-duration">Duration: {episode.duration}</p> {/* Episode duration */}
                          <div className="favorite-icon" onClick={() => toggleFavorite(episode.id)}> {/* Container for favorite icon */}
                            <FontAwesomeIcon
                              icon={favorites[episode.id] ? solidHeart : regularHeart} // Conditional rendering of favorite icon
                              className={favorites[episode.id] ? 'heart-solid' : 'heart-regular'} // Conditional class for favorite icon
                            />
                          </div>
                          <AudioPlayer
                            key={episode.id} // Unique key for AudioPlayer
                            src={episode.audioSrc} // Audio source for the episode
                            isPlaying={playingEpisode === episode.id} // Check if this episode is playing
                            onPlay={() => playEpisode(episode.id)} // Function to play episode
                            onPause={pauseEpisode} // Function to pause episode
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

      {selectedSeason && ( // If a season is selected
        <div className="episodes-container"> {/* Container for episodes */}
          <h2 className="episodes-title">Episodes of Season {selectedSeason}</h2> {/* Title for episodes */}
          <ul className="episodes-list"> {/* List of episodes */}
            {show.seasons
              .find((season) => season.number === selectedSeason) // Finding selected season
              .episodes.map((episode) => ( // Mapping over episodes of selected season
                <li key={episode.id} className="episode-item"> {/* List item for each episode */}
                  <div className="episode-details"> {/* Container for episode details */}
                    <h3 className="episode-title">{episode.title}</h3> {/* Episode title */}
                    <p className="episode-duration">Duration: {episode.duration}</p> {/* Episode duration */}
                    <div className="favorite-icon" onClick={() => toggleFavorite(episode.id)}> {/* Container for favorite icon */}
                      <FontAwesomeIcon
                        icon={favorites[episode.id] ? solidHeart : regularHeart} // Conditional rendering of favorite icon
                        className={favorites[episode.id] ? 'heart-solid' : 'heart-regular'} // Conditional class for favorite icon
                      />
                    </div>
                    <AudioPlayer
                      key={episode.id} // Unique key for AudioPlayer
                      src={episode.audioSrc} // Audio source for the episode
                      isPlaying={playingEpisode === episode.id} // Check if this episode is playing
                      onPlay={() => playEpisode(episode.id)} // Function to play episode
                      onPause={pauseEpisode} // Function to pause episode
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

export default Show; // Exporting Show component as default
