import { useContext, useState } from 'react'; // Importing React hooks
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation
import { CategoryContext } from './context/CatergoryContext.jsx'; // Importing CategoryContext to manage selected category
import { useAuth } from '../contexts/AuthContext'; // Importing useAuth custom hook for authentication context
import './Header.css'; // Importing CSS file for header styles

const Header = () => {
  const { setSelectedCategory } = useContext(CategoryContext); // Using CategoryContext to get setSelectedCategory function
  const { user, logout } = useAuth(); // Using useAuth hook to get user and logout function from authentication context
  const [showError, setShowError] = useState(false); // State to manage error message visibility

  const handleHomeClick = () => {
    setSelectedCategory('All'); // When home is clicked, reset category to 'All'
  };

  const toggleError = () => {
    setShowError((prev) => !prev); // Function to toggle error message visibility
  };

  return (
    <header className="header"> {/* Header section for the application */}
      <Link to="/" className="logo-link" onClick={handleHomeClick}> {/* Link to home page */}
        {/* SVG logo with neon pink theme */}
        <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="200" height="50">
          <text x="5" y="35" fontSize="28" fontWeight="bold" fill="#00ffff">Film Focus🎥</text> {/* Logo text */}
        </svg>
      </Link>
      <nav> {/* Navigation section */}
        <ul className="nav-links"> {/* List of navigation links */}
          <li><Link to="/" onClick={handleHomeClick}>Home</Link></li> {/* Link to home page */}
          <li><Link to="/yourfav">Favorites</Link></li> {/* Link to favorites page */}
          <li><Link to="/about">About</Link></li> {/* Link to about page */}
          <li><Link to="/contact">Contact</Link></li> {/* Link to contact page */}
          {user ? ( // Conditional rendering based on user authentication status
            <li><button className="logout-button-header" onClick={logout}>Logout</button></li> // Logout button if user is logged in
          ) : (
            <li><Link to="/login">Login</Link></li> // Login link if user is not logged in
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header; // Exporting Header component as default
