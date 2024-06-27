import React, { useState } from 'react'; // Importing React and useState hook
import { useAuth } from '../contexts/AuthContext'; // Importing useAuth hook from AuthContext
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import './Login.css'; // Importing CSS for styling

const Login = () => {
  const [username, setUsername] = useState(''); // State to manage username input
  const [password, setPassword] = useState(''); // State to manage password input
  const [error, setError] = useState(''); // State to manage error message
  const { login } = useAuth(); // Destructuring login function from AuthContext
  const navigate = useNavigate(); // Initializing navigate function for redirection

  const handleSubmit = (e) => { // Function to handle form submission
    e.preventDefault(); // Preventing default form submission behavior
    if (login(username, password)) { // Checking if login is successful
      navigate('/'); // Navigating to home page on successful login
    } else {
      setError('Invalid username or password'); // Setting error message on failed login
    }
  };

  return (
    <div className="login-container"> {/* Container for login form */}
      <h1 className="login-title">Login</h1> {/* Login title */}
      <form className="login-form" onSubmit={handleSubmit}> {/* Login form with submit handler */}
        <div className="form-group"> {/* Form group for username input */}
          <label className="form-label">Username:</label> {/* Username label */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Updating username state on input change
            className="form-input" // Styling class for input
          />
        </div>
        <div className="form-group"> {/* Form group for password input */}
          <label className="form-label">Password:</label> {/* Password label */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Updating password state on input change
            className="form-input" // Styling class for input
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Displaying error message if any */}
        <button type="submit" className="login-button">Login</button> {/* Submit button */}
      </form>
    </div>
  );
};

export default Login; // Exporting Login component as default
