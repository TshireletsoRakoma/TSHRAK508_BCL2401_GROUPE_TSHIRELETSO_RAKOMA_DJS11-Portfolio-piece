import React from 'react'; // Importing React library to define component
import './Footer.css'; // Importing CSS file for styling

const Footer = () => { // Defining functional component named Footer
  return (
    <footer className="footer"> {/* Footer element with class name 'footer' for styling */}
      <div className="footer-content"> {/* Container div for footer content */}
        <p>© 2024 T.J Rakoma. All Rights Reserved.</p> {/* Copyright notice */}
      </div>
    </footer>
  );
};

export default Footer; // Exporting Footer component as default for use in other parts of the application
