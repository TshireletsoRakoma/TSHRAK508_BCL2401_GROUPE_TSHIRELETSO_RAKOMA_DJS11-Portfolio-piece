import React from 'react'; // Importing React library for JSX syntax
import ReactDOM from 'react-dom/client'; // Importing ReactDOM from client for rendering
import App from './App.jsx'; // Importing the main App component
import './index.css'; // Importing CSS for styling

ReactDOM.createRoot(document.getElementById('root')).render( // Using createRoot to render the app into the root element
  <React.StrictMode> {/* Wrapping the entire application with StrictMode for additional checks and warnings */}
    <App /> {/* Rendering the main App component */}
  </React.StrictMode>, // Closing StrictMode
); // Closing render method
