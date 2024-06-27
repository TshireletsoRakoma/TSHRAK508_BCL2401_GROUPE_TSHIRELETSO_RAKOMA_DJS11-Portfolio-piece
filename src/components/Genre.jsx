import { useEffect, useState } from 'react'; // Importing necessary modules from React library
import { useParams } from 'react-router-dom'; // Importing useParams hook from react-router-dom
import { fetchGenre } from '../services/PodcastService.js'; // Importing fetchGenre function from PodcastService.js

const Genre = () => {
  const { genreId } = useParams(); // Destructuring genreId from useParams hook to get the genre ID from the URL
  const [genre, setGenre] = useState(null); // Initializing state variable genre as null using useState hook
  const [loading, setLoading] = useState(true); // Initializing state variable loading as true using useState hook

  useEffect(() => {
    const fetchData = async () => { // Defining an asynchronous function fetchData using async keyword
      try {
        const data = await fetchGenre(genreId); // Fetching genre data using fetchGenre function with genreId
        setGenre(data); // Setting genre state with fetched data
        setLoading(false); // Setting loading state to false after data is fetched
      } catch (error) {
        console.error(`Error fetching genre with ID ${genreId}:`, error); // Logging error if fetching genre data fails
        setLoading(false); // Setting loading state to false on error
      }
    };

    fetchData(); // Calling fetchData function when genreId changes
  }, [genreId]); // Dependency array with genreId to trigger useEffect on genreId change

  if (loading) {
    return <div>Loading...</div>; // Rendering loading message if data is being fetched
  }

  if (!genre) {
    return <div>Genre not found</div>; // Rendering message if genre data is not found
  }

  return (
    <div>
      <h1>{genre.name} Podcasts</h1> {/* Rendering genre name */}
      <ul>
        {genre.shows.map(show => ( {/* Mapping through shows array within genre */}
          <li key={show.id}>
            <a href={`/show/${show.id}`}>{show.title}</a> {/* Rendering link to each show's details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre; // Exporting Genre component as default
