import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPreviews } from '../services/PodcastService.js';
import { useFavorites } from '../contexts/FavouriteContext.jsx';
import AudioPlayer from './AudioPlayer';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [displayedPodcasts, setDisplayedPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [sortOption, setSortOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const genres = {
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

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const data = await fetchPreviews();
        setPodcasts(data);
        setDisplayedPodcasts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        setFetchError('Failed to retrieve podcast previews.');
        setIsLoading(false);
      }
    };

    loadPodcasts();
  }, []);

  useEffect(() => {
    const sortPodcasts = (option, data) => {
      let sortedData = [...data];
      switch (option) {
        case 'A-Z':
          sortedData.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'Z-A':
          sortedData.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'Newest':
          sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated));
          break;
        case 'Oldest':
          sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated));
          break;
        default:
          sortedData = podcasts;
      }
      return sortedData;
    };

    setDisplayedPodcasts(sortPodcasts(sortOption, podcasts));
  }, [sortOption, podcasts]);

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    if (genreId === 'All') {
      setDisplayedPodcasts(podcasts);
    } else {
      const filtered = podcasts.filter(podcast =>
        podcast.genres.includes(parseInt(genreId))
      );
      setDisplayedPodcasts(filtered);
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleFavoriteToggle = (podcast) => {
    if (isFavorite(podcast.id)) {
      removeFavorite(podcast.id);
    } else {
      addFavorite(podcast);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    applySearchFilter(event.target.value);
  };

  const applySearchFilter = (query) => {
    const filtered = podcasts.filter(podcast =>
      podcast.title.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedPodcasts(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="home">
      <h1>Browse Podcasts</h1>
      <div className="filter-bar">
        <div className="genre-filter">
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="All">All</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
          <select onChange={handleGenreChange} value={selectedGenre}>
            <option value="All">All Genres</option>
            {Object.entries(genres).map(([id, title]) => (
              <option key={id} value={id}>{title}</option>
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
      </div>
      <ul className="podcast-list">
        {displayedPodcasts.map((podcast) => (
          <li key={podcast.id} className="podcast-item">
            <div className="podcast-image">
              <img src={podcast.image} alt={podcast.title} />
            </div>
            <div className="podcast-details">
              <h3>
                <Link to={`/show/${podcast.id}`} className="podcast-link">
                  {podcast.title}
                </Link>
              </h3>
              <div className="action-buttons">
                
                <i
                  className={`fas fa-heart ${isFavorite(podcast.id) ? 'favorite-icon favorite' : 'favorite-icon'}`}
                  onClick={() => handleFavoriteToggle(podcast)}
                ></i>
                <Link to={`/show/${podcast.id}`} className="subheading-link">
                  Season: {podcast.season}
                </Link>
              </div>
              <p>Genres: {podcast.genres.map(genreId => genres[genreId]).join(', ')}</p>
              <p>Last Updated: {formatDate(podcast.updated)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
