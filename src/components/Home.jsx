// src/components/Home.jsx

import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation
import { fetchPreviews } from '../services/PodcastService.js'; // Importing function to fetch podcast previews
import { useFavorites } from '../contexts/FavouriteContext.jsx'; // Importing useFavorites hook for managing favorites
import './Home.css'; // Updated CSS import
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importing FontAwesome icons

const Home = () => {
  const [podcasts, setPodcasts] = useState([]); // State to store all podcasts
  const [displayedPodcasts, setDisplayedPodcasts] = useState([]); // State to store displayed podcasts
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [fetchError, setFetchError] = useState(null); // State to manage fetch error
  const [sortOption, setSortOption] = useState('All'); // State to manage sort option
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query
  const [selectedGenre, setSelectedGenre] = useState('All'); // State to manage selected genre
  const [viewMode, setViewMode] = useState('list'); // State to manage view mode (list or grid)

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites(); // Destructuring favorites context

  const genres = { // Mapping of genre IDs to genre names
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  useEffect(() => { // Effect to fetch podcasts on component mount
    const loadPodcasts = async () => {
      try {
        const data = await fetchPreviews(); // Fetching podcast previews
        setPodcasts(data); // Setting podcasts state
        setDisplayedPodcasts(data); // Setting displayed podcasts state
        setIsLoading(false); // Setting loading state to false
      } catch (error) {
        console.error('Error fetching podcasts:', error); // Logging error to console
        setFetchError('Failed to retrieve podcast previews.'); // Setting fetch error state
        setIsLoading(false); // Setting loading state to false
      }
    };

    loadPodcasts(); // Calling the function to load podcasts
  }, []);

  useEffect(() => { // Effect to sort podcasts whenever sort option or podcasts change
    const sortPodcasts = (option, data) => {
      let sortedData = [...data]; // Creating a copy of the data array
      switch (option) { // Sorting based on the selected option
        case 'A-Z':
          sortedData.sort((a, b) => a.title.localeCompare(b.title)); // Sorting alphabetically A-Z
          break;
        case 'Z-A':
          sortedData.sort((a, b) => b.title.localeCompare(a.title)); // Sorting alphabetically Z-A
          break;
        case 'Newest':
          sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sorting by newest
          break;
        case 'Oldest':
          sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated)); // Sorting by oldest
          break;
        default:
          sortedData = podcasts; // Default case, no sorting
      }
      return sortedData; // Returning the sorted data
    };

    setDisplayedPodcasts(sortPodcasts(sortOption, podcasts)); // Setting displayed podcasts based on sorted data
  }, [sortOption, podcasts]);

  const handleGenreChange = (event) => { // Function to handle genre change
    const genreId = event.target.value; // Getting selected genre ID
    setSelectedGenre(genreId); // Setting selected genre state
    if (genreId === 'All') {
      setDisplayedPodcasts(podcasts); // If 'All' is selected, display all podcasts
    } else {
      const filtered = podcasts.filter(podcast =>
        podcast.genres.includes(parseInt(genreId))
      ); // Filtering podcasts based on selected genre
      setDisplayedPodcasts(filtered); // Setting displayed podcasts to filtered list
    }
  };

  const handleSortChange = (option) => { // Function to handle sort option change
    setSortOption(option); // Setting sort option state
  };

  const handleFavoriteToggle = (podcast) => { // Function to handle favorite toggle
    if (isFavorite(podcast.id)) {
      removeFavorite(podcast.id); // If podcast is already favorite, remove it
    } else {
      addFavorite(podcast); // If podcast is not favorite, add it
    }
  };

  const handleSearchChange = (event) => { // Function to handle search query change
    setSearchQuery(event.target.value); // Setting search query state
    applySearchFilter(event.target.value); // Applying search filter based on query
  };

  const applySearchFilter = (query) => { // Function to apply search filter
    const filtered = podcasts.filter(podcast =>
      podcast.title.toLowerCase().includes(query.toLowerCase())
    ); // Filtering podcasts based on search query
    setDisplayedPodcasts(filtered); // Setting displayed podcasts to filtered list
  };

  const toggleViewMode = () => { // Function to toggle view mode
    setViewMode(viewMode === 'list' ? 'grid' : 'list'); // Toggling between list and grid view
  };

  if (isLoading) { // Conditional rendering if data is loading
    return <div>Loading...</div>;
  }

  if (fetchError) { // Conditional rendering if there is a fetch error
    return <div>{fetchError}</div>;
  }

  const formatDate = (dateString) => { // Function to format date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options); // Returning formatted date
  };

  return ( // Main component rendering
    <div className="home">
      <h1>Podcasts</h1> {/* Heading */}
      <div className="filter-bar"> {/* Filter bar for sorting, genre selection, and search */}
        <div className="genre-filter">
          <select onChange={(e) => handleSortChange(e.target.value)}> {/* Sort dropdown */}
            <option value="All">All</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
          <select onChange={handleGenreChange} value={selectedGenre}> {/* Genre dropdown */}
            <option value="All">All Genres</option>
            {Object.entries(genres).map(([id, title]) => (
              <option key={id} value={id}>{title}</option> // Mapping genres to options
            ))}
          </select>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ borderRadius: '50px' }}
          />
        </div>
        <button className="view-mode-toggle-button" onClick={toggleViewMode}>
          {viewMode === 'list' ? 'Grid View' : 'List View'} {/* Button to toggle view mode */}
        </button>
      </div>
      <ul className={`podcast-list ${viewMode === 'grid' ? 'grid-view' : ''}`}>
        {displayedPodcasts.map((podcast, index) => ( // Mapping displayed podcasts to list items
          <li key={podcast.id} className={`podcast-item ${viewMode}`}>
            <div className="podcast-image">
              <img src={podcast.image} alt={podcast.title} /> {/* Podcast image */}
            </div>
            <div className="podcast-details">
              <h3>
                <Link to={`/show/${podcast.id}`} className="podcast-link">
                  {podcast.title} {/* Podcast title */}
                </Link>
              </h3>
              <div className="action-buttons">
                <i
                  className={`fas fa-heart ${isFavorite(podcast.id) ? 'favorite-icon favorite' : 'favorite-icon'}`}
                  onClick={() => handleFavoriteToggle(podcast)} // Favorite toggle icon
                ></i>
                <Link to={`/show/${podcast.id}`} className="subheading-link">
                  Season: {podcast.season} {/* Podcast season */}
                </Link>
              </div>
              <p>Genres: {podcast.genres.map(genreId => genres[genreId]).join(', ')}</p> {/* Podcast genres */}
              <p>Last Updated: {formatDate(podcast.updated)}</p> {/* Last updated date */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home; // Exporting Home component as default
